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
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2v20M2 12h20"/>
      </svg>
    ),
    hobby: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="3"/><path d="M11 2v2M11 20v2M2 11h2M20 11h2"/><line x1="5.05" y1="5.05" x2="6.46" y2="6.46"/><line x1="15.54" y1="15.54" x2="16.95" y2="16.95"/><line x1="5.05" y1="16.95" x2="6.46" y2="15.54"/><line x1="15.54" y1="6.46" x2="16.95" y2="5.05"/>
      </svg>
    ),
    built: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    skill: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    voice: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.hobby}</>;
}

/* ── Trait icons ───────────────────────────────────────────────── */
function TraitIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    gentle: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 9.5c1 5.56 6.14 7.5 8.5 8.5"/>
      </svg>
    ),
    thoughtful: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    handy: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    protective: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  };
  return <>{icons[id] ?? icons.gentle}</>;
}

const STATS = [
  { id: 'role',   label: 'Role',   value: "Sia's Dad"    },
  { id: 'colour', label: 'Colour', value: 'Slate Grey'   },
  { id: 'hobby',  label: 'Hobby',  value: 'Stargazing'   },
  { id: 'built',  label: 'Built',  value: 'The Treehouse'},
  { id: 'skill',  label: 'Skill',  value: 'Storytelling' },
  { id: 'voice',  label: 'Voice',  value: 'Deep & calm'  },
];

const TRAITS = [
  { id: 'gentle',     t: 'Gentle',     d: "Arlo's calm, deep voice makes every bedtime story feel like a warm blanket.", bg: 'linear-gradient(135deg,#607080,#8BA0B8)' },
  { id: 'thoughtful', t: 'Thoughtful', d: 'He knows the name of every star in the sky and loves to share them with Sia.', bg: 'linear-gradient(135deg,#4A9ED4,#B8E7FF)' },
  { id: 'handy',      t: 'Handy',      d: "Arlo built the treehouse, the garden gate, and Sia's favourite swing.",        bg: 'linear-gradient(135deg,#5AC87A,#A8E8C0)' },
  { id: 'protective', t: 'Protective', d: "He's always nearby — never hovering, but always there when Sia needs him.",    bg: 'linear-gradient(135deg,#B0B8C8,#8890A8)' },
];

export default function ArloPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#EEF4F8 0%,#E8EFF6 40%,#FFFBF4 100%)' }}>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ width: 380, height: 380, top: '-8%', right: '-6%', background: 'radial-gradient(circle,rgba(96,112,128,0.12) 0%,transparent 70%)' }} />
            <div className="absolute rounded-full" style={{ width: 260, height: 260, bottom: '8%', left: '-4%', background: 'radial-gradient(circle,rgba(74,158,212,0.12) 0%,transparent 70%)' }} />
          </div>

          <div className="relative max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">

            {/* image */}
            <div className="relative flex-1 flex justify-center">
              <div className="relative anim-float rounded-[48px] overflow-hidden"
                style={{ boxShadow: '0 36px 88px rgba(176,184,200,0.3)', animationDelay: '.4s' }}>
                <Image src="/images/sia-arlo.jpeg" alt="Arlo" width={420} height={420}
                  className="w-full h-auto object-cover" style={{ maxWidth: 380 }} />
              </div>
              {[
                { s: 44, c: '#B0B8C8', top: '-15px', right: '14px',  d: '0s'  },
                { s: 30, c: '#A8C8E0', bottom: '28px', left: '-14px', d: '1.5s' },
                { s: 36, c: '#C8A8D8', top: '28%',   right: '-16px', d: '2s'  },
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
                style={{ color: '#607080' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Back to Home
              </Link>

              {/* badge */}
              <span className="inline-flex items-center gap-2 font-display text-[.82rem] tracking-[.14em] uppercase px-5 py-2 rounded-full mb-5"
                style={{ background: 'rgba(96,112,128,0.1)', border: '1.5px solid rgba(96,112,128,0.3)', color: '#607080' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Sia&apos;s Dad
              </span>

              <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-4">
                Meet gentle{' '}
                <span style={{ background: 'linear-gradient(135deg,#607080,#8BA0B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Arlo!
                </span>
              </h1>
              <p className="text-[1.05rem] leading-[1.9] text-text-mid mb-8">
                Arlo is Sia&apos;s slate-grey dad — the quiet, steady heart of the family.
                He knows every constellation, tells the best bedtime stories, and built the treehouse himself.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-[18px] text-center flex flex-col items-center gap-2"
                    style={{ background: 'white', boxShadow: '0 2px 16px rgba(96,112,128,0.09)', border: '1.5px solid rgba(96,112,128,0.1)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(96,112,128,0.1)', color: '#607080' }}>
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
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#607080)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#607080' }}>Character</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#607080,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] text-text-deep">
                What makes Arlo{' '}
                <span style={{ background: 'linear-gradient(135deg,#607080,#8BA0B8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  special?
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {TRAITS.map((t) => (
                <div key={t.id} className="p-6 rounded-[24px] hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(96,112,128,0.1)' }}>
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                    style={{ background: t.bg, boxShadow: '0 6px 18px rgba(96,112,128,0.2)' }}>
                    <TraitIcon id={t.id} />
                  </div>
                  <h3 className="font-display text-[1.15rem] text-text-deep mb-2">{t.t}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{t.d}</p>
                </div>
              ))}
            </div>

            {/* Stargazing special section */}
            <div className="mt-8 p-8 rounded-[28px] text-center"
              style={{ background: 'linear-gradient(135deg,#EEF4F8,#E0EBF4)', border: '2px solid rgba(176,184,200,0.3)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg,#607080,#8BA0B8)', boxShadow: '0 8px 24px rgba(96,112,128,0.3)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              </div>
              <h3 className="font-display text-[1.3rem] text-text-deep mb-2">Arlo&apos;s Stargazing Spot</h3>
              <p className="text-text-mid text-[.9rem] mb-6 max-w-md mx-auto">
                Every Friday night, Arlo and Sia climb up to the treehouse to watch the shooting stars.
              </p>
              <Link href="/characters/sia"
                className="inline-flex btn-sia text-white font-display text-[.9rem] px-7 py-3 items-center gap-2"
                style={{ background: 'linear-gradient(135deg,#607080,#AABFE0)' }}>
                Meet Sia
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Family ── */}
        <section className="py-16 px-6" style={{ background: '#EEF4F8' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#607080)' }} />
              <h2 className="font-display text-[1.8rem] text-text-deep">The Family</h2>
              <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#607080,transparent)' }} />
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
              <Link href="/characters/milo" className="flex flex-col items-center gap-3 group">
                <div className="rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110"
                  style={{ width: 88, height: 88, border: '3px solid #E2C898', boxShadow: '0 8px 24px rgba(226,200,152,0.3)' }}>
                  <Image src="/images/sia-milo.jpeg" alt="Milo" width={88} height={88}
                    className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
                </div>
                <div>
                  <span className="block font-display text-[.95rem]" style={{ color: '#B07828' }}>Milo</span>
                  <span className="block font-body text-[.75rem] text-text-mid">Sia&apos;s Mum</span>
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
