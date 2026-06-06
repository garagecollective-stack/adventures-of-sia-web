'use client';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EPISODES = [
  {
    ep: 'EP 01',
    title: "Sia's Big Garden Hunt",
    duration: '12 min',
    img: '/images/sia-outdoor.jpeg',
    pos: 'center center',
  },
  {
    ep: 'EP 02',
    title: "Milo's Surprise",
    duration: '11 min',
    img: '/images/sia-milo.jpeg',
    pos: 'center 30%',
  },
  {
    ep: 'EP 03',
    title: "Arlo and the Forest",
    duration: '13 min',
    img: '/images/sia-arlo.jpeg',
    pos: 'center 25%',
  },
  {
    ep: 'EP 04',
    title: "A Rainy Day with Sia",
    duration: '10 min',
    img: '/images/sia-indoor.jpeg',
    pos: 'center 20%',
  },
];

function PlayIcon({ size = 64 }: { size?: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.12 }}
      className="relative flex items-center justify-center rounded-full cursor-pointer"
      style={{
        width: size, height: size,
        background: 'rgba(255,255,255,0.22)',
        backdropFilter: 'blur(12px)',
        border: '2.5px solid rgba(255,255,255,0.7)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{
        width: 0, height: 0,
        borderTop: `${size * 0.22}px solid transparent`,
        borderBottom: `${size * 0.22}px solid transparent`,
        borderLeft: `${size * 0.36}px solid white`,
        marginLeft: size * 0.1,
      }} />
    </motion.div>
  );
}

/* Decorative film strip */
function FilmStrip({ flip = false }: { flip?: boolean }) {
  return (
    <div className="absolute left-0 right-0 pointer-events-none overflow-hidden"
      style={{ [flip ? 'bottom' : 'top']: 0, height: 28, background: '#0F0A2A' }}>
      <div className="flex items-center h-full gap-1.5 px-2">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="shrink-0 rounded-[2px]"
            style={{ width: 18, height: 14, background: '#1E1442', border: '1px solid #2D2060' }} />
        ))}
      </div>
    </div>
  );
}

export default function WatchVideos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="adventures" className="relative overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #1A0F42 0%, #3B1A78 45%, #6B1F5C 100%)' }}>

      <FilmStrip />
      <FilmStrip flip />

      {/* floating background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 420, height: 420, top: '-10%', right: '-8%', background: 'radial-gradient(circle, rgba(168,140,255,0.18) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full" style={{ width: 320, height: 320, bottom: '5%', left: '-5%', background: 'radial-gradient(circle, rgba(255,157,196,0.15) 0%, transparent 70%)' }} />
        {/* twinkling stars */}
        {[['12%',18],['28%',60],['72%',30],['88%',55],['50%',14],['40%',72],['62%',44],['85%',20]] .map(([l, t], i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: l as string, top: t as number, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, opacity: 0.4, animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.35}s` }} />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* ── Heading ── */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-display text-[0.82rem] tracking-widest uppercase mb-5"
            style={{ background: 'rgba(168,140,255,0.2)', border: '1.5px solid rgba(168,140,255,0.4)', color: '#C9B8FF' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
            </svg>
            Watch
          </div>

          <h2 className="font-display leading-tight text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.02em' }}>
            Sia&apos;s World,{' '}
            <span style={{ background: 'linear-gradient(135deg,#C9B8FF,#FF9DC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              On Screen
            </span>
          </h2>
          <p className="font-body text-white/55 text-[0.95rem] max-w-[480px] mx-auto leading-relaxed">
            Animated episodes of Sia&apos;s magical adventures — hopping their way to your screen very soon.
          </p>
        </motion.div>

        {/* ── Featured episode (hero) ── */}
        <motion.div className="relative mx-auto mb-8 rounded-[22px] overflow-hidden group"
          style={{ maxWidth: 780, aspectRatio: '16/9', boxShadow: '0 40px 100px rgba(0,0,0,0.55)' }}
          initial={{ opacity: 0, scale: 0.96, y: 30 }} animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>

          <Image src="/images/sia-outdoor.jpeg" alt="Featured episode" fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ objectPosition: 'center 35%' }} sizes="780px" />

          {/* cinematic overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,5,30,0.85) 0%, rgba(10,5,30,0.25) 45%, rgba(10,5,30,0.1) 100%)' }} />

          {/* top labels */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="font-body font-bold text-[0.65rem] tracking-widest uppercase text-white px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(168,140,255,0.6)', backdropFilter: 'blur(8px)' }}>
              Season 1 · Preview
            </span>
            <motion.span className="font-display text-[0.72rem] px-3 py-1.5 rounded-full text-white"
              style={{ fontWeight: 700, background: 'linear-gradient(135deg,#FF9DC4,#FF86B5)', boxShadow: '0 4px 14px rgba(255,134,181,0.45)' }}
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              Coming Soon
            </motion.span>
          </div>

          {/* center play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayIcon size={76} />
          </div>

          {/* bottom info */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
            <p className="font-body text-white/60 text-[0.7rem] tracking-widest uppercase mb-1">Adventures of Sia · EP 01</p>
            <h3 className="font-display text-white text-[1.2rem] sm:text-[1.5rem] leading-tight" style={{ fontWeight: 700 }}>
              Sia&apos;s Big Garden Hunt
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="font-body text-white/50 text-[0.75rem]">12 min</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="font-body text-white/50 text-[0.75rem]">All Ages</span>
            </div>
          </div>

          {/* shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
        </motion.div>

        {/* ── Episode cards row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {EPISODES.map((ep, i) => (
            <motion.div key={ep.ep}
              className="relative rounded-[16px] overflow-hidden group cursor-pointer"
              style={{ aspectRatio: '16/9', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.55)' }}>

              <Image src={ep.img} alt={ep.title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: ep.pos }} sizes="220px" />

              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,5,30,0.88) 0%, rgba(10,5,30,0.1) 55%)' }} />

              {/* top badge */}
              <div className="absolute top-2 left-2">
                <span className="font-body font-bold text-[0.55rem] tracking-widest uppercase text-white/80 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
                  {ep.ep}
                </span>
              </div>

              {/* play icon small */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayIcon size={38} />
              </div>

              {/* bottom info */}
              <div className="absolute bottom-0 left-0 right-0 px-2.5 py-2.5">
                <p className="font-display text-white text-[0.7rem] leading-tight truncate" style={{ fontWeight: 700 }}>{ep.title}</p>
                <p className="font-body text-white/45 text-[0.6rem] mt-0.5">{ep.duration}</p>
              </div>

              {/* coming soon overlay tag */}
              <div className="absolute top-2 right-2">
                <span className="font-body font-bold text-[0.5rem] tracking-wide uppercase text-white px-1.5 py-0.5 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>
                  Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Notify CTA ── */}
        <motion.div className="text-center"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}>
          <p className="font-body text-white/50 text-[0.88rem] mb-4">
            Be the first to watch when Season 1 drops
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-sia text-white font-display px-8 py-3.5 cursor-none"
            style={{
              background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)',
              boxShadow: '0 12px 32px rgba(168,140,255,0.45)',
              fontSize: '0.95rem',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Notify Me When It Launches
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
