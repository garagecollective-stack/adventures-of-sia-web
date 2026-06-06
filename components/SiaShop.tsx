'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/*
  Desktop grid  (4 col × 3 row):
  ┌──────┬───────────────┬──────┐
  │Plush │               │Tees  │
  ├──────┤  Featured     ├──────┤
  │Bags  │  (2×2)        │Caps  │
  ├──────┴───┬───────────┴──────┤
  │  Mugs    │    Stickers      │
  └──────────┴──────────────────┘
*/

const CARDS = [
  {
    id: 'plush',
    title: 'Plush Toys',
    sub: 'Huggable Sia · Milo · Arlo',
    bg: '#DCCEFF', accent: '#A88CFF', textColor: '#3E2070',
    img: '/images/shop/plush.webp',
    pos: '40% 30%',
    col: '1', row: '1',
  },
  {
    id: 'featured',
    title: 'Featured Collection',
    sub: 'Small Bunny, Big Adventures',
    bg: '#D8EDFF', accent: '#4A9ED4', textColor: '#1A4A7A',
    img: '/images/shop/featured-collection.webp',
    pos: 'center 30%',
    col: '2 / 4', row: '1 / 3',
    featured: true,
  },
  {
    id: 'tshirts',
    title: 'Kiddo T-Shirts',
    sub: 'Sia & Friends · Sizes 2–10',
    bg: '#FFD7E5', accent: '#FF9DC4', textColor: '#7A2848',
    img: '/images/shop/tshirts.webp',
    pos: '40% 30%',
    col: '4', row: '1',
  },
  {
    id: 'bags',
    title: 'Bags & Stationery',
    sub: 'Backpacks · Notebooks · Pens',
    bg: '#DDF7E4', accent: '#5AC87A', textColor: '#1A5A30',
    img: '/images/shop/bags-stationery.webp',
    pos: '40% 30%',
    col: '1', row: '2',
  },
  {
    id: 'caps',
    title: 'Caps & Phone Cases',
    sub: 'Hats · Cases · Ring Holders',
    bg: '#B8E7FF', accent: '#4A9ED4', textColor: '#1A4A7A',
    img: '/images/shop/caps-cases.webp',
    pos: '40% 30%',
    col: '4', row: '2',
  },
  {
    id: 'mugs',
    title: 'Mugs & Drinkware',
    sub: 'Cups · Bottles · Tumblers',
    bg: '#FFE2D3', accent: '#E07848', textColor: '#6A2A00',
    img: '/images/shop/mugs-drinkware.webp',
    pos: '40% 30%',
    col: '1 / 3', row: '3',
  },
  {
    id: 'stickers',
    title: 'Stickers & More',
    sub: 'Sticker Packs · Keychains',
    bg: '#FFE9A8', accent: '#D4A800', textColor: '#6A4A00',
    img: '/images/shop/bags-stationery.webp',
    pos: '60% 30%',
    col: '3 / 5', row: '3',
  },
];

export default function SiaShop() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="shop" ref={ref}
      className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #D8EDFF 0%, #FFF9F5 55%, #FFE2D3 100%)' }}
    >
      {/* top wave */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" className="w-full h-[36px]">
          <path d="M0,25 C300,50 600,0 900,25 C1050,38 1150,10 1200,25 L1200,0 L0,0 Z"
            fill="#DDF7E4" opacity="0.5" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: -22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-display text-[0.88rem] mb-5"
            style={{
              background: 'linear-gradient(135deg,#FFE9A8,#FFD7E5)',
              border: '2.5px solid #FF9DC4',
              color: '#7A2848',
              boxShadow: '0 4px 16px rgba(255,157,196,0.3)',
            }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Coming Soon — Sia&apos;s Shop is Opening!
          </motion.div>

          <h2 className="font-display leading-tight"
            style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', color: '#57506A', letterSpacing: '-0.02em' }}>
            Explore the Shop
          </h2>
          <p className="mt-3 font-body" style={{ fontSize: 'clamp(0.92rem,1.6vw,1.05rem)', color: '#8B86A0' }}>
            Sia-inspired goodies for little adventurers — launching soon!
          </p>
        </motion.div>

        {/* ── Desktop grid (explicit placement) ── */}
        <div className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '260px 260px 260px',
          }}>
          {CARDS.map((card, i) => (
            <ShopCard key={card.id} card={card} i={i} inView={inView}
              style={{ gridColumn: card.col, gridRow: card.row }} />
          ))}
        </div>

        {/* ── Mobile / tablet grid (2-col auto flow) ── */}
        <div className="lg:hidden grid grid-cols-2 gap-3" style={{ gridAutoRows: '220px' }}>
          {CARDS.map((card, i) => (
            <ShopCard key={card.id} card={card} i={i} inView={inView}
              style={{ gridColumn: card.featured ? '1 / 3' : undefined }} />
          ))}
        </div>

        {/* ── Notify CTA ── */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}>
          <p className="font-body text-[0.95rem]" style={{ color: '#8B86A0' }}>
            Want to know the moment we launch?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-sia text-white font-display px-7 py-3 cursor-none"
            style={{
              background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)',
              boxShadow: '0 8px 24px rgba(168,140,255,0.35)',
              fontSize: '0.95rem',
            }}>
            🔔 Notify Me
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Shared card component ─────────────────────────────── */
function ShopCard({ card, i, inView, style }: {
  card: typeof CARDS[number];
  i: number;
  inView: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className="relative rounded-[24px] overflow-hidden cursor-none group"
      style={{ background: card.bg, boxShadow: '0 8px 28px rgba(0,0,0,0.08)', ...style }}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03, y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.13)' }}
    >
      {/* Full-bleed image */}
      <Image
        src={card.img}
        alt={card.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        style={{ objectPosition: card.pos ?? 'center 30%' }}
        sizes={card.featured ? '50vw' : '(max-width:1024px) 50vw, 25vw'}
      />

      {/* Bottom label overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10
                      flex items-center justify-between gap-2 px-4 py-3"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.82) 100%)',
          backdropFilter: 'blur(8px)',
          borderTop: `2px solid ${card.accent}44`,
        }}>
        <div className="min-w-0">
          <p className="font-display truncate leading-tight"
            style={{
              fontSize: card.featured ? 'clamp(0.95rem,1.6vw,1.15rem)' : 'clamp(0.78rem,1.2vw,0.92rem)',
              color: card.textColor,
            }}>
            {card.title}
          </p>
          <p className="font-body truncate opacity-65 text-[0.65rem] mt-0.5"
            style={{ color: card.textColor }}>
            {card.sub}
          </p>
        </div>
        <span className="flex-shrink-0 px-2.5 py-1 rounded-full font-display text-[0.6rem] whitespace-nowrap"
          style={{
            background: card.bg,
            border: `1.5px solid ${card.accent}`,
            color: card.textColor,
          }}>
          Coming Soon
        </span>
      </div>

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%)' }} />
    </motion.div>
  );
}
