import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';

const VALUES = [
  {
    title: 'Emotional Intelligence',
    desc: 'Each episode helps children understand and name their feelings — curiosity, fear, joy, and kindness.',
    bg: 'linear-gradient(135deg,#A88CFF,#C9B8FF)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Love of Nature',
    desc: "Sia's meadow world encourages children to look for beauty in the natural world around them.",
    bg: 'linear-gradient(135deg,#5AC87A,#A8E8C0)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 22"/><path d="M9.5 9.5c1 5.56 6.14 7.5 8.5 8.5"/>
      </svg>
    ),
  },
  {
    title: 'Family Bonds',
    desc: 'Milo and Arlo model warm, patient parenting — showing that home is always a safe place to return to.',
    bg: 'linear-gradient(135deg,#E07848,#FFB898)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Curiosity & Learning',
    desc: "Sia's 'why?' questions model a growth mindset and celebrate not knowing as the start of discovery.",
    bg: 'linear-gradient(135deg,#4A9ED4,#B8E7FF)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    title: 'Gentle Bravery',
    desc: "Challenges are met with gentle courage — showing children that brave doesn't mean fearless.",
    bg: 'linear-gradient(135deg,#FF9DC4,#FFB8D8)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Kindness to Others',
    desc: 'Sia always considers how her actions affect others — a core thread woven through every story.',
    bg: 'linear-gradient(135deg,#FFD97A,#FFE9A8)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const EPISODES = [
  { ep: 'S1 E1', title: 'The Big Rainbow',     age: '2–6', themes: ['Wonder', 'Patience'], desc: "Sia chases a rainbow and learns that some things are worth waiting for." },
  { ep: 'S1 E2', title: "Milo's Lost Recipe",  age: '3–6', themes: ['Helping', 'Memory'],  desc: "Helping Mum find her recipe teaches Sia about teamwork and attention to detail." },
  { ep: 'S1 E3', title: 'The Shy Butterfly',   age: '2–5', themes: ['Empathy', 'Patience'],desc: "Sia learns that kindness and patience are the best ways to make a new friend." },
  { ep: 'S1 E4', title: 'Stargazing with Arlo',age: '3–6', themes: ['Wonder', 'Family'],   desc: "A bedtime stargazing session with Dad turns into a lesson about the vastness of the universe." },
];

