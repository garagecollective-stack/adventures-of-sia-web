'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';

const QUESTIONS = [
  {
    q: 'If you could have a superpower, which would you pick?',
    opts: [
      { label: 'Fly like a bird 🦅',   color: '#A8C8E0', dark: '#2870A8' },
      { label: 'Be invisible 👻',       color: '#C8A8D8', dark: '#7A5CAA' },
      { label: 'Talk to animals 🐰',    color: '#A8D8C4', dark: '#307A5A' },
      { label: 'Super speed ⚡',         color: '#F5E088', dark: '#806010' },
    ],
  },
  {
    q: "What's Sia's favourite thing to do in her meadow?",
    opts: [
      { label: 'Chase butterflies 🦋',  color: '#FFB8C4', dark: '#A0406A' },
      { label: 'Find rainbows 🌈',       color: '#A8C8E0', dark: '#2870A8' },
      { label: 'Pick flowers 🌸',        color: '#C8A8D8', dark: '#7A5CAA' },
      { label: 'Jump in puddles 💧',     color: '#F5E088', dark: '#806010' },
    ],
  },
  {
    q: "Would you rather live in Sia's cosy cottage or a treehouse?",
    opts: [
      { label: "Sia's stone cottage 🏠", color: '#A8D8C4', dark: '#307A5A' },
      { label: 'A big treehouse 🌳',     color: '#F5E088', dark: '#806010' },
    ],
  },
];

const KEY = 'sia-question';

function getTodayQuestion() {
  const d = new Date();
  return QUESTIONS[Math.floor(d.getDate() / 10) % QUESTIONS.length];
}

export default function SiaQuestion() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { play } = useSound();
  const { earn } = useBadges();
  const q = getTodayQuestion();

  const [voted, setVoted] = useState<number | null>(null);
  const [votes, setVotes] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      const d = JSON.parse(stored);
      setVoted(d.choice);
      setVotes(d.votes);
    } else {
      // seed random votes so it looks active
      setVotes(q.opts.map((_, i) => Math.floor(20 + Math.random() * 60 + i * 8)));
    }
  }, []);

  const vote = (i: number) => {
    if (voted !== null) return;
    play('chime');
    earn('voter');
    const newVotes = [...votes];
    newVotes[i] = (newVotes[i] ?? 0) + 1;
    setVotes(newVotes);
    setVoted(i);
    localStorage.setItem(KEY, JSON.stringify({ choice: i, votes: newVotes, date: new Date().toDateString() }));
  };

  const total = votes.reduce((a, v) => a + v, 0) || 1;

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden"
      style={{ background: '#F0EAFC' }}>

      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '10%', left: '5%',  s: 40, c: '#C8A8D8' },
          { top: '70%', left: '3%',  s: 24, c: '#F5E088' },
          { top: '20%', right: '5%', s: 32, c: '#A8D8C4' },
          { top: '65%', right: '4%', s: 20, c: '#FFB8C4' },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full anim-float"
            style={{ width: p.s, height: p.s, background: p.c, opacity: .35,
                     top: (p as any).top, left: (p as any).left, right: (p as any).right,
                     animationDelay: `${i * .8}s` }} />
        ))}
      </div>

      <motion.div className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7 }}>

        <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                         text-brand-violet bg-brand-violet/10 px-5 py-2 rounded-full mb-4">
          💬 Sia Asks...
        </span>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-text-deep mb-3">
          {q.q}
        </h2>
        <p className="text-text-mid text-[.9rem] mb-8">
          {voted !== null ? `${total.toLocaleString()} explorers have answered!` : 'Tap your answer below!'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.opts.map((opt, i) => {
            const pct = total > 0 ? Math.round((votes[i] ?? 0) / total * 100) : 0;
            const isChosen = voted === i;
            return (
              <motion.button key={i}
                whileHover={voted === null ? { scale: 1.04, y: -3 } : {}}
                whileTap={voted === null ? { scale: .97 } : {}}
                onClick={() => vote(i)}
                disabled={voted !== null}
                className="relative overflow-hidden rounded-[20px] p-5 text-left transition-all"
                style={{
                  background: isChosen ? opt.color : 'white',
                  border: `2px solid ${isChosen ? opt.dark : opt.color}`,
                  boxShadow: isChosen ? `0 8px 24px ${opt.color}88` : '0 2px 12px rgba(0,0,0,0.06)',
                  cursor: voted !== null ? 'default' : 'none',
                }}>

                {/* Progress fill */}
                <AnimatePresence>
                  {voted !== null && (
                    <motion.div
                      initial={{ scaleX: 0 }} animate={{ scaleX: pct / 100 }}
                      transition={{ duration: .8, ease: 'easeOut', delay: .1 }}
                      className="absolute inset-0 origin-left rounded-[18px]"
                      style={{ background: `${opt.color}55` }} />
                  )}
                </AnimatePresence>

                <div className="relative z-[1] flex items-center justify-between">
                  <span className="font-display text-[1rem]" style={{ color: opt.dark }}>{opt.label}</span>
                  {voted !== null && (
                    <motion.span initial={{ opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: .5 }}
                      className="font-display text-[1.1rem]" style={{ color: opt.dark }}>
                      {pct}%
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {voted !== null && (
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: .8 }}
              className="mt-6 font-display text-[1rem] text-brand-violet">
              ⭐ Thanks for answering! Sia loves hearing from you!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
