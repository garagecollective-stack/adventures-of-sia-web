'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from '@/components/ui/TiltCard';

const TRAITS = [
  { label:'Curious',     emoji:'🔍', bg:'rgba(122,92,170,.12)', color:'#5A3E8A' },
  { label:'Brave',       emoji:'⚡', bg:'rgba(170,191,224,.3)', color:'#3A6A9A' },
  { label:'Joyful',      emoji:'🌟', bg:'rgba(245,224,136,.4)', color:'#806010' },
  { label:'Kind',        emoji:'💜', bg:'rgba(255,186,200,.3)', color:'#A0406A' },
  { label:'Adventurous', emoji:'🌍', bg:'rgba(168,216,196,.3)', color:'#307A5A' },
];

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren:.12 } },
};
const item = {
  hidden: { opacity:0, y:22 },
  show:   { opacity:1, y:0, transition:{ duration:.7, ease:[.22,1,.36,1] } },
};

export default function MeetSia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="meet-sia" ref={ref}
      className="relative py-12 sm:py-20 lg:py-28 px-4 sm:px-6 overflow-hidden"
      style={{ background:'#FFFBF4' }}
    >
      {/* Large soft background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                      rounded-full pointer-events-none opacity-40"
        style={{ background:'radial-gradient(circle,#EDE6F8 0%,transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* ── 3D CHARACTER CARD ── */}
        <motion.div className="relative flex justify-center"
          initial={{ opacity:0, x:-60 }} animate={inView?{opacity:1,x:0}:{}}
          transition={{ duration:.9, ease:[.22,1,.36,1] }}>

          <TiltCard className="group w-[min(420px,88vw)]" intensity={10}>
            {/* dreamy scene card (clipped) */}
            <div className="relative rounded-[40px] overflow-hidden aspect-square"
              style={{
                background:'linear-gradient(180deg,#BFE2FF 0%,#D9CCFF 46%,#FBDDEC 100%)',
                border:'6px solid #FFFFFF',
                boxShadow:'0 44px 90px rgba(122,92,170,.30), 0 12px 30px rgba(170,191,224,.35), inset 0 2px 10px rgba(255,255,255,.5)',
              }}>
              {/* moon glow */}
              <div className="absolute top-[9%] left-[13%] w-14 h-14 rounded-full"
                style={{ background:'radial-gradient(circle at 38% 38%,#FFF8D4,#FFE89A)', boxShadow:'0 0 34px rgba(255,232,154,.85)' }} />
              {/* clouds */}
              {[{t:'15%',l:'46%',s:1},{t:'30%',l:'9%',s:.7},{t:'24%',r:'7%',s:.85}].map((c,i)=>(
                <div key={i} className="absolute anim-float" style={{ top:c.t, left:(c as any).l, right:(c as any).r, transform:`scale(${c.s})`, animationDelay:`${i*.8}s` }}>
                  <div style={{ width:44, height:15, background:'rgba(255,255,255,.92)', borderRadius:999, boxShadow:'12px -6px 0 4px rgba(255,255,255,.92), -9px -3px 0 3px rgba(255,255,255,.92)' }} />
                </div>
              ))}
              {/* sparkles */}
              {[['19%','60%'],['68%','15%'],['57%','82%'],['36%','30%']].map(([t,l],i)=>(
                <span key={i} className="absolute text-white/85" style={{ top:t, left:l, fontSize: i%2?12:16, animation:`twinkle ${2+i%3}s ease-in-out infinite`, animationDelay:`${i*.5}s` }}>✦</span>
              ))}
              {/* rolling hills */}
              <div className="absolute bottom-0 left-0 right-0 h-[36%]">
                <div className="absolute bottom-0 -left-[12%] w-[72%] h-full rounded-[50%]" style={{ background:'linear-gradient(180deg,#C2EAC7,#9FD8A8)' }} />
                <div className="absolute bottom-0 -right-[14%] w-[74%] h-[86%] rounded-[50%]" style={{ background:'linear-gradient(180deg,#D2F1D3,#ABE0B0)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ background:'linear-gradient(180deg,#AADEB0,#8FCF98)' }} />
              </div>
              {/* glow halo behind bunny */}
              <div className="absolute left-1/2 bottom-[16%] -translate-x-1/2 w-[80%] h-[58%] rounded-full pointer-events-none"
                style={{ background:'radial-gradient(circle,rgba(255,255,255,.55) 0%,transparent 65%)', filter:'blur(6px)' }} />
              {/* ground shadow */}
              <div className="absolute left-1/2 bottom-[6%] -translate-x-1/2 w-[40%] h-[4.5%] rounded-full"
                style={{ background:'rgba(90,70,130,.24)', filter:'blur(7px)' }} />
            </div>

            {/* Sia — BIG, floating above the scene */}
            <div className="absolute inset-0 flex items-end justify-center pb-[4%] pointer-events-none z-20">
              <div className="h-[94%] anim-float" style={{ animationDelay:'.3s' }}>
                <Image src="/images/sia-meet.png" alt="Sia the bunny" width={538} height={928}
                  className="h-full w-auto" style={{ filter:'drop-shadow(0 16px 24px rgba(122,92,170,.42))' }} />
              </div>
            </div>

            {/* floating depth orbs */}
            {[{c:'#C8A8F0',t:'-16px',r:'12%',s:30},{c:'#F5E088',b:'20%',l:'-14px',s:24},{c:'#A8D8C4',t:'42%',r:'-12px',s:20},{c:'#FFBAC8',t:'9%',l:'-10px',s:16}].map((o,i)=>(
              <div key={i} className="absolute rounded-full anim-float z-30 hidden sm:block"
                style={{ width:o.s, height:o.s, background:o.c, top:(o as any).t, bottom:(o as any).b, left:(o as any).l, right:(o as any).r,
                  boxShadow:`0 6px 16px ${o.c}88, inset 0 -3px 6px rgba(0,0,0,.12)`, animationDelay:`${i*.6}s` }} />
            ))}
            <div className="absolute top-3 right-5 text-[1.2rem] z-30 anim-float" style={{ animationDelay:'1s' }}>✨</div>
          </TiltCard>
        </motion.div>

        {/* ── TEXT CONTENT ── */}
        <motion.div variants={stagger} initial="hidden" animate={inView?'show':'hidden'}
          transition={{ delayChildren:.3 }}>

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 font-display text-[.88rem] tracking-[.14em]
                             uppercase text-brand-violet bg-brand-violet/10 px-5 py-2 rounded-full mb-5">
              ✨ The Star of the Show
            </span>
          </motion.div>

          <motion.h2 variants={item}
            className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] text-text-deep leading-[1.1] mb-6">
            Hi! I&apos;m <span className="grad-violet">Sia!</span>
          </motion.h2>

          <motion.p variants={item}
            className="text-[1.08rem] leading-[1.9] text-text-mid mb-4">
            I&apos;m a curious little bunny who loves exploring my beautiful meadow world!
            With my sparkling violet eyes full of wonder, I turn every ordinary day into a
            magical adventure — a butterfly in the garden, a rainbow after rain, or a
            new friend just around the corner!
          </motion.p>

          <motion.p variants={item}
            className="text-[1.08rem] leading-[1.9] text-text-mid mb-8">
            I live in a cosy stone cottage with my warm mum{' '}
            <strong style={{color:'#B07828'}}>Milo</strong> and gentle dad{' '}
            <strong style={{color:'#607080'}}>Arlo</strong>, who make sure every adventure
            ends safely at home. 🏡
          </motion.p>

          {/* Trait badges — large, rounded, like Bluey */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            {TRAITS.map((t,i) => (
              <motion.span key={i}
                whileHover={{ scale:1.1, rotate:-2, y:-3 }}
                whileTap={{ scale:.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                           font-extrabold text-[.95rem] cursor-none"
                style={{ background:t.bg, color:t.color }}>
                <span className="text-lg">{t.emoji}</span> {t.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
