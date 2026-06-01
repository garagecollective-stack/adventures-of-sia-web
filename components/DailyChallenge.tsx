'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

const CHALLENGES = [
  { emoji: '🎨', title: 'Colour a Picture!', desc: 'Draw and colour your favourite scene from Sia\'s meadow. Use as many colours as you can!', color: '#FFF0E8', accent: '#E8884A', action: 'Open Colouring Book', href: '/games/colouring' },
  { emoji: '🧠', title: 'Play Memory!',       desc: 'Can you find all the matching pairs? Challenge a friend to beat your time!',               color: '#EEF6FF', accent: '#2870A8', action: 'Play Memory Game',   href: '/games/memory'   },
  { emoji: '🌸', title: 'Make Pom Flowers!', desc: 'Ask a grown-up to help you make real pom-pom flowers just like the ones in Sia\'s garden!',  color: '#F8F0FC', accent: '#C8A8D8', action: 'See Instructions',   href: '#activities'     },
  { emoji: '🍪', title: 'Bake with Mum!',    desc: 'Make Milo\'s famous carrot biscuits today. They\'re delicious and easy to make!',            color: '#FFF8E8', accent: '#E2C040', action: 'Get the Recipe',     href: '#activities'     },
  { emoji: '🔍', title: 'Spot 5 Things!',    desc: 'Go outside and find 5 things that are in Sia\'s meadow: a flower, a bug, a leaf, a stone and a cloud!', color: '#F0FBF4', accent: '#8AB890', action: 'Spot the Difference', href: '/games/spot' },
  { emoji: '✏️', title: 'Draw Sia!',          desc: 'Follow the steps to draw your own picture of Sia. Remember — the floppy ears are her favourite part!', color: '#FFFBF4', accent: '#7A5CAA', action: 'Start Drawing',      href: '#activities'     },
  { emoji: '🌈', title: 'Rainbow Hunt!',     desc: 'Can you spot a rainbow today? If not, draw the most colourful rainbow you can imagine!',      color: '#F0EAFC', accent: '#9478C8', action: 'Colour a Rainbow',  href: '/games/colouring'},
];

function getTodayChallenge() {
  const day = new Date().getDay(); // 0-6
  return CHALLENGES[day % CHALLENGES.length];
}

export default function DailyChallenge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { play } = useSound();
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('sia-daily-done');
    return stored === new Date().toDateString();
  });

  const challenge = getTodayChallenge();

  const markDone = () => {
    localStorage.setItem('sia-daily-done', new Date().toDateString());
    setDone(true);
    play('win');
  };

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden"
      style={{ background: '#FFF8F0' }}>

      {/* Decorative pom */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#F5E088,transparent)' }} />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#C8A8D8,transparent)' }} />

      <motion.div className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .7 }}>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                           text-[#9A7010] bg-[#F5E088]/50 px-5 py-2 rounded-full mb-4">
            🌟 Today&apos;s Challenge
          </span>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep">
            Sia&apos;s Daily <span className="grad-violet">Adventure</span>
          </h2>
        </div>

        {/* Challenge card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative rounded-[32px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
          style={{ background: challenge.color }}>

          {/* Day badge */}
          <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="font-display text-[.8rem]" style={{ color: '#9A8AB0' }}>
              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]}
            </span>
          </div>

          <div className="p-6 sm:p-8 md:p-12 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            {/* Emoji */}
            <motion.div
              animate={{ rotate: [0,-5,5,-5,0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="w-20 h-20 sm:w-28 sm:h-28 rounded-[20px] sm:rounded-[28px] flex items-center justify-center text-[3rem] sm:text-[4rem]
                         shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex-shrink-0"
              style={{ background: 'white' }}>
              {challenge.emoji}
            </motion.div>

            <div className="text-center sm:text-left flex-1">
              <h3 className="font-display text-[1.8rem] text-text-deep mb-3">{challenge.title}</h3>
              <p className="text-[1rem] text-text-mid leading-[1.75] mb-6">{challenge.desc}</p>

              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {!done ? (
                  <>
                    <motion.a href={challenge.href}
                      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: .96 }}
                      onClick={() => play('click')}
                      className="btn-sia text-white font-display text-[.9rem] sm:text-[1rem] px-5 sm:px-7 py-2.5 sm:py-3"
                      style={{ background: `linear-gradient(135deg,${challenge.accent},${challenge.accent}CC)`, boxShadow: `0 8px 24px ${challenge.accent}55` }}>
                      {challenge.action} →
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: .96 }}
                      onClick={markDone}
                      className="btn-sia font-display text-[.9rem] sm:text-[1rem] px-5 sm:px-7 py-2.5 sm:py-3 border-2"
                      style={{ background: 'rgba(255,255,255,.7)', color: challenge.accent, borderColor: `${challenge.accent}44` }}>
                      ✓ Done!
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-center gap-3 px-7 py-3 rounded-full"
                    style={{ background: 'white', color: '#3A7850' }}>
                    <span className="text-2xl">🌟</span>
                    <span className="font-display text-[1rem]">Amazing! See you tomorrow!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Progress strip */}
          <div className="px-6 pb-5 sm:px-8 sm:pb-6 md:px-12">
            <div className="flex items-center gap-3">
              <span className="text-[.75rem] font-bold text-text-mid">This week</span>
              <div className="flex gap-2 flex-1">
                {['M','T','W','T','F','S','S'].map((d, i) => {
                  const today = new Date().getDay();
                  const dayIdx = i === 6 ? 0 : i + 1;
                  return (
                    <div key={i}
                      className="flex-1 h-2 rounded-full transition-all duration-500"
                      style={{
                        background: dayIdx < today ? challenge.accent
                          : dayIdx === today ? (done ? challenge.accent : `${challenge.accent}55`)
                          : 'rgba(0,0,0,0.08)'
                      }} />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