const ACTIVITIES_GUIDE = [
  {
    a: 'Colouring', desc: 'Fine motor skills, colour recognition, creative expression',
    bg: 'rgba(168,140,255,0.12)', color: '#7A5CAA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
  {
    a: 'Baking', desc: 'Following instructions, maths (measuring), sensory play',
    bg: 'rgba(176,120,40,0.12)', color: '#B07828',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  {
    a: 'Pom Crafts', desc: 'Fine motor skills, textures, colour matching',
    bg: 'rgba(255,157,196,0.12)', color: '#C05880',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    a: 'Drawing', desc: 'Observation, shape recognition, self-expression',
    bg: 'rgba(74,158,212,0.12)', color: '#4A9ED4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
      </svg>
    ),
  },
  {
    a: 'Spot & Find', desc: 'Visual discrimination, concentration, problem-solving',
    bg: 'rgba(90,200,122,0.12)', color: '#3A8850',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    a: 'Memory Game', desc: 'Working memory, concentration, turn-taking',
    bg: 'rgba(200,168,216,0.12)', color: '#7A5CAA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
];

const SAFETY = [
  {
    title: 'Ages 2–6',
    desc: 'All content is carefully created for pre-school and early primary children.',
    color: '#3A8850', bg: '#F0FBF4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Ad Free',
    desc: 'No advertisements, no in-app purchases, no tracking. Just stories and activities.',
    color: '#7A5CAA', bg: '#F8F0FC',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: 'Child Safe',
    desc: 'Reviewed by early childhood educators. No violence, no scary content, no bad role models.',
    color: '#4A7AB0', bg: '#EEF6FF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function ParentsPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg,#E4F2DC 0%,#EBF7E4 40%,#FFFBF4 100%)' }}>

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute rounded-full" style={{ width: 380, height: 380, top: '-10%', right: '-5%', background: 'radial-gradient(circle,rgba(90,200,122,0.15) 0%,transparent 70%)' }} />
            <div className="absolute rounded-full" style={{ width: 260, height: 260, bottom: '5%', left: '-5%', background: 'radial-gradient(circle,rgba(168,140,255,0.1) 0%,transparent 70%)' }} />
          </div>

          <div className="max-w-3xl mx-auto relative z-[2]">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-[.9rem] mb-6 hover:opacity-70 transition-opacity"
              style={{ color: '#3A7850' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              Back to Home
            </Link>

            <span className="inline-flex items-center gap-2 font-display text-[.82rem] tracking-[.14em] uppercase px-5 py-2 rounded-full mb-5"
              style={{ background: 'rgba(58,120,80,0.1)', border: '1.5px solid rgba(58,120,80,0.25)', color: '#3A7850' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              For Parents &amp; Carers
            </span>

            <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-5">
              Helping little ones{' '}
              <span style={{ color: '#3A7850' }}>grow</span>{' '}
              and{' '}
              <span style={{ background: 'linear-gradient(135deg,#7A5CAA,#9478C8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>explore</span>
            </h1>
            <p className="text-[1.05rem] leading-[1.9] text-text-mid max-w-[600px] mx-auto">
              Adventures of Sia is designed with parents and carers in mind — a gentle, ad-free world
              built on the values you already teach at home.
            </p>
          </div>
        </section>

        {/* ── Safety ── */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#3A7850)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#3A7850' }}>Safety</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#3A7850,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep">
                Designed with safety first
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {SAFETY.map((c, i) => (
                <div key={i} className="p-8 rounded-[28px] text-center hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: c.bg, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${c.color}18`, color: c.color }}>
                    {c.icon}
                  </div>
                  <h3 className="font-display text-[1.2rem] mb-2" style={{ color: '#4A3860' }}>{c.title}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg,#F0EAFC 0%,#EDE6F8 100%)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#A88CFF)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#A88CFF' }}>Learning</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#A88CFF,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep mb-3">
                What your child will learn
              </h2>
              <p className="text-text-mid text-[1rem] max-w-[500px] mx-auto">
                Every episode gently weaves in values that support healthy development.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <div key={i} className="p-6 rounded-[24px] bg-white hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(168,140,255,0.1)' }}>
                  <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-4"
                    style={{ background: v.bg, boxShadow: '0 6px 18px rgba(168,140,255,0.2)' }}>
                    {v.icon}
                  </div>
                  <h3 className="font-display text-[1.1rem] text-text-deep mb-2">{v.title}</h3>
                  <p className="text-[.85rem] text-text-mid leading-[1.7]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Episode guide ── */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#A88CFF)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#A88CFF' }}>Guide</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#A88CFF,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep mb-3">
                Episode Guide
              </h2>
              <p className="text-text-mid max-w-[480px] mx-auto">
                Use these notes to watch together and talk about the themes afterwards.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {EPISODES.map((ep, i) => (
                <div key={i} className="p-6 rounded-[24px] bg-white hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(168,140,255,0.1)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display text-[.78rem] px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(122,92,170,0.1)', color: '#7A5CAA' }}>
                      {ep.ep}
                    </span>
                    <span className="text-[.78rem] font-bold text-text-mid">Ages {ep.age}</span>
                  </div>
                  <h3 className="font-display text-[1.15rem] text-text-deep mb-2">{ep.title}</h3>
                  <p className="text-[.85rem] text-text-mid leading-[1.7] mb-3">{ep.desc}</p>
                  <div className="flex gap-2 flex-wrap">
                    {ep.themes.map(t => (
                      <span key={t} className="text-[.72rem] font-bold px-3 py-1.5 rounded-full"
                        style={{ background: '#F0EAFC', color: '#7A5CAA' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Activities guide ── */}
        <section className="py-20 px-6" style={{ background: '#E4F2DC' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#3A7850)' }} />
                <span className="font-display text-[.78rem] tracking-[.2em] uppercase" style={{ color: '#3A7850' }}>Activities</span>
                <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg,#3A7850,transparent)' }} />
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep mb-3">
                Activity Learning Goals
              </h2>
              <p className="text-text-mid max-w-[480px] mx-auto">
                Each activity is linked to early childhood development milestones.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACTIVITIES_GUIDE.map((a, i) => (
                <div key={i} className="p-5 rounded-[20px] bg-white flex items-start gap-4 hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: a.bg, color: a.color }}>
                    {a.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-[1rem] text-text-deep mb-1">{a.a}</h3>
                    <p className="text-[.8rem] text-text-mid leading-[1.6]">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="py-20 px-6 text-center" style={{ background: '#FFFBF4' }}>
          <div className="max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-[18px] flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)', boxShadow: '0 8px 24px rgba(168,140,255,0.35)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h2 className="font-display text-[2rem] text-text-deep mb-3">Stay in the loop</h2>
            <p className="text-text-mid mb-8">
              Get new episodes, printable activity packs, and seasonal content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full border-2 font-semibold text-[.95rem]
                           outline-none focus:border-brand-violet transition-colors"
                style={{ borderColor: 'rgba(122,92,170,.2)', color: '#4A3860' }} />
              <button className="btn-sia text-white font-display text-[.95rem] px-7 py-3.5 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
                Subscribe
              </button>
            </div>
            <p className="text-[.75rem] text-text-mid mt-3">No spam. Unsubscribe any time.</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
