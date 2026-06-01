'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Scene Illustrations ─────────────────────────────────────── */

function BunnyPatchScene() {
  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#B8E7FF 0%,#D4F0E8 60%,#A8D8B8 100%)' }}>
      {/* Sun */}
      <div className="absolute" style={{ top:'10%', right:'16%', width:54, height:54,
        background:'radial-gradient(circle,#FFE44D,#FFC840)', borderRadius:'50%',
        boxShadow:'0 0 28px rgba(255,200,64,0.55)' }} />
      {/* Cloud */}
      <div style={{ position:'absolute', top:'18%', left:'8%', width:84, height:28,
        background:'rgba(255,255,255,0.92)', borderRadius:999,
        boxShadow:'22px -8px 0 12px rgba(255,255,255,0.92), -14px -4px 0 9px rgba(255,255,255,0.92)' }} />
      {/* House */}
      <div style={{ position:'absolute', bottom:'30%', left:'18%' }}>
        <div style={{ width:0, height:0, borderLeft:'38px solid transparent',
          borderRight:'38px solid transparent', borderBottom:'32px solid #FF9DC4', marginBottom:-2 }} />
        <div style={{ width:76, height:54, background:'#FFF5F0', borderRadius:'0 0 8px 8px', position:'relative' }}>
          <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
            width:22, height:32, background:'#C8A8D8', borderRadius:'6px 6px 0 0' }} />
          <div style={{ position:'absolute', top:10, left:8, width:14, height:14,
            background:'#B8E7FF', borderRadius:4, border:'2px solid #DCCEFF' }} />
          <div style={{ position:'absolute', top:10, right:8, width:14, height:14,
            background:'#B8E7FF', borderRadius:4, border:'2px solid #DCCEFF' }} />
        </div>
      </div>
      {/* Tree */}
      <div style={{ position:'absolute', bottom:'28%', right:'14%' }}>
        <div style={{ width:36, height:52, background:'#6CBF70', borderRadius:'50% 50% 30% 30%',
          marginBottom:-8, marginLeft:4, boxShadow:'inset -4px -4px 8px rgba(0,0,0,0.08)' }} />
        <div style={{ width:9, height:22, background:'#8B6A40', borderRadius:4, margin:'0 auto' }} />
      </div>
      {/* Flowers */}
      {['10%','32%','52%','74%','88%'].map((l,i) => (
        <div key={i} style={{ position:'absolute', bottom:'24%', left:l,
          fontSize: i%2===0 ? '1.2rem':'1rem',
          animation:`float ${3+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.6}s` }}>
          {['🌸','🌼','🌷','🌸','🌼'][i]}
        </div>
      ))}
      {/* Ground */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'26%',
        background:'linear-gradient(180deg,#A8D8B0 0%,#88C090 100%)',
        borderRadius:'60% 60% 0 0 / 18px' }} />
    </div>
  );
}

function RainbowMeadowScene() {
  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#FFE4F5 0%,#EDD8FF 45%,#D8F5E8 100%)' }}>
      {/* Rainbow arc */}
      <div style={{ position:'absolute', top:'12%', left:'50%', transform:'translateX(-50%)',
        width:240, height:120, borderRadius:'120px 120px 0 0', overflow:'hidden' }}>
        {[
          'rgba(255,100,100,0.55)', 'rgba(255,170,60,0.5)', 'rgba(255,230,60,0.5)',
          'rgba(100,220,130,0.5)', 'rgba(100,180,255,0.5)', 'rgba(168,140,255,0.5)',
        ].map((c,i) => (
          <div key={i} style={{ position:'absolute', inset: i*10, borderRadius:'inherit',
            border:`10px solid ${c}`, top:i*10, left:i*10, right:i*10, bottom:'50%' }} />
        ))}
      </div>
      {/* Butterflies */}
      {[{t:'22%',l:'12%'},{t:'30%',l:'70%'},{t:'14%',l:'52%'}].map((b,i)=>(
        <div key={i} style={{ position:'absolute', top:b.t, left:b.l, fontSize:'1.3rem',
          animation:`float ${3+i}s ease-in-out infinite`, animationDelay:`${i*0.8}s` }}>🦋</div>
      ))}
      {/* Ground */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'28%',
        background:'linear-gradient(180deg,#C8F0D8 0%,#A0D8C0 100%)',
        borderRadius:'55% 55% 0 0 / 18px' }} />
      {/* Flowers */}
      {['6%','22%','40%','58%','74%','90%'].map((l,i)=>(
        <div key={i} style={{ position:'absolute', bottom:'22%', left:l,
          fontSize: i%3===0?'1.3rem':'1rem' }}>
          {['🌸','🌺','🌼','🌷','🌻','🌸'][i]}
        </div>
      ))}
    </div>
  );
}

