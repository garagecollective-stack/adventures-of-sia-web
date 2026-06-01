'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WatchVideos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} id="adventures" className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }}>
          <span className="inline-block font-display text-[0.85rem] tracking-widest uppercase
                           text-[#A88CFF] bg-[#A88CFF]/10 px-4 py-1.5 rounded-full mb-4">
            🎬 Watch
          </span>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-[#57506A] mb-4">Watch Videos</h2>

          {/* animated film reel */}
          <motion.div className="text-[3.4rem] mb-4"
            animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            📺
          </motion.div>

          <span className="inline-flex items-center gap-2 font-display text-[1rem] text-white px-6 py-2.5 rounded-full"
            style={{ fontWeight: 700, background: 'linear-gradient(135deg,#FF86B5,#FF9DC4)', boxShadow: '0 10px 26px rgba(255,134,181,0.4)' }}>
            ✨ Coming Soon ✨
          </span>

          <p className="font-body text-[#8B86A0] text-[0.95rem] mt-5 max-w-[440px] mx-auto leading-relaxed">
            Animated episodes of Sia&apos;s magical adventures are hopping their way to your screen. Stay tuned! 🐰
          </p>
        </motion.div>
      </div>
    </section>
  );
}
