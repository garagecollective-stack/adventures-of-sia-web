'use client';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import TiltCard from '@/components/ui/TiltCard';

export default function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} className="relative py-12 sm:py-16 px-4 sm:px-6"
      style={{ background: 'linear-gradient(135deg,#E9E0FB 0%,#F3E6F4 50%,#FFE6EE 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
          transition={{duration:.7}}
          className="rounded-[32px] overflow-hidden relative"
          style={{
            background:'linear-gradient(150deg,#E7DCFF 0%,#EFE0F6 46%,#FCE2EC 78%,#E6F1E2 100%)',
            border:'1px solid rgba(255,255,255,0.8)',
            boxShadow:'0 18px 60px rgba(168,140,255,0.22)'
          }}>

          <div className="flex flex-col lg:flex-row items-center gap-6 p-5 sm:p-8 lg:p-10">

            {/* Text + form */}
            <div className="flex-1 text-center lg:text-left">
              <div className="text-[2rem] mb-3">💌</div>
              <h2 className="font-display text-[clamp(1.4rem,4vw,2.4rem)] text-[#57506A] mb-2">
                Stay in the Loop!
              </h2>
              <p className="text-[#8B86A0] text-[0.95rem] leading-[1.7] mb-6 max-w-[400px] mx-auto lg:mx-0">
                Get updates on new stories, games, and adventures delivered straight to your inbox!
              </p>

              {submitted ? (
                <motion.div initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                  style={{background:'#DDF7E4',color:'#3A7850'}}>
                  <span>✓</span>
                  <span className="font-display text-[0.9rem]">You&apos;re in! Welcome to Sia-land 🐰</span>
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto lg:mx-0">
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-5 py-3 rounded-full border-2 text-[0.85rem] sm:text-[0.9rem] outline-none transition-all duration-200"
                    style={{
                      borderColor:'rgba(168,140,255,0.3)',
                      color:'#57506A',
                      background:'rgba(255,255,255,0.9)'
                    }}
                    onFocus={e => e.target.style.borderColor='#A88CFF'}
                    onBlur={e => e.target.style.borderColor='rgba(168,140,255,0.3)'}
                  />
                  <motion.button
                    whileHover={{scale:1.04,y:-2}} whileTap={{scale:.96}}
                    onClick={() => email && setSubmitted(true)}
                    className="px-6 py-3 rounded-full font-display text-[0.9rem] text-white whitespace-nowrap"
                    style={{background:'linear-gradient(135deg,#A88CFF,#FF9DC4)',boxShadow:'0 6px 20px rgba(168,140,255,0.35)'}}>
                    Subscribe ✨
                  </motion.button>
                </div>
              )}

              <p className="text-[0.72rem] text-[#B9B4C9] mt-3">
                No spam, only magic. Unsubscribe any time. 💜
              </p>
            </div>

            {/* Right: Sia newsletter — 3D tilt card */}
            <motion.div
              initial={{opacity:0,x:30}} animate={inView?{opacity:1,x:0}:{}}
              transition={{duration:.8,delay:.3}}
              className="shrink-0 relative">
              <TiltCard className="group" intensity={12}>
                <div className="relative w-[min(270px,80vw)] rounded-[30px] overflow-hidden anim-float"
                  style={{ aspectRatio: '896 / 1152', border: '6px solid #fff',
                    boxShadow: '0 30px 64px rgba(168,140,255,0.36), 0 8px 22px rgba(170,191,224,0.32)',
                    animationDelay: '.6s' }}>
                  <Image src="/images/newsletter-card.png" alt="Sia holding a love letter by her mailbox"
                    fill sizes="270px" className="object-cover object-center" priority={false} />
                  {/* gentle top sheen */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 30% 12%, rgba(255,255,255,0.20) 0%, transparent 55%)' }} />
                </div>
              </TiltCard>
              {/* Floating hearts */}
              {[
                {top:'-10px',right:'6px',delay:'0s'},
                {top:'34%',left:'-16px',delay:'1s'},
                {bottom:'18px',right:'-12px',delay:'2s'},
              ].map((h,i) => (
                <div key={i} className="absolute text-lg anim-float pointer-events-none z-20"
                  style={{top:(h as any).top,left:(h as any).left,right:(h as any).right,
                          bottom:(h as any).bottom,animationDelay:h.delay}}>
                  💜
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
