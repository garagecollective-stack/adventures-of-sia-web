import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { COMICS } from '@/lib/comics';

const VALUES = [
  { e: '💜', title: 'Emotional Intelligence',  desc: 'Each story helps children understand and name their feelings — curiosity, fear, joy, and kindness.' },
  { e: '🌿', title: 'Love of Nature',          desc: "Sia's meadow world encourages children to look for beauty in the natural world around them." },
  { e: '🏠', title: 'Family Bonds',             desc: 'Milo and Arlo model warm, patient parenting — showing that home is always a safe place to return to.' },
  { e: '🔍', title: 'Curiosity & Learning',    desc: "Sia's 'why?' questions model a growth mindset and celebrate not knowing as the start of discovery." },
  { e: '💪', title: 'Gentle Bravery',          desc: 'Challenges are met with gentle courage — showing children that brave doesn\'t mean fearless.' },
  { e: '🤝', title: 'Kindness to Others',      desc: 'Sia always considers how her actions affect others — a core thread woven through every story.' },
];

// parent discussion notes keyed by comic id
const COMIC_GUIDE: Record<string, { themes: string[]; note: string }> = {
  'issue-1': { themes: ['Patience', 'Perseverance'], note: 'Chat about how it feels when something doesn’t work the first time — and why trying again matters.' },
  'issue-2': { themes: ['Responsibility', 'Problem-Solving'], note: 'Talk about owning up to little accidents and working together to put things right.' },
  'issue-3': { themes: ['Curiosity', 'Nature'], note: 'Explore where rain really comes from, then spot the weather together on your next walk.' },
  'issue-4': { themes: ['Facing Fears', 'Wonder'], note: 'A gentle way to talk about the dark — and the magic hiding in the night sky.' },
  'issue-5': { themes: ['Humour', 'Staying Calm'], note: 'Giggle along, then chat about the silly ways our bodies sometimes surprise us.' },
  'issue-6': { themes: ['Bravery', 'Empathy'], note: 'Reassure little ones about bedtime worries — and meeting the unknown with kindness.' },
  'issue-7': { themes: ['Curiosity', 'Experimenting'], note: 'Try a safe, silly kitchen experiment together after reading!' },
  'issue-8': { themes: ['Self-Acceptance', 'Growing Up'], note: 'Talk about how everyone grows at their own pace — and the special things about being little.' },
};

const ACTIVITIES_GUIDE = [
  { e: '🎨', a: 'Colouring',   desc: 'Fine motor skills, colour recognition, creative expression' },
  { e: '🍪', a: 'Baking',      desc: 'Following instructions, maths (measuring), sensory play' },
  { e: '🌸', a: 'Pom Crafts',  desc: 'Fine motor skills, textures, colour matching' },
  { e: '✏️', a: 'Drawing',     desc: 'Observation, shape recognition, self-expression' },
  { e: '🔍', a: 'Spot & Find', desc: 'Visual discrimination, concentration, problem-solving' },
  { e: '🧠', a: 'Memory Game', desc: 'Working memory, concentration, turn-taking' },
];

