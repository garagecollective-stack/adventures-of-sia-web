'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

/* ── Sparkle particles ────────────────────────────────── */
function SparkleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const COUNT = window.innerWidth < 768 ? 18 : 42;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const COLORS = ['#A88CFF','#FF9DC4','#FFE9A8','#B8E7FF','#FFFFFF'];
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 0.28, vy: -(Math.random() * 0.38 + 0.1),
      o: Math.random(), od: Math.random() > 0.5 ? 1 : -1, ts: 0.016,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        p.o += p.od * p.ts;
        if (p.o >= 1) { p.o = 1; p.od = -1; }
        if (p.o <= 0) { p.o = 0; p.od = 1; }
        if (p.y < -8) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width; }
        if (p.x < -8) p.x = canvas.width + 8;
        if (p.x > canvas.width + 8) p.x = -8;
        ctx.save();
        ctx.globalAlpha = p.o * 0.75;
        ctx.fillStyle = p.c;
        ctx.shadowBlur = 5; ctx.shadowColor = p.c;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const b = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
          if (i === 0) ctx.moveTo(p.x + p.r * Math.cos(a), p.y + p.r * Math.sin(a));
          else         ctx.lineTo(p.x + p.r * Math.cos(a), p.y + p.r * Math.sin(a));
          ctx.lineTo(p.x + p.r * 0.4 * Math.cos(b), p.y + p.r * 0.4 * Math.sin(b));
        }
        ctx.closePath(); ctx.fill(); ctx.restore();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-[4]" />;
}