function CloudKingdomScene() {
  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#C8E8FF 0%,#DCF0FF 55%,#EEF8FF 100%)' }}>
      {/* Stars */}
      {[{t:'6%',l:'18%'},{t:'10%',l:'58%'},{t:'4%',l:'82%'},{t:'16%',l:'36%'}].map((s,i)=>(
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, fontSize:'0.9rem', opacity:0.85,
          animation:`twinkle ${2+i*0.5}s ease-in-out infinite` }}>⭐</div>
      ))}
      {/* Castle on cloud */}
      <div style={{ position:'absolute', top:'16%', left:'50%', transform:'translateX(-50%)' }}>
        {/* Cloud */}
        <div style={{ position:'relative', width:150, height:56, background:'rgba(255,255,255,0.96)',
          borderRadius:999, boxShadow:'0 8px 24px rgba(168,140,255,0.18)' }}>
          <div style={{ position:'absolute', top:-26, left:18, width:54, height:54,
            background:'white', borderRadius:'50%' }} />
          <div style={{ position:'absolute', top:-34, left:54, width:68, height:68,
            background:'white', borderRadius:'50%' }} />
          <div style={{ position:'absolute', top:-22, right:14, width:46, height:46,
            background:'white', borderRadius:'50%' }} />
          {/* Tower */}
          <div style={{ position:'absolute', top:-68, left:'50%', transform:'translateX(-50%)',
            width:30, height:50, background:'#DCCEFF', borderRadius:'4px 4px 0 0' }}>
            <div style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)',
              width:0, height:0, borderLeft:'18px solid transparent',
              borderRight:'18px solid transparent', borderBottom:'20px solid #A88CFF' }} />
            {/* Window */}
            <div style={{ position:'absolute', top:10, left:'50%', transform:'translateX(-50%)',
              width:10, height:14, background:'#B8E7FF', borderRadius:'5px 5px 0 0' }} />
          </div>
        </div>
      </div>
      {/* Floating clouds */}
      {[{t:'56%',l:'4%',w:78},{t:'62%',l:'66%',w:68},{t:'44%',l:'10%',w:58}].map((c,i)=>(
        <div key={i} style={{ position:'absolute', top:c.t, left:c.l, width:c.w, height:28,
          background:'rgba(255,255,255,0.82)', borderRadius:999,
          animation:`float ${5+i}s ease-in-out infinite`, animationDelay:`${i*1.2}s`,
          boxShadow:'0 4px 12px rgba(168,140,255,0.1)' }} />
      ))}
      {/* Ground */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'22%',
        background:'linear-gradient(180deg,rgba(255,255,255,0.88) 0%,rgba(220,206,255,0.7) 100%)',
        borderRadius:'55% 55% 0 0 / 18px' }} />
    </div>
  );
}

