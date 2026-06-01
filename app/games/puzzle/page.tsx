'use client';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from '@/components/ui/Cursor';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';
import { BadgeToast } from '@/components/Toast';

type Difficulty = '2x3' | '3x4' | '4x6';
const DIFFS: Record<Difficulty, { cols: number; rows: number; label: string }> = {
  '2x3': { cols: 2, rows: 3, label: '6 pieces' },
  '3x4': { cols: 3, rows: 4, label: '12 pieces' },
  '4x6': { cols: 4, rows: 6, label: '24 pieces' },
};

// The puzzle image is the SVG meadow scene
function buildPieces(cols: number, rows: number) {
  const total = cols * rows;
  return Array.from({ length: total }, (_, i) => ({ id: i, correct: i }));
}

function shuffle(arr: number[]): number[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function JigsawPuzzle() {
  const { play } = useSound();
  const { earn, newBadge, clearNew } = useBadges();
  const [diff, setDiff] = useState<Difficulty>('2x3');
  const { cols, rows } = DIFFS[diff];
  const total = cols * rows;
  const [positions, setPositions] = useState<number[]>(() => shuffle(Array.from({ length: 6 }, (_, i) => i)));
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  const W = 400, H = 280;
  const pw = W / cols, ph = H / rows;

  const reset = useCallback((d: Difficulty = diff) => {
    const t = DIFFS[d].cols * DIFFS[d].rows;
    setPositions(shuffle(Array.from({ length: t }, (_, i) => i)));
    setSelected(null); setMoves(0); setWon(false);
  }, [diff]);

  useEffect(() => { reset(diff); }, [diff]);

  const tap = (slotIdx: number) => {
    if (won) return;
    if (selected === null) {
      play('flip'); setSelected(slotIdx);
    } else {
      if (selected === slotIdx) { setSelected(null); return; }
      play('pop');
      setMoves(m => m + 1);
      setPositions(prev => {
        const next = [...prev];
        [next[selected], next[slotIdx]] = [next[slotIdx], next[selected]];
        const solved = next.every((v, i) => v === i);
        if (solved) { setTimeout(() => { play('win'); setWon(true); earn('puzzle'); }, 200); }
        return next;
      });
      setSelected(null);
    }
  };

  // SVG meadow split into pieces via clip-path
  return (
    <>
      <Cursor />
      <BadgeToast badge={newBadge} onClose={clearNew} />
      <div className="min-h-screen px-4 py-8" style={{ background: '#F0FBF4' }}>

        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/games" className="flex items-center gap-2 font-bold text-brand-violet
                                          hover:text-[#5A3E8A] transition-colors text-[.9rem]">
              ← Games
            </Link>
            <div className="flex items-center gap-3 text-[.85rem] font-bold text-text-mid">
              <span>🔀 {moves} swaps</span>
            </div>
          </div>
          <h1 className="font-display text-[2rem] text-text-deep text-center mb-2">🧩 Jigsaw Puzzle</h1>
          <p className="text-center text-text-mid text-[.9rem] mb-4">
            Tap two pieces to swap them. Solve the puzzle!
          </p>
          {/* Difficulty */}
          <div className="flex justify-center gap-3 mb-4">
            {(Object.keys(DIFFS) as Difficulty[]).map(d => (
              <button key={d} onClick={() => { setDiff(d); }}
                className="px-4 py-2 rounded-full font-display text-[.85rem] transition-all"
                style={{
                  background: diff === d ? '#3A7850' : 'white',
                  color: diff === d ? 'white' : '#7A6890',
                  border: `2px solid ${diff === d ? '#3A7850' : 'rgba(0,0,0,0.1)'}`,
                }}>
                {d} — {DIFFS[d].label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Preview */}
          <div className="lg:w-48 flex-shrink-0">
            <p className="font-display text-[.9rem] text-text-mid text-center mb-2">Preview</p>
            <div className="rounded-[16px] overflow-hidden shadow-md">
              <svg viewBox="0 0 400 280" style={{ width: '100%', display: 'block' }}>
                <MeadowSVG />
              </svg>
            </div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
              onClick={() => reset()}
              className="mt-3 w-full btn-sia text-white font-display text-[.85rem] py-2.5 justify-center"
              style={{ background: 'linear-gradient(135deg,#3A7850,#8AB890)' }}>
              🔄 Shuffle
            </motion.button>
          </div>

          {/* Puzzle grid */}
          <div className="flex-1">
            <div
              className="rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 3,
                background: '#4A3860',
                padding: 3,
              }}>
              {positions.map((pieceId, slotIdx) => {
                const pr = Math.floor(pieceId / cols);
                const pc = pieceId % cols;
                const isSelected = selected === slotIdx;
                const isCorrect = pieceId === slotIdx;
                return (
                  <motion.button
                    key={slotIdx}
                    onClick={() => tap(slotIdx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: .96 }}
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: `${pw}/${ph}`,
                      outline: isSelected ? '3px solid #F5E088' : isCorrect && won ? '2px solid #A8D8C4' : 'none',
                      outlineOffset: -2,
                      cursor: 'none',
                    }}>
                    <svg
                      viewBox={`${pc * pw} ${pr * ph} ${pw} ${ph}`}
                      style={{ width: '100%', height: '100%', display: 'block' }}>
                      <MeadowSVG />
                    </svg>
                    {isSelected && (
                      <div className="absolute inset-0 bg-yellow-300/25 pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </div>
            {selected !== null && (
              <p className="text-center mt-3 font-display text-[.9rem] text-[#3A7850] animate-pulse">
                Now tap another piece to swap!
              </p>
            )}
          </div>
        </div>

        {/* Win */}
        <AnimatePresence>
          {won && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              style={{ background: 'rgba(74,56,96,0.7)', backdropFilter: 'blur(8px)' }}>
              <motion.div initial={{ scale: .7 }} animate={{ scale: 1 }} exit={{ scale: .7 }}
                transition={{ type: 'spring', stiffness: 250 }}
                className="bg-white rounded-[40px] p-10 text-center max-w-sm w-full shadow-2xl">
                <div className="text-[4.5rem] mb-3">🎊</div>
                <h2 className="font-display text-[2rem] text-text-deep mb-2">Puzzle Complete!</h2>
                <p className="text-text-mid mb-2">You did it in {moves} swaps!</p>
                <p className="font-display text-brand-violet mb-6">🧩 Puzzle Master badge earned!</p>
                <div className="flex gap-3 justify-center">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                    onClick={() => reset()}
                    className="btn-sia text-white font-display px-7 py-3"
                    style={{ background: 'linear-gradient(135deg,#3A7850,#8AB890)' }}>
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
    </>
  );
}

function MeadowSVG() {
  return (
    <>
      <rect width="400" height="280" fill="#B8E0FF"/>
      {['#FF4040','#FF8C00','#FFE000','#40C040','#4080FF','#8040FF'].map((c,i) => (
        <path key={i} d={`M${20+i*8} 200 Q200 ${20+i*22} ${380-i*8} 200`}
          stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" opacity=".6"/>
      ))}
      <circle cx="330" cy="55" r="30" fill="#FFE840" opacity=".9"/>
      <ellipse cx="100" cy="60" rx="65" ry="28" fill="white" opacity=".85"/>
      <ellipse cx="68"  cy="47" rx="42" ry="34" fill="white"/>
      <ellipse cx="138" cy="44" rx="38" ry="28" fill="white"/>
      <ellipse cx="280" cy="50" rx="52" ry="22" fill="white" opacity=".8"/>
      <ellipse cx="256" cy="39" rx="34" ry="28" fill="white" opacity=".9"/>
      <path d="M0 210 Q100 165 200 190 Q300 215 400 175 L400 280 L0 280 Z" fill="#9DC080"/>
      <path d="M0 225 Q200 195 400 218 L400 280 L0 280 Z" fill="#8AB870"/>
      <path d="M0 250 Q200 235 400 245 L400 280 L0 280 Z" fill="#7AA860"/>
      <ellipse cx="200" cy="228" rx="38" ry="46" fill="#F5F0F0"/>
      <circle cx="200" cy="173" r="34" fill="#F5F0F0"/>
      <ellipse cx="182" cy="133" rx="11" ry="27" fill="#F5F0F0"/>
      <ellipse cx="218" cy="133" rx="11" ry="27" fill="#F5F0F0"/>
      <ellipse cx="182" cy="133" rx="6" ry="19" fill="#FFB8C4"/>
      <ellipse cx="218" cy="133" rx="6" ry="19" fill="#FFB8C4"/>
      <circle cx="188" cy="168" r="6" fill="#7A5CAA"/>
      <circle cx="212" cy="168" r="6" fill="#7A5CAA"/>
      <ellipse cx="200" cy="178" rx="4" ry="3" fill="#FFB8C4"/>
      <path d="M168 222 Q200 207 232 222 L240 272 Q200 282 160 272 Z" fill="#C8A8D8"/>
      <path d="M192 213 Q200 203 208 213 Q200 223 192 213 Z" fill="#FFB8C4"/>
      {[[70,242],[105,257],[300,240],[340,250]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={10+i%2*3} fill={['#FFB8C4','#C8A8D8','#A8D8C4','#F5E088'][i]}/>
          <rect x={cx-1.5} y={cy+10} width={3} height={12} fill="#72A878" rx="1.5"/>
        </g>
      ))}
    </>
  );
}
