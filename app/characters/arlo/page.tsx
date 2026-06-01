import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const STATS = [
  { label: 'Role',    value: "Sia's Dad",     emoji: '💙' },
  { label: 'Colour',  value: 'Slate Grey',    emoji: '🩶' },
  { label: 'Hobby',   value: 'Stargazing',    emoji: '🔭' },
  { label: 'Built',   value: 'The Treehouse', emoji: '🌳' },
  { label: 'Skill',   value: 'Storytelling',  emoji: '📖' },
  { label: 'Voice',   value: 'Deep & calm',   emoji: '🎶' },
];

const TRAITS = [
  { e: '🌿', t: 'Gentle',    d: "Arlo's calm, deep voice makes every bedtime story feel like a warm blanket." },
  { e: '🔭', t: 'Thoughtful',d: 'He knows the name of every star in the sky and loves to share them with Sia.' },
  { e: '🔨', t: 'Handy',     d: 'Arlo built the treehouse, the garden gate, and Sia\'s favourite swing.' },
  { e: '💙', t: 'Protective',d: "He's always nearby — never hovering, but always there when Sia needs him." },
];

export default function ArloPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#EEF4F8 0%,#FFFBF4 100%)' }}>
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden shadow-[0_36px_88px_rgba(176,184,200,0.3)]">
                <Image src="/images/sia-arlo.jpeg" alt="Arlo" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 44, c: '#B0B8C8', top: '-15px', right: '14px',  d: '0s'  },
                { s: 30, c: '#A8C8E0', bottom: '28px', left: '-14px', d: '1.5s' },
                { s: 36, c: '#C8A8D8', top: '28%',   right: '-16px', d: '2s'  },
              ].map((p, i) => (
                <div key={i} className="absolute rounded-full anim-float"
                  style={{ width: p.s, height: p.s, background: p.c, top: (p as any).top,
                           bottom: (p as any).bottom, left: (p as any).left, right: (p as any).right,
                           animationDelay: p.d, boxShadow: `0 6px 18px ${p.c}88`, zIndex: 3 }} />
              ))}
            </div>
            <div className="flex-1 text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-2 text-brand-violet font-bold
                                        text-[.9rem] mb-6 hover:opacity-70 transition-opacity">
                ← Back to Home
              </Link>
              <span className="block font-display text-[.88rem] tracking-[.14em] uppercase
                               text-[#607080] bg-[#607080]/10 px-5 py-2 rounded-full mb-5 inline-block">
                💙 Sia&apos;s Dad
              </span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-4">
                Meet gentle <span style={{ color: '#607080' }}>Arlo!</span>
              </h1>
              <p className="text-[1.1rem] leading-[1.9] text-text-mid mb-6">
                Arlo is Sia&apos;s slate-grey dad — the quiet, steady heart of the family.
                He knows every constellation, tells the best bedtime stories, and built the treehouse himself.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STATS.map((s, i) => (
                  <div key={i} className="p-3 rounded-[16px] text-center"
                    style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                    <span className="text-2xl block mb-1">{s.emoji}</span>
                    <span className="block text-[.68rem] font-black tracking-widest uppercase text-text-mid">{s.label}</span>
                    <span className="block font-display text-[.9rem] text-text-deep">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
            {TRAITS.map((t, i) => (
              <div key={i} className="p-6 rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <span className="text-4xl mb-3 block">{t.e}</span>
                <h3 className="font-display text-[1.2rem] text-text-deep mb-2">{t.t}</h3>
                <p className="text-[.88rem] text-text-mid leading-[1.7]">{t.d}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-8 p-6 rounded-[28px] text-center"
            style={{ background: '#EEF4F8', border: '2px solid #B0B8C844' }}>
            <span className="text-3xl">🔭</span>
            <h3 className="font-display text-[1.3rem] text-text-deep mt-2 mb-2">Arlo&apos;s Stargazing Spot</h3>
            <p className="text-text-mid text-[.9rem] mb-4">
              Every Friday night, Arlo and Sia climb up to the treehouse to watch the shooting stars.
            </p>
            <Link href="/characters/sia"
              className="inline-flex btn-sia text-white font-display text-[.9rem] px-6 py-3"
              style={{ background: 'linear-gradient(135deg,#607080,#AABFE0)' }}>
              Meet Sia →
            </Link>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: '#EEF4F8' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[1.8rem] text-text-deep mb-6">The Family</h2>
            <div className="flex justify-center gap-6">
              <Link href="/characters/sia" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: '#C8A8D8' }}>
                  <Image src="/images/sia-indoor.jpeg" alt="Sia" width={80} height={80}
                    className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-display text-[.95rem] text-brand-violet">Sia</span>
              </Link>
              <Link href="/characters/milo" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: '#E2C898' }}>
                  <Image src="/images/sia-milo.jpeg" alt="Milo" width={80} height={80}
                    className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-display text-[.95rem]" style={{ color: '#B07828' }}>Mum Milo</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