function MoonlightValleyScene() {
  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#0A0620 0%,#180E48 55%,#241470 100%)' }}>
      {/* Moon */}
      <div style={{ position:'absolute', top:'10%', right:'16%', width:68, height:68,
        background:'radial-gradient(circle at 38% 38%,#FFF8D0,#FFE070)',
        borderRadius:'50%',
        boxShadow:'0 0 40px rgba(255,220,100,0.6),0 0 80px rgba(255,190,60,0.25)' }}>
        {/* Moon craters */}
        <div style={{ position:'absolute', top:'25%', left:'30%', width:10, height:10,
          background:'rgba(255,200,60,0.4)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', top:'55%', left:'58%', width:7, height:7,
          background:'rgba(255,200,60,0.35)', borderRadius:'50%' }} />
      </div>
      {/* Stars */}
      {Array.from({length:20},(_,i)=>({
        t:`${5+(i*17)%52}%`, l:`${(i*23)%90}%`, s:i%4===0?'1rem':'0.65rem', o:0.5+((i*7)%5)*0.1
      })).map((s,i)=>(
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, fontSize:s.s,
          color:'#FFF8A0', opacity:s.o,
          animation:`twinkle ${2+i%4}s ease-in-out infinite`, animationDelay:`${(i*0.3)%2.5}s` }}>★</div>
      ))}
      {/* Hill silhouettes */}
      <div style={{ position:'absolute', bottom:'26%', left:0, right:0, height:78,
        background:'#100840', borderRadius:'60% 40% 0 0 / 38px' }} />
      <div style={{ position:'absolute', bottom:'23%', left:'-8%', width:'55%', height:88,
        background:'#150C50', borderRadius:'50% 50% 0 0' }} />
      <div style={{ position:'absolute', bottom:'21%', right:'-4%', width:'48%', height:76,
        background:'#0C0838', borderRadius:'50% 50% 0 0' }} />
      {/* Ground */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'23%',
        background:'linear-gradient(180deg,#1C1460 0%,#0A0830 100%)' }} />
      {/* Fireflies */}
      {[{t:'66%',l:'18%'},{t:'72%',l:'44%'},{t:'61%',l:'66%'},{t:'74%',l:'82%'},{t:'68%',l:'30%'}].map((f,i)=>(
        <div key={i} style={{ position:'absolute', top:f.t, left:f.l, width:5, height:5,
          background:'#A0FFB0', borderRadius:'50%',
          boxShadow:'0 0 8px #70FF88,0 0 16px rgba(140,255,160,0.5)',
          animation:`twinkle ${1.4+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.65}s` }} />
      ))}
      {/* Sleeping creature emoji */}
      <div style={{ position:'absolute', bottom:'24%', left:'46%', transform:'translateX(-50%)',
        fontSize:'1.6rem' }}>😴</div>
    </div>
  );
}

function StarHarborScene() {
  return (
    <div className="absolute inset-0 overflow-hidden"
      style={{ background:'linear-gradient(180deg,#FFF0D0 0%,#FFD890 18%,#B8E4FF 55%,#70B8DC 100%)' }}>
      {/* Stars */}
      {[{t:'5%',l:'12%'},{t:'8%',l:'42%'},{t:'4%',l:'72%'},{t:'11%',l:'88%'}].map((s,i)=>(
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, fontSize:'1rem',
          animation:`twinkle ${2+i*0.6}s ease-in-out infinite` }}>⭐</div>
      ))}
      {/* Lighthouse */}
      <div style={{ position:'absolute', bottom:'30%', right:'18%' }}>
        <div style={{ position:'absolute', bottom:'100%', left:'50%', transform:'translateX(-50%)',
          width:48, height:48, background:'radial-gradient(circle,rgba(255,230,80,0.9),transparent)',
          borderRadius:'50%', filter:'blur(10px)', marginBottom:-4 }} />
        <div style={{ width:26, height:74, background:'linear-gradient(180deg,#FF9DC4,#FFB8C8)',
          borderRadius:'4px 4px 0 0', position:'relative', overflow:'hidden' }}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{ position:'absolute', left:0, right:0, height:8,
              top:14+i*16, background:'rgba(255,255,255,0.45)' }} />
          ))}
          <div style={{ position:'absolute', top:-16, left:-4, width:34, height:18,
            background:'#FFE44D', borderRadius:'4px 4px 0 0',
            boxShadow:'0 0 18px rgba(255,220,0,0.9)' }} />
        </div>
        <div style={{ width:34, height:10, background:'#DCCEFF', borderRadius:'0 0 4px 4px' }} />
      </div>
      {/* Sailboat */}
      <div style={{ position:'absolute', bottom:'31%', left:'20%' }}>
        <div style={{ width:0, height:0, borderLeft:'14px solid transparent',
          borderRight:'14px solid transparent', borderBottom:'28px solid #FFE9A8', marginBottom:-2 }} />
        <div style={{ width:0, height:0, borderLeft:'10px solid transparent',
          borderRight:'10px solid transparent', borderBottom:'20px solid #DCCEFF',
          marginBottom:-2, marginLeft:4 }} />
        <div style={{ width:44, height:14, background:'#A88CFF', borderRadius:'0 0 22px 22px' }} />
      </div>
      {/* Ocean */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'30%',
        background:'linear-gradient(180deg,#7ABCE0 0%,#58A0C8 100%)' }}>
        <div style={{ position:'absolute', top:-10, left:0, right:0, height:22,
          background:'#8ECCE8', borderRadius:'50% 50% 0 0 / 12px' }} />
      </div>
      {/* Sparkles on water */}
      {[{t:'76%',l:'8%'},{t:'81%',l:'38%'},{t:'74%',l:'56%'},{t:'78%',l:'70%'}].map((s,i)=>(
        <div key={i} style={{ position:'absolute', top:s.t, left:s.l, fontSize:'0.75rem',
          animation:`twinkle ${1.5+i*0.5}s ease-in-out infinite` }}>✨</div>
      ))}
    </div>
  );
}

