'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DEFAULT_PAGES, loadPages, savePages, resetPages, PAGE_ORDER, PageSlug, PageData } from '@/lib/dashboard';

const inputCls = 'w-full px-3 py-2 rounded-[10px] border border-[#E6DEF5] text-[0.85rem] outline-none font-body text-[#57506A] bg-white focus:border-[#A88CFF]';

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className || ''}`}>
      <span className="block text-[0.72rem] text-[#B6AECB] font-semibold mb-1">{label}</span>
      {children}
    </label>
  );
}

export default function Dashboard() {
  const [pages, setPages] = useState<Record<PageSlug, PageData>>(DEFAULT_PAGES);
  const [active, setActive] = useState<PageSlug>('help');
  const [saved, setSaved] = useState(false);

  useEffect(() => { setPages(loadPages()); }, []);

  const update = (slug: PageSlug, patch: Partial<PageData>) =>
    setPages(p => ({ ...p, [slug]: { ...p[slug], ...patch } }));
  const updateBlock = (slug: PageSlug, i: number, patch: Partial<{ heading: string; text: string }>) =>
    setPages(p => ({ ...p, [slug]: { ...p[slug], blocks: p[slug].blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)) } }));
  const addBlock = (slug: PageSlug) =>
    setPages(p => ({ ...p, [slug]: { ...p[slug], blocks: [...p[slug].blocks, { heading: 'New section', text: '' }] } }));
  const removeBlock = (slug: PageSlug, i: number) =>
    setPages(p => ({ ...p, [slug]: { ...p[slug], blocks: p[slug].blocks.filter((_, j) => j !== i) } }));

  const save = () => { savePages(pages); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  const reset = () => { resetPages(); setPages(DEFAULT_PAGES); };

  const data = pages[active];

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8" style={{ background: '#F5F2FB', cursor: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="font-display text-[1.6rem] text-[#57506A]" style={{ fontWeight: 700 }}>🛠️ Content Dashboard</h1>
            <p className="font-body text-[0.85rem] text-[#8B86A0]">Edit the footer pages. Changes save in this browser and show live on each page.</p>
          </div>
          <Link href="/" className="font-body text-[0.85rem] text-[#A88CFF] font-semibold">← Back to site</Link>
        </div>

        {/* tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {PAGE_ORDER.map(slug => (
            <button key={slug} onClick={() => setActive(slug)}
              className="px-4 py-2 rounded-full font-body font-semibold text-[0.82rem] capitalize"
              style={{ background: active === slug ? 'linear-gradient(135deg,#A88CFF,#FF9DC4)' : '#fff', color: active === slug ? '#fff' : '#8B86A0', boxShadow: '0 4px 12px rgba(168,140,255,0.12)' }}>
              {pages[slug].emoji} {slug}
            </button>
          ))}
        </div>

        {/* editor */}
        <div className="rounded-[20px] bg-white p-5 sm:p-6" style={{ boxShadow: '0 10px 30px rgba(168,140,255,0.1)' }}>
          <div className="grid sm:grid-cols-[90px_1fr] gap-3 mb-4">
            <Field label="Emoji"><input value={data.emoji} onChange={e => update(active, { emoji: e.target.value })} className={inputCls} /></Field>
            <Field label="Title"><input value={data.title} onChange={e => update(active, { title: e.target.value })} className={inputCls} /></Field>
          </div>
          <Field label="Subtitle" className="mb-2">
            <textarea value={data.subtitle} onChange={e => update(active, { subtitle: e.target.value })} rows={2} className={inputCls} />
          </Field>
          {active === 'shop' && (
            <label className="flex items-center gap-2 mb-4 mt-1 text-[0.82rem] text-[#8B86A0] font-body">
              <input type="checkbox" checked={!!data.comingSoon} onChange={e => update(active, { comingSoon: e.target.checked })} />
              Show as “Coming Soon” (product cards)
            </label>
          )}

          <div className="flex items-center justify-between mb-2 mt-4">
            <span className="font-display text-[0.95rem] text-[#57506A]" style={{ fontWeight: 700 }}>
              {data.comingSoon ? 'Products' : 'Sections'}
            </span>
            <button onClick={() => addBlock(active)} className="text-[0.8rem] font-semibold text-[#A88CFF]">+ Add</button>
          </div>
          <div className="space-y-4">
            {data.blocks.map((b, i) => (
              <div key={i} className="rounded-[16px] border p-3" style={{ borderColor: '#EFE8FA' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.72rem] text-[#B6AECB] font-semibold">#{i + 1}</span>
                  <button onClick={() => removeBlock(active, i)} className="text-[0.72rem] text-[#FF8A8A] font-semibold">Remove</button>
                </div>
                <input value={b.heading} onChange={e => updateBlock(active, i, { heading: e.target.value })}
                  placeholder={data.comingSoon ? 'e.g. 🧸 Toys & Plushies' : 'Heading'} className={`${inputCls} mb-2`} />
                <textarea value={b.text} onChange={e => updateBlock(active, i, { text: e.target.value })} rows={3} placeholder="Text" className={inputCls} />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button onClick={save} className="px-6 py-2.5 rounded-full font-body font-bold text-white text-[0.85rem]" style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>💾 Save changes</button>
            <button onClick={reset} className="px-5 py-2.5 rounded-full font-body font-semibold text-[0.85rem]" style={{ background: 'rgba(168,140,255,0.12)', color: '#A88CFF' }}>↺ Reset to defaults</button>
            <Link href={`/${active}`} target="_blank" className="font-body text-[0.82rem] text-[#8B86A0] font-semibold">View page ↗</Link>
            {saved && <span className="font-body text-[0.82rem] text-[#3A7850] font-semibold">✓ Saved!</span>}
          </div>
        </div>
        <p className="font-body text-[0.72rem] text-[#B6AECB] mt-4">
          Tip: edits are stored in your browser. To change the defaults for everyone, edit <code>lib/dashboard.ts</code>.
        </p>
      </div>
    </main>
  );
}
