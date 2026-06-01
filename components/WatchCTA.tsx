'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WatchCTA() {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="watch-cta"
      ref={ref}
      className="relative py-24 px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C3898 0%, #2D50B8 45%, #6A44A0 100%)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none
                      opacity-20 animate-float-slow"
           style={{ background: 'radial-gradient(circle, #C8A8D8 0%, transparent 70%)', top: '-150px', left: '-150px' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none
                      opacity-15 animate-float"
           style={{ background: 'radial-gradient(circle, #A8D8C4 0%, transparent 70%)', bottom: '-120px', right: '-120px' }} />

      {/* Twinkling stars */}
      {[
        { top: '12%', left: '7%',   delay: 0,   size: '1.3rem' },
        { top: '22%', left: '14%',  delay: 0.6, size: '1rem'   },
        { top: '8%',  right: '10%', delay: 1.2, size: '1.2rem' },
        { top: '30%', right: '7%',  delay: 0.3, size: '0.9rem' },
        { bottom: '20%', left: '5%',  delay: 1.7, size: '1.1rem' },
        { bottom: '16%', right: '9%', delay: 0.9, size: '1rem'   },
        { top: '50%', left: '3%',   delay: 0.4, size: '0.8rem' },
        { top: '50%', right: '4%',  delay: 1.4, size: '0.8rem' },
      ].map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle pointer-events-none"
          style={{
            top: (s as any).top, left: (s as any).left,
            right: (s as any).right, bottom: (s as any).bottom,
            fontSize: s.size, animationDelay: `${s.delay}s`,
          }}
        >
          {i % 2 === 0 ? '⭐' : '✨'}
        </span>
      ))}

      <div className="relative z-[2] max-w-[680px] mx-auto">
        {/* Sia image with ring */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.1, type: 'spring', stiffness: 180, damping: 20 }}
          className="relative w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] mx-auto mb-6 sm:mb-8"
        >
          {/* Spinning ring */}
          <div
            className="absolute inset-[-14px] rounded-full border-[3px] border-dashed
                       border-logo-yellow/50 animate-spin-slow"
          />
          <div
            className="absolute inset-[-7px] rounded-full border-[2px]
                       border-sia-yellow/40 animate-spin-slow"
            style={{ animationDirection: 'reverse', animationDuration: '14s' }}
          />
          {/* Image */}
          <div className="w-full h-full rounded-full overflow-hidden border-[5px] border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.28)]
                          animate-float">
            <Image
              src="/images/sia-indoor.jpeg"
              alt="Sia waving"
              width={200}
              height={200}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Orbit poms */}
          {[
            { color: '#C8A8D8', size: 16, angle: 30  },
            { color: '#F5E088', size: 12, angle: 130 },
            { color: '#A8D8C4', size: 14, angle: 230 },
            { color: '#FFBAC8', size: 10, angle: 300 },
          ].map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const r   = 90;
            return (
              <div
                key={i}
                className="absolute rounded-full animate-float hidden sm:block"
                style={{
                  width: p.size, height: p.size,
                  background: p.color,
                  left: `calc(50% + ${Math.cos(rad) * r}px - ${p.size / 2}px)`,
                  top:  `calc(50% + ${Math.sin(rad) * r}px - ${p.size / 2}px)`,
                  animationDelay: `${i * 0.7}s`,
                  boxShadow: `0 4px 12px ${p.color}88`,
                }}
              />
            );
          })}
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2rem,4.5vw,3.2rem)] text-white mb-4"
        >
          Ready for Adventure?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.1rem] text-white/80 mb-10 leading-[1.75] max-w-[520px] mx-auto"
        >
          Join Sia, Milo and Arlo in their cosy meadow adventures —
          full of laughter, learning and lots and lots of love! 🌸
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="btn-base font-display text-[1rem] sm:text-[1.15rem] text-logo-blue px-6 sm:px-9 py-3 sm:py-4"
            style={{
              background: '#FFD040',
              boxShadow: '0 8px 24px rgba(255,208,64,0.4)',
            }}
          >
            ▶ Watch Now
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.06, y: -4, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.96 }}
            className="btn-base font-display text-[1rem] sm:text-[1.15rem] text-white px-6 sm:px-9 py-3 sm:py-4"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.4)',
            }}
          >
            🎮 Play Games
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
