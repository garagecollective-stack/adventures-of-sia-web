'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';

const ACTIVITIES = [
  {
    title: 'Colour Sia!',
    desc: 'Download and colour your favourite picture of Sia in the meadow.',
    emoji: '🎨',
    bg: '#FFF0E8',
    accent: '#E8884A',
    tag: 'Colouring Sheet',
    tagBg: 'rgba(232,136,74,.15)',
    tagColor: '#B85820',
  },
  {
    title: "Milo's Carrot Biscuits",
    desc: "Make Milo's famous carrot biscuits with a grown-up. Delicious!",
    emoji: '🍪',
    bg: '#FFF8E8',
    accent: '#E2C040',
    tag: 'Recipe',
    tagBg: 'rgba(226,192,64,.18)',
    tagColor: '#9A7010',
  },
  {
    title: 'Pom Flower Craft',
    desc: "Create your own pom-pom flowers just like the ones in Sia's garden!",
    emoji: '🌸',
    bg: '#F8F0FC',
    accent: '#C8A8D8',
    tag: 'Craft',
    tagBg: 'rgba(200,168,216,.2)',
    tagColor: '#7A5CAA',
  },
  {
    title: "Spot the Difference",
    desc: 'Can you find all 8 differences between these two pictures of Sia?',
    emoji: '🔍',
    bg: '#EEF6FF',
    accent: '#88C0E8',
    tag: 'Puzzle',
    tagBg: 'rgba(136,192,232,.2)',
    tagColor: '#2870A8',
  },
  {
    title: 'Draw Sia!',
    desc: 'Follow our step-by-step guide and draw Sia yourself. Easy and fun!',
    emoji: '✏️',
    bg: '#F0FBF4',
    accent: '#8AB890',
    tag: 'How To Draw',
    tagBg: 'rgba(138,184,144,.2)',
    tagColor: '#3A7850',
  },
  {
    title: 'Sia Memory Game',
    desc: 'Print, cut out and play this matching card game with the whole family!',
    emoji: '🃏',
    bg: '#FFF3F6',
    accent: '#F0AABE',
    tag: 'Game',
    tagBg: 'rgba(240,170,190,.2)',
    tagColor: '#A03858',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: .1 } },
};
const card = {
  hidden: { opacity:0, y:40, scale:.95 },
  show:   { opacity:1, y:0,  scale:1, transition:{ duration:.7, ease:[.22,1,.36,1] } },
};

const ACTIVITY_HREFS = ['/games/colouring', '#activities', '#activities', '#activities', '/games/colouring', '/games/memory'];

