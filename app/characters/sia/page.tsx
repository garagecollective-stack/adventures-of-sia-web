import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const STATS = [
  { label: 'Age',       value: '4 years',      emoji: '🎂' },
  { label: 'Colour',    value: 'Violet',        emoji: '💜' },
  { label: 'Hobby',     value: 'Exploring',     emoji: '🔍' },
  { label: 'Snack',     value: 'Carrot biscuits', emoji: '🍪' },
  { label: 'BFF',       value: 'Luna the butterfly', emoji: '🦋' },
  { label: 'Bedtime',   value: '7:30 pm',       emoji: '🌙' },
];

const TRAITS = [
  { e: '🔍', t: 'Curious',    d: 'Sia loves to ask "why?" and discover new things every day.' },
  { e: '⚡', t: 'Brave',      d: "Even when she's a little scared, Sia faces her challenges head on." },
  { e: '🌟', t: 'Joyful',     d: 'Sia finds happiness in the smallest things — a rainbow, a ladybird, a hug.' },
  { e: '💜', t: 'Kind',       d: 'She always thinks about how others are feeling and tries to help.' },
  { e: '🌍', t: 'Adventurous',d: "No puddle is too big, no hill too high — Sia's always ready to explore!" },
];

const EPISODES = [
  { n: 1, title: 'The Big Rainbow',    desc: "Sia spots a rainbow and sets off to find where it ends!" },
  { n: 2, title: "Milo's Lost Recipe", desc: 'Mum has lost her famous biscuit recipe — can Sia find it?' },
  { n: 3, title: 'The Shy Butterfly',  desc: 'A new butterfly is too shy to come out. Sia knows just what to do.' },
  { n: 4, title: 'Stargazing with Arlo', desc: "Dad teaches Sia all about the stars from their treehouse." },
];

export default function SiaPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#EDE6F8 0%,#FFFBF4 100%)' }}>
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden shadow-[0_36px_88px_rgba(122,92,170,0.2)]"
                style={{ animationDelay: '.4s' }}>
                <Image src="/images/sia-outdoor.jpeg" alt="Sia" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 48, c: '#C8A8D8', top: '-18px', right: '12px',  d: '0s'   },
                { s: 34, c: '#F5E088', bottom: '30px', left: '-16px', d: '1.2s' },
                { s: 42, c: '#A8D8C4', top: '30%',   right: '-18px', d: '2.4s' },
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
                               text-brand-violet bg-brand-violet/10 px-5 py-2 rounded-full mb-5 inline-block">
                ✨ Meet the Star
              </span>
              <h1 className="font-display text-[clamp(2.8rem,5vw,4rem)] text-text-deep leading-[1.05] mb-4">
                Hi! I&apos;m <span style={{ background: 'linear-gradient(135deg,#7A5CAA,#9478C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sia!</span>
              </h1>
              <p className="text-[1.1rem] leading-[1.9] text-text-mid mb-6">
                I&apos;m a curious little bunny who loves exploring my beautiful meadow world!
                With my sparkling violet eyes, I turn every ordinary day into a magical adventure.
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

        {/* Traits */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep text-center mb-10">
              What makes Sia <span style={{ background: 'linear-gradient(135deg,#7A5CAA,#9478C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>special</span>?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRAITS.map((t, i) => (
                <div key={i} className="p-6 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  style={{ background: 'white' }}>
                  <span className="text-4xl mb-3 block">{t.e}</span>
                  <h3 className="font-display text-[1.2rem] text-text-deep mb-2">{t.t}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Episodes */}
        <section className="py-20 px-6" style={{ background: '#F0EAFC' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep text-center mb-10">
              Sia&apos;s Adventures
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {EPISODES.map(ep => (
                <div key={ep.n} className="p-6 rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                                          flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-violet/10 flex items-center justify-center
                                  font-display text-brand-violet text-[1.1rem] flex-shrink-0">
                    {ep.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.1rem] text-text-deep mb-1">{ep.title}</h3>
                    <p className="text-[.85rem] text-text-mid leading-[1.6]">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family links */}
        <section className="py-16 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-[1.8rem] text-text-deep mb-6">Sia&apos;s Family</h2>
            <div className="flex justify-center gap-6">
              <Link href="/characters/milo" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-md
                                transition-transform duration-300 group-hover:scale-110"
                  style={{ borderColor: '#E2C898' }}>
                  <Image src="/images/sia-milo.jpeg" alt="Milo" width={80} height={80}
                    className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-display text-[.95rem]" style={{ color: '#B07828' }}>Mum Milo</span>
              </Link>
              <Link href="/characters/arlo" className="flex flex-col items-center gap-2 group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-md
                                transition-transform duration-300 group-hover:scale-110"
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
