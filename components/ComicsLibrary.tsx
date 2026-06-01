'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Flipbook from './Flipbook';
import { COMICS } from '@/lib/comics';

/* floating star decorations for the header */
const STARS = [
  { top: '12%', left: '6%',  s: '1.4rem', d: '0s',   dur: '3.2s' },
  { top: '24%', left: '88%', s: '1rem',   d: '0.6s', dur: '4s'   },
  { top: '60%', left: '4%',  s: '0.9rem', d: '1.2s', dur: '3.6s' },
  { top: '14%', left: '70%', s: '1.1rem', d: '0.3s', dur: '4.4s' },
  { top: '70%', left: '92%', s: '1.2rem', d: '0.9s', dur: '3.4s' },
  { top: '40%', left: '50%', s: '0.8rem', d: '1.6s', dur: '5s'   },
];

/* ── One stop on the trail ─────────────────────────────────────── */
function TrailCard({ idx, onOpen }: { idx: number; onOpen: () => void }) {
  const c = COMICS[idx];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const flip = idx % 2 === 1; // alternate sides on desktop

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative">
      <div
        onClick={onOpen}
        className={`group cursor-pointer flex flex-col ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                    items-center gap-5 lg:gap-9 bg-white rounded-[34px] p-4 sm:p-6 lg:p-7
                    shadow-[0_18px_46px_rgba(168,140,255,0.18)] hover:shadow-[0_26px_60px_rgba(168,140,255,0.30)]
                    transition-shadow duration-300`}>

        {/* ── Cover ── */}
        <div className="relative shrink-0 w-[200px] sm:w-[230px]">
          {/* number badge */}
          <div className="absolute -top-3 -left-3 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full
                          flex items-center justify-center font-display text-white text-[1.3rem] sm:text-[1.55rem]
                          ring-4 ring-white"
            style={{ background: `linear-gradient(135deg,${c.accent},#FF9DC4)`, fontWeight: 800,
              boxShadow: `0 8px 20px ${c.accent}55` }}>
            {idx + 1}
          </div>
          {c.isNew && (
            <div className="absolute -top-2 right-2 z-20 font-body font-bold text-[0.6rem] px-2.5 py-1 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg,#FF86B5,#FF9DC4)', boxShadow: '0 4px 12px rgba(255,134,181,0.45)' }}>
              NEW ✨
            </div>
          )}
          <motion.div whileHover={{ rotate: flip ? 2 : -2, y: -6 }} whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative overflow-hidden rounded-[20px]"
            style={{ aspectRatio: '1 / 1.414', boxShadow: '0 14px 30px rgba(40,28,70,0.20)' }}>
            <img src={`/comics/${c.id}/page-1.jpg`} alt={c.title}
              className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(0deg,rgba(40,28,70,0.5) 0%,transparent 45%)' }}>
              <span className="font-body font-bold text-[0.74rem] text-white px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}>📖 Flip &amp; Read</span>
            </div>
          </motion.div>
        </div>

        {/* ── Info ── */}
        <div className={`flex-1 text-center ${flip ? 'lg:text-right' : 'lg:text-left'}`}>
          <div className={`flex items-center justify-center ${flip ? 'lg:justify-end' : 'lg:justify-start'} gap-2 mb-2`}>
            <span className="text-[1.6rem]">{c.emoji}</span>
            <span className="font-body font-bold text-[0.72rem] tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ color: c.accent, background: `${c.accent}18` }}>{c.issue}</span>
          </div>
          <h3 className="font-display text-[clamp(1.25rem,2.4vw,1.8rem)] text-[#57506A] leading-tight mb-2.5">
            {c.title}
          </h3>
          <p className="font-body text-[#8B86A0] text-[0.92rem] leading-[1.7] max-w-[440px] mx-auto lg:mx-0
                        lg:inline-block mb-4">
            {c.blurb}
          </p>
          <div className={`flex items-center justify-center ${flip ? 'lg:justify-end' : 'lg:justify-start'} gap-3 flex-wrap`}>
            <span className="font-body font-semibold text-[0.76rem] text-[#8B86A0] inline-flex items-center gap-1.5
                             bg-[#F4EEFD] px-3 py-1.5 rounded-full">📄 {c.pages} pages</span>
            <span className="font-body font-bold text-[0.86rem] text-white inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             group-hover:scale-105 transition-transform"
              style={{ background: `linear-gradient(135deg,${c.accent},#FF9DC4)`,
                boxShadow: `0 8px 22px ${c.accent}55` }}>
              ▶ Read Now
            </span>
            <a href={c.pdf} download onClick={(e) => e.stopPropagation()}
              className="font-body font-semibold text-[0.78rem] text-[#A88CFF] inline-flex items-center gap-1
                         hover:text-[#FF86B5] transition-colors" title="Download PDF">⬇ PDF</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dashed hop connector between stops ────────────────────────── */
function Connector({ emoji }: { emoji: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 select-none pointer-events-none" aria-hidden>
      <span className="w-1.5 h-1.5 rounded-full bg-[#C9B9F2]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#D6C9F5]" />
      <motion.span className="text-[1.5rem]"
        animate={{ y: [0, -7, 0], rotate: [0, -6, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        {emoji}
      </motion.span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#D6C9F5]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#C9B9F2]" />
    </div>
  );
}

const HOPS = ['🐾', '✨', '🦋', '🌟', '🐾'];

/* ── The page ──────────────────────────────────────────────────── */
export default function ComicsLibrary() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const totalPages = COMICS.reduce((s, c) => s + c.pages, 0);

  return (
    <div className="relative">
      {/* ══ Header ══ */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 text-center"
        style={{ background: 'linear-gradient(165deg,#EDE4FB 0%,#F6E7F3 45%,#FFE9F0 100%)' }}>
        {/* floating stars */}
        {STARS.map((s, i) => (
          <div key={i} className="absolute pointer-events-none select-none"
            style={{ top: s.top, left: s.left, fontSize: s.s, color: 'rgba(168,140,255,0.55)',
              animation: `twinkle ${s.dur} ease-in-out infinite`, animationDelay: s.d }}>✦</div>
        ))}

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/#adventures"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-[0.8rem] text-[#A88CFF]
                       bg-white/70 px-4 py-1.5 rounded-full mb-5 hover:bg-white transition-colors">
            ← Back to adventures
          </Link>

          <motion.div className="text-[3.2rem] sm:text-[4rem] mb-2"
            animate={{ y: [0, -8, 0], rotate: [0, -4, 4, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
            📚
          </motion.div>
          <h1 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] mb-3"
            style={{ background: 'linear-gradient(135deg,#A88CFF 0%,#FF9DC4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Sia&rsquo;s Comic Adventures
          </h1>
          <p className="font-body text-[#7A7392] text-[0.98rem] sm:text-[1.08rem] leading-[1.7] max-w-[540px] mx-auto mb-6">
            Hop along the trail and read every story in order! Flip the pages like a real
            comic book, then keep them forever. 🐰💜
          </p>

          {/* stats chips */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap mb-7">
            {['🐰 Ages 2–8', `📖 ${COMICS.length} comics`, `📄 ${totalPages} pages`, '✨ Flip & read', '💯 Free to read'].map(t => (
              <span key={t} className="font-body font-semibold text-[0.76rem] sm:text-[0.82rem] text-[#6B5CA5]
                             bg-white px-4 py-2 rounded-full shadow-[0_4px_14px_rgba(168,140,255,0.18)]">{t}</span>
            ))}
          </div>

          {/* start CTA */}
          <motion.button onClick={() => setOpenIdx(0)} whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
            className="font-display text-white text-[1rem] sm:text-[1.1rem] px-8 py-3.5 rounded-full inline-flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)', fontWeight: 700,
              boxShadow: '0 12px 30px rgba(168,140,255,0.45)' }}>
            🚀 Start from Issue #1
          </motion.button>
        </motion.div>

        {/* bottom cloud wave */}
        <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 56 }}>
            <path d="M0 40 Q120 10 240 38 Q360 66 480 36 Q600 8 720 38 Q840 66 960 36 Q1080 8 1200 38 Q1320 64 1440 40 L1440 70 L0 70 Z"
              fill="#FBF8FF" />
          </svg>
        </div>
      </section>

      {/* ══ The trail ══ */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6"
        style={{ background: 'linear-gradient(180deg,#FBF8FF 0%,#F3ECFD 100%)' }}>
        <div className="max-w-3xl mx-auto">
          {COMICS.map((c, i) => (
            <div key={c.id}>
              <TrailCard idx={i} onOpen={() => setOpenIdx(i)} />
              {i < COMICS.length - 1 && <Connector emoji={HOPS[i % HOPS.length]} />}
            </div>
          ))}

          {/* coming soon node */}
          <Connector emoji="💤" />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white/70 border-2 border-dashed border-[#C9B9F2] rounded-[30px] p-8">
            <div className="text-[2.6rem] mb-2">🌙</div>
            <h3 className="font-display text-[1.3rem] text-[#57506A] mb-1">More adventures are on the way!</h3>
            <p className="font-body text-[#8B86A0] text-[0.9rem]">
              Issue #9 is being drawn right now. Check back soon for the next chapter! 💜
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flipbook reader */}
      {openIdx !== null && (
        <Flipbook id={COMICS[openIdx].id} pages={COMICS[openIdx].pages} ratio={COMICS[openIdx].ratio}
          title={COMICS[openIdx].title} issue={COMICS[openIdx].issue} pdf={COMICS[openIdx].pdf}
          onClose={() => setOpenIdx(null)} />
      )}
    </div>
  );
}
