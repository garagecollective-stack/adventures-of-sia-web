'use client';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const GAMES = [
  { href:'/games/memory',    emoji:'🧠', title:'Memory Match',  gradient:'linear-gradient(135deg,#C4DEFE,#9ABFDF)', accent:'#2870A8' },
  { href:'/games/colouring', emoji:'🎨', title:'Colour Sia!',   gradient:'linear-gradient(135deg,#FFD7E5,#DCCEFF)', accent:'#A88CFF' },
  { href:'/games/spot',      emoji:'🔍', title:'Spot It!',      gradient:'linear-gradient(135deg,#FFE9A8,#FFD7B8)', accent:'#C87020' },
  { href:'/games/puzzle',    emoji:'🧩', title:'Puzzle Fun',    gradient:'linear-gradient(135deg,#DDF7E4,#B8E7C4)', accent:'#3A7850' },
];

export default function FunGames() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-12 sm:py-16 px-4 sm:px-6"
      style={{ background: 'linear-gradient(180deg,#FFFFFF 0%,#F5F0FD 100%)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
            <span className="inline-block font-display text-[0.85rem] tracking-widest uppercase
                             text-[#A88CFF] bg-[#A88CFF]/10 px-4 py-1.5 rounded-full mb-2">
              🎮 Play
            </span>
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#57506A]">Fun Games</h2>
          </motion.div>
          <Link href="/games"
            className="font-display text-[0.85rem] text-[#A88CFF] hover:text-[#9375F2] transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GAMES.map((g, i) => (
            <motion.div key={g.href}
              initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}}
              transition={{delay:0.1+i*0.08,duration:.6}}>
              <Link href={g.href}
                className="block rounded-[24px] overflow-hidden transition-all duration-300
                           hover:-translate-y-3 hover:shadow-[0_16px_48px_rgba(168,140,255,0.2)]"
                style={{boxShadow:'0 4px 20px rgba(0,0,0,0.07)'}}>
                <div className="h-[100px] sm:h-[120px] flex items-center justify-center text-[2.2rem] sm:text-[3rem] relative"
                  style={{background:g.gradient}}>
                  <span>{g.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent"/>
                </div>
                <div className="p-2.5 sm:p-3 bg-white text-center">
                  <span className="font-display text-[0.85rem]" style={{color:g.accent}}>{g.title}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
