'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Data (matches homepage design) ──────────────────────────── */

const VIDEOS = [
  { emoji:'🐰', title:"Sia's New Friend", dur:'3:24', grad:'linear-gradient(135deg,#FBD9E8,#F3C9DE)' },
  { emoji:'🍪', title:'Baking with Momo', dur:'2:48', grad:'linear-gradient(135deg,#F6E2C4,#E9CBA0)' },
  { emoji:'🌙', title:'Bedtime Story',    dur:'4:15', grad:'linear-gradient(135deg,#D8CCF2,#C0AEE8)' },
];

/* ── Small header used by each column ────────────────────────── */
function ColHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] text-[#57506A] leading-tight">
        {title}
      </h2>
      <Link href={href}
        className="inline-flex items-center gap-1.5 font-body font-semibold text-[0.78rem]
                   text-[#A88CFF] bg-white px-3.5 py-1.5 rounded-full shrink-0
                   shadow-[0_4px_16px_rgba(168,140,255,0.16)]
                   hover:shadow-[0_6px_20px_rgba(168,140,255,0.28)] transition-shadow">
        View All →
      </Link>
    </div>
  );
}

export default function PlayWatchBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section ref={ref} className="relative py-12 sm:py-16 px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg,#FFFFFF 0%,#F5F0FD 100%)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-7 items-start">

          {/* ════ Watch Videos ════ */}
          <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{delay:.1,duration:.6}}>
            <ColHeader title="Watch Videos" href="#adventures" />
            <div className="grid grid-cols-3 gap-3">
              {VIDEOS.map((v, i) => (
                <motion.div key={v.title}
                  initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
                  transition={{delay:0.14+i*0.08, duration:.5}}
                  className="group rounded-[18px] overflow-hidden cursor-pointer bg-white transition-all duration-300
                             hover:-translate-y-2 hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)]"
                  style={{ boxShadow:'0 6px 20px rgba(0,0,0,0.08)' }}>
                  <div className="relative flex items-center justify-center text-[2rem]"
                    style={{ background:v.grad, aspectRatio:'1/1' }}>
                    <span className="group-hover:scale-110 transition-transform duration-300">{v.emoji}</span>
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center"
                      style={{ background:'rgba(0,0,0,0.06)' }}>
                      <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[0.85rem]"
                        style={{ color:'#A88CFF', boxShadow:'0 4px 14px rgba(0,0,0,0.18)' }}>
                        ▶
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-1.5 right-1.5 bg-black/55 text-white rounded px-1.5 py-0.5
                                    text-[0.6rem] font-bold">
                      {v.dur}
                    </div>
                  </div>
                  <div className="px-2 py-2 text-center">
                    <div className="font-display text-[0.68rem] text-[#57506A] leading-tight line-clamp-2"
                      style={{ fontWeight:600 }}>
                      {v.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ════ Stay in the loop ════ */}
          <motion.div
            initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}}
            transition={{delay:.2, duration:.6}}
            className="relative overflow-hidden rounded-[28px] p-6 sm:p-7"
            style={{
              background:'linear-gradient(135deg,#FFE0EE 0%,#FFD3E6 100%)',
              boxShadow:'0 16px 48px rgba(255,157,196,0.22)',
            }}>
            {/* Floating hearts */}
            {[{t:'12%',l:'8%'},{t:'8%',r:'30%'},{t:'30%',r:'12%'}].map((h,i)=>(
              <div key={i} className="absolute text-[0.95rem] pointer-events-none"
                style={{ top:h.t, left:(h as any).l, right:(h as any).r, opacity:0.7,
                  animation:`float ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.6}s` }}>💗</div>
            ))}

            <h2 className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] text-[#C04D86] mb-2 leading-tight"
              style={{ fontWeight:700 }}>
              Stay in the loop!
            </h2>
            <p className="font-body text-[#A35E80] text-[0.86rem] leading-[1.55] mb-5 max-w-[230px]">
              Get updates on new stories, games, videos and cute surprises!
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full mb-2"
                style={{ background:'rgba(255,255,255,0.85)', color:'#C04D86' }}>
                <span>✓</span>
                <span className="font-display text-[0.82rem]" style={{fontWeight:700}}>You&apos;re in! 🐰</span>
              </div>
            ) : (
              <div className="flex gap-2 max-w-[300px]">
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full text-[0.82rem] outline-none"
                  style={{ background:'rgba(255,255,255,0.92)', color:'#57506A',
                    border:'1px solid rgba(255,255,255,0.9)' }}
                />
                <motion.button
                  whileHover={{scale:1.04}} whileTap={{scale:.96}}
                  onClick={() => email && setSubmitted(true)}
                  className="px-4 py-2.5 rounded-full font-display text-[0.82rem] text-white whitespace-nowrap shrink-0"
                  style={{ background:'linear-gradient(135deg,#FF86B5,#FF9DC4)',
                    boxShadow:'0 6px 18px rgba(255,134,181,0.4)', fontWeight:700 }}>
                  Subscribe
                </motion.button>
              </div>
            )}

            {/* Bunny with mailbox */}
            <div className="absolute bottom-0 right-2 w-[92px] h-[104px] pointer-events-none">
              <Image src="/images/sia-character.webp" alt="Sia with a mailbox"
                width={120} height={140} className="w-full h-full object-contain object-bottom"
                style={{ filter:'drop-shadow(0 8px 16px rgba(192,77,134,0.25))' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
