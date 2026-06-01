'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useBadges } from '@/hooks/useBadges';
import { BadgeToast } from './Toast';
import Confetti from './Confetti';

export default function BadgeDisplay() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { badges, earnedCount, newBadge, clearNew } = useBadges();
  const [confetti, setConfetti] = useState(false);

  // Fire confetti whenever a new badge is earned
  const handleNewBadge = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 100); // brief trigger reset
    clearNew();
  };

  return (
    <>
      <BadgeToast badge={newBadge} onClose={handleNewBadge} />
      <Confetti trigger={confetti} />
      <section ref={ref} className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#F0EAFC 0%,#E8E0F8 100%)' }}>

        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle,#C8A8D8 0%,transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle,#A8D8C4 0%,transparent 70%)' }} />

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .7 }}>
          <span className="inline-block font-display text-[.88rem] tracking-[.14em] uppercase
                           text-brand-violet bg-brand-violet/10 px-5 py-2 rounded-full mb-4">
            🏆 Your Badges
          </span>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep mb-3">
            You&apos;ve earned <span className="grad-violet">{earnedCount}</span> of {badges.length} badges!
          </h2>
          <p className="text-text-mid text-[1rem] max-w-[440px] mx-auto">
            Play games, colour pictures and explore Sia&apos;s world to collect them all!
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: .3, duration: .6 }}>
          {badges.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, scale: .8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: .1 + i * .07, duration: .5, type: 'spring', stiffness: 200 }}
              className="relative flex flex-col items-center gap-2 p-5 rounded-[24px] text-center"
              style={{
                background: b.earned ? 'white' : 'rgba(255,255,255,0.4)',
                boxShadow: b.earned ? '0 8px 32px rgba(122,92,170,0.15)' : 'none',
                border: b.earned ? `2px solid ${b.bg}` : '2px solid rgba(122,92,170,0.12)',
                filter: b.earned ? 'none' : 'grayscale(0.7)',
                opacity: b.earned ? 1 : 0.55,
              }}>
              {b.earned && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5E088]
                             flex items-center justify-center text-xs shadow-sm">
                  ✓
                </motion.div>
              )}
              <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-[2rem]"
                style={{ background: b.earned ? b.bg : '#E8E0F8' }}>
                {b.earned ? b.emoji : '🔒'}
              </div>
              <div>
                <p className="font-display text-[.88rem]" style={{ color: b.earned ? '#4A3860' : '#9A8AB0' }}>
                  {b.name}
                </p>
                <p className="text-[.72rem] font-semibold" style={{ color: b.earned ? '#7A6890' : '#B0A0C0' }}>
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}
