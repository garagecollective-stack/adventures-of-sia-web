import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

/* ── Stat icon map ──────────────────────────────────────────────── */
function StatIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    age: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    colour: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    hobby: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    snack: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    bff: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    bedtime: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.hobby}</>;
}

/* ── Trait icon map ──────────────────────────────────────────────── */
function TraitIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    curious: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    brave: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    joyful: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    kind: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    adventurous: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.curious}</>;
}

const STATS = [
  { id: 'age',     label: 'Age',     value: '4 years'          },
  { id: 'colour',  label: 'Colour',  value: 'Violet'           },
  { id: 'hobby',   label: 'Hobby',   value: 'Exploring'        },
  { id: 'snack',   label: 'Snack',   value: 'Carrot biscuits'  },
  { id: 'bff',     label: 'BFF',     value: 'Luna the butterfly'},
  { id: 'bedtime', label: 'Bedtime', value: '7:30 pm'          },
];

const TRAITS = [
  { id: 'curious',     t: 'Curious',     d: 'Sia loves to ask "why?" and discover new things every day.',                       bg: 'linear-gradient(135deg,#A88CFF,#C9B8FF)' },
  { id: 'brave',       t: 'Brave',       d: "Even when she's a little scared, Sia faces her challenges head on.",               bg: 'linear-gradient(135deg,#FF9DC4,#FFB8D8)' },
  { id: 'joyful',      t: 'Joyful',      d: 'Sia finds happiness in the smallest things — a rainbow, a ladybird, a hug.',       bg: 'linear-gradient(135deg,#FFD97A,#FFE9A8)' },
  { id: 'kind',        t: 'Kind',        d: 'She always thinks about how others are feeling and tries to help.',                 bg: 'linear-gradient(135deg,#FF9DC4,#A88CFF)' },
  { id: 'adventurous', t: 'Adventurous', d: "No puddle is too big, no hill too high — Sia's always ready to explore!",          bg: 'linear-gradient(135deg,#5AC87A,#A8E8C0)' },
];

const EPISODES = [
  { n: 1, title: 'The Big Rainbow',     desc: "Sia spots a rainbow and sets off to find where it ends!"            },
  { n: 2, title: "Milo's Lost Recipe",  desc: 'Mum has lost her famous biscuit recipe — can Sia find it?'         },
  { n: 3, title: 'The Shy Butterfly',   desc: 'A new butterfly is too shy to come out. Sia knows just what to do.' },
  { n: 4, title: 'Stargazing with Arlo',desc: "Dad teaches Sia all about the stars from their treehouse."          },
];

