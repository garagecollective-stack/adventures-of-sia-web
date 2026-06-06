'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from '@/components/ui/Cursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';
import { BadgeToast } from '@/components/Toast';
import Confetti from '@/components/Confetti';

/*
  Both panels show the same real Sia photo (sia-outdoor.jpeg).
  The RIGHT panel has 5 overlay elements added on top those are the differences.
  Clicking a hotspot on the right marks it found; a green ring appears on BOTH panels.
*/

interface Diff {
  id: string;
  /** Center position as % of container width/height */
  xPct: number;
  yPct: number;
  /** Hit-radius as % of container width */
  rPct: number;
  label: string;
  hint: string;
  /** What to render on the right panel as the "difference" */
  overlay: React.ReactNode;
}

const DIFFERENCES: Diff[] = [
  {
    id: 'd1',
    xPct: 83, yPct: 10, rPct: 7,
    label: 'A star appeared in the sky!',
    hint: 'Look in the top-right corner of the sky…',
    overlay: (
      <span
        className="absolute pointer-events-none select-none animate-twinkle"
        style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', left: '83%', top: '10%', transform: 'translate(-50%,-50%)', filter: 'drop-shadow(0 0 6px #FFE840)' }}
      >⭐</span>
    ),
  },
  {
    id: 'd2',
    xPct: 14, yPct: 22, rPct: 7,
    label: 'A butterfly flew in!',
    hint: 'Something is fluttering in the top-left…',
    overlay: (
      <span
        className="absolute pointer-events-none select-none"
        style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)', left: '14%', top: '22%', transform: 'translate(-50%,-50%)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', animation: 'float 3s ease-in-out infinite' }}
      >🦋</span>
    ),
  },
  {
    id: 'd3',
    xPct: 78, yPct: 83, rPct: 7,
    label: 'An extra pom flower appeared!',
    hint: 'Check the flowers on the bottom right…',
    overlay: (
      <div
        className="absolute pointer-events-none"
        style={{ left: '78%', top: '83%', transform: 'translate(-50%,-50%)' }}
      >
        <div style={{ width: 'clamp(14px,3vw,22px)', height: 'clamp(14px,3vw,22px)', borderRadius: '50%', background: '#C8A8D8', boxShadow: '0 2px 8px rgba(200,168,216,0.6)', marginBottom: 2 }} />
        <div style={{ width: 3, height: 'clamp(10px,2vw,16px)', background: '#72A878', borderRadius: 2, margin: '0 auto' }} />
      </div>
    ),
  },
  {
    id: 'd4',
    xPct: 48, yPct: 6, rPct: 8,
    label: 'A rainbow arc appeared!',
    hint: 'Look at the very top centre of the sky…',
    overlay: (
      <svg
        className="absolute pointer-events-none"
        style={{ left: '32%', top: '1%', width: '32%', height: 'auto', opacity: 0.85 }}
        viewBox="0 0 120 50" fill="none"
      >
        {['#FF4040','#FF8C00','#FFE000','#40C040','#4080FF','#8040FF'].map((c, i) => (
          <path key={i}
            d={`M${8+i*5} 46 Q60 ${-8+i*7} ${112-i*5} 46`}
            stroke={c} strokeWidth="5" strokeLinecap="round" opacity=".9"
          />
        ))}
      </svg>
    ),
  },
  {
    id: 'd5',
    xPct: 58, yPct: 52, rPct: 7,
    label: 'A heart appeared near Sia!',
    hint: 'Look just beside Sia…',
    overlay: (
      <span
        className="absolute pointer-events-none select-none"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.6rem)', left: '58%', top: '52%', transform: 'translate(-50%,-50%)', filter: 'drop-shadow(0 2px 4px rgba(122,92,170,0.5))', animation: 'float 2.5s ease-in-out infinite' }}
      >💜</span>
    ),
  },
];

// ── Scene panel ──────────────────────────────────────────────────────────────

