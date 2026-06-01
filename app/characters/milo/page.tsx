import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const STATS = [
  { label: 'Role',     value: "Sia's Mum",      emoji: '💛' },
  { label: 'Colour',   value: 'Sandy Caramel',  emoji: '🍯' },
  { label: 'Hobby',    value: 'Baking',          emoji: '🥕' },
  { label: 'Skill',    value: 'Best Hugs Ever',  emoji: '🤗' },
  { label: 'Garden',   value: 'Expert grower',   emoji: '🌸' },
  { label: 'Saying',   value: '"Home is warmth"', emoji: '🏠' },
];

const TRAITS = [
  { e: '🤗', t: 'Warm',     d: "Milo's hugs are the best in the whole meadow — Sia says so!" },
  { e: '🍪', t: 'Nurturing',d: 'She always knows when someone needs a biscuit and a kind word.' },
  { e: '🌱', t: 'Wise',     d: "Milo knows all the plants and flowers in the garden by name." },
  { e: '💛', t: 'Patient',  d: "No matter how many 'why?' questions Sia asks, Milo always answers." },
];

export default function MiloPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#FFF8E8 0%,#FFFBF4 100%)' }}>
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden shadow-[0_36px_88px_rgba(226,200,152,0.3)]">
                <Image src="/images/sia-milo.jpeg" alt="Milo" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 44, c: '#E2C898', top: '-15px', right: '14px',  d: '0s'   },
                { s: 30, c: '#FFB8C4', bottom: '28px', left: '-14px', d: '1.5s' },
                { s: 36, c: '#F5E088', top: '28%',   right: '-16px', d: '2s'   },
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
                               text-[#B07828] bg-[#B07828]/10 px-5 py-2 rounded-full mb-5 inline-block">
                💛 Sia&apos;s Mum
              </span>
              <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-4">
                Meet warm <span style={{ color: '#B07828' }}>Milo!</span>
              </h1>
              <p className="text-[1.1rem] leading-[1.9] text-text-mid mb-6">
                Milo is Sia&apos;s sandy-caramel mum who keeps the cottage warm and the garden blooming.
                Her carrot biscuits are famous throughout the whole meadow!
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
            style={{ background: '#FFF8E8', border: '2px solid #E2C89844' }}>
            <span className="text-3xl">🍪</span>
            <h3 className="font-display text-[1.3rem] text-text-deep mt-2 mb-2">Milo&apos;s Carrot Biscuits</h3>
            <p className="text-text-mid text-[.9rem] mb-4">The most famous recipe in all the meadow! Try making them at home.</p>
            <Link href="/#activities"
              className="inline-flex btn-sia text-white font-display text-[.9rem] px-6 py-3"
              style={{ background: 'linear-gradient(135deg,#B07828,#E2C040)' }}>
              Get the Recipe →
            </Link>
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: '#FFF8E8' }}>
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
              <Link href="/characters/arlo" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: '#B0B8C8' }}>
                  <Image src="/images/sia-arlo.jpeg" alt="Arlo" width={80} height={80}
                    className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-display text-[.95rem]" style={{ color: '#607080' }}>Dad Arlo</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
