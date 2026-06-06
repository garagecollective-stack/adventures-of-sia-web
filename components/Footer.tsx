'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label:'Adventures', href:'/#adventures' },
      { label:'Stories',    href:'/#adventures' },
      { label:'Games',      href:'/games'        },
      { label:'Videos',     href:'/#adventures' },
    ],
  },
  {
    title: 'About Sia',
    links: [
      { label:'Meet Sia',     href:'/characters/sia'  },
      { label:'Friends',      href:'/characters/sia'  },
      { label:'Gallery',      href:'/#meet-sia'        },
      { label:'For Parents',  href:'/parents'          },
    ],
  },
  {
    title: 'Support',
    links: [
      { label:'Help Center',     href:'/help'    },
      { label:'Privacy Policy',  href:'/privacy' },
      { label:'Terms of Use',    href:'/terms'   },
      { label:'Contact Us',      href:'/contact' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label:'Toys & Plushies', href:'/shop' },
      { label:'Books',           href:'/shop' },
      { label:'Accessories',     href:'/shop' },
      { label:'Coming Soon',     href:'/shop' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/adventuresofsiaofficial?igsh=MXh1MTJycTdpNXEweA==',
    bg: 'linear-gradient(135deg,#feda75 0%,#fa7e1e 28%,#d62976 58%,#962fbf 80%,#4f5bd5 100%)',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@adventuresofsia?si=4-I8MXHmXgUB2eRh',
    bg: 'linear-gradient(135deg,#ff3d3d 0%,#ff0000 100%)',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

/* ── Star decoration ─────────────────────────────────────────── */
const STARS = [
  {top:'8%',  left:'4%',   s:'1.1rem', delay:'0s',   dur:'3s'  },
  {top:'15%', left:'18%',  s:'0.75rem',delay:'1.2s',  dur:'4s'  },
  {top:'6%',  left:'35%',  s:'0.9rem', delay:'0.4s',  dur:'3.5s'},
  {top:'20%', left:'52%',  s:'0.65rem',delay:'2s',    dur:'5s'  },
  {top:'10%', left:'68%',  s:'1rem',   delay:'0.8s',  dur:'3.2s'},
  {top:'18%', left:'80%',  s:'0.7rem', delay:'1.5s',  dur:'4.2s'},
  {top:'5%',  left:'92%',  s:'0.9rem', delay:'0.2s',  dur:'3.8s'},
  {top:'30%', left:'8%',   s:'0.6rem', delay:'1.8s',  dur:'4.5s'},
  {top:'28%', left:'88%',  s:'0.75rem',delay:'0.6s',  dur:'3.6s'},
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden"
      style={{ background:'linear-gradient(180deg,#7C73A2 0%,#6C6594 52%,#5C5684 100%)' }}>

      {/* ── Cloud wave top edge ── */}
      <div className="w-full" style={{ marginTop:-2 }}>
        <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" style={{ display:'block', width:'100%', height:90 }}>
          <path d="
            M0 60
            Q60 20 120 50
            Q180 80 240 45
            Q300 10 360 40
            Q420 70 480 35
            Q540 0  600 30
            Q660 60 720 28
            Q780 0  840 32
            Q900 65 960 38
            Q1020 12 1080 42
            Q1140 72 1200 44
            Q1260 18 1320 48
            Q1380 78 1440 55
            L1440 0 L0 0 Z
          " fill="#F4F0FD"/>
        </svg>
      </div>

      {/* ── Floating star decorations — CSS diamonds ── */}
      {STARS.map((s,i) => (
        <div key={i} className="absolute pointer-events-none select-none rounded-[2px]"
          style={{ top:s.top, left:s.left,
            width: parseFloat(s.s) * 14, height: parseFloat(s.s) * 14,
            background:'rgba(255,255,255,0.85)',
            transform:'rotate(45deg)',
            opacity:0.55,
            animation:`twinkle ${s.dur} ease-in-out infinite`, animationDelay:s.delay,
          }} />
      ))}

      {/* ── Soft moon glow ── */}
      <div className="absolute top-[5%] right-[12%] pointer-events-none"
        style={{ width:180, height:180,
          background:'radial-gradient(circle,rgba(255,230,180,0.22) 0%,transparent 70%)',
          filter:'blur(30px)' }} />

      {/* ── Sleeping Sia bottom-right corner ── */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none hidden md:block z-0"
        style={{ width:'clamp(240px,26vw,380px)', aspectRatio:'896 / 1152',
          WebkitMaskImage:'linear-gradient(to bottom, transparent 0%, #000 38%), linear-gradient(to right, transparent 0%, #000 38%)',
          WebkitMaskComposite:'source-in',
          maskImage:'linear-gradient(to bottom, transparent 0%, #000 38%), linear-gradient(to right, transparent 0%, #000 38%)',
          maskComposite:'intersect' }}>
        <Image src="/images/footer-corner.webp" alt="Goodnight from Sia" fill sizes="380px"
          className="object-cover" style={{ objectPosition:'center center' }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-0">

        {/* ── Top: brand + columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2.2fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-10
                        pb-10 border-b border-white/20 mb-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="mb-5">
              <Link href="/" aria-label="Adventures of Sia home"
                className="inline-block hover:scale-105 transition-transform duration-300">
                <Image src="/images/logo-new.webp" alt="Adventures of Sia"
                  width={260} height={195} className="object-contain h-[74px] sm:h-[116px] w-auto"/>
              </Link>
            </div>
            <p className="font-body text-[0.88rem] leading-[1.75] text-white/75 max-w-[220px] mb-5">
              A magical world of wonder and discovery for curious little explorers.
            </p>
            <div className="flex gap-2 flex-wrap mb-6">
              {['Ages 2–8','Child Safe','Ad Free'].map(b => (
                <span key={b} className="font-body font-semibold text-[0.68rem] px-3 py-1.5 rounded-full"
                  style={{ background:'rgba(255,255,255,0.22)', color:'rgba(255,255,255,0.9)',
                    border:'1px solid rgba(255,255,255,0.3)' }}>
                  {b}
                </span>
              ))}
            </div>
            {/* Social icons */}
            <div className="flex gap-2.5 flex-wrap">
              {SOCIALS.map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.15, y:-5,
                    boxShadow:'0 10px 30px rgba(0,0,0,0.25)' }}
                  whileTap={{ scale:0.95 }}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-shadow duration-200"
                  style={{ background:s.bg, border:'1px solid rgba(255,255,255,0.45)' }}
                  title={s.label} aria-label={s.label}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.title}>
              <div className="font-display text-[1.05rem] text-white mb-4"
                style={{ fontWeight:700 }}>
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href}
                      className="font-body text-[0.88rem] font-medium text-white/70
                                 hover:text-white transition-colors duration-150">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8">
          <p className="font-body text-[0.78rem] text-white/60 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)" stroke="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span>
              © 2026 Adventures of Sia. All rights reserved. Made with care by{' '}
              <a href="https://garagecollective.agency" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-white/80 underline decoration-white/40 underline-offset-2
                           hover:text-white hover:decoration-white transition-colors">
                Garage Collective
              </a>.
            </span>
          </p>
          <div className="flex gap-5 text-[0.78rem]">
            {[{l:'Privacy',href:'/privacy'},{l:'Terms',href:'/terms'},{l:'Parents',href:'/parents'}].map(({l,href})=>(
              <Link key={l} href={href}
                className="font-body font-medium text-white/60 hover:text-white transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Firefly sparkles ── */}
      {[
        {bottom:'35%',left:'5%'}, {bottom:'50%',left:'25%'},
        {bottom:'40%',left:'48%'},{bottom:'55%',left:'62%'},
        {bottom:'38%',left:'38%'},
      ].map((f,i)=>(
        <div key={i} className="absolute pointer-events-none"
          style={{ bottom:f.bottom, left:f.left, width:4, height:4,
            background:'rgba(255,255,180,0.9)', borderRadius:'50%',
            boxShadow:'0 0 8px rgba(255,255,160,0.8)',
            animation:`twinkle ${1.8+i*0.6}s ease-in-out infinite`,
            animationDelay:`${i*0.7}s` }} />
      ))}
    </footer>
  );
}