export default function ParentsPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main style={{ background: '#FFFBF4' }}>

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden"
          style={{ background: 'linear-gradient(180deg,#E4F2DC 0%,#FFFBF4 100%)' }}>
          <div className="max-w-3xl mx-auto relative z-[2]">
            <Link href="/" className="inline-flex items-center gap-2 text-brand-violet font-bold
                                      text-[.9rem] mb-6 hover:opacity-70 transition-opacity">
              ← Back to Home
            </Link>
            <span className="block font-display text-[.88rem] tracking-[.14em] uppercase
                             text-[#3A7850] bg-[#3A7850]/10 px-5 py-2 rounded-full mb-5 inline-block">
              👨‍👩‍👧 For Parents & Carers
            </span>
            <h1 className="font-display text-[clamp(2.5rem,5vw,3.8rem)] text-text-deep leading-[1.05] mb-5">
              Helping little ones <span style={{ color: '#3A7850' }}>grow</span> and <span className="grad-violet">explore</span>
            </h1>
            <p className="text-[1.1rem] leading-[1.9] text-text-mid max-w-[600px] mx-auto">
              Adventures of Sia is designed with parents and carers in mind — a gentle, ad-free world
              built on the values you already teach at home.
            </p>
          </div>
        </section>

        {/* Age & Safety */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep text-center mb-10">
              Designed with safety first
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                { e: '👶', title: 'Ages 2–8',    desc: 'All content is carefully created for pre-school and early primary children.', color: '#A8D8C4', bg: '#F0FBF4' },
                { e: '🚫', title: 'Ad Free',     desc: 'No advertisements, no in-app purchases, no tracking. Just stories and activities.', color: '#C8A8D8', bg: '#F8F0FC' },
                { e: '🛡️', title: 'Child Safe',  desc: 'Reviewed by early childhood educators. No violence, no scary content, no bad role models.', color: '#AABFE0', bg: '#EEF6FF' },
              ].map((c, i) => (
                <div key={i} className="p-8 rounded-[28px] text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  style={{ background: c.bg }}>
                  <span className="text-5xl block mb-4">{c.e}</span>
                  <h3 className="font-display text-[1.3rem] mb-2" style={{ color: '#4A3860' }}>{c.title}</h3>
                  <p className="text-[.88rem] text-text-mid leading-[1.7]">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-6" style={{ background: '#F0EAFC' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep text-center mb-3">
              What your child will learn
            </h2>
            <p className="text-center text-text-mid text-[1rem] mb-10 max-w-[500px] mx-auto">
              Every story gently weaves in values that support healthy development.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUES.map((v, i) => (
                <div key={i} className="p-6 rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <span className="text-3xl block mb-3">{v.e}</span>
                  <h3 className="font-display text-[1.1rem] text-text-deep mb-2">{v.title}</h3>
                  <p className="text-[.85rem] text-text-mid leading-[1.7]">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comic reading guide */}
        <section className="py-20 px-6" style={{ background: '#FFFBF4' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep text-center mb-3">
              Comic Reading Guide
            </h2>
            <p className="text-center text-text-mid mb-10 max-w-[480px] mx-auto">
              Read each comic together, then use these notes to talk about the themes afterwards.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {COMICS.map((c) => {
                const g = COMIC_GUIDE[c.id];
                return (
                  <Link key={c.id} href="/comics"
                    className="block p-6 rounded-[24px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                               hover:shadow-[0_8px_28px_rgba(122,92,170,0.16)] transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[1.5rem]">{c.emoji}</span>
                      <span className="font-display text-[.78rem] px-3 py-1.5 rounded-full bg-brand-violet/10 text-brand-violet">
                        {c.issue}
                      </span>
                      <span className="text-[.74rem] font-bold text-text-mid">{c.pages} pages</span>
                    </div>
                    <h3 className="font-display text-[1.15rem] text-text-deep mb-2">{c.title}</h3>
                    <p className="text-[.85rem] text-text-mid leading-[1.7] mb-3">{c.blurb}</p>
                    {g && (
                      <p className="text-[.82rem] leading-[1.65] mb-3 px-3 py-2 rounded-xl"
                        style={{ background: '#F6F2FC', color: '#6A5690' }}>
                        💬 {g.note}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {g?.themes.map(t => (
                        <span key={t} className="text-[.72rem] font-bold px-3 py-1.5 rounded-full"
                          style={{ background: '#F0EAFC', color: '#7A5CAA' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Videos — coming soon */}
        <section className="py-16 px-6 text-center" style={{ background: '#EEF6FF' }}>
          <div className="max-w-xl mx-auto">
            <span className="text-4xl block mb-3">📺</span>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] text-text-deep mb-3">Animated Videos</h2>
            <span className="inline-flex items-center gap-2 font-display text-[.95rem] text-white px-6 py-2.5 rounded-full mb-4"
              style={{ fontWeight: 700, background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)', boxShadow: '0 10px 26px rgba(122,92,170,0.3)' }}>
              ✨ Coming Soon ✨
            </span>
            <p className="text-text-mid text-[.95rem] leading-[1.8] max-w-[460px] mx-auto">
              Animated episodes of Sia&rsquo;s adventures are hopping their way to your screen.
              For now, enjoy reading the comics together! 🐰
            </p>
          </div>
        </section>

        {/* Activities guide */}
        <section className="py-20 px-6" style={{ background: '#E4F2DC' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.5rem)] text-text-deep text-center mb-3">
              Activity Learning Goals
            </h2>
            <p className="text-center text-text-mid mb-10 max-w-[480px] mx-auto">
              Each activity is linked to early childhood development milestones.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACTIVITIES_GUIDE.map((a, i) => (
                <div key={i} className="p-5 rounded-[20px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]
                                        flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{a.e}</span>
                  <div>
                    <h3 className="font-display text-[1rem] text-text-deep mb-1">{a.a}</h3>
                    <p className="text-[.8rem] text-text-mid leading-[1.6]">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="py-20 px-6 text-center" style={{ background: '#FFFBF4' }}>
          <div className="max-w-xl mx-auto">
            <span className="text-4xl block mb-4">💌</span>
            <h2 className="font-display text-[2rem] text-text-deep mb-3">Stay in the loop</h2>
            <p className="text-text-mid mb-6">
              Get new comics, printable activity packs, and seasonal content delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full border-2 font-semibold text-[.95rem]
                           outline-none focus:border-brand-violet transition-colors"
                style={{ borderColor: 'rgba(122,92,170,.2)', color: '#4A3860' }} />
              <button className="btn-sia text-white font-display text-[.95rem] px-7 py-3.5 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
                Subscribe →
              </button>
            </div>
            <p className="text-[.75rem] text-text-mid mt-3">No spam. Unsubscribe any time. 💜</p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
