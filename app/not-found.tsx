import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/ui/Cursor';

export default function NotFound() {
  return (
    <>
      <Cursor />
      <Navigation />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#EBF6FF 0%,#CCE9FB 40%,#B8DAEF 68%,#C5D9AC 86%,#9EC688 100%)' }}>

        {/* Floating deco */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top:'12%', left:'8%',  s:36, c:'#C8A8D8', d:'0s'   },
            { top:'20%', right:'6%', s:28, c:'#F5E088', d:'1.2s' },
            { top:'60%', left:'5%',  s:22, c:'#A8D8C4', d:'2s'   },
            { top:'55%', right:'8%', s:32, c:'#FFB8C4', d:'.6s'  },
          ].map((p,i) => (
            <div key={i} className="absolute rounded-full anim-float opacity-50"
              style={{ width:p.s, height:p.s, background:p.c,
                       top:(p as any).top, left:(p as any).left, right:(p as any).right,
                       animationDelay:p.d }} />
          ))}
        </div>

        <div className="relative z-[2] max-w-lg">
          {/* Sia looking confused SVG */}
          <div className="mb-6 flex justify-center">
            <svg width="180" height="200" viewBox="0 0 180 200" fill="none" className="anim-float" style={{ animationDelay:'.3s' }}>
              {/* Body */}
              <ellipse cx="90" cy="155" rx="48" ry="52" fill="#F5F0F0"/>
              {/* Head */}
              <circle cx="90" cy="95" r="44" fill="#F5F0F0"/>
              {/* Ears */}
              <ellipse cx="68" cy="44" rx="14" ry="34" fill="#F5F0F0"/>
              <ellipse cx="112" cy="44" rx="14" ry="34" fill="#F5F0F0"/>
              <ellipse cx="68" cy="44" rx="8" ry="25" fill="#FFB8C4"/>
              <ellipse cx="112" cy="44" rx="8" ry="25" fill="#FFB8C4"/>
              {/* Eyes — confused squiggle */}
              <path d="M74 88 Q77 84 80 88" stroke="#7A5CAA" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <path d="M100 88 Q103 84 106 88" stroke="#7A5CAA" strokeWidth="3" strokeLinecap="round" fill="none"/>
              {/* Nose */}
              <ellipse cx="90" cy="99" rx="5" ry="4" fill="#FFB8C4"/>
              {/* Mouth — sad curve */}
              <path d="M81 110 Q90 106 99 110" stroke="#9A8AB0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              {/* Dress */}
              <path d="M58 148 Q90 133 122 148 L130 200 Q90 212 50 200 Z" fill="#C8A8D8"/>
              {/* Bow */}
              <path d="M83 136 Q90 127 97 136 Q90 144 83 136 Z" fill="#FFB8C4"/>
              {/* Question mark above head */}
              <text x="125" y="60" fontSize="28" fill="#7A5CAA" style={{fontFamily:'var(--font-fredoka), sans-serif', fontWeight:700}} opacity=".8">?</text>
            </svg>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[32px] px-8 py-10 shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
            <p className="font-display text-[1rem] tracking-[.14em] uppercase text-brand-violet mb-2">
              Oops! 404
            </p>
            <h1 className="font-display text-[2.4rem] text-text-deep leading-[1.1] mb-4">
              Sia can&apos;t find<br/>that page!
            </h1>
            <p className="text-text-mid text-[1rem] leading-[1.8] mb-8">
              She looked under every pom flower and behind every cloud, but this page
              seems to have wandered off into the meadow somewhere!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/"
                className="btn-sia text-white font-display text-[1rem] px-8 py-3.5 justify-center"
                style={{ background: 'linear-gradient(135deg,#2448A8,#7A5CAA)', boxShadow:'0 8px 24px rgba(36,72,168,.3)' }}>
                🏠 Back to Home
              </Link>
              <Link href="/games"
                className="btn-sia font-display text-[1rem] px-8 py-3.5 border-2 text-brand-violet justify-center"
                style={{ background:'rgba(255,255,255,.7)', borderColor:'rgba(122,92,170,.35)' }}>
                🎮 Play a Game
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