function ScenePanel({
  side, found, onFind,
}: {
  side: 'left' | 'right';
  found: Set<string>;
  onFind: (id: string) => void;
}) {
  const isRight = side === 'right';

  return (
    <div className="relative flex-1 min-w-0">
      <div className="relative rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.14)]">

        {/* Real Sia photo */}
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <Image
            src="/images/sia-outdoor.jpeg"
            alt={`Sia's meadow picture ${isRight ? '2' : '1'}`}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, 50vw"
            priority
          />

          {/* ── Right side: add overlay differences ── */}
          {isRight && DIFFERENCES.map(d => (
            <div key={d.id}>
              {/* Hide overlay once found, show green check instead */}
              {!found.has(d.id) && d.overlay}
              {found.has(d.id) && (
                <div
                  className="absolute pointer-events-none rounded-full border-[2.5px] border-[#3A7850] bg-[rgba(138,184,144,0.25)] flex items-center justify-center"
                  style={{
                    left: `${d.xPct}%`,
                    top:  `${d.yPct}%`,
                    width:  `${d.rPct * 2}%`,
                    aspectRatio: '1',
                    transform: 'translate(-50%,-50%)',
                  }}
                >
                  <span className="text-[#3A7850] font-black" style={{ fontSize: 'clamp(0.55rem,1.5vw,0.85rem)' }}>✓</span>
                </div>
              )}
            </div>
          ))}

          {/* ── Left side: green rings for found spots ── */}
          {!isRight && DIFFERENCES.map(d => found.has(d.id) && (
            <div
              key={d.id}
              className="absolute pointer-events-none rounded-full border-[2.5px] border-[#3A7850] bg-[rgba(138,184,144,0.2)]"
              style={{
                left: `${d.xPct}%`,
                top:  `${d.yPct}%`,
                width:  `${d.rPct * 2}%`,
                aspectRatio: '1',
                transform: 'translate(-50%,-50%)',
              }}
            />
          ))}

          {/* ── Clickable hotspots (right panel only) ── */}
          {isRight && DIFFERENCES.map(d => (
            <button
              key={d.id}
              onClick={() => onFind(d.id)}
              aria-label={`Find difference: ${d.label}`}
              className="absolute rounded-full transition-all duration-200 hover:bg-yellow-200/20"
              style={{
                left: `${d.xPct}%`,
                top:  `${d.yPct}%`,
                width:  `${d.rPct * 2}%`,
                aspectRatio: '1',
                transform: 'translate(-50%,-50%)',
                cursor: 'none',
                border: found.has(d.id)
                  ? '2px solid rgba(58,120,80,0.6)'
                  : '2px dashed transparent',
                background: found.has(d.id)
                  ? 'rgba(138,184,144,0.15)'
                  : 'transparent',
              }}
            />
          ))}

          {/* Panel label */}
          <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="font-display text-[.65rem] text-text-deep">{isRight ? 'Picture 2' : 'Picture 1'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main game page ────────────────────────────────────────────────────────────

export default function SpotDifference() {
  const { play } = useSound();
  const { earn, newBadge, clearNew } = useBadges();
  const [found, setFound] = useState<Set<string>>(new Set());
  const [won,   setWon]   = useState(false);
  const [confetti, setConfetti] = useState(false);

  const onFind = (id: string) => {
    if (found.has(id)) return;
    play('match');
    const next = new Set([...Array.from(found), id]);
    setFound(next);
    if (next.size === DIFFERENCES.length) {
      setTimeout(() => { play('win'); setWon(true); setConfetti(true); earn('puzzle'); }, 400);
    }
  };

  const reset = () => { setFound(new Set()); setWon(false); play('whoosh'); };

  return (
    <>
      <Navigation />
      <Cursor />
      <BadgeToast badge={newBadge} onClose={clearNew} />
      <Confetti trigger={confetti} onDone={() => setConfetti(false)} />

      <div className="min-h-screen px-4 pt-28 pb-8" style={{ background: '#FFF0E8' }}>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/games" className="flex items-center gap-2 font-bold text-brand-violet hover:text-[#5A3E8A] transition-colors text-[.9rem]">
              ← Games
            </Link>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
              onClick={reset}
              className="btn-sia font-display text-[.85rem] px-5 py-2.5 border-2 text-[#E8884A]"
              style={{ background: 'white', borderColor: 'rgba(232,136,74,.3)' }}>
              🔄 Reset
            </motion.button>
          </div>

          <div className="text-center">
            <h1 className="font-display text-[1.8rem] sm:text-[2rem] text-text-deep mb-2">🔍 Spot the Difference</h1>
            <p className="text-text-mid text-[.88rem] sm:text-[.9rem] mb-4">
              Find all <strong>5 differences</strong> between the two pictures of Sia! Click on the right image to mark them.
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-3 mb-2">
              {DIFFERENCES.map((d, i) => (
                <motion.div key={d.id}
                  animate={found.has(d.id) ? { scale: [1, 1.3, 1] } : {}}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[.75rem] font-bold"
                  style={{
                    background: found.has(d.id) ? '#A8D8C4' : 'white',
                    border: `2px solid ${found.has(d.id) ? '#3A7850' : 'rgba(0,0,0,0.12)'}`,
                    color: found.has(d.id) ? '#3A7850' : '#9A8AB0',
                  }}>
                  {found.has(d.id) ? '✓' : i + 1}
                </motion.div>
              ))}
            </div>
            <p className="text-[.82rem] font-bold text-text-mid">{found.size}/5 found</p>
          </div>
        </div>

        {/* Two scene panels */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
          <ScenePanel side="left"  found={found} onFind={onFind} />
          <ScenePanel side="right" found={found} onFind={onFind} />
        </div>

        {/* Found labels */}
        <div className="max-w-5xl mx-auto mt-5">
          <AnimatePresence>
            {Array.from(found).map(id => {
              const d = DIFFERENCES.find(x => x.id === id)!;
              return (
                <motion.div key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 mr-3 mb-3 px-4 py-2 rounded-full text-[.82rem] font-bold"
                  style={{ background: '#A8D8C4', color: '#2A6040' }}>
                  ✓ {d.label}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Hint */}
        {found.size < DIFFERENCES.length && (
          <p className="max-w-5xl mx-auto mt-2 text-center text-[.8rem] text-text-mid">
            💡 Hint: {DIFFERENCES.find(d => !found.has(d.id))?.hint}
          </p>
        )}

        {/* Win overlay */}
        <AnimatePresence>
          {won && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              style={{ background: 'rgba(74,56,96,0.7)', backdropFilter: 'blur(8px)' }}>
              <motion.div initial={{ scale: .7 }} animate={{ scale: 1 }} exit={{ scale: .7 }}
                transition={{ type: 'spring', stiffness: 250 }}
                className="bg-white rounded-[36px] sm:rounded-[40px] p-8 sm:p-10 text-center max-w-sm w-full shadow-2xl">
                <div className="text-[4rem] sm:text-[4.5rem] mb-3">🎉</div>
                <h2 className="font-display text-[1.8rem] sm:text-[2rem] text-text-deep mb-2">All 5 Found!</h2>
                <p className="text-text-mid mb-4">Amazing eyes! You spotted every difference!</p>
                <p className="font-display text-brand-violet mb-6">🔎 Puzzle Solver badge earned!</p>
                <div className="flex gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                    onClick={reset}
                    className="btn-sia text-white font-display px-7 py-3"
                    style={{ background: 'linear-gradient(135deg,#E8884A,#F5C060)' }}>
                    Play Again
                  </motion.button>
                  <Link href="/games">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                      className="btn-sia font-display px-7 py-3 border-2 text-brand-violet"
                      style={{ background: 'rgba(122,92,170,.1)', borderColor: 'rgba(122,92,170,.25)' }}>
                      All Games
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <Footer />
    </>
  );
}
