import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

/* ── Stat icons ───────────────────────────────────────────────── */
function StatIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    role: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    colour: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
    hobby: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    skill: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    garden: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 9.5c1 5.56 6.14 7.5 8.5 8.5"/>
      </svg>
    ),
    saying: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.hobby}</>;
}

/* ── Trait icons ───────────────────────────────────────────────── */
function TraitIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    warm: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    nurturing: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    wise: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 9.5c1 5.56 6.14 7.5 8.5 8.5"/>
      </svg>
    ),
    patient: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.warm}</>;
}

const STATS = [
  { id: 'role',   label: 'Role',   value: "Sia's Mum"       },
  { id: 'colour', label: 'Colour', value: 'Sandy Caramel'   },
  { id: 'hobby',  label: 'Hobby',  value: 'Baking'          },
  { id: 'skill',  label: 'Skill',  value: 'Best Hugs Ever'  },
  { id: 'garden', label: 'Garden', value: 'Expert grower'   },
  { id: 'saying', label: 'Saying', value: '"Home is warmth"'},
];

const TRAITS = [
  { id: 'warm',      t: 'Warm',      d: "Milo's hugs are the best in the whole meadow — Sia says so!",              bg: 'linear-gradient(135deg,#E07848,#FFB898)' },
  { id: 'nurturing', t: 'Nurturing', d: 'She always knows when someone needs a biscuit and a kind word.',           bg: 'linear-gradient(135deg,#D4A800,#FFD97A)' },
  { id: 'wise',      t: 'Wise',      d: "Milo knows all the plants and flowers in the garden by name.",             bg: 'linear-gradient(135deg,#5AC87A,#A8E8C0)' },
  { id: 'patient',   t: 'Patient',   d: "No matter how many 'why?' questions Sia asks, Milo always answers.",      bg: 'linear-gradient(135deg,#B07828,#E2C040)' },
];

export default function MiloPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#FFF8E8 0%,#FFF5E0 40%,#FFFBF4 100%)' }}>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ width: 380, height: 380, top: '-8%', right: '-6%', background: 'radial-gradient(circle,rgba(226,200,152,0.2) 0%,transparent 70%)' }} />
            <div className="absolute rounded-full" style={{ width: 260, height: 260, bottom: '8%', left: '-4%', background: 'radial-gradient(circle,rgba(255,184,150,0.16) 0%,transparent 70%)' }} />
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* image */}
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden"
                style={{ boxShadow: '0 36px 88px rgba(226,200,152,0.3)', animationDelay: '.4s' }}>
                <Image src="/images/sia-milo.jpeg" alt="Milo" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 44, c: '#E2C898', top: '-15px', right: '14px',  d: '0s'   },
                { s: 30, c: '#FFB8C4', bottom: '28px', left: '-14px', d: '1.5s' },
                { s: 36, c: '#F5E088', top: '28%',   right: '-16px', d: '2s'   },
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
                style={{ color: '#B07828' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back to Home
              </Link>

              {/* badge */}
              <span className="inline-flex items-center gap-2 font-display text-[.82rem] tracking-[.14em] uppercase px-5 py-2 rounded-full mb-5"
                style={{ background: 'rgba(176,120,40,0.1)', border: '1.5px solid rgba(176,120,40,0.25)', color: '#B07828' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Sia&apos;s Mum
              </span>

              <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-4">
                Meet warm{' '}
                <span style={{ background: 'linear-gradient(135deg,#B07828,#D4A800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Milo!
                </span>
              </h1>
              <p className="text-[1.05rem] leading-[1.9] text-text-mid mb-8">
                Milo is Sia&apos;s sandy-caramel mum who keeps the cottage warm and the garden blooming.
                Her carrot biscuits are famous throughout the whole meadow!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-[18px] text-center flex flex-col items-center gap-2"
                    style={{ background: 'white', boxShadow: '0 2px 16px rgba(176,120,40,0.09)', border: '1.5px solid rgba(226,200,152,0.25)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(176,120,40,0.1)', color: '#B07828' }}>
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
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#B07828)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#B07828' }}>Character</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#B07828,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep">
                What makes Milo{' '}
                <span style={{ background: 'linear-gradient(135deg,#B07828,#D4A800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  special?
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {TRAITS.map((t) => (
                <div key={t.id} className="p-6 rounded-[24px] hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(226,200,152,0.2)' }}>
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                    style={{ background: t.bg, boxShadow: '0 6px 18px rgba(176,120,40,0.2)' }}>
                    <TraitIcon id={t.id} />
                  </div>
                  <h3 className="font-display text-[1.15rem] text-text-deep mb-2">{t.t}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{t.d}</p>
                </div>
              ))}
            </div>

            {/* Carrot Biscuits special section */}
            <div className="mt-8 p-8 rounded-[28px] text-center"
              style={{ background: 'linear-gradient(135deg,#FFF8E8,#FFF3D8)', border: '2px solid rgba(226,200,152,0.35)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg,#B07828,#E2C040)', boxShadow: '0 8px 24px rgba(176,120,40,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <h3 className="font-display text-[1.3rem] text-text-deep mb-2">Milo&apos;s Carrot Biscuits</h3>
              <p className="text-text-mid text-[.9rem] mb-6 max-w-md mx-auto">
                The most famous recipe in all the meadow! Try making them at home.
              </p>
              <Link href="/#activities"
                className="inline-flex btn-sia text-white font-display text-[.9rem] px-7 py-3 items-center gap-2"
                style={{ background: 'linear-gradient(135deg,#B07828,#E2C040)' }}>
                Get the Recipe
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Family ── */}
        <section className="py-16 px-6" style={{ background: '#FFF8E8' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#B07828)' }} />
              <h2 className="font-display text-[1.8rem] text-text-deep">The Family</h2>
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#B07828,transparent)' }} />
            </div>
            <div className="flex justify-center gap-8">
              <Link href="/characters/sia" className="flex flex-col items-center gap-3 group">
                <div className="rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 88, height: 88, border: '3px solid #C8A8D8', boxShadow: '0 8px 24px rgba(200,168,216,0.3)' }}>
                  <Image src="/images/sia-indoor.jpeg" alt="Sia" width={88} height={88}
                    className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                </div>
                <div>
                  <span className="block font-display text-[.95rem] text-brand-violet">Sia</span>
                  <span className="block font-body text-[.75rem] text-text-mid">The Star</span>
                </div>
              </Link>
              <Link href="/characters/arlo" className="flex flex-col items-center gap-3 group">
                <div className="rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 88, height: 88, border: '3px solid #B0B8C8', boxShadow: '0 8px 24px rgba(176,184,200,0.3)' }}>
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
