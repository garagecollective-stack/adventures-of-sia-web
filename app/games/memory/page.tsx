'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from '@/components/ui/Cursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';
import { BadgeToast } from '@/components/Toast';
import Confetti from '@/components/Confetti';

const CARD_PAIRS = [
  { id: 'sia',        emoji: '🐰', label: 'Sia'        },
  { id: 'flower',     emoji: '🌸', label: 'Pom Flower' },
  { id: 'rainbow',    emoji: '🌈', label: 'Rainbow'    },
  { id: 'butterfly',  emoji: '🦋', label: 'Butterfly'  },
  { id: 'carrot',     emoji: '🥕', label: 'Carrot'     },
  { id: 'star',       emoji: '⭐', label: 'Star'       },
  { id: 'cottage',    emoji: '🏠', label: 'Cottage'    },
  { id: 'frog',       emoji: '🐸', label: 'Freddie'    },
];

type Card = { uid: string; id: string; emoji: string; label: string; flipped: boolean; matched: boolean; };
type Diff = 'easy' | 'medium' | 'hard';

const DIFF_CONFIG: Record<Diff, { pairs: number; label: string; color: string }> = {
  easy:   { pairs: 4,  label: '4 pairs',  color: '#A8D8C4' },
  medium: { pairs: 6,  label: '6 pairs',  color: '#F5E088' },
  hard:   { pairs: 8,  label: '8 pairs',  color: '#FFB8C4' },
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - .5);
}

function buildDeck(diff: Diff): Card[] {
  const { pairs } = DIFF_CONFIG[diff];
  const chosen = CARD_PAIRS.slice(0, pairs);
  const doubled = chosen.flatMap(c => [
    { ...c, uid: c.id + '-a', flipped: false, matched: false },
    { ...c, uid: c.id + '-b', flipped: false, matched: false },
  ]);
  return shuffle(doubled);
}

