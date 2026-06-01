'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const flip = {
  enter: (dir: number) => ({ rotateY: dir >= 0 ? 105 : -105, opacity: 0 }),
  center: { rotateY: 0, opacity: 1 },
  exit: (dir: number) => ({ rotateY: dir >= 0 ? -105 : 105, opacity: 0 }),
};

export default function Flipbook({ id, pages, ratio, title, issue, pdf, onClose }:
  { id: string; pages: number; ratio: number; title: string; issue: string; pdf: string; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [dims, setDims] = useState({ w: 340, h: 480 });

  useEffect(() => {
    const calc = () => {
      let h = Math.min(window.innerHeight * 0.74, 680);
      let w = h / ratio;
      const maxW = window.innerWidth * 0.9;
      if (w > maxW) { w = maxW; h = w * ratio; }
      setDims({ w: Math.round(w), h: Math.round(h) });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [ratio]);

  const go = (n: number) => {
    const c = Math.max(0, Math.min(pages - 1, n));
    setDir(c >= page ? 1 : -1);
    setPage(c);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(page + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(page - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(pages - 1); }
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages, onClose]);

  // preload neighbours
  useEffect(() => {
    [page + 1, page - 1].forEach(p => {
      if (p >= 0 && p < pages) { const im = new Image(); im.src = `/comics/${id}/page-${p + 1}.jpg`; }
    });
  }, [page, pages, id]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[200] flex items-center justify-center p-3"
      style={{ background: 'rgba(40,28,70,0.82)', backdropFilter: 'blur(6px)' }}>
      <div onClick={e => e.stopPropagation()} className="relative flex flex-col items-center gap-4 max-w-full">

        {/* header */}
        <div className="flex items-center justify-between gap-3 w-full" style={{ maxWidth: dims.w }}>
          <div className="text-white min-w-0">
            <div className="font-display text-[0.98rem] leading-tight truncate" style={{ fontWeight: 700 }}>{title}</div>
            <div className="font-body text-white/80 text-[0.72rem]">{issue} · page {page + 1} of {pages}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a href={pdf} download className="font-body font-bold text-[0.78rem] text-white px-3.5 py-2 rounded-full inline-flex items-center gap-1.5"
              style={{ background: 'linear-gradient(135deg,#FF86B5,#FF9DC4)', boxShadow: '0 6px 16px rgba(255,134,181,0.45)' }}>
              ⬇ PDF
            </a>
            <button onClick={onClose} aria-label="Close"
              className="w-11 h-11 rounded-full bg-white text-[#57506A] flex items-center justify-center hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>✕</button>
          </div>
        </div>

        {/* the book page */}
        <div className="relative" style={{ width: dims.w, height: dims.h, perspective: 2000 }}>
          <AnimatePresence custom={dir} mode="wait" initial={false}>
            <motion.div key={page} custom={dir} variants={flip}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-[10px] overflow-hidden bg-white"
              style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden',
                boxShadow: '0 24px 50px rgba(0,0,0,0.45)' }}>
              <img src={`/comics/${id}/page-${page + 1}.jpg`} alt={`Page ${page + 1}`}
                className="w-full h-full object-cover select-none" draggable={false} />
            </motion.div>
          </AnimatePresence>

          {/* tap zones (left/right half to flip) */}
          <button aria-label="Previous page" onClick={() => go(page - 1)} disabled={page === 0}
            className="absolute left-0 top-0 h-full w-1/2 z-10 disabled:cursor-default" style={{ cursor: page === 0 ? 'default' : 'w-resize' }} />
          <button aria-label="Next page" onClick={() => go(page + 1)} disabled={page === pages - 1}
            className="absolute right-0 top-0 h-full w-1/2 z-10 disabled:cursor-default" style={{ cursor: page === pages - 1 ? 'default' : 'e-resize' }} />
        </div>

        {/* controls */}
        <div className="flex items-center gap-3 sm:gap-4 bg-white rounded-full px-4 py-2.5" style={{ boxShadow: '0 12px 34px rgba(0,0,0,0.3)' }}>
          <button onClick={() => go(page - 1)} disabled={page === 0}
            className="px-4 py-2.5 rounded-full font-body font-semibold text-[0.84rem] transition-all disabled:opacity-35 disabled:cursor-not-allowed"
            style={{ background: 'rgba(168,140,255,0.12)', color: '#A88CFF' }}>← Prev</button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Page ${i + 1}`} className="rounded-full transition-all duration-300"
                style={{ width: i === page ? 22 : 9, height: 9, background: i === page ? 'linear-gradient(90deg,#A88CFF,#FF9DC4)' : 'rgba(168,140,255,0.25)' }} />
            ))}
          </div>
          <button onClick={() => go(page + 1)} disabled={page === pages - 1}
            className="px-4 py-2.5 rounded-full font-body font-semibold text-[0.84rem] text-white transition-all disabled:opacity-35 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>Next →</button>
        </div>

        <div className="font-body text-[0.72rem] text-white/70 text-center">
          Tap the page sides or use ← → to turn · <span className="hidden sm:inline">Esc to close</span>
        </div>
      </div>
    </div>
  );
}