/* ── Latest Story scene (rainbow + castle + bunny) ───────────── */

function LatestStoryScene() {
  const rainbow = ['#FF9DB0','#FFC880','#FFE680','#9BE0A8','#8FC8F0','#C2A8F5'];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Castle silhouette */}
      <div style={{ position:'absolute', top:'14%', right:'9%', display:'flex',
        alignItems:'flex-end', gap:5, opacity:0.5 }}>
        {[{h:58,w:24},{h:84,w:30},{h:66,w:26},{h:96,w:30},{h:54,w:22}].map((t,i)=>(
          <div key={i} style={{ width:t.w, height:t.h, position:'relative',
            background:'linear-gradient(180deg,#CDBAF6,#AD93EC)', borderRadius:'6px 6px 0 0' }}>
            <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)',
              width:0, height:0, borderLeft:`${t.w/2}px solid transparent`,
              borderRight:`${t.w/2}px solid transparent`, borderBottom:'13px solid #9C82E0' }} />
            <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translateX(-50%)',
              width:7, height:11, background:'rgba(255,255,255,0.55)', borderRadius:'4px 4px 0 0' }} />
          </div>
        ))}
      </div>

      {/* Clouds */}
      {[{t:'20%',l:'8%',w:62},{t:'34%',r:'6%',w:50},{t:'12%',l:'40%',w:44}].map((c,i)=>(
        <div key={i} style={{ position:'absolute', top:c.t, left:(c as any).l, right:(c as any).r,
          width:c.w, height:20, background:'rgba(255,255,255,0.9)', borderRadius:999,
          boxShadow:'14px -6px 0 6px rgba(255,255,255,0.9), -10px -3px 0 5px rgba(255,255,255,0.9)',
          animation:`float ${5+i}s ease-in-out infinite`, animationDelay:`${i*0.8}s` }} />
      ))}

      {/* Butterfly */}
      <div style={{ position:'absolute', top:'16%', right:'20%', fontSize:'1.4rem',
        animation:'float 4s ease-in-out infinite' }}>🦋</div>
      {/* Sparkles */}
      <div style={{ position:'absolute', top:'30%', left:'14%', fontSize:'0.9rem',
        animation:'twinkle 2.4s ease-in-out infinite' }}>✨</div>
      <div style={{ position:'absolute', top:'46%', right:'12%', fontSize:'0.8rem',
        animation:'twinkle 3s ease-in-out infinite' }}>⭐</div>

      {/* Rainbow arc */}
      <div style={{ position:'absolute', bottom:'-34%', left:'50%', transform:'translateX(-50%)',
        width:360, height:180, borderRadius:'180px 180px 0 0', overflow:'hidden' }}>
        {rainbow.map((c,i)=>(
          <div key={i} style={{ position:'absolute', inset:i*9, borderRadius:'inherit',
            border:`9px solid ${c}`, borderBottom:'none' }} />
        ))}
      </div>

      {/* Bunny */}
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-48%)',
        width:168, height:196 }}>
        <Image src="/images/sia-character.png" alt="Sia on the rainbow bridge"
          width={220} height={250} className="w-full h-full object-contain"
          style={{ filter:'drop-shadow(0 10px 22px rgba(147,117,242,0.28))' }} />
      </div>
    </div>
  );
}