/* ── Hero ─────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: '100svh', minHeight: '600px', maxHeight: '900px' }}
    >
      {/* ── Background image — full bleed ── */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        fill priority
        sizes="100vw"
        className="object-cover object-center z-[0]"
      />

      {/* Light overlay for text readability */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(90deg,rgba(255,245,250,0.62) 0%,rgba(240,230,255,0.28) 40%,rgba(200,220,255,0.05) 70%,transparent 100%)' }}
      />

      {/* Sparkles */}
      <SparkleCanvas />

      {/* Floating stars/hearts */}
      {[
        { top:'18%', left:'38%', content:'💜', dur:'5s', delay:'0s',   size:'1.1rem' },
        { top:'12%', left:'52%', content:'⭐', dur:'7s', delay:'1.2s', size:'0.9rem' },
        { top:'22%', left:'26%', content:'✨', dur:'6s', delay:'0.7s', size:'1rem'   },
      ].map((h, i) => (
        <div key={i} className="absolute pointer-events-none z-[5] hidden sm:block"
          style={{
            top: h.top, left: h.left, fontSize: h.size, opacity: 0.85,
            animation: `float ${h.dur} ease-in-out infinite`, animationDelay: h.delay,
          }}>
          {h.content}
        </div>
      ))}

      {/* ══ LAYOUT — Text left | Sia center-foreground | Card right ══ */}
      <div className="absolute inset-0 z-[10] flex items-end sm:items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-end sm:items-center justify-between
                        pb-6 sm:pb-0 gap-2 sm:gap-4"
          style={{ height: '100%' }}>

          {/* ── LEFT: Text block ── */}
          <motion.div
            initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:0.9, ease:[0.22,1,0.36,1], delay:0.3 }}
            className="flex-1 max-w-[420px] pb-8 sm:pb-0 z-[2]"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, delay:0.5 }}
              className="mb-1.5 sm:mb-2">
              <span className="inline-block font-body font-bold text-[0.68rem] sm:text-[0.74rem] tracking-wide
                               text-white px-3 py-1 rounded-full mb-2"
                style={{ background:'linear-gradient(135deg,#A88CFF,#FF9DC4)', boxShadow:'0 4px 12px rgba(168,140,255,0.35)' }}>
                🐰 For ages 2–8
              </span>
              <span style={{
                display:'block',
                fontFamily:'var(--font-fredoka), sans-serif', fontWeight:600,
                fontSize:'clamp(1.1rem, 2.2vw, 1.6rem)',
                color:'#6B5CA5', letterSpacing:'-0.01em',
              }}>
                Welcome to the
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.9, delay:0.65, ease:[0.22,1,0.36,1] }}
              className="font-display mb-4 sm:mb-5"
              style={{ lineHeight:1 }}
            >
              {/* Line 1 — Adventures of */}
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-fredoka), sans-serif',
                fontSize: 'clamp(1.8rem, 4.5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: '#57506A',
              }}>
                Adventures of
              </span>

              {/* Line 2 — Sia (visual focal point) */}
              <span className="sia-title" style={{
                display: 'block',
                fontSize: 'clamp(3.2rem, 8vw, 96px)',
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                background: 'linear-gradient(135deg,#A88CFF 0%,#FF9DC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 6px 24px rgba(168,140,255,0.28))',
              }}>
                Sia
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.85 }}
              className="mb-6 sm:mb-7"
              style={{
                fontFamily: 'var(--font-nunito), sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(0.95rem, 1.6vw, 22px)',
                lineHeight: 1.8,
                color: '#57506A',
                maxWidth: '550px',
              }}>
              Join Sia as she discovers magical places, makes new friends, and learns something new every day.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:1.0, type:'spring', stiffness:180 }}
              className="flex flex-wrap gap-3"
            >
              <motion.a href="#adventures"
                whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.97 }}
                onClick={e=>{ e.preventDefault(); document.getElementById('adventures')?.scrollIntoView({behavior:'smooth'}); }}
                className="btn-sia text-white inline-flex items-center gap-2"
                style={{
                  fontSize:'18px',
                  padding:'14px 28px',
                  background:'linear-gradient(135deg,#A88CFF,#FF9DC4)',
                  boxShadow:'0 8px 28px rgba(168,140,255,0.40)',
                }}>
                Explore Adventures ⭐
              </motion.a>
              <motion.a href="#meet-sia"
                whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.97 }}
                onClick={e=>{ e.preventDefault(); document.getElementById('meet-sia')?.scrollIntoView({behavior:'smooth'}); }}
                className="btn-sia inline-flex items-center gap-2 border-2"
                style={{
                  fontSize:'18px',
                  padding:'14px 28px',
                  background:'rgba(255,255,255,0.88)',
                  borderColor:'rgba(168,140,255,0.4)',
                  color:'#A88CFF', backdropFilter:'blur(12px)',
                }}>
                Meet Sia 💜
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── CENTER: Sia character — foreground, standing on bottom ── */}
          <motion.div
            initial={{ opacity:0, y:60, scale:0.85 }} animate={{ opacity:1, y:0, scale:1 }}
            transition={{ duration:1.1, ease:[0.22,1,0.36,1], delay:0.4 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[6] flex items-end justify-center
                       pointer-events-none"
            style={{ width:'clamp(240px,38vw,560px)' }}
          >
            {/* Glow halo */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
              style={{
                width:'140%', height:'50%', borderRadius:'50%',
                background:'radial-gradient(ellipse,rgba(200,168,255,0.35) 0%,transparent 70%)',
                filter:'blur(20px)',
              }}
            />
            {/* Ground shadow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width:'55%', height:'18px', borderRadius:'50%',
                background:'rgba(140,100,200,0.18)', filter:'blur(10px)',
              }}
            />

            <div className="relative anim-float w-full" style={{ animationDelay:'0.5s' }}>
              <Image
                src="/images/sia-character.png"
                alt="Sia the bunny — happy and waving"
                width={560} height={620} priority
                sizes="(max-width:640px) 55vw,(max-width:1024px) 38vw,520px"
                className="w-full h-auto"
                style={{
                  filter:'drop-shadow(0 20px 40px rgba(168,140,255,0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.08))',
                  marginBottom:'-4px',
                }}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Floating glass card ── */}
          <motion.div
            initial={{ opacity:0, x:40, y:20 }} animate={{ opacity:1, x:0, y:0 }}
            transition={{ duration:0.9, delay:1.3, ease:[0.22,1,0.36,1] }}
            className="hidden lg:block shrink-0 anim-float z-[2] mb-8 xl:mb-0"
            style={{ width:190, animationDelay:'1.8s' }}
          >
            <div className="rounded-[28px] p-5 text-left" style={{
              background:'rgba(255,255,255,0.82)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              border:'1.5px solid rgba(255,255,255,0.78)',
              boxShadow:'0 16px 48px rgba(168,140,255,0.2)',
            }}>
              <div className="font-display leading-snug mb-1.5"
                style={{color:'#57506A', fontSize:'15px', fontWeight:600}}>
                Every Day<br/>is an Adventure
              </div>
              <p className="font-body leading-[1.65] mb-4"
                style={{color:'#8B86A0', fontSize:'12px'}}>
                Learn, play, and grow with Sia.
              </p>
              <motion.button
                whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}
                onClick={() => document.getElementById('adventures')?.scrollIntoView({behavior:'smooth'})}
                className="w-full py-2.5 rounded-full font-body font-bold text-white
                           flex items-center justify-center gap-1.5"
                style={{ fontSize:'14px', background:'linear-gradient(135deg,#FF9DC4,#A88CFF)', boxShadow:'0 4px 14px rgba(168,140,255,0.35)' }}>
                Let&apos;s Go! →
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Pom flowers — bottom strip */}
      <div className="absolute bottom-0 left-0 w-full z-[7] pointer-events-none">
        <div className="w-full h-[80px] sm:h-[100px] relative overflow-hidden">
          {[
            {l:'1%',  c:'#C8A8D8',s:18,h:22},{l:'5%',  c:'#F0E0A0',s:14,h:17},
            {l:'10%', c:'#A8D8C4',s:20,h:25},{l:'15%', c:'#FFB8C4',s:12,h:14},
            {l:'20%', c:'#A8C8E0',s:16,h:20},{l:'26%', c:'#C8A8D8',s:10,h:11},
            {r:'1%',  c:'#A8C8E0',s:18,h:22},{r:'6%',  c:'#C8A8D8',s:13,h:16},
            {r:'11%', c:'#F0E0A0',s:20,h:24},{r:'16%', c:'#A8D8C4',s:12,h:14},
            {r:'21%', c:'#FFB8C4',s:16,h:20},
          ].map((p, i) => (
            <div key={i} className={`pom absolute bottom-2 ${i%2===0?'anim-pom':'anim-pom-alt'}`}
              style={{ left:(p as any).l, right:(p as any).r }}>
              <div className="pom-head" style={{ width:p.s, height:p.s, background:p.c }}/>
              <div className="pom-stem" style={{ height:p.h }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