export default function MemoryGame() {
  const { play } = useSound();
  const { earn, newBadge, clearNew } = useBadges();

  const [diff, setDiff] = useState<Diff>('easy');
  const [cards, setCards] = useState<Card[]>(() => buildDeck('easy'));
  const [open, setOpen] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matched, setMatched] = useState(0);
  const [lock, setLock] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [won, setWon] = useState(false);
  const [bestScores, setBestScores] = useState<Record<Diff, number | null>>({ easy: null, medium: null, hard: null });
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sia-memory-best');
    if (stored) setBestScores(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!started || won) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [started, won]);

  const reset = useCallback((d: Diff = diff) => {
    setCards(buildDeck(d));
    setOpen([]); setMoves(0); setMatched(0);
    setSeconds(0); setStarted(false); setWon(false); setLock(false);
  }, [diff]);

  const flip = (uid: string) => {
    if (lock || won) return;
    const card = cards.find(c => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    if (!started) setStarted(true);
    play('flip');

    const newOpen = [...open, uid];
    setCards(prev => prev.map(c => c.uid === uid ? { ...c, flipped: true } : c));
    setOpen(newOpen);

    if (newOpen.length === 2) {
      setMoves(m => m + 1);
      setLock(true);
      const [a, b] = newOpen.map(id => cards.find(c => c.uid === id)!);
      if (a.id === b.id) {
        play('match');
        const newMatched = matched + 1;
        setMatched(newMatched);
        setCards(prev => prev.map(c => newOpen.includes(c.uid) ? { ...c, matched: true } : c));
        setOpen([]);
        setLock(false);
        if (newMatched === DIFF_CONFIG[diff].pairs) {
          play('win');
          setWon(true);
          setConfetti(true);
          earn('memory');
          const best = bestScores[diff];
          if (!best || seconds < best) {
            const next = { ...bestScores, [diff]: seconds };
            setBestScores(next);
            localStorage.setItem('sia-memory-best', JSON.stringify(next));
          }
        }
      } else {
        play('wrong');
        setTimeout(() => {
          setCards(prev => prev.map(c => newOpen.includes(c.uid) ? { ...c, flipped: false } : c));
          setOpen([]);
          setLock(false);
        }, 900);
      }
    }
  };

  // Responsive: 2 cols on narrow screens, 4 on wider
  const cols = 4;

  return (
    <>
      <Navigation />
      <Cursor />
      <BadgeToast badge={newBadge} onClose={clearNew} />
      <Confetti trigger={confetti} onDone={() => setConfetti(false)} />
      <div className="min-h-screen px-4 pt-28 pb-8" style={{ background: '#EEF6FF' }}>

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/games" className="flex items-center gap-2 font-bold text-brand-violet
                                          hover:text-[#5A3E8A] transition-colors text-[.9rem]">
              ← Games
            </Link>
            <div className="flex items-center gap-4 text-[.85rem] font-bold text-text-mid">
              <span>{Math.floor(seconds / 60).toString().padStart(2,'0')}:{(seconds % 60).toString().padStart(2,'0')}</span>
              <span>{moves} moves</span>
              <span>{matched}/{DIFF_CONFIG[diff].pairs} matched</span>
            </div>
          </div>
          <div className="text-center mb-4">
            <h1 className="font-display text-[2rem] text-text-deep mb-2">Memory Match</h1>
            <p className="text-text-mid text-[.9rem]">Find all the matching pairs!</p>
          </div>
          {/* Difficulty */}
          <div className="flex justify-center gap-3 mb-2">
            {(Object.keys(DIFF_CONFIG) as Diff[]).map(d => (
              <button key={d} onClick={() => { setDiff(d); reset(d); }}
                className="px-5 py-2 rounded-full font-display text-[.9rem] transition-all duration-200"
                style={{
                  background: diff === d ? DIFF_CONFIG[d].color : 'white',
                  color: diff === d ? '#4A3860' : '#9A8AB0',
                  boxShadow: diff === d ? '0 4px 14px rgba(0,0,0,0.1)' : 'none',
                  border: `2px solid ${diff === d ? DIFF_CONFIG[d].color : 'rgba(0,0,0,0.08)'}`,
                }}>
                {d.charAt(0).toUpperCase() + d.slice(1)} {DIFF_CONFIG[d].label}
              </button>
            ))}
          </div>
          {bestScores[diff] && (
            <p className="text-center text-[.8rem] text-text-mid">
              🏆 Best: {Math.floor(bestScores[diff]! / 60)}:{(bestScores[diff]! % 60).toString().padStart(2,'0')} in {diff}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="max-w-2xl mx-auto">
          {/* 2-col on mobile, 4-col from sm up */}
          <div className={`grid gap-2 sm:gap-3 grid-cols-2 ${diff !== 'easy' ? 'sm:grid-cols-4' : 'sm:grid-cols-4'}`}>
            {cards.map(card => (
              <motion.button key={card.uid}
                onClick={() => flip(card.uid)}
                className="aspect-square rounded-[20px] relative"
                style={{ perspective: 600 }}
                whileHover={!card.flipped && !card.matched ? { scale: 1.04 } : {}}
                whileTap={!card.flipped && !card.matched ? { scale: .95 } : {}}>
                <motion.div
                  className="w-full h-full"
                  style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                  animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                  transition={{ duration: .35, ease: 'easeOut' }}>
                  {/* Back */}
                  <div className="absolute inset-0 rounded-[20px] flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)',
                      backfaceVisibility: 'hidden',
                    }}>
                    <span className="text-3xl opacity-60">🌸</span>
                  </div>
                  {/* Front */}
                  <div className="absolute inset-0 rounded-[20px] flex flex-col items-center justify-center gap-1"
                    style={{
                      background: card.matched ? '#E8F8E8' : 'white',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      border: card.matched ? '2px solid #A8D8C4' : '2px solid transparent',
                      boxShadow: card.matched ? '0 4px 16px rgba(138,184,144,.3)' : '0 4px 16px rgba(0,0,0,0.08)',
                    }}>
                    <span className="text-4xl">{card.emoji}</span>
                    <span className="text-[.65rem] font-bold text-text-mid">{card.label}</span>
                    {card.matched && <span className="absolute top-2 right-2 text-sm">✓</span>}
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="max-w-2xl mx-auto mt-6 flex justify-center gap-4">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
            onClick={() => reset()}
            className="btn-sia text-white font-display text-[.95rem] px-7 py-3"
            style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
            Shuffle &amp; Restart
          </motion.button>
        </div>

        {/* Win screen */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              style={{ background: 'rgba(74,56,96,0.7)', backdropFilter: 'blur(8px)' }}
              onClick={() => reset()}>
              <motion.div
                initial={{ scale: .6, y: 60 }} animate={{ scale: 1, y: 0 }}
                exit={{ scale: .6, y: 60 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-[40px] p-10 text-center max-w-sm w-full shadow-2xl">
                <div className="text-[5rem] mb-4">🎉</div>
                <h2 className="font-display text-[2rem] text-text-deep mb-2">You Did It!</h2>
                <p className="text-text-mid mb-2">
                  {moves} moves · {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2,'0')}
                </p>
                {bestScores[diff] === seconds && <p className="text-[#3A7850] font-bold mb-4">🏆 New Best Time!</p>}
                <p className="font-display text-brand-violet mb-6">🧠 Memory Master badge earned!</p>
                <div className="flex gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                    onClick={() => reset()}
                    className="btn-sia text-white font-display px-7 py-3"
                    style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
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