export default function SiaPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#F0EAFC 0%,#EDE6F8 40%,#FFFBF4 100%)' }}>

          {/* background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ width: 380, height: 380, top: '-8%', right: '-6%', background: 'radial-gradient(circle,rgba(168,140,255,0.18) 0%,transparent 70%)' }} />
            <div className="absolute rounded-full" style={{ width: 260, height: 260, bottom: '8%', left: '-4%', background: 'radial-gradient(circle,rgba(255,157,196,0.14) 0%,transparent 70%)' }} />
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* image */}
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden"
                style={{ boxShadow: '0 36px 88px rgba(122,92,170,0.22)', animationDelay: '.4s' }}>
                <Image src="/images/sia-outdoor.jpeg" alt="Sia" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 48, c: '#C8A8D8', top: '-18px', right: '12px',  d: '0s'   },
                { s: 34, c: '#F5E088', bottom: '30px', left: '-16px', d: '1.2s' },
                { s: 42, c: '#A8D8C4', top: '30%',   right: '-18px', d: '2.4s' },
              ].map((p, i) => (
                <div key={i} className="absolute rounded-full anim-float"
                  style={{ width: p.s, height: p.s, background: p.c,
                           top: (p as any).top, bottom: (p as any).bottom,
                           left: (p as any).left, right: (p as any).right,
                           animationDelay: p.d, boxShadow: `0 6px 18px ${p.c}88`, zIndex: 3 }} />
              ))}
            </div>

            {/* text */}
            <div className="flex-1 text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-2 font-bold text-[.9rem] mb-6 hover:opacity-70 transition-opacity"
                style={{ color: '#7A5CAA' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back to Home
              </Link>

              {/* badge */}
              <span className="inline-flex items-center gap-2 font-display text-[.82rem] tracking-[.14em] uppercase px-5 py-2 rounded-full mb-5"
                style={{ background: 'rgba(168,140,255,0.15)', border: '1.5px solid rgba(168,140,255,0.4)', color: '#7A5CAA' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Meet the Star
              </span>

              <h1 className="font-display text-[clamp(2.8rem,5vw,4rem)] text-text-deep leading-[1.05] mb-4">
                Hi! I&apos;m{' '}
                <span style={{ background: 'linear-gradient(135deg,#7A5CAA,#9478C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Sia!
                </span>
              </h1>
              <p className="text-[1.05rem] leading-[1.9] text-text-mid mb-8">
                I&apos;m a curious little bunny who loves exploring my beautiful meadow world!
                With my sparkling violet eyes, I turn every ordinary day into a magical adventure.
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-[18px] text-center flex flex-col items-center gap-2"
                    style={{ background: 'white', boxShadow: '0 2px 16px rgba(122,92,170,0.09)', border: '1.5px solid rgba(168,140,255,0.12)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#A88CFF22,#C9B8FF44)', color: '#7A5CAA' }}>
                      <StatIcon id={s.id} />
                    </div>
                    <div>
                      <span className="block text-[.62rem] font-black tracking-widest uppercase text-text-mid">{s.label}</span>
                      <span className="block font-display text-[.88rem] text-text-deep leading-tight">{s.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Traits ── */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-4xl mx-auto">

            {/* section heading */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#A88CFF)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#A88CFF' }}>Character</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#A88CFF,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep">
                What makes Sia{' '}
                <span style={{ background: 'linear-gradient(135deg,#7A5CAA,#9478C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  special?
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRAITS.map((t) => (
                <div key={t.id} className="p-6 rounded-[24px] group hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(168,140,255,0.1)' }}>
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4 flex-shrink-0"
                    style={{ background: t.bg, boxShadow: '0 6px 18px rgba(168,140,255,0.25)' }}>
                    <TraitIcon id={t.id} />
                  </div>
                  <h3 className="font-display text-[1.15rem] text-text-deep mb-2">{t.t}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Episodes ── */}
        <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg,#F0EAFC 0%,#EDE6F8 100%)' }}>
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#A88CFF)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#A88CFF' }}>Stories</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#A88CFF,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep">
                Sia&apos;s Adventures
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {EPISODES.map(ep => (
                <div key={ep.n} className="p-6 rounded-[24px] bg-white flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(122,92,170,0.08)', border: '1.5px solid rgba(168,140,255,0.12)' }}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-display text-white text-[1rem] flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#A88CFF,#9478C8)', boxShadow: '0 4px 14px rgba(168,140,255,0.35)' }}>
                    {ep.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.05rem] text-text-deep mb-1">{ep.title}</h3>
                    <p className="text-[.85rem] text-text-mid leading-[1.6]">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Family links ── */}
        <section className="py-16 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#A88CFF)' }} />
              <h2 className="font-display text-[1.8rem] text-text-deep">Sia&apos;s Family</h2>
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#A88CFF,transparent)' }} />
            </div>
            <div className="flex justify-center gap-8">
              <Link href="/characters/milo" className="flex flex-col items-center gap-3 group">
                <div className="w-22 h-22 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 88, height: 88, border: '3px solid #E2C898', boxShadow: '0 8px 24px rgba(226,200,152,0.35)' }}>
                  <Image src="/images/sia-milo.jpeg" alt="Milo" width={88} height={88}
                    className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                </div>
                <div>
                  <span className="block font-display text-[.95rem]" style={{ color: '#B07828' }}>Milo</span>
                  <span className="block font-body text-[.75rem] text-text-mid">Sia&apos;s Mum</span>
                </div>
              </Link>
              <Link href="/characters/arlo" className="flex flex-col items-center gap-3 group">
                <div className="w-22 h-22 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 88, height: 88, border: '3px solid #B0B8C8', boxShadow: '0 8px 24px rgba(176,184,200,0.35)' }}>
                  <Image src="/images/sia-arlo.jpeg" alt="Arlo" width={88} height={88}
                    className="w-full h-full object-cover" style={{ objectPosition: 'center 25%' }} />
                </div>
                <div>
                  <span className="block font-display text-[.95rem]" style={{ color: '#607080' }}>Arlo</span>
                  <span className="block font-body text-[.75rem] text-text-mid">Sia&apos;s Dad</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
