'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBadges } from '@/hooks/useBadges';
import { useSound } from '@/hooks/useSound';

const EPISODES = [
  {
    num: 'Episode 1',
    title: 'Sia and the Big Rainbow',
    desc: "After a gentle rain, Sia spots the most beautiful rainbow and sets off to find where it ends!",
    emoji: '🌈',
    gradient: 'linear-gradient(135deg, #C4DEFE 0%, #9ABFDF 100%)',
    accent: '#7A9BC8',
  },
  {
    num: 'Episode 2',
    title: "Milo's Baking Day",
    desc: "Mum is making carrot biscuits and Sia desperately wants to help but baking is trickier than it looks!",
    emoji: '🍪',
    gradient: 'linear-gradient(135deg, #F5ECD8 0%, #E0C490 100%)',
    accent: '#C8A050',
  },
  {
    num: 'Episode 3',
    title: 'The Blue Butterfly',
    desc: 'A beautiful blue butterfly leads Sia deep into the meadow on a magical, fluttering chase!',
    emoji: '🦋',
    gradient: 'linear-gradient(135deg, #DDD0EC 0%, #B8A8E0 100%)',
    accent: '#9070C0',
  },
  {
    num: 'Episode 4',
    title: "Arlo's Garden Secret",
    desc: "Dad has a hidden corner in the garden and today he's finally going to show Sia his greatest surprise!",
    emoji: '🌱',
    gradient: 'linear-gradient(135deg, #B8DEC8 0%, #7AAB88 100%)',
    accent: '#508870',
  },
  {
    num: 'Episode 5',
    title: 'Stargazing with Arlo',
    desc: 'On a clear night, Arlo takes Sia outside to count the stars and tells her the magical stories behind them.',
    emoji: '⭐',
    gradient: 'linear-gradient(135deg, #F8ECA0 0%, #E8C030 100%)',
    accent: '#C89828',
  },
  {
    num: 'Episode 6',
    title: 'The New Friend',
    desc: 'A shy little creature moves in near the old stone wall, and Sia is determined to welcome them with a gift!',
    emoji: '🎁',
    gradient: 'linear-gradient(135deg, #FFCEDE 0%, #F09ABE 100%)',
    accent: '#D07090',
  },
  {
    num: 'Episode 7',
    title: 'Puddle Day',
    desc: "It rained all night and now Sia's meadow has the best puddles in the whole world perfect for jumping!",
    emoji: '💧',
    gradient: 'linear-gradient(135deg, #C8EAF8 0%, #88C8E8 100%)',
    accent: '#4890C0',
  },
];

const WATCHED_KEY = 'sia-watched-episodes';

