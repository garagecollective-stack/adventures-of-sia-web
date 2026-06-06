'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  Brand palette (Adventures of Sia™)
  Cloud White  #FFF9F5   Dream Blue  #D8EDFF   Lavender  #DCCEFF
  Blush        #FFD7E5   Sunshine    #FFE9AB   Mint      #DDF7E4
  Peach        #FFE2D3   Sky         #B8E7FF   Lilac     #E8BDFF
  Text Dark    #57506A
*/

/* ── Trait SVG icons — all strokes/fills from brand palette ── */
function IconCurious() {
  // Sunshine tones
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <circle cx="14" cy="14" r="8" fill="#FFE9A8" stroke="#D4A800" strokeWidth="2.5"/>
      <circle cx="14" cy="14" r="4" fill="#D4A800" opacity="0.35"/>
      <line x1="20" y1="20" x2="27" y2="27" stroke="#D4A800" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}
function IconBrave() {
  // Sky tones
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <polygon points="16,3 19,13 30,13 21,20 24,30 16,23 8,30 11,20 2,13 13,13"
        fill="#B8E7FF" stroke="#4A9ED4" strokeWidth="2.2" strokeLinejoin="round"/>
      <polygon points="16,8 18,14 24,14 19,18 21,24 16,20 11,24 13,18 8,14 14,14"
        fill="#4A9ED4" opacity="0.4"/>
    </svg>
  );
}
function IconJoyful() {
  // Blush / pink tones
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill="#FFD7E5" stroke="#FF9DC4" strokeWidth="2.5"/>
      <circle cx="11.5" cy="14.5" r="2.2" fill="#FF9DC4"/>
      <circle cx="20.5" cy="14.5" r="2.2" fill="#FF9DC4"/>
      <path d="M10 19.5 Q16 26 22 19.5" stroke="#FF9DC4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* rosy cheeks */}
      <circle cx="9.5" cy="18" r="2.5" fill="#FFB8C8" opacity="0.5"/>
      <circle cx="22.5" cy="18" r="2.5" fill="#FFB8C8" opacity="0.5"/>
    </svg>
  );
}
function IconKind() {
  // Lavender / violet tones
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <path d="M16 27 C16 27 4 19 4 11.5 A6.5 6.5 0 0 1 16 8 A6.5 6.5 0 0 1 28 11.5 C28 19 16 27 16 27Z"
        fill="#DCCEFF" stroke="#A88CFF" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M16 23 C16 23 8 17 8 12.5 A4 4 0 0 1 16 11 A4 4 0 0 1 24 12.5 C24 17 16 23 16 23Z"
        fill="#A88CFF" opacity="0.35"/>
    </svg>
  );
}
function IconAdventurous() {
  // Mint / green tones
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" fill="#DDF7E4" stroke="#5AC87A" strokeWidth="2.5"/>
      <ellipse cx="16" cy="16" rx="5.5" ry="12" stroke="#5AC87A" strokeWidth="1.8"/>
      <line x1="4" y1="16" x2="28" y2="16" stroke="#5AC87A" strokeWidth="1.8"/>
      <path d="M7 10.5 Q16 14.5 25 10.5" stroke="#5AC87A" strokeWidth="1.5" fill="none"/>
      <path d="M7 21.5 Q16 17.5 25 21.5" stroke="#5AC87A" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

const TRAITS = [
  { label:'Curious',     Icon:IconCurious,     bg:'#FFE9A8', border:'#D4A800', color:'#7A5200' },
  { label:'Brave',       Icon:IconBrave,       bg:'#B8E7FF', border:'#4A9ED4', color:'#1A5A8A' },
  { label:'Joyful',      Icon:IconJoyful,      bg:'#FFD7E5', border:'#FF9DC4', color:'#AA2860' },
  { label:'Kind',        Icon:IconKind,        bg:'#DCCEFF', border:'#A88CFF', color:'#5A3E8A' },
  { label:'Adventurous', Icon:IconAdventurous, bg:'#DDF7E4', border:'#5AC87A', color:'#1A6A3A' },
];

/* small floating Sia chips — desktop only */
const FLOATIES = [
  { src:'/images/sia-character.webp', size:80, top:'7%',  left:'2%',  delay:'0s',   dur:'5s',   rotate:'-8deg' },
  { src:'/images/sia-meet.webp',      size:88, top:'9%',  right:'3%', delay:'0.8s', dur:'4.5s', rotate:'7deg'  },
  { src:'/images/sia-character.webp', size:68, top:'76%', left:'1%',  delay:'1.2s', dur:'5.5s', rotate:'10deg' },
  { src:'/images/sia-meet.webp',      size:74, top:'72%', right:'2%', delay:'0.4s', dur:'4.2s', rotate:'-6deg' },
];

export default function MeetSia() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section id="meet-sia" ref={ref}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background:'linear-gradient(175deg,#FFF9F5 0%,#D8EDFF 50%,#DCCEFF 100%)' }}
    >
      {/* ── Floating Sia chips (desktop) ── */}
      {FLOATIES.map((f, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none hidden lg:block"
          style={{
            top:f.top, left:(f as any).left, right:(f as any).right,
            width:f.size, height:f.size,
            borderRadius:'50%', overflow:'hidden',
            border:'3px solid #DCCEFF',
            boxShadow:'0 8px 24px rgba(168,140,255,0.22)',
            animation:`float ${f.dur} ease-in-out infinite`,
            animationDelay:f.delay,
            rotate:f.rotate,
          }}
          initial={{ opacity:0, scale:0.6 }}
          animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.6, delay:0.2+i*0.15 }}
        >
          <Image src={f.src} alt="Sia" width={f.size} height={f.size}
            className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
        </motion.div>
      ))}

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section badge ── */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity:0, y:-20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}>
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-display text-[1rem]"
            style={{
              background:'linear-gradient(135deg,#A88CFF,#FF9DC4)',
              color:'white',
              boxShadow:'0 6px 20px rgba(168,140,255,0.38)',
              letterSpacing:'0.04em',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Meet the Star of the Show!
          </div>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div className="text-center mb-10"
          initial={{ opacity:0, scale:0.85 }} animate={inView ? { opacity:1, scale:1 } : {}}
          transition={{ duration:0.7, delay:0.15, type:'spring', stiffness:160 }}>
          <h2 className="font-display leading-none"
            style={{ fontSize:'clamp(2.8rem,7vw,5rem)' }}>
            <span style={{ color:'#57506A' }}>Hi! I&apos;m </span>
            <span style={{
              background:'linear-gradient(135deg,#A88CFF 0%,#FF9DC4 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              filter:'drop-shadow(0 4px 16px rgba(168,140,255,0.3))',
            }}>Sia!</span>
          </h2>
        </motion.div>

        {/* ── Card + Text ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">

          {/* ── Scene card ── */}
          <motion.div className="flex justify-center"
            initial={{ opacity:0, x:-50 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.9, delay:0.2, ease:[0.22,1,0.36,1] }}>

            <div className="relative w-[min(380px,85vw)]">
              <div className="relative rounded-[40px] overflow-hidden"
                style={{
                  aspectRatio:'1/1',
                  background:'linear-gradient(180deg,#B8E7FF 0%,#DCCEFF 52%,#FFD7E5 100%)',
                  border:'5px solid #FFFFFF',
                  boxShadow:'0 24px 60px rgba(168,140,255,0.22), 0 6px 20px rgba(0,0,0,0.05)',
                }}>
                {/* Sun */}
                <div className="absolute top-[8%] right-[12%] w-16 h-16 rounded-full"
                  style={{ background:'radial-gradient(circle,#FFF9F5,#FFE9AB)', boxShadow:'0 0 36px rgba(255,233,171,0.9)' }} />
                {/* Clouds */}
                {[{ t:'12%',l:'8%',s:1 },{ t:'22%',r:'18%',s:0.75 }].map((c,i)=>(
                  <div key={i} className="absolute anim-float"
                    style={{ top:c.t, left:(c as any).l, right:(c as any).r, transform:`scale(${c.s})`, animationDelay:`${i*1.1}s` }}>
                    <div style={{ width:52, height:18, background:'rgba(255,255,255,0.96)', borderRadius:999,
                      boxShadow:'14px -8px 0 5px rgba(255,255,255,0.96), -10px -4px 0 4px rgba(255,255,255,0.96)' }} />
                  </div>
                ))}
                {/* Rainbow using brand accent colours */}
                <svg className="absolute" style={{ bottom:'30%',left:'5%',width:'40%',opacity:0.75 }} viewBox="0 0 100 50" fill="none">
                  {['#FF9DC4','#FFE9AB','#DDF7E4','#B8E7FF','#DCCEFF','#E8BDFF'].map((c,i)=>(
                    <path key={i} d={`M${5+i*4} 46 Q50 ${8+i*6} ${95-i*4} 46`}
                      stroke={c} strokeWidth="4" strokeLinecap="round" opacity="0.9"/>
                  ))}
                </svg>
                {/* Hills */}
                <div className="absolute bottom-0 left-0 right-0 h-[34%]">
                  <div className="absolute bottom-0 -left-[10%] w-[68%] h-full rounded-[50%]"
                    style={{ background:'linear-gradient(180deg,#DDF7E4,#A8E8B8)' }} />
                  <div className="absolute bottom-0 -right-[10%] w-[70%] h-[85%] rounded-[50%]"
                    style={{ background:'linear-gradient(180deg,#B8E8C0,#90D8A0)' }} />
                  <div className="absolute bottom-0 left-0 right-0 h-[38%]"
                    style={{ background:'linear-gradient(180deg,#A8E0B0,#84CC90)' }} />
                  {/* Pom flowers */}
                  {[[18,0,'#FFD7E5'],[72,0,'#DCCEFF'],[44,4,'#FFE9AB']].map(([l,b,c],i)=>(
                    <div key={i} className="absolute" style={{ left:`${l}%`, bottom:`${b}%` }}>
                      <div style={{ width:12, height:12, borderRadius:'50%', background:String(c), marginBottom:2 }} />
                      <div style={{ width:2, height:10, background:'#84CC90', borderRadius:2, margin:'0 auto' }} />
                    </div>
                  ))}
                </div>
                {/* Glow halo */}
                <div className="absolute left-1/2 bottom-[14%] -translate-x-1/2 w-[75%] h-[55%] rounded-full pointer-events-none"
                  style={{ background:'radial-gradient(circle,rgba(255,255,255,0.65) 0%,transparent 68%)', filter:'blur(8px)' }} />
              </div>

              {/* Sia floating above scene */}
              <div className="absolute inset-0 flex items-end justify-center pb-[3%] pointer-events-none z-20">
                <div className="h-[90%] anim-float" style={{ animationDelay:'0.4s' }}>
                  <Image src="/images/sia-meet.webp" alt="Sia the bunny"
                    width={538} height={928} className="h-full w-auto"
                    style={{ filter:'drop-shadow(0 12px 28px rgba(168,140,255,0.4))' }} />
                </div>
              </div>

              {/* Depth orbs — brand colours */}
              {[
                { c:'#DCCEFF', t:'-18px', r:'8%',   s:28 },
                { c:'#FFE9A8', b:'22%',   l:'-16px', s:22 },
                { c:'#DDF7E4', t:'38%',   r:'-14px', s:18 },
                { c:'#FFD7E5', t:'12%',   l:'-12px', s:14 },
              ].map((o,i)=>(
                <div key={i} className="absolute rounded-full anim-float hidden sm:block"
                  style={{
                    width:o.s, height:o.s, background:o.c,
                    top:(o as any).t, bottom:(o as any).b,
                    left:(o as any).l, right:(o as any).r,
                    boxShadow:`0 6px 14px ${o.c}99`, animationDelay:`${i*0.7}s`, zIndex:30,
                  }} />
              ))}
            </div>
          </motion.div>

          {/* ── Text content ── */}
          <motion.div
            initial={{ opacity:0, x:50 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.9, delay:0.3, ease:[0.22,1,0.36,1] }}>

            {/* Speech bubble */}
            <div className="relative mb-8">
              <div className="rounded-[28px] p-6 sm:p-8"
                style={{
                  background:'#FFF9F5',
                  border:'3px solid #DCCEFF',
                  boxShadow:'0 12px 40px rgba(168,140,255,0.10)',
                }}>
                {/* bubble tail */}
                <div className="absolute -left-4 top-8 hidden lg:block"
                  style={{
                    width:0, height:0,
                    borderTop:'12px solid transparent',
                    borderBottom:'12px solid transparent',
                    borderRight:'18px solid #FFF9F5',
                    filter:'drop-shadow(-3px 0 0 #DCCEFF)',
                  }} />
                <p className="font-body leading-[1.85] mb-4"
                  style={{ fontSize:'clamp(0.95rem,1.6vw,1.1rem)', color:'#57506A' }}>
                  I&apos;m a curious little bunny who loves exploring my beautiful meadow world!
                  With my sparkling violet eyes full of wonder, I turn every ordinary day into a
                  magical adventure — a butterfly in the garden, a rainbow after rain, or a
                  new friend just around the corner!
                </p>
                <p className="font-body leading-[1.85]"
                  style={{ fontSize:'clamp(0.95rem,1.6vw,1.1rem)', color:'#57506A' }}>
                  I live in a cosy stone cottage with my warm mum{' '}
                  <strong style={{ color:'#AA6800' }}>Milo</strong> and gentle dad{' '}
                  <strong style={{ color:'#3A6888' }}>Arlo</strong>, who make sure every
                  adventure ends safely at home.
                </p>
              </div>
            </div>

            {/* Trait label */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[60px] rounded-full" style={{ background:'linear-gradient(90deg,transparent,#A88CFF)' }} />
              <p className="font-display text-[1rem] sm:text-[1.1rem]" style={{ color:'#A88CFF', letterSpacing:'0.08em' }}>SIA IS</p>
              <div className="h-px flex-1 max-w-[60px] rounded-full" style={{ background:'linear-gradient(90deg,#A88CFF,transparent)' }} />
            </div>

            {/* Trait stickers */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {TRAITS.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, scale:0.6, rotate:-5 }}
                  animate={inView ? { opacity:1, scale:1, rotate:i%2===0 ? -2 : 2 } : {}}
                  transition={{ duration:0.5, delay:0.5+i*0.1, type:'spring', stiffness:200 }}
                  whileHover={{ scale:1.15, rotate:0, y:-4 }}
                  whileTap={{ scale:0.92 }}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-[20px] cursor-none"
                  style={{
                    background:t.bg,
                    border:`3px solid ${t.border}`,
                    padding:'12px 18px',
                    minWidth:'90px',
                    boxShadow:`0 6px 18px ${t.border}66`,
                  }}>
                  <t.Icon />
                  <span className="font-display text-[0.82rem] font-bold" style={{ color:t.color }}>
                    {t.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
