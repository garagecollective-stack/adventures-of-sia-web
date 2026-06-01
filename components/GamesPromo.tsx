'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const GAMES = [
  { href: '/games/memory',   emoji: '🧠', title: 'Memory Match',    color: '#EEF6FF', accent: '#2870A8' },
  { href: '/games/colouring',emoji: '🎨', title: 'Colouring Book',  color: '#F8F0FC', accent: '#7A5CAA' },
  { href: '/games/spot',     emoji: '🔍', title: 'Spot Difference', color: '#FFF0E8', accent: '#E8884A' },
  { href: '/games/puzzle',   emoji: '🧩', title: 'Jigsaw Puzzle',   color: '#F0FBF4', accent: '#3A7850' },
];

export default function GamesPromo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#2448A8 0%,#7A5CAA 100%)' }}>

      {/* Deco blobs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle,white,transparent)', transform: 'translate(30%,-30%)' }} />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle,#F5E088,transparent)', transform: 'translate(-30%,30%)' }} />

      <motion.div className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7 }}>
        <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                         text-white/70 bg-white/15 px-5 py-2 rounded-full mb-4">
          🎮 Game Room
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white mb-3">
          Play with Sia!
        </h2>
        <p className="text-white/75 text-[1.05rem] max-w-[420px] mx-auto">
          Four fun games to play, earn badges, and explore Sia&apos;s world!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {GAMES.map((g, i) => (
          <motion.div key={g.href}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: .1 + i * .1, duration: .6 }}>
            <Link href={g.href}
              className="block rounded-[24px] p-5 text-center transition-all duration-300
                         hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)]"
              style={{ background: g.color }}>
              <div className="text-4xl mb-3">{g.emoji}</div>
              <span className="font-display text-[.9rem]" style={{ color: g.accent }}>{g.title}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div className="text-center"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: .5, duration: .7 }}>
        <Link href="/games">
          <motion.span
            whileHover={{ scale: 1.05, y: -3 }}
            className="inline-flex btn-sia text-white font-display text-[.95rem] sm:text-[1.05rem] px-6 sm:px-9 py-3 sm:py-4"
            style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}>
            🎮 Enter Game Room →
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
