import Link from 'next/link';
import Navigation from './Navigation';
import Footer from './Footer';
import Cursor from './ui/Cursor';
import ScrollProgress from './ui/ScrollProgress';
import BackToTop from './BackToTop';

export default function PageShell({
  emoji, title, subtitle, children,
}: { emoji?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main>
        {/* header */}
        <header className="relative px-4 sm:px-6 pt-32 pb-12 sm:pb-16 text-center overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#EAF2FF 0%,#F0E8FF 55%,#FCE7F2 100%)' }}>
          {/* soft deco */}
          {[{ t: '20%', l: '8%', c: '#C8A8F0', s: 26 }, { t: '30%', r: '10%', c: '#FFBAC8', s: 20 }, { b: '14%', l: '14%', c: '#A8D8C4', s: 18 }].map((d, i) => (
            <div key={i} className="absolute rounded-full anim-float opacity-50 hidden sm:block"
              style={{ width: d.s, height: d.s, background: d.c, top: (d as any).t, bottom: (d as any).b, left: (d as any).l, right: (d as any).r, animationDelay: `${i * 0.7}s` }} />
          ))}
          {emoji && <div className="text-[3rem] mb-3 anim-float">{emoji}</div>}
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#57506A] leading-tight">{title}</h1>
          {subtitle && <p className="font-body text-[#8B86A0] text-[1rem] mt-3 max-w-[560px] mx-auto leading-relaxed">{subtitle}</p>}
        </header>

        {/* content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {children}
          <div className="mt-12 text-center">
            <Link href="/"
              className="inline-flex items-center gap-2 font-body font-semibold text-[0.9rem] text-white px-6 py-3 rounded-full"
              style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)', boxShadow: '0 8px 22px rgba(168,140,255,0.4)' }}>
              ← Back to adventures
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

/* small reusable card for content pages */
export function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] bg-white p-6 sm:p-7 mb-5"
      style={{ boxShadow: '0 10px 30px rgba(168,140,255,0.10)' }}>
      {children}
    </div>
  );
}