export default function Activities() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const { play } = useSound();
  const { earn } = useBadges();
  const [modal, setModal] = useState<typeof ACTIVITIES[0] | null>(null);

  return (
    <section id="activities" ref={ref}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background:'#FFFBF4' }}
    >
      {/* Top wave from adventures */}
      <div className="wave-divider absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ height:80, display:'block', width:'100%' }}>
          <path d="M0 0 Q360 80 720 40 Q1080 0 1440 60 L1440 0 Z"
            fill="white" opacity=".4"/>
        </svg>
      </div>

      {/* Background decoration */}
      <div className="absolute top-20 right-[-80px] w-[300px] h-[300px] rounded-full pointer-events-none opacity-30"
        style={{ background:'radial-gradient(circle,#C8A8D8 0%,transparent 70%)' }} />
      <div className="absolute bottom-20 left-[-60px] w-[250px] h-[250px] rounded-full pointer-events-none opacity-25"
        style={{ background:'radial-gradient(circle,#A8D8C4 0%,transparent 70%)' }} />

      {/* Heading */}
      <motion.div className="text-center mb-14"
        initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}}
        transition={{ duration:.8, ease:[.22,1,.36,1] }}>
        <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                         text-[#3A7850] bg-[#3A7850]/12 px-5 py-2 rounded-full mb-4">
          ✏️ Make & Play
        </span>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-text-deep mb-4">
          Fun <span className="grad-violet">Activities</span>
        </h2>
        <p className="max-w-[500px] mx-auto text-text-mid text-[1.05rem] leading-[1.8]">
          Download, print and create! Colouring pages, crafts, recipes and games —
          all inspired by Sia&apos;s world.
        </p>
      </motion.div>

      {/* Activity cards grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {ACTIVITIES.map((a, i) => (
          <motion.div key={i} variants={card}>
            <motion.div
              whileHover={{ y:-10, rotate: i%2===0 ? -1 : 1 }}
              transition={{ type:'spring', stiffness:280, damping:22 }}
              className="activity-card overflow-hidden cursor-none group"
              style={{ background: a.bg }}
            >
              {/* Emoji area */}
              <div className="pt-8 pb-4 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-[28px] flex items-center justify-center text-5xl
                                shadow-[0_8px_32px_rgba(0,0,0,.08)] group-hover:scale-110
                                transition-transform duration-500"
                  style={{ background:'white' }}>
                  {a.emoji}
                </div>
              </div>

              {/* Info */}
              <div className="px-6 pb-7">
                <span className="inline-block text-[.72rem] font-black tracking-[.12em]
                                 uppercase rounded-full px-3 py-1.5 mb-3"
                  style={{ background:a.tagBg, color:a.tagColor }}>
                  {a.tag}
                </span>
                <h3 className="font-display text-[1.3rem] text-text-deep mb-2">{a.title}</h3>
                <p className="text-[.9rem] text-text-mid leading-[1.65] mb-5">{a.desc}</p>

                <motion.button
                  whileHover={{ scale:1.04, x:4 }} whileTap={{ scale:.97 }}
                  onClick={() => { play('chime'); earn('maker'); setModal(a); }}
                  className="inline-flex items-center gap-2 font-display text-[.9rem] px-5 py-2.5
                             rounded-full text-white btn-sia"
                  style={{ background:a.accent }}>
                  Download Free ↓
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Coming soon modal */}
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            style={{ background:'rgba(74,56,96,0.6)', backdropFilter:'blur(8px)' }}
            onClick={() => setModal(null)}>
            <motion.div
              initial={{ scale:.8, y:30 }} animate={{ scale:1, y:0 }} exit={{ scale:.8, y:30 }}
              transition={{ type:'spring', stiffness:280, damping:22 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl">
              <div className="w-20 h-20 rounded-[24px] mx-auto mb-4 flex items-center justify-center text-4xl"
                style={{ background: modal.tagBg }}>
                {modal.emoji}
              </div>
              <h3 className="font-display text-[1.4rem] text-text-deep mb-2">{modal.title}</h3>
              <p className="text-text-mid text-[.9rem] leading-[1.7] mb-5">
                This printable is coming very soon! While we finish it, try the interactive
                Colouring Book — it&apos;s ready now! 🎨
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/games/colouring" onClick={() => setModal(null)}
                  className="btn-sia text-white font-display text-[.9rem] px-6 py-3"
                  style={{ background:`linear-gradient(135deg,${modal.accent},${modal.accent}BB)` }}>
                  🎨 Colour Now
                </Link>
                <button onClick={() => setModal(null)}
                  className="btn-sia font-display text-[.9rem] px-6 py-3 border-2 text-brand-violet"
                  style={{ background:'rgba(122,92,170,.08)', borderColor:'rgba(122,92,170,.25)' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All activities link */}
      <motion.div className="text-center mt-12"
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
        transition={{ delay:.6, duration:.7 }}>
        <motion.button
          whileHover={{ scale:1.04, y:-3 }} whileTap={{ scale:.97 }}
          className="btn-sia font-display text-[1.05rem] px-8 py-4 text-brand-violet"
          style={{ background:'rgba(122,92,170,.1)', border:'2px solid rgba(122,92,170,.25)' }}>
          See All Activities →
        </motion.button>
      </motion.div>
    </section>
  );
}