export default function Adventures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef(null);
  const isInView   = useInView(headerRef, { once: true, margin: '-80px' });
  const { earn } = useBadges();
  const { play } = useSound();
  const [watched, setWatched] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]') as number[];
      setWatched(new Set(stored));
    } catch {}
  }, []);

  const markWatched = (i: number) => {
    play('chime');
    setWatched(prev => {
      const next = new Set([...Array.from(prev), i]);
      localStorage.setItem(WATCHED_KEY, JSON.stringify(Array.from(next)));
      if (next.size >= 1) earn('adventurer');
      return next;
    });
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Only enable GSAP horizontal scroll on large screens
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const section = sectionRef.current;
        const track   = trackRef.current;
        if (!section || !track) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.abs(getScrollAmount())}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="adventures"
      ref={sectionRef}
      className="relative bg-brand-white lg:overflow-hidden"
    >
      {/* Header (visible at section top before pin kicks in) */}
      <div ref={headerRef} className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block font-display text-[0.9rem] tracking-widest uppercase
                           text-brand-violet bg-brand-violet/10 px-5 py-1.5 rounded-full mb-4">
            🎬 Episodes
          </span>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] text-text-deep mb-4">
            Latest <span className="gradient-text">Adventures</span>
          </h2>
          <p className="max-w-[480px] mx-auto text-text-mid text-[1.05rem] leading-[1.8] mb-4">
            Join Sia as she explores, learns and discovers something wonderful every single day!
          </p>
          {/* Watch progress */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-1.5">
              {EPISODES.map((_,i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{ background: watched.has(i) ? '#3A7850' : 'rgba(122,92,170,.2)' }} />
              ))}
            </div>
            <span className="text-[.82rem] font-bold text-text-mid">
              {watched.size}/{EPISODES.length} watched
            </span>
          </div>
          {/* Scroll hint visible before scrolling */}
          <motion.div className="flex items-center justify-center gap-2 mt-4 text-text-mid"
            animate={{ opacity: [.5, 1, .5] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="text-[.8rem] font-semibold">Scroll to see all episodes</span>
            <span className="anim-scroll-hint inline-block text-[1rem]">→</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal scroll track mobile: vertical wrap; desktop: GSAP horizontal */}
      <div
        ref={trackRef}
        className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-6 px-4 sm:px-6 lg:px-10 pb-8 lg:pb-16 w-full lg:w-max"
      >
        {EPISODES.map((ep, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -12, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            className="group flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[280px] lg:w-[296px] rounded-[28px] overflow-hidden bg-white
                       shadow-[0_8px_32px_rgba(122,92,170,0.1)] cursor-none"
          >
            {/* Thumbnail */}
            <div
              className="h-[190px] flex items-center justify-center relative text-[3.8rem] overflow-hidden"
              style={{ background: ep.gradient }}
            >
              <span className="group-hover:scale-125 transition-transform duration-500 relative z-[2]">
                {ep.emoji}
              </span>
              {/* Play button */}
              <motion.div
                whileHover={{ scale: 1.18 }}
                className="absolute bottom-3 right-3 w-12 h-12 bg-white rounded-full
                           flex items-center justify-center text-[0.9rem] font-black
                           shadow-lg z-[3]"
                style={{ color: ep.accent }}
              >
                ▶
              </motion.div>
              {/* Shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Info */}
            <div className="p-5 bg-white relative">
              <div
                className="text-[0.74rem] font-black tracking-[0.13em] uppercase mb-1.5"
                style={{ color: ep.accent }}
              >
                {ep.num}
              </div>
              <div className="font-display text-[1.22rem] text-text-deep mb-2">{ep.title}</div>
              <p className="text-[0.84rem] text-text-mid leading-[1.6]">{ep.desc}</p>

                {/* Progress bar teaser */}
              <div className="mt-3 h-[3px] bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: ep.accent }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: watched.has(i) ? '100%' : `${20 + i * 12}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* Watch button */}
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                onClick={() => markWatched(i)}
                className="mt-4 w-full py-2 rounded-full font-display text-[.82rem] transition-all duration-200"
                style={{
                  background: watched.has(i) ? '#A8D8C4' : `${ep.accent}22`,
                  color: watched.has(i) ? '#2A6040' : ep.accent,
                  border: `1.5px solid ${watched.has(i) ? '#A8D8C4' : `${ep.accent}44`}`,
                }}>
                {watched.has(i) ? '✓ Watched!' : '▶ Mark as Watched'}
              </motion.button>
            </div>

            {/* Watched badge overlay */}
            {watched.has(i) && (
              <div className="watched-badge">✓ Watched</div>
            )}
          </motion.div>
        ))}

        {/* Coming soon card */}
        <motion.div
          whileHover={{ y: -12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[280px] lg:w-[296px] rounded-[28px] border-2 border-dashed
                     border-brand-violet/25 flex flex-col items-center justify-center
                     p-10 text-center gap-4 cursor-none"
        >
          <div className="w-16 h-16 rounded-full bg-brand-violet/10 flex items-center justify-center
                          text-2xl animate-float">
            🌟
          </div>
          <h3 className="font-display text-[1.2rem] text-text-deep">More adventures coming soon!</h3>
          <p className="text-[0.85rem] text-text-mid leading-[1.6]">
            Sia is busy exploring new episodes drop every week!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
