'use client';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';

const LOCATIONS = [
  {
    id: 'cottage',
    name: "Sia's Cottage",
    emoji: '🏠',
    x: '18%', y: '45%',
    color: '#E2C898',
    bg: '#FFF8E8',
    desc: "Sia lives here with Mum Milo and Dad Arlo. It's a cosy stone cottage with a big garden full of pom flowers!",
    facts: ['Sia\'s bedroom has star-shaped windows 🌟', 'Milo bakes carrot biscuits in the kitchen 🍪', 'There\'s a cosy reading nook under the stairs 📚'],
  },
  {
    id: 'garden',
    name: 'The Pom Garden',
    emoji: '🌸',
    x: '35%', y: '62%',
    color: '#C8A8D8',
    bg: '#F8F0FC',
    desc: 'The beautiful garden where all the pom flowers bloom in every colour of the rainbow!',
    facts: ['Sia planted her first pom seed when she was two 🌱', 'There are 13 different colours of pom flowers 🎨', 'Butterflies visit every morning 🦋'],
  },
  {
    id: 'rainbow',
    name: 'Rainbow Bridge',
    emoji: '🌈',
    x: '52%', y: '20%',
    color: '#88C0E8',
    bg: '#EEF6FF',
    desc: 'After every rainy day, a beautiful rainbow appears over Sia\'s meadow. She loves to make a wish!',
    facts: ['Sia\'s favourite colour in the rainbow is violet 💜', 'The rainbow always appears at 4 o\'clock ⏰', 'If you slide down it, you land in a flower patch! 🌸'],
  },
  {
    id: 'pond',
    name: 'The Lily Pond',
    emoji: '🐸',
    x: '72%', y: '58%',
    color: '#A8D8C4',
    bg: '#F0FBF4',
    desc: 'A magical pond with lily pads, friendly frogs, and fish that glow at night!',
    facts: ['Freddie the Frog lives on the big lily pad 🐸', 'The fish glow blue and purple at night ✨', 'Sia and Arlo go fishing here on weekends 🎣'],
  },
  {
    id: 'oak',
    name: 'The Big Oak Tree',
    emoji: '🌳',
    x: '84%', y: '38%',
    color: '#8AB890',
    bg: '#F0FBF4',
    desc: "The oldest tree in the meadow! It has a treehouse where Sia does her stargazing at night.",
    facts: ['The treehouse was built by Dad Arlo 🔨', 'There\'s a telescope for watching shooting stars 🔭', 'An owl named Oliver lives in the hollow 🦉'],
  },
  {
    id: 'butterfly',
    name: 'Butterfly Clearing',
    emoji: '🦋',
    x: '50%', y: '72%',
    color: '#FFB8C4',
    bg: '#FFF3F6',
    desc: 'A sunny clearing where hundreds of butterflies gather in the afternoon sun!',
    facts: ['There are 12 different butterfly species here 🦋', 'Luna the purple butterfly is Sia\'s best friend 💜', 'They flutter to music if you sing to them 🎵'],
  },
];