/* ── World data ──────────────────────────────────────────────── */

const WORLDS = [
  { id:'dream-forest',    name:'Dream Forest',    icon:'🌳', Scene:BunnyPatchScene,    desc:'A magical forest full of wonders.',        glow:'rgba(168,216,196,0.45)' },
  { id:'rainbow-meadow',  name:'Rainbow Meadow',  icon:'🌈', Scene:RainbowMeadowScene, desc:'A colorful meadow where friendships bloom.', glow:'rgba(255,157,196,0.45)' },
  { id:'cloud-kingdom',   name:'Cloud Kingdom',   icon:'☁️', Scene:CloudKingdomScene,  desc:'A dreamy kingdom above the clouds.',        glow:'rgba(168,210,255,0.5)'  },
  { id:'moonlight-valley',name:'Moonlight Valley',icon:'🌙', Scene:MoonlightValleyScene,desc:'A quiet valley under the moonlight.',       glow:'rgba(168,140,255,0.55)' },
  { id:'star-harbor',     name:'Star Harbor',     icon:'⭐', Scene:StarHarborScene,    desc:'Discover, explore and shine!',             glow:'rgba(255,220,140,0.5)'  },
];

/* ── Component ───────────────────────────────────────────────── */

export default function AdventureWorlds() {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section ref={ref} className="relative overflow-hidden py-16 sm:py-24"
      style={{ background:'linear-gradient(180deg,#FAFBFF 0%,#F4F0FD 100%)' }}>

      {/* Soft bg blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width:800, height:600,
          background:'radial-gradient(ellipse,rgba(168,140,255,0.07) 0%,transparent 70%)',
          filter:'blur(40px)' }} />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* ── Two-column band: Adventure Worlds | Latest Story ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-6 lg:gap-8 items-stretch">

          {/* ════ LEFT: Adventure Worlds ════ */}
          <div className="flex flex-col">
            {/* Header */}
            <motion.div className="flex items-end justify-between mb-5"
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
              <div>
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#57506A] leading-tight">
                  Adventure Worlds
                </h2>
                <p className="font-body text-[#8B86A0] text-[0.9rem] mt-1">
                  Explore magical places with Sia and friends.
                </p>
              </div>
              <Link href="#adventures"
                className="hidden sm:inline-flex items-center gap-1.5 font-body font-semibold text-[0.82rem]
                           text-[#A88CFF] bg-white px-4 py-2 rounded-full shrink-0
                           shadow-[0_4px_16px_rgba(168,140,255,0.16)]
                           hover:shadow-[0_6px_20px_rgba(168,140,255,0.28)] transition-shadow">
                View All →
              </Link>
            </motion.div>

            {/* World cards — 5-up grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 flex-1">
              {WORLDS.map((w, i) => (
                <motion.div key={w.id}
                  initial={{opacity:0,y:30,scale:0.94}} animate={inView?{opacity:1,y:0,scale:1}:{}}
                  transition={{delay:0.08+i*0.08, duration:0.55, ease:[0.22,1,0.36,1]}}
                  className="group cursor-pointer">
                  <motion.div
                    whileHover={{ y:-6 }} whileTap={{ scale:0.97 }}
                    transition={{ type:'spring', stiffness:320, damping:22 }}
                    className="relative overflow-hidden h-full bg-white"
                    style={{ borderRadius:24, boxShadow:'0 8px 24px rgba(168,140,255,0.12)' }}>

                    {/* Thumbnail */}
                    <div className="relative overflow-hidden" style={{ height:92, borderRadius:'24px 24px 0 0' }}>
                      <w.Scene />
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background:'linear-gradient(160deg,rgba(255,255,255,0.12) 0%,transparent 60%)' }} />
                    </div>

                    {/* Text */}
                    <div className="p-3">
                      <div className="font-display text-[0.82rem] text-[#57506A] leading-tight flex items-center gap-1"
                        style={{ fontWeight:700 }}>
                        <span className="text-[0.85rem]">{w.icon}</span>{w.name}
                      </div>
                      <p className="font-body text-[0.68rem] text-[#8B86A0] leading-snug mt-1">
                        {w.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT: Latest Story ════ */}
          <div className="flex flex-col">
            {/* Header */}
            <motion.div
              initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:0.2, duration:0.6}}
              className="flex items-end justify-between mb-5">
              <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#57506A] leading-tight">
                Latest Story
              </h2>
              <Link href="#stories"
                className="inline-flex items-center gap-1.5 font-body font-semibold text-[0.82rem]
                           text-[#A88CFF] bg-white px-4 py-2 rounded-full shrink-0
                           shadow-[0_4px_16px_rgba(168,140,255,0.16)]
                           hover:shadow-[0_6px_20px_rgba(168,140,255,0.28)] transition-shadow">
                View All →
              </Link>
            </motion.div>

            {/* Card */}
            <motion.div
              initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:0.28, duration:0.7, ease:[0.22,1,0.36,1]}}
              className="relative overflow-hidden flex-1 flex flex-col"
              style={{
                borderRadius:32,
                background:'linear-gradient(120deg,#FFE0EC 0%,#FBE2F2 36%,#ECDDFF 70%,#E0D4FF 100%)',
                border:'1px solid rgba(255,255,255,0.7)',
                boxShadow:'0 24px 64px rgba(168,140,255,0.16)',
              }}>

              <div className="relative flex-1 flex flex-row items-stretch">

                {/* Left: story content */}
                <div className="relative z-10 flex-1 p-6 sm:p-7 flex flex-col justify-center">
                  <span className="inline-flex w-fit items-center gap-1.5 font-body font-bold text-[0.7rem]
                                   px-3 py-1.5 rounded-full text-white mb-3.5"
                    style={{ background:'linear-gradient(135deg,#FF8FC0,#FF9DC4)',
                      boxShadow:'0 6px 18px rgba(255,143,192,0.35)' }}>
                    ✨ New Story!
                  </span>
                  <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] text-[#4A4263] mb-2.5 leading-[1.2]"
                    style={{ fontWeight:700 }}>
                    Sia and the<br/> Rainbow Bridge
                  </h3>
                  <p className="font-body text-[#7E789A] text-[0.9rem] leading-[1.55] mb-6 max-w-[220px]">
                    Sia helps her friends build a bridge of colors!
                  </p>
                  <motion.button
                    whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                    className="btn-sia text-white inline-flex w-fit items-center gap-2"
                    style={{ fontSize:'14px', padding:'11px 26px',
                      background:'linear-gradient(135deg,#A88CFF,#9375F2)',
                      boxShadow:'0 10px 28px rgba(147,117,242,0.4)' }}>
                    Read Now →
                  </motion.button>
                </div>

                {/* Right: rainbow + castle + bunny scene */}
                <div className="relative w-[42%] min-w-[150px] overflow-hidden">
                  <LatestStoryScene />
                </div>
              </div>

              {/* Pagination dots */}
              <div className="relative z-10 flex justify-center gap-2 pb-4 pt-1">
                {[0,1,2,3].map(i=>(
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{ width:i===0?22:8, height:8,
                      background:i===0?'linear-gradient(90deg,#A88CFF,#FF9DC4)':'rgba(168,140,255,0.25)' }} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
