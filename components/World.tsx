'use client';

import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const WORLD_POMS = [
  { color: '#C8A8D8', size: 28, stem: 36 },
  { color: '#F0E0A0', size: 22, stem: 28 },
  { color: '#A8D8C4', size: 32, stem: 40 },
  { color: '#FFB8C4', size: 20, stem: 26 },
  { color: '#A8C8E0', size: 26, stem: 32 },
  { color: '#C8A8D8', size: 20, stem: 24 },
  { color: '#F0E0A0', size: 28, stem: 34 },
];

export default function World() {
  const ref        = useRef(null);
  const isInView   = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y          = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const scale      = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);

  return (
    <section
      id="world"
      ref={ref}
      className="relative py-16 sm:py-24 px-4 sm:px-5 text-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #D4E8C0 0%, #C0D8A8 45%, #DEDAD0 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
           style={{ background: 'linear-gradient(to bottom, #E8F4E0, transparent)' }} />

      {/* Floating sparkles */}
      {[
        { top: '15%', left: '8%',  delay: 0   },
        { top: '25%', right: '6%', delay: 1.2 },
        { top: '55%', left: '4%',  delay: 0.6 },
        { top: '70%', right: '9%', delay: 1.8 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-twinkle pointer-events-none"
          style={{ top: s.top, left: (s as any).left, right: (s as any).right, animationDelay: `${s.delay}s` }}
        >
          ✨
        </div>
      ))}

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-block font-display text-[0.9rem] tracking-widest uppercase
                         text-[#407A50] bg-[#407A50]/12 px-5 py-1.5 rounded-full mb-4">
          🌿 The Meadow
        </span>
        <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] text-text-deep mb-4">
          Sia&rsquo;s Beautiful <span className="gradient-text">World</span>
        </h2>
        <p className="max-w-[540px] mx-auto text-text-mid text-[1.05rem] leading-[1.8] mb-12">
          Tucked between rolling green hills and fields of colourful pom-pom flowers,
          Sia&rsquo;s cosy stone cottage is where every adventure begins and safely ends.
        </p>
      </motion.div>

      {/* House scene */}
      <motion.div
        style={{ y, scale }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[860px] mx-auto"
      >
        {/* Glow behind house */}
        <div className="absolute inset-[-5%] rounded-[50px] pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at center, rgba(138,184,144,0.35) 0%, transparent 70%)' }} />

        <Image
          src="/images/house.jpeg"
          alt="Sia's cosy house in the meadow"
          width={860}
          height={484}
          className="w-full h-auto rounded-[40px] shadow-house relative z-[2]"
        />

        {/* Inner glow overlay */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none z-[3]"
             style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
      </motion.div>

      {/* Pom flowers row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex justify-around max-w-[860px] mx-auto mt-[-10px] px-[6%]"
      >
        {WORLD_POMS.map((p, i) => (
          <div
            key={i}
            className={`pom-wrap ${i % 2 === 0 ? 'animate-pom-bob' : 'animate-pom-bob-alt'}`}
          >
            <div className="pom-head" style={{ width: p.size, height: p.size, background: p.color }} />
            <div className="pom-stem" style={{ height: p.stem, width: 3 }} />
          </div>
        ))}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
           style={{ background: 'linear-gradient(to top, #DEDAD0, transparent)' }} />
    </section>
  );
}