export default function InteractiveMeadow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { play } = useSound();
  const { earn } = useBadges();
  const [active, setActive] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const select = (id: string) => {
    play('chime');
    setActive(id);
    setVisited(v => {
      const next = new Set([...Array.from(v), id]);
      if (next.size >= 3) earn('explorer');
      return next;
    });
  };

  const loc = LOCATIONS.find(l => l.id === active);

  return (
    <section ref={ref} id="world-map" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#D4F0E0 0%,#B8D9A0 100%)' }}>

      {/* Sky gradient top */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg,rgba(210,235,255,.6) 0%,transparent 40%)' }} />

      <motion.div className="text-center mb-12 relative z-[2]"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7 }}>
        <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                         text-[#307A5A] bg-white/60 px-5 py-2 rounded-full mb-4">
          🗺️ Explore
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-text-deep mb-3">
          Sia&apos;s <span className="grad-violet">Magical World</span>
        </h2>
        <p className="text-text-mid text-[1rem] max-w-[440px] mx-auto">
          Click any spot to discover the secrets of Sia&apos;s meadow!
          <span className="ml-2 font-bold text-brand-violet">({visited.size}/{LOCATIONS.length} explored)</span>
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-[2]">
        <motion.div
          initial={{ opacity: 0, scale: .95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: .8, delay: .2 }}
          className="relative rounded-[40px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
          style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg,#B8E0FF 0%,#D8F0B0 50%,#8ABB70 100%)' }}>

          {/* Meadow SVG background */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 562" preserveAspectRatio="xMidYMid slice">
            {/* Sky */}
            <defs>
              <radialGradient id="sun" cx="80%" cy="15%" r="15%">
                <stop offset="0%" stopColor="#FFE840" stopOpacity=".9"/>
                <stop offset="100%" stopColor="#FFE840" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="1000" height="562" fill="url(#linearSky)"/>
            {/* Sun glow */}
            <circle cx="800" cy="80" r="60" fill="url(#sun)"/>
            <circle cx="800" cy="80" r="28" fill="#FFE840" opacity=".9"/>
            {/* Rainbow */}
            {['#FF4040','#FF8C00','#FFE000','#40C040','#4080FF','#8040FF'].map((c, i) => (
              <path key={i}
                d={`M${150+i*12} 300 Q500 ${-60+i*25} ${850-i*12} 300`}
                stroke={c} strokeWidth="12" fill="none" strokeLinecap="round" opacity=".6"/>
            ))}
            {/* Hills */}
            <path d="M0 400 Q200 300 400 360 Q600 420 800 330 Q950 270 1000 310 L1000 562 L0 562 Z"
              fill="#9DC080" opacity=".8"/>
            <path d="M0 420 Q300 370 600 400 Q800 430 1000 385 L1000 562 L0 562 Z"
              fill="#8AB870"/>
            <path d="M0 460 Q250 430 500 450 Q750 470 1000 440 L1000 562 L0 562 Z"
              fill="#7AA860"/>
            {/* Clouds */}
            <ellipse cx="150" cy="80" rx="90" ry="30" fill="white" opacity=".85"/>
            <ellipse cx="110" cy="65" rx="55" ry="42" fill="white" opacity=".9"/>
            <ellipse cx="195" cy="60" rx="50" ry="38" fill="white" opacity=".9"/>
            <ellipse cx="600" cy="60" rx="70" ry="25" fill="white" opacity=".8"/>
            <ellipse cx="565" cy="48" rx="44" ry="34" fill="white" opacity=".85"/>
            <ellipse cx="640" cy="45" rx="42" ry="32" fill="white" opacity=".85"/>
            {/* Pom flowers scattered */}
            {[
              [200, 430], [280, 450], [350, 420], [450, 445], [550, 435],
              [650, 425], [720, 445], [800, 430], [870, 450], [150, 480],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={8 + (i % 3) * 3}
                  fill={['#C8A8D8','#FFB8C4','#F5E088','#A8D8C4'][i % 4]} opacity=".8"/>
                <rect x={x - 1.5} y={y + 8} width={3} height={14} fill="#72A878" rx="1.5"/>
              </g>
            ))}
            {/* Butterflies */}
            {[[420, 280], [580, 260], [700, 320]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x},${y})`}>
                <ellipse cx="-7" cy="0" rx="8" ry="5" fill={['#C8A8D8','#FFB8C4','#A8D8C4'][i]} opacity=".7"/>
                <ellipse cx="7" cy="0" rx="8" ry="5" fill={['#C8A8D8','#FFB8C4','#A8D8C4'][i]} opacity=".7"/>
                <ellipse cx="0" cy="0" rx="2" ry="4" fill="#4A3860" opacity=".5"/>
              </g>
            ))}
            {/* Cottage (simple) */}
            <rect x="130" y="330" width="80" height="55" fill="#D4B898" rx="4"/>
            <polygon points="130,330 210,330 170,290" fill="#C09060"/>
            <rect x="158" y="355" width="22" height="30" fill="#8A6040" rx="2"/>
            <rect x="138" y="338" width="18" height="16" fill="#CCE8FF" rx="2"/>
            <rect x="194" y="338" width="18" height="16" fill="#CCE8FF" rx="2"/>
            {/* Oak tree */}
            <circle cx="850" cy="300" r="55" fill="#3D8B40" opacity=".9"/>
            <circle cx="820" cy="285" r="38" fill="#4A9A48"/>
            <circle cx="878" cy="275" r="42" fill="#3D8B40"/>
            <rect x="843" y="355" width="16" height="55" fill="#7A5A30" rx="4"/>
            {/* Pond */}
            <ellipse cx="720" cy="430" rx="70" ry="35" fill="#5BAAD0" opacity=".7"/>
            <ellipse cx="720" cy="430" rx="55" ry="25" fill="#7EC0E0" opacity=".5"/>
            {/* Lily pads */}
            <ellipse cx="700" cy="428" rx="12" ry="7" fill="#5A9A50" opacity=".8"/>
            <ellipse cx="740" cy="432" rx="10" ry="6" fill="#5A9A50" opacity=".8"/>
          </svg>

          {/* Clickable hotspots */}
          {LOCATIONS.map((loc, i) => (
            <motion.button key={loc.id}
              initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
              transition={{ delay: .4 + i * .1, type: 'spring', stiffness: 250 }}
              onClick={() => select(loc.id)}
              className="absolute flex flex-col items-center group"
              style={{ left: loc.x, top: loc.y, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2 + i * .3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl
                           shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-200
                           group-hover:scale-110"
                style={{
                  background: visited.has(loc.id) ? loc.color : 'white',
                  border: `3px solid ${active === loc.id ? '#7A5CAA' : loc.color}`,
                  boxShadow: active === loc.id ? `0 0 0 4px ${loc.color}88, 0 8px 24px rgba(0,0,0,0.2)` : undefined,
                }}>
                {loc.emoji}
              </motion.div>
              <span className="mt-1 text-[.65rem] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
                               hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {loc.name}
              </span>
            </motion.button>
          ))}

          {/* Visited counter */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="font-display text-[.8rem] text-text-deep">
              🗺️ {visited.size}/{LOCATIONS.length} explored
            </span>
          </div>
        </motion.div>

        {/* Info popup */}
        <AnimatePresence mode="wait">
          {loc && (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: .4 }}
              className="mt-6 rounded-[28px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              style={{ background: loc.bg }}>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'white', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                  {loc.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-display text-[1.4rem] text-text-deep">{loc.name}</h3>
                    <button onClick={() => setActive(null)}
                      className="text-text-mid hover:text-text-deep transition-colors text-xl flex-shrink-0">✕</button>
                  </div>
                  <p className="text-text-mid text-[.95rem] leading-[1.75] mb-4">{loc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {loc.facts.map((f, i) => (
                      <motion.span key={i}
                        initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * .08 }}
                        className="text-[.8rem] font-semibold px-4 py-2 rounded-full"
                        style={{ background: 'white', color: '#4A3860', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        {f}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && visited.size === 0 && (
          <motion.p className="text-center mt-4 font-display text-[.9rem]"
            style={{ color: '#4A7840' }}
            animate={{ opacity: [.6, 1, .6] }} transition={{ duration: 2, repeat: Infinity }}>
            👆 Tap any spot on the map to explore!
          </motion.p>
        )}
      </div>
    </section>
  );
}
