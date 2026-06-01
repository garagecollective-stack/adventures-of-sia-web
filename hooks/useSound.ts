'use client';
import { useCallback, useRef } from 'react';

export type SoundType = 'pop' | 'chime' | 'match' | 'wrong' | 'win' | 'flip' | 'whoosh' | 'click';

/* ── Global mute state (module-level singleton, survives re-renders) ── */
let _muted = false;

if (typeof window !== 'undefined') {
  _muted = localStorage.getItem('sia-muted') === 'true';
}

export function setSoundMuted(v: boolean) {
  _muted = v;
  if (typeof window !== 'undefined') localStorage.setItem('sia-muted', String(v));
}

export function getSoundMuted(): boolean {
  return _muted;
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  };

  const play = useCallback((type: SoundType) => {
    if (_muted) return;
    try {
      const ac = getCtx();

      const chord = (freqs: number[], startTime: number, dur: number, vol = 0.18) => {
        freqs.forEach(freq => {
          const o = ac.createOscillator();
          const g = ac.createGain();
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, ac.currentTime + startTime);
          g.gain.setValueAtTime(vol, ac.currentTime + startTime);
          g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + startTime + dur);
          o.connect(g); g.connect(ac.destination);
          o.start(ac.currentTime + startTime);
          o.stop(ac.currentTime + startTime + dur + 0.05);
        });
      };

      const tone = (freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.2, freqEnd?: number) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, ac.currentTime);
        if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, ac.currentTime + dur);
        g.gain.setValueAtTime(vol, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
        o.connect(g); g.connect(ac.destination);
        o.start(ac.currentTime);
        o.stop(ac.currentTime + dur + 0.05);
      };

      switch (type) {
        case 'pop':    tone(520, 0.1,  'sine',     0.22, 120); break;
        case 'click':  tone(440, 0.06, 'sine',     0.15, 660); break;
        case 'flip':   tone(300, 0.08, 'sine',     0.12, 600); break;
        case 'whoosh': tone(800, 0.15, 'sawtooth', 0.07, 200); break;
        case 'wrong':  tone(200, 0.2,  'sawtooth', 0.1,  100); break;
        case 'chime':
          chord([880], 0, .4); chord([1100], .1, .4); chord([1320], .2, .5);
          break;
        case 'match':
          chord([523, 659], 0, .35); chord([659, 784], .1, .35); chord([784, 1047], .2, .5);
          break;
        case 'win':
          chord([523, 659, 784], 0,   .4);
          chord([659, 784, 988], .15, .4);
          chord([784, 988, 1175], .3, .5);
          chord([1047, 1319, 1568], .5, .8, .22);
          break;
      }
    } catch (_) { /* audio policy blocked */ }
  }, []);

  return { play };
}
