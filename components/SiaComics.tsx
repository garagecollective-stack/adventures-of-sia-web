'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Flipbook from './Flipbook';
import { COMICS, type Comic } from '@/lib/comics';

/* ── Comic cover (real first page of the PDF) ────────────────── */
function ComicCover({ c }: { c: Comic }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: '#EEE7FA' }}>
      <img src={`/comics/${c.id}/page-1.jpg`} alt={c.title}
        className="w-full h-full object-cover" draggable={false} />
      {/* issue badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="font-body font-bold text-[0.62rem] px-2.5 py-1 rounded-full text-white"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>{c.issue}</span>
      </div>
      {c.isNew && (
        <div className="absolute top-3 right-3 z-10 font-body font-bold text-[0.6rem] px-2.5 py-1 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg,#FF86B5,#FF9DC4)', boxShadow: '0 4px 12px rgba(255,134,181,0.4)' }}>NEW ✨</div>
      )}
      {/* hover "flip" hint */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(0deg,rgba(40,28,70,0.45) 0%,transparent 45%)' }}>
        <span className="font-body font-bold text-[0.78rem] text-white inline-flex items-center gap-1.5 px-4 py-2 rounded-full"
          style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)' }}>📖 Flip &amp; Read</span>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function SiaComics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative py-12 sm:py-16"
      style={{ background: 'linear-gradient(180deg,#F5F0FD 0%,#FFFFFF 100%)' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div className="flex items-end justify-between mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }}>
          <div>
            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[0.8rem]
                             tracking-widest uppercase text-[#A88CFF] bg-[#A88CFF]/12 px-4 py-1.5 rounded-full mb-3">
              💥 Read
            </span>
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#57506A] leading-tight">Sia Comics</h2>
            <p className="font-body text-[#8B86A0] text-[0.9rem] mt-1">
              Real comic books — flip through the pages like a real book, and download them to keep!
            </p>
          </div>
          <Link href="/comics"
            className="hidden sm:inline-flex items-center gap-1.5 font-body font-semibold text-[0.82rem]
                       text-[#A88CFF] bg-white px-4 py-2 rounded-full shrink-0
                       shadow-[0_4px_16px_rgba(168,140,255,0.16)] hover:shadow-[0_6px_20px_rgba(168,140,255,0.28)] transition-shadow">
            View All →
          </Link>
        </motion.div>
      </div>

      {/* Comic cards — single-row auto-rotating marquee (full-bleed) */}
      <motion.div className="relative overflow-hidden"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          {/* edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg,#F6F1FD 0%,transparent 100%)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(270deg,#FFFFFF 0%,transparent 100%)' }} />

          <div className="flex gap-5 sm:gap-7 w-max comic-marquee py-2">
            {[...COMICS, ...COMICS].map((c, i) => {
              const idx = i % COMICS.length;
              return (
                <motion.div key={`${c.id}-${i}`} onClick={() => setOpenIdx(idx)}
                  whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="group cursor-pointer shrink-0 w-[250px] sm:w-[320px] relative overflow-hidden bg-white"
                  style={{ borderRadius: 26, boxShadow: '0 12px 34px rgba(168,140,255,0.16)' }}>
                  {/* Cover */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1.414', borderRadius: '26px 26px 0 0' }}>
                    <ComicCover c={c} />
                  </div>
                  {/* Info */}
                  <div className="p-4 flex items-center justify-between gap-2">
                    <span className="font-body font-semibold text-[0.8rem] inline-flex items-center gap-1.5" style={{ color: c.accent }}>
                      📖 Flip &amp; Read
                    </span>
                    <a href={c.pdf} download onClick={(e) => e.stopPropagation()}
                      className="font-body font-semibold text-[0.74rem] text-[#8B86A0] inline-flex items-center gap-1 hover:text-[#A88CFF] transition-colors"
                      title="Download PDF">
                      ⬇ PDF
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      {/* Flipbook reader */}
      {openIdx !== null && (
        <Flipbook id={COMICS[openIdx].id} pages={COMICS[openIdx].pages} ratio={COMICS[openIdx].ratio}
          title={COMICS[openIdx].title} issue={COMICS[openIdx].issue} pdf={COMICS[openIdx].pdf}
          onClose={() => setOpenIdx(null)} />
      )}
    </section>
  );
}
