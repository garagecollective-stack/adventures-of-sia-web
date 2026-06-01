'use client';
import { useEffect, useState } from 'react';
import PageShell from './PageShell';
import { DEFAULT_PAGES, loadPages, PageSlug, PageData } from '@/lib/dashboard';

export default function ContentPage({ slug }: { slug: PageSlug }) {
  const [data, setData] = useState<PageData>(DEFAULT_PAGES[slug]);

  useEffect(() => {
    const all = loadPages();
    if (all[slug]) setData(all[slug]);
  }, [slug]);

  return (
    <PageShell emoji={data.emoji} title={data.title} subtitle={data.subtitle}>
      {data.comingSoon ? (
        <>
          {/* Coming-soon banner */}
          <div className="text-center mb-9">
            <span className="inline-flex items-center gap-2 font-display text-[1rem] text-white px-6 py-2.5 rounded-full"
              style={{ fontWeight: 700, background: 'linear-gradient(135deg,#FF86B5,#FF9DC4)', boxShadow: '0 8px 22px rgba(255,134,181,0.4)' }}>
              ✨ Coming Soon ✨
            </span>
          </div>
          {/* Product teasers */}
          <div className="grid sm:grid-cols-3 gap-5">
            {data.blocks.map((b, i) => {
              const parts = b.heading.trim().split(/\s+/);
              const hasEmoji = parts.length > 1;
              const emoji = hasEmoji ? parts[0] : '🎁';
              const name = hasEmoji ? parts.slice(1).join(' ') : b.heading;
              return (
                <div key={i} className="relative rounded-[24px] bg-white p-5 text-center overflow-hidden"
                  style={{ boxShadow: '0 10px 30px rgba(168,140,255,0.12)' }}>
                  <div className="absolute top-3 right-3 font-body font-bold text-[0.58rem] px-2.5 py-1 rounded-full text-white"
                    style={{ background: 'rgba(0,0,0,0.28)' }}>SOON</div>
                  <div className="w-[88px] h-[88px] mx-auto rounded-[22px] flex items-center justify-center text-[2.6rem] mb-3 anim-float"
                    style={{ background: 'linear-gradient(160deg,#F3ECFF,#FFE6F1)' }}>{emoji}</div>
                  <div className="font-display text-[1rem] text-[#57506A] mb-1.5" style={{ fontWeight: 700 }}>{name}</div>
                  <p className="font-body text-[0.82rem] text-[#8B86A0] leading-snug">{b.text}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="space-y-5">
          {data.blocks.map((b, i) => (
            <div key={i} className="rounded-[24px] bg-white p-6 sm:p-7"
              style={{ boxShadow: '0 10px 30px rgba(168,140,255,0.10)' }}>
              <h3 className="font-display text-[1.05rem] text-[#57506A] mb-2" style={{ fontWeight: 700 }}>{b.heading}</h3>
              <p className="font-body text-[0.92rem] text-[#8B86A0] leading-[1.7]">{b.text}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
