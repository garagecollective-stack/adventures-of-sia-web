'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from './ui/TiltCard';

const MEMBERS = [
  {
    id: 'milo',
    role: "Sia's Mum",
    name: 'Milo',
    desc: 'Warm as golden morning light, Milo always has a kind word, a gentle hug, and the best biscuits in the whole meadow.',
    image: '/images/milo-solo.png',
    objPos: 'center 32%',
    accent: '#E2C898',
    roleColor: '#B07828',
    nameColor: '#5A3010',
    emoji: '🍪',
    gradient: 'from-[#F5ECD8] to-[#EDD8A8]',
  },
  {
    id: 'sia',
    role: 'Our Hero ⭐',
    name: 'Sia',
    desc: "Little in size, enormous in heart! Sia's curiosity and courage lead her to the most wonderful discoveries every day.",
    image: '/images/sia-outdoor.jpeg',
    objPos: 'center top',
    accent: '#AABFE0',
    roleColor: '#7A5CAA',
    nameColor: '#4A3860',
    emoji: '🌸',
    gradient: 'from-[#EBF3FC] to-[#C8E0F0]',
  },
  {
    id: 'arlo',
    role: "Sia's Dad",
    name: 'Arlo',
    desc: 'Steady, calm and always ready with a bedtime story. Arlo is the most wonderful adventure companion and Sia\'s biggest fan!',
    image: '/images/arlo-solo.png',
    objPos: 'center 32%',
    accent: '#B0B8C8',
    roleColor: '#607080',
    nameColor: '#303848',
    emoji: '📚',
    gradient: 'from-[#E8EEF8] to-[#D0D8E8]',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};
const card = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export default function Family() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="family" ref={ref}
      className="relative py-24 px-5 overflow-hidden text-center"
      style={{ background: 'linear-gradient(160deg, #EDE6F8 0%, #E4EEF8 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-[4%] text-[6rem] opacity-[0.055] pointer-events-none select-none rotate-[-20deg]">🌸</div>
      <div className="absolute bottom-16 right-[5%] text-[5rem] opacity-[0.055] pointer-events-none select-none rotate-[15deg]">⭐</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                      rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(122,92,170,0.06) 0%, transparent 70%)' }} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-block font-display text-[0.9rem] tracking-widest uppercase
                         text-brand-violet bg-brand-violet/10 px-5 py-1.5 rounded-full mb-4">
          🐰 The Bunny Family
        </span>
        <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] text-text-deep mb-4">
          Sia&rsquo;s Wonderful Family
        </h2>
        <p className="max-w-[520px] mx-auto text-text-mid text-[1.05rem] leading-[1.8]">
          Every great adventure begins at home. Meet the loving family who make Sia&rsquo;s
          meadow world the most magical place to be.
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="mt-10 sm:mt-14 max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        {MEMBERS.map((m) => (
          <motion.div key={m.id} variants={card}>
            <TiltCard className="group rounded-[32px] bg-white overflow-hidden shadow-[0_12px_40px_rgba(122,92,170,0.1)]">
              {/* Image */}
              <div className="overflow-hidden relative">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={400}
                  height={380}
                  className="w-full h-[240px] sm:h-[300px] lg:h-[360px] object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ objectPosition: m.objPos }}
                />
                {/* Gradient overlay on image */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, white, transparent)`,
                  }}
                />
                {/* Emoji badge */}
                <div
                  className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center
                              text-xl shadow-lg"
                  style={{ background: m.accent + '33', backdropFilter: 'blur(8px)' }}
                >
                  {m.emoji}
                </div>
              </div>

              {/* Info */}
              <div
                className="px-7 pb-7 pt-3 text-left relative"
                style={{ borderTop: `4px solid ${m.accent}` }}
              >
                <div className="text-[0.76rem] font-black tracking-[0.14em] uppercase mb-1"
                     style={{ color: m.roleColor }}>
                  {m.role}
                </div>
                <div className="font-display text-[1.85rem] mb-2" style={{ color: m.nameColor }}>
                  {m.name}
                </div>
                <p className="text-[0.9rem] text-text-mid leading-[1.65] mb-4">{m.desc}</p>
                <Link href={`/characters/${m.id}`}
                  className="inline-flex items-center gap-1.5 font-display text-[.82rem] transition-colors"
                  style={{ color: m.roleColor }}>
                  Meet {m.name} →
                </Link>
              </div>

              {/* Card glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-[32px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 0 2px ${m.accent}66, 0 28px 64px ${m.accent}44`,
                }}
              />
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
