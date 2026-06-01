'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

/* ════════════════════════════════════════════════════════════════
   Types & progress
   ════════════════════════════════════════════════════════════════ */
type Result = { stars: number; scoreText: string };
type GameProps = { level: number; onFinish: (r: Result) => void };
type GameDef = {
  id: string; title: string; age: string; desc: string;
  cover: string; accent: string;
  Thumb: () => JSX.Element;
  Game: (p: GameProps) => JSX.Element;
};

const LEVELS_PER_GAME = 5;
const STORE_KEY = 'sia-games-progress-v1';
type Progress = Record<string, Record<number, number>>; // gameId -> level -> stars

function useProgress() {
  const [prog, setProg] = useState<Progress>({});
  useEffect(() => {
    try { const raw = localStorage.getItem(STORE_KEY); if (raw) setProg(JSON.parse(raw)); } catch {}
  }, []);
  const award = (gameId: string, level: number, stars: number) => {
    setProg(prev => {
      const g = { ...(prev[gameId] || {}) };
      g[level] = Math.max(g[level] || 0, stars);
      const next = { ...prev, [gameId]: g };
      try { localStorage.setItem(STORE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  return { prog, award };
}

const isUnlocked = (prog: Progress, id: string, level: number) =>
  level === 1 || (prog[id]?.[level - 1] ?? 0) >= 1;

/* ════════════════════════════════════════════════════════════════
   tiny helpers
   ════════════════════════════════════════════════════════════════ */
function shuffle<T>(arr: T[]): T[] {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
const starsBy = (score: number, target: number) =>
  score >= target ? 3 : score >= Math.ceil(target * 0.6) ? 2 : 1;

/* ════════════════════════════════════════════════════════════════
   SVG building blocks (for thumbnails)
   ════════════════════════════════════════════════════════════════ */
function SvgBunny({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={-4} cy={-11} rx={2.4} ry={6.5} fill="#fff" />
      <ellipse cx={4} cy={-11} rx={2.4} ry={6.5} fill="#fff" />
      <ellipse cx={-4} cy={-11} rx={1.1} ry={3.6} fill="#FFC2D6" />
      <ellipse cx={4} cy={-11} rx={1.1} ry={3.6} fill="#FFC2D6" />
      <circle cx={0} cy={0} r={7.5} fill="#fff" />
      <circle cx={-2.7} cy={-1} r={1} fill="#5b4b6b" />
      <circle cx={2.7} cy={-1} r={1} fill="#5b4b6b" />
      <circle cx={-4.2} cy={1.8} r={1.5} fill="#FFC2D6" />
      <circle cx={4.2} cy={1.8} r={1.5} fill="#FFC2D6" />
      <path d="M-1 1 h2 l-1 1.3 z" fill="#FF9DBE" />
    </g>
  );
}
function SvgCarrot({ x, y, s = 1, r = 0 }: { x: number; y: number; s?: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${r})`}>
      <polygon points="0,9 -3.2,-3 3.2,-3" fill="#FF9D3D" />
      <polygon points="0,9 0,-3 3.2,-3" fill="#F4862B" />
      <path d="M0 -3 l-2.4 -4.5 M0 -3 l0 -5.5 M0 -3 l2.4 -4.5" stroke="#5FB85F" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  );
}
function SvgStar({ x, y, s = 1, fill = '#FFD23D' }: { x: number; y: number; s?: number; fill?: string }) {
  const pts = '0,-6 1.8,-1.9 6,-1.9 2.6,1 3.7,5.2 0,2.6 -3.7,5.2 -2.6,1 -6,-1.9 -1.8,-1.9';
  return <polygon points={pts} fill={fill} transform={`translate(${x} ${y}) scale(${s})`} />;
}

/* ════════════════════════════════════════════════════════════════
   Thumbnails (illustrated, no emojis)
   ════════════════════════════════════════════════════════════════ */
const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 100 75" preserveAspectRatio="xMidYMid slice" className="w-full h-full">{children}</svg>
);

function ThumbCarrotTap() {
  return (
    <Svg>
      <defs><linearGradient id="ctg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFEFC8" /><stop offset="1" stopColor="#FFD79A" /></linearGradient></defs>
      <rect width="100" height="75" fill="url(#ctg)" />
      <ellipse cx="50" cy="86" rx="78" ry="26" fill="#9DD96F" />
      <ellipse cx="22" cy="60" rx="11" ry="5" fill="#7A5A3A" />
      <ellipse cx="74" cy="63" rx="11" ry="5" fill="#7A5A3A" />
      <SvgBunny x={22} y={50} s={1.05} />
      <SvgCarrot x={74} y={56} s={1.1} r={-8} />
      <SvgCarrot x={50} y={66} s={1.2} r={10} />
    </Svg>
  );
}
function ThumbBubblePop() {
  const b: [number, number, number, string][] = [[20, 50, 9, '#FF9DC4'], [42, 30, 12, '#A88CFF'], [64, 48, 10, '#8FC8F0'], [80, 26, 8, '#9BE0A8'], [33, 60, 7, '#FFD36B']];
  return (
    <Svg>
      <defs><linearGradient id="bpg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EAF6FF" /><stop offset="1" stopColor="#C7E6FB" /></linearGradient></defs>
      <rect width="100" height="75" fill="url(#bpg)" />
      {b.map((v, i) => (
        <g key={i}>
          <circle cx={v[0]} cy={v[1]} r={v[2]} fill={v[3]} opacity={0.55} />
          <circle cx={v[0] - v[2] * 0.3} cy={v[1] - v[2] * 0.35} r={v[2] * 0.28} fill="#fff" opacity={0.85} />
        </g>
      ))}
    </Svg>
  );
}
function ThumbMemory() {
  const cards: [number, number, string | null][] = [[16, 16, '#FF9DC4'], [42, 12, '#A88CFF'], [60, 18, null], [16, 42, null], [42, 40, '#8FC8F0'], [68, 44, '#9BE0A8']];
  return (
    <Svg>
      <rect width="100" height="75" fill="#EDE3FF" />
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={c[0]} y={c[1]} width="22" height="26" rx="5" fill={c[2] ? '#FFFCF6' : '#A88CFF'} stroke="#fff" strokeWidth="1.5" />
          {c[2]
            ? <circle cx={c[0] + 11} cy={c[1] + 13} r="6" fill={c[2]} />
            : <text x={c[0] + 11} y={c[1] + 18} fontSize="12" fill="#fff" textAnchor="middle" fontWeight="bold">?</text>}
        </g>
      ))}
    </Svg>
  );
}
function ThumbCount() {
  return (
    <Svg>
      <defs><linearGradient id="cng" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF1F7" /><stop offset="1" stopColor="#FFD9EA" /></linearGradient></defs>
      <rect width="100" height="75" fill="url(#cng)" />
      {[18, 34, 50, 66].map((x, i) => <SvgCarrot key={i} x={x} y={40} s={1.25} r={i % 2 ? 9 : -9} />)}
      <rect x="74" y="22" width="20" height="20" rx="6" fill="#A88CFF" />
      <text x="84" y="37" fontSize="13" fill="#fff" textAnchor="middle" fontWeight="bold">4</text>
    </Svg>
  );
}
function ThumbStarCatch() {
  return (
    <Svg>
      <defs><linearGradient id="scg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3A2E6E" /><stop offset="1" stopColor="#6A53A8" /></linearGradient></defs>
      <rect width="100" height="75" fill="url(#scg)" />
      <SvgStar x={24} y={20} s={1.3} /><SvgStar x={54} y={14} s={1} fill="#FFE89A" /><SvgStar x={78} y={26} s={1.5} />
      <SvgStar x={40} y={34} s={0.9} fill="#FFF1B8" /><SvgStar x={66} y={42} s={1.1} />
      <path d="M30 60 L70 60 L64 74 L36 74 Z" fill="#C98A4A" />
      <rect x="28" y="56" width="44" height="6" rx="3" fill="#E0A35E" />
    </Svg>
  );
}
function ThumbColorTap() {
  const cols = ['#FF6B6B', '#FFC83D', '#5FC36A', '#5B9DF0', '#A88CFF', '#FF9DC4'];
  return (
    <Svg>
      <rect width="100" height="75" fill="#FBF3FF" />
      <path d="M50 8 C24 8 12 28 12 44 C12 58 26 60 32 54 C38 48 30 44 38 40 C50 34 64 50 74 44 C86 37 80 8 50 8 Z" fill="#fff" stroke="#E7DAF7" strokeWidth="1.5" />
      {cols.map((c, i) => {
        const a = (i / cols.length) * Math.PI * 1.3 + 0.3;
        return <circle key={i} cx={44 + Math.cos(a) * 22} cy={34 + Math.sin(a) * 16} r="5.5" fill={c} />;
      })}
      <circle cx="70" cy="58" r="8" fill="#FFC83D" stroke="#fff" strokeWidth="2" />
    </Svg>
  );
}
function ThumbOddOne() {
  const base = '#8FC8F0', odd = '#FF9DC4', oddIdx = 4;
  return (
    <Svg>
      <rect width="100" height="75" fill="#EAF6FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        const cx = 24 + (i % 3) * 26, cy = 16 + Math.floor(i / 3) * 22;
        return <circle key={i} cx={cx} cy={cy} r="9" fill={i === oddIdx ? odd : base} stroke="#fff" strokeWidth="1.5" />;
      })}
    </Svg>
  );
}

/* ════════════════════════════════════════════════════════════════
   Shared game UI
   ════════════════════════════════════════════════════════════════ */
function Bar({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between px-1 mb-2">
      <span className="font-display text-[0.92rem] text-[#57506A]" style={{ fontWeight: 700 }}>{left}</span>
      <span className="font-display text-[0.92rem] text-[#A88CFF]" style={{ fontWeight: 700 }}>{right}</span>
    </div>
  );
}
function StarRow({ n, size = 26 }: { n: number; size?: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.span key={i} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15 + i * 0.18, type: 'spring', stiffness: 260, damping: 12 }}
          style={{ fontSize: size, lineHeight: 1, color: i < n ? '#FFC83D' : '#E2D9F0', filter: i < n ? 'drop-shadow(0 2px 4px rgba(255,200,61,0.5))' : 'none' }}>★</motion.span>
      ))}
    </div>
  );
}

/* Popping score + live timer bar */
function HUD({ score, time, max, goal }: { score: number; time: number; max: number; goal?: number }) {
  const pct = Math.max(0, (time / max) * 100);
  const low = time <= 5;
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between px-1 mb-1.5">
        <div className="flex items-baseline gap-1.5">
          <motion.span key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 360, damping: 14 }}
            className="font-display text-[1.15rem]" style={{ fontWeight: 700, color: '#FFB020' }}>⭐ {score}</motion.span>
          {goal !== undefined && <span className="font-body text-[0.7rem] text-[#B6AECB]">/ {goal} for ★★★</span>}
        </div>
        <span className="font-display text-[0.95rem]" style={{ fontWeight: 700, color: low ? '#FF6B6B' : '#A88CFF' }}>⏱ {time}s</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(168,140,255,0.16)' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ ease: 'linear', duration: 0.9 }} className="h-full rounded-full"
          style={{ background: low ? 'linear-gradient(90deg,#FF8A8A,#FF6B6B)' : 'linear-gradient(90deg,#A88CFF,#FF9DC4)' }} />
      </div>
    </div>
  );
}

/* floating "+1" feedback */
type Float = { id: number; x: number; y: number };
function Floats({ items }: { items: Float[] }) {
  return (
    <AnimatePresence>
      {items.map(f => (
        <motion.div key={f.id} initial={{ opacity: 1, y: 0, scale: 0.6 }} animate={{ opacity: 0, y: -46, scale: 1.2 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }} className="absolute pointer-events-none font-display text-[1.3rem] z-20"
          style={{ left: f.x, top: f.y, color: '#FFC83D', fontWeight: 700, textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>+1</motion.div>
      ))}
    </AnimatePresence>
  );
}
function useFloats() {
  const [items, setItems] = useState<Float[]>([]);
  const idr = useRef(0);
  const add = (x: number, y: number) => {
    const id = idr.current++;
    setItems(s => [...s, { id, x, y }]);
    setTimeout(() => setItems(s => s.filter(f => f.id !== id)), 720);
  };
  return { items, add };
}

/* celebratory confetti for the result screen */
const CONFETTI_C = ['#FF9DC4', '#A88CFF', '#8FC8F0', '#9BE0A8', '#FFD36B', '#FF6B6B'];
function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[18px]">
      {Array.from({ length: 26 }, (_, i) => i).map(i => {
        const x = (i * 37) % 100, delay = (i % 6) * 0.08, dur = 1.4 + (i % 5) * 0.25, rot = (i % 2 ? 1 : -1) * 360;
        return (
          <motion.div key={i} initial={{ top: '-8%', opacity: 1, rotate: 0 }} animate={{ top: '110%', rotate: rot, opacity: [1, 1, 0.5] }}
            transition={{ duration: dur, delay, ease: 'easeIn' }} className="absolute"
            style={{ left: `${x}%`, width: 8, height: 12, borderRadius: 2, background: CONFETTI_C[i % CONFETTI_C.length] }} />
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 1 — Carrot Tap (whack-a-mole)
   ════════════════════════════════════════════════════════════════ */
const CT = [{ t: 22, s: 820, h: 680, g: 12 }, { t: 22, s: 700, h: 560, g: 16 }, { t: 20, s: 600, h: 470, g: 20 }, { t: 20, s: 500, h: 390, g: 24 }, { t: 18, s: 420, h: 320, g: 28 }];
function CarrotTap({ level, onFinish }: GameProps) {
  const c = CT[level - 1];
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(c.t);
  const [active, setActive] = useState<number | null>(null);
  const done = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);
  const floats = useFloats();

  useEffect(() => {
    if (time <= 0) { if (!done.current) { done.current = true; onFinish({ stars: starsBy(score, c.g), scoreText: `${score} taps` }); } return; }
    const t = setTimeout(() => setTime(v => v - 1), 1000); return () => clearTimeout(t);
  }, [time]); // eslint-disable-line
  useEffect(() => { const iv = setInterval(() => setActive(Math.floor(Math.random() * 9)), c.s); return () => clearInterval(iv); }, []); // eslint-disable-line
  useEffect(() => { if (active === null) return; const t = setTimeout(() => setActive(a => (a === active ? null : a)), c.h); return () => clearTimeout(t); }, [active]); // eslint-disable-line

  const hit = (e: React.MouseEvent, i: number) => {
    if (i === active && !done.current) {
      setScore(s => s + 1); setActive(null);
      const w = wrap.current?.getBoundingClientRect(); const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
      if (w) floats.add(b.left - w.left + b.width / 2 - 10, b.top - w.top + 8);
    }
  };
  return (
    <div ref={wrap} className="relative">
      <HUD score={score} time={time} max={c.t} goal={c.g} />
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <button key={i} onClick={(e) => hit(e, i)} className="relative aspect-square rounded-[20px] overflow-hidden flex items-end justify-center"
            style={{ background: 'linear-gradient(180deg,#EADBFF,#D8C4F5)' }}>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[72%] h-[32%] rounded-[50%]" style={{ background: '#6B5896' }} />
            <AnimatePresence>
              {active === i && (
                <motion.div key="b" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 440, damping: 20 }} className="relative z-10 text-[2.5rem] mb-1 pointer-events-none select-none">🐰</motion.div>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <Floats items={floats.items} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 2 — Bubble Pop
   ════════════════════════════════════════════════════════════════ */
const BP = [{ t: 22, s: 600, g: 16 }, { t: 22, s: 520, g: 20 }, { t: 20, s: 450, g: 24 }, { t: 20, s: 380, g: 28 }, { t: 18, s: 320, g: 32 }];
const BCOL = ['#FF9DC4', '#A88CFF', '#8FC8F0', '#9BE0A8', '#FFD36B'];
function BubblePop({ level, onFinish }: GameProps) {
  const c = BP[level - 1];
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(c.t);
  const [bub, setBub] = useState<{ id: number; x: number; sz: number; col: string }[]>([]);
  const idr = useRef(0); const done = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);
  const floats = useFloats();

  useEffect(() => {
    if (time <= 0) { if (!done.current) { done.current = true; setBub([]); onFinish({ stars: starsBy(score, c.g), scoreText: `${score} pops` }); } return; }
    const t = setTimeout(() => setTime(v => v - 1), 1000); return () => clearTimeout(t);
  }, [time]); // eslint-disable-line
  useEffect(() => {
    const iv = setInterval(() => setBub(b => [...b, { id: idr.current++, x: 6 + Math.random() * 78, sz: 40 + Math.random() * 28, col: BCOL[Math.floor(Math.random() * BCOL.length)] }]), c.s);
    return () => clearInterval(iv);
  }, []); // eslint-disable-line
  const rm = (id: number) => setBub(b => b.filter(x => x.id !== id));
  const pop = (e: React.MouseEvent, id: number) => {
    if (!done.current) {
      rm(id); setScore(s => s + 1);
      const w = wrap.current?.getBoundingClientRect(); const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
      if (w) floats.add(b.left - w.left + b.width / 2 - 10, b.top - w.top);
    }
  };
  return (
    <div ref={wrap} className="relative">
      <HUD score={score} time={time} max={c.t} goal={c.g} />
      <div className="relative rounded-[20px] overflow-hidden" style={{ height: 400, background: 'linear-gradient(180deg,#EAF6FF,#D6ECFF)' }}>
        <AnimatePresence>
          {bub.map(b => (
            <motion.button key={b.id} onClick={(e) => pop(e, b.id)} initial={{ y: 0, opacity: 0 }} animate={{ y: -(420 + b.sz), opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
              transition={{ y: { duration: (5 - level * 0.55) + Math.random(), ease: 'linear' }, opacity: { duration: 0.3 }, scale: { duration: 0.14 } }}
              onAnimationComplete={() => rm(b.id)} className="absolute rounded-full"
              style={{ left: `${b.x}%`, top: '100%', width: b.sz, height: b.sz, background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), ${b.col})`, boxShadow: `0 4px 14px ${b.col}88` }} />
          ))}
        </AnimatePresence>
      </div>
      <Floats items={floats.items} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 3 — Memory Match
   ════════════════════════════════════════════════════════════════ */
const MM = [4, 6, 7, 8, 8]; // pairs per level
const FACES = ['🐰', '🦊', '🐻', '🐸', '🦉', '🐿️', '🦔', '🐱'];
function MemoryMatch({ level, onFinish }: GameProps) {
  const pairs = MM[level - 1];
  const [cards, setCards] = useState<{ id: number; f: string; m: boolean }[]>([]);
  const [flip, setFlip] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const faces = FACES.slice(0, pairs);
    setCards(shuffle([...faces, ...faces]).map((f, i) => ({ id: i, f, m: false })));
  }, []); // eslint-disable-line

  const tap = (id: number) => {
    if (lock) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.m || flip.includes(id)) return;
    const nf = [...flip, id]; setFlip(nf);
    if (nf.length === 2) {
      setMoves(m => m + 1); setLock(true);
      const a = cards.find(c => c.id === nf[0])!, b = cards.find(c => c.id === nf[1])!;
      if (a.f === b.f) setTimeout(() => { setCards(cs => cs.map(c => (c.id === a.id || c.id === b.id ? { ...c, m: true } : c))); setFlip([]); setLock(false); }, 460);
      else setTimeout(() => { setFlip([]); setLock(false); }, 780);
    }
  };
  useEffect(() => {
    if (cards.length && cards.every(c => c.m) && !done.current) {
      done.current = true;
      const par = pairs, mv = moves;
      const stars = mv <= par + 1 ? 3 : mv <= par * 2 ? 2 : 1;
      const t = setTimeout(() => onFinish({ stars, scoreText: `${mv} moves` }), 500);
      return () => clearTimeout(t);
    }
  }, [cards]); // eslint-disable-line

  return (
    <div>
      <Bar left={`🔁 ${moves} moves`} right={`${cards.filter(c => c.m).length / 2}/${pairs}`} />
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        {cards.map(c => {
          const shown = c.m || flip.includes(c.id);
          return (
            <button key={c.id} onClick={() => tap(c.id)} className="relative aspect-square rounded-[14px] flex items-center justify-center text-[1.5rem] transition-all duration-200"
              style={{ background: shown ? '#FFFCF6' : 'linear-gradient(135deg,#C9B6F5,#A88CFF)', border: shown ? '2px solid #EADCFF' : '2px solid rgba(255,255,255,0.6)',
                boxShadow: c.m ? '0 0 0 3px rgba(155,224,168,0.7)' : '0 4px 12px rgba(168,140,255,0.18)', transform: c.m ? 'scale(0.95)' : 'scale(1)' }}>
              {shown ? c.f : <span className="text-white text-[1.1rem]">?</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 4 — Count with Sia
   ════════════════════════════════════════════════════════════════ */
const CN = [{ max: 6, sp: 1 }, { max: 8, sp: 1 }, { max: 10, sp: 1 }, { max: 12, sp: 2 }, { max: 15, sp: 2 }];
const CN_ROUNDS = 8;
function CountWithSia({ level, onFinish }: GameProps) {
  const c = CN[level - 1];
  const [round, setRound] = useState(1);
  const [n, setN] = useState(2);
  const [opts, setOpts] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const done = useRef(false);

  const make = (r: number) => {
    const count = 2 + Math.floor(Math.random() * (c.max - 1));
    const wrong = new Set<number>();
    while (wrong.size < 2) { const w = Math.max(1, count + (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * c.sp + 1))); if (w !== count) wrong.add(w); }
    setN(count); setOpts(shuffle([count, ...Array.from(wrong)])); setPicked(null); setRound(r);
  };
  useEffect(() => { make(1); }, []); // eslint-disable-line

  const pick = (o: number) => {
    if (picked !== null) return; setPicked(o);
    const ok = o === n; if (ok) setScore(s => s + 1);
    setTimeout(() => {
      if (round >= CN_ROUNDS) { if (!done.current) { done.current = true; const sc = score + (ok ? 1 : 0); onFinish({ stars: starsBy(sc, CN_ROUNDS), scoreText: `${sc}/${CN_ROUNDS}` }); } }
      else make(round + 1);
    }, ok ? 650 : 900);
  };
  return (
    <div>
      <Bar left={`⭐ ${score}`} right={`Round ${round}/${CN_ROUNDS}`} />
      <div className="rounded-[20px] p-4 mb-4 flex flex-wrap items-center justify-center gap-1.5 min-h-[150px]" style={{ background: 'linear-gradient(180deg,#FFF4F9,#FFE6F1)' }}>
        {Array.from({ length: n }).map((_, i) => (
          <motion.span key={`${round}-${i}`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 320, damping: 16 }}
            className="text-[1.9rem]" style={{ transform: `rotate(${(i % 2 ? 1 : -1) * 8}deg)` }}>🥕</motion.span>
        ))}
      </div>
      <p className="text-center font-body text-[0.95rem] text-[#8B86A0] mb-3">How many carrots?</p>
      <div className="grid grid-cols-3 gap-3">
        {opts.map(o => {
          const isPick = picked === o, ok = o === n;
          const bg = picked === null ? 'linear-gradient(135deg,#A88CFF,#FF9DC4)' : isPick ? (ok ? 'linear-gradient(135deg,#7AD08A,#9BE0A8)' : 'linear-gradient(135deg,#FF8A8A,#FFB3B3)') : (ok ? 'linear-gradient(135deg,#7AD08A,#9BE0A8)' : 'rgba(168,140,255,0.25)');
          return <motion.button key={o} onClick={() => pick(o)} whileTap={{ scale: 0.92 }} className="py-4 rounded-[18px] font-display text-[1.6rem] text-white" style={{ fontWeight: 700, background: bg, boxShadow: '0 6px 18px rgba(168,140,255,0.28)' }}>{o}</motion.button>;
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 5 — Star Catch (falling stars)
   ════════════════════════════════════════════════════════════════ */
const SC = [{ t: 22, s: 780, fall: 4.0, g: 12 }, { t: 22, s: 680, fall: 3.5, g: 15 }, { t: 20, s: 580, fall: 3.0, g: 18 }, { t: 20, s: 500, fall: 2.6, g: 21 }, { t: 18, s: 420, fall: 2.2, g: 24 }];
function StarCatch({ level, onFinish }: GameProps) {
  const c = SC[level - 1];
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(c.t);
  const [stars, setStars] = useState<{ id: number; x: number; sz: number }[]>([]);
  const idr = useRef(0); const done = useRef(false);
  const wrap = useRef<HTMLDivElement>(null);
  const floats = useFloats();
  useEffect(() => {
    if (time <= 0) { if (!done.current) { done.current = true; setStars([]); onFinish({ stars: starsBy(score, c.g), scoreText: `${score} stars` }); } return; }
    const t = setTimeout(() => setTime(v => v - 1), 1000); return () => clearTimeout(t);
  }, [time]); // eslint-disable-line
  useEffect(() => { const iv = setInterval(() => setStars(s => [...s, { id: idr.current++, x: 6 + Math.random() * 80, sz: 30 + Math.random() * 18 }]), c.s); return () => clearInterval(iv); }, []); // eslint-disable-line
  const rm = (id: number) => setStars(s => s.filter(x => x.id !== id));
  const grab = (e: React.MouseEvent, id: number) => {
    if (!done.current) {
      rm(id); setScore(s => s + 1);
      const w = wrap.current?.getBoundingClientRect(); const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
      if (w) floats.add(b.left - w.left + b.width / 2 - 10, b.top - w.top);
    }
  };
  return (
    <div ref={wrap} className="relative">
      <HUD score={score} time={time} max={c.t} goal={c.g} />
      <div className="relative rounded-[20px] overflow-hidden" style={{ height: 400, background: 'linear-gradient(180deg,#3A2E6E,#6A53A8)' }}>
        {/* twinkle backdrop */}
        {[12, 30, 52, 70, 86].map((x, i) => <span key={i} className="absolute text-white/40 text-[0.6rem]" style={{ left: `${x}%`, top: `${10 + (i % 3) * 22}%` }}>✦</span>)}
        <AnimatePresence>
          {stars.map(s => (
            <motion.button key={s.id} onClick={(e) => grab(e, s.id)} initial={{ y: -s.sz, opacity: 0, rotate: 0 }} animate={{ y: 420, opacity: 1, rotate: 60 }} exit={{ scale: 0, opacity: 0 }}
              transition={{ y: { duration: c.fall, ease: 'linear' }, rotate: { duration: c.fall, ease: 'linear' }, opacity: { duration: 0.25 }, scale: { duration: 0.15 } }} onAnimationComplete={() => rm(s.id)}
              className="absolute" style={{ left: `${s.x}%`, top: 0, width: s.sz, height: s.sz, lineHeight: 1, fontSize: s.sz, color: '#FFD23D', filter: 'drop-shadow(0 0 6px rgba(255,210,60,0.8))' }}>★</motion.button>
          ))}
        </AnimatePresence>
      </div>
      <Floats items={floats.items} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 6 — Colour Tap
   ════════════════════════════════════════════════════════════════ */
const PALETTE = [{ n: 'Red', c: '#FF6B6B' }, { n: 'Blue', c: '#5B9DF0' }, { n: 'Green', c: '#5FC36A' }, { n: 'Yellow', c: '#FFC83D' }, { n: 'Purple', c: '#A88CFF' }, { n: 'Pink', c: '#FF9DC4' }, { n: 'Orange', c: '#FF9D3D' }];
const COLOR_CHOICES = [3, 4, 5, 6, 6];
const COLOR_ROUNDS = 8;
function ColorTap({ level, onFinish }: GameProps) {
  const choices = COLOR_CHOICES[level - 1];
  const [round, setRound] = useState(1);
  const [target, setTarget] = useState(PALETTE[0]);
  const [opts, setOpts] = useState<typeof PALETTE>([]);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const done = useRef(false);
  const make = (r: number) => {
    const pool = shuffle(PALETTE); const tgt = pool[0];
    setTarget(tgt); setOpts(shuffle([tgt, ...pool.slice(1, choices)])); setPicked(null); setRound(r);
  };
  useEffect(() => { make(1); }, []); // eslint-disable-line
  const pick = (col: string) => {
    if (picked) return; setPicked(col); const ok = col === target.c; if (ok) setScore(s => s + 1);
    setTimeout(() => {
      if (round >= COLOR_ROUNDS) { if (!done.current) { done.current = true; const sc = score + (ok ? 1 : 0); onFinish({ stars: starsBy(sc, COLOR_ROUNDS), scoreText: `${sc}/${COLOR_ROUNDS}` }); } }
      else make(round + 1);
    }, ok ? 600 : 850);
  };
  return (
    <div>
      <Bar left={`⭐ ${score}`} right={`Round ${round}/${COLOR_ROUNDS}`} />
      <div className="flex flex-col items-center mb-5">
        <p className="font-body text-[0.95rem] text-[#8B86A0] mb-2">Tap the colour:</p>
        <div className="font-display text-[1.5rem]" style={{ fontWeight: 700, color: target.c }}>{target.n}</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {opts.map((o, i) => {
          const ring = picked ? (o.c === target.c ? '0 0 0 4px rgba(122,208,138,0.8)' : (picked === o.c ? '0 0 0 4px rgba(255,138,138,0.8)' : 'none')) : 'none';
          return <motion.button key={i} onClick={() => pick(o.c)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.9 }} className="rounded-full"
            style={{ width: 64, height: 64, background: o.c, boxShadow: `0 6px 18px ${o.c}66, ${ring}` }} aria-label={o.n} />;
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GAME 7 — Odd One Out
   ════════════════════════════════════════════════════════════════ */
const ODD_COLS = [3, 3, 4, 4, 5]; const ODD_ROWS = [2, 3, 3, 4, 4];
const ODD_ROUNDS = 8;
const ODD_BASES = ['#8FC8F0', '#9BE0A8', '#FFD36B', '#C9B6F5', '#FFB3C8'];
const ODD_ODDS = ['#FF6B6B', '#5B9DF0', '#5FC36A', '#FFC83D', '#A88CFF', '#FF9D3D'];
function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const cl = (v: number) => Math.max(0, Math.min(255, v));
  const r = cl(((n >> 16) & 255) + amt), g = cl(((n >> 8) & 255) + amt), b = cl((n & 255) + amt);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function OddOneOut({ level, onFinish }: GameProps) {
  const cols = ODD_COLS[level - 1], rows = ODD_ROWS[level - 1], n = cols * rows;
  const [round, setRound] = useState(1);
  const [base, setBase] = useState('#8FC8F0');
  const [odd, setOdd] = useState('#FF6B6B');
  const [oddIdx, setOddIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const done = useRef(false);
  const make = (r: number) => {
    const b = ODD_BASES[Math.floor(Math.random() * ODD_BASES.length)];
    // higher levels: the odd one is only a subtle shade away (much harder)
    const o = level >= 4 ? shade(b, (Math.random() < 0.5 ? 1 : -1) * (level === 5 ? 26 : 36)) : shuffle(ODD_ODDS.filter(x => x !== b))[0];
    setBase(b); setOdd(o); setOddIdx(Math.floor(Math.random() * n)); setPicked(null); setRound(r);
  };
  useEffect(() => { make(1); }, []); // eslint-disable-line
  const pick = (i: number) => {
    if (picked !== null) return; setPicked(i); const ok = i === oddIdx; if (ok) setScore(s => s + 1);
    setTimeout(() => {
      if (round >= ODD_ROUNDS) { if (!done.current) { done.current = true; const sc = score + (ok ? 1 : 0); onFinish({ stars: starsBy(sc, ODD_ROUNDS), scoreText: `${sc}/${ODD_ROUNDS}` }); } }
      else make(round + 1);
    }, ok ? 500 : 800);
  };
  return (
    <div>
      <Bar left={`⭐ ${score}`} right={`Round ${round}/${ODD_ROUNDS}`} />
      <p className="text-center font-body text-[0.95rem] text-[#8B86A0] mb-3">Tap the one that&apos;s different!</p>
      <div className="grid gap-2.5 justify-center mx-auto" style={{ gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`, maxWidth: cols * 76 }}>
        {Array.from({ length: n }).map((_, i) => {
          const isOdd = i === oddIdx;
          const ring = picked === i ? (isOdd ? '0 0 0 4px rgba(122,208,138,0.85)' : '0 0 0 4px rgba(255,138,138,0.85)') : 'none';
          return <motion.button key={i} onClick={() => pick(i)} whileTap={{ scale: 0.9 }} className="aspect-square rounded-full"
            style={{ background: isOdd ? odd : base, boxShadow: `0 4px 12px rgba(0,0,0,0.08), ${ring}`, border: '2px solid #fff' }} />;
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Game catalogue
   ════════════════════════════════════════════════════════════════ */
const GAMES: GameDef[] = [
  { id: 'carrot-tap', title: 'Carrot Tap', age: '2–5', desc: 'Tap Sia when she pops up!', cover: 'linear-gradient(135deg,#FFE3B0,#FFC98A)', accent: '#C0822E', Thumb: ThumbCarrotTap, Game: CarrotTap },
  { id: 'bubble-pop', title: 'Bubble Pop', age: '2–6', desc: 'Pop the floating bubbles!', cover: 'linear-gradient(135deg,#CDEBFF,#A9D8F5)', accent: '#2C6FB0', Thumb: ThumbBubblePop, Game: BubblePop },
  { id: 'memory-match', title: 'Memory Match', age: '4–8', desc: 'Find the matching friends!', cover: 'linear-gradient(135deg,#E4D8FF,#C9B6F5)', accent: '#7A5CC8', Thumb: ThumbMemory, Game: MemoryMatch },
  { id: 'count-sia', title: 'Count with Sia', age: '3–7', desc: 'How many carrots do you see?', cover: 'linear-gradient(135deg,#FBD0E4,#FF9DC4)', accent: '#C04D86', Thumb: ThumbCount, Game: CountWithSia },
  { id: 'star-catch', title: 'Star Catch', age: '3–7', desc: 'Catch the falling stars!', cover: 'linear-gradient(135deg,#C9BEF5,#9E89E0)', accent: '#6A53A8', Thumb: ThumbStarCatch, Game: StarCatch },
  { id: 'color-tap', title: 'Colour Tap', age: '2–5', desc: 'Tap the matching colour!', cover: 'linear-gradient(135deg,#FBE3FF,#F3C9F0)', accent: '#B45CC8', Thumb: ThumbColorTap, Game: ColorTap },
  { id: 'odd-one', title: 'Odd One Out', age: '4–8', desc: 'Spot the one that is different!', cover: 'linear-gradient(135deg,#D6F0FF,#AEDCF5)', accent: '#2C8FB0', Thumb: ThumbOddOne, Game: OddOneOut },
];

/* ════════════════════════════════════════════════════════════════
   Candy-Crush level map
   ════════════════════════════════════════════════════════════════ */
const NODE_X = [50, 26, 66, 30, 64, 46];          // % (6th = coming soon)
const NODE_Y = [40, 116, 192, 268, 344, 424];     // px

// fluffy little cloud
function MapCloud({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute z-0 pointer-events-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(150,130,200,0.12))', ...style }}>
      <div className="relative" style={{ width: 52, height: 22 }}>
        <div className="absolute bg-white rounded-full" style={{ width: 52, height: 13, bottom: 0 }} />
        <div className="absolute bg-white rounded-full" style={{ width: 22, height: 22, left: 5, bottom: 3 }} />
        <div className="absolute bg-white rounded-full" style={{ width: 29, height: 29, left: 16, bottom: 5 }} />
        <div className="absolute bg-white rounded-full" style={{ width: 18, height: 18, right: 3, bottom: 3 }} />
      </div>
    </div>
  );
}
// dots along a smooth snake path through the nodes
function trailDots() {
  const dots: { x: number; y: number; seg: number }[] = [];
  const per = 7;
  for (let i = 1; i < NODE_X.length; i++) {
    const x0 = NODE_X[i - 1], y0 = NODE_Y[i - 1], x1 = NODE_X[i], y1 = NODE_Y[i], cy = (y0 + y1) / 2;
    for (let s = 1; s < per; s++) {
      const t = s / per, mt = 1 - t;
      const x = x0 * (mt * mt * mt + 3 * mt * mt * t) + x1 * (3 * mt * t * t + t * t * t);
      const y = mt * mt * mt * y0 + 3 * mt * mt * t * cy + 3 * mt * t * t * cy + t * t * t * y1;
      dots.push({ x, y, seg: i - 1 });
    }
  }
  return dots;
}

function LevelMap({ def, prog, onPick }: { def: GameDef; prog: Progress; onPick: (lvl: number) => void }) {
  const stars = (lvl: number) => prog[def.id]?.[lvl] ?? 0;
  const mapH = NODE_Y[NODE_Y.length - 1] + 108;
  let litNode = 0; for (let l = 1; l <= 5; l++) { if (stars(l) > 0) litNode = l; else break; }
  const dots = trailDots();
  const clouds = [{ top: 54, left: '6%' }, { top: 150, right: '5%' }, { top: 300, left: '7%' }, { top: 400, right: '7%' }];
  const twinkles = [['13%', 84], ['83%', 64], ['20%', 210], ['80%', 250], ['16%', 360], ['82%', 380]] as [string, number][];

  return (
    <div className="relative mx-auto rounded-[22px] overflow-hidden"
      style={{ maxWidth: 500, background: 'linear-gradient(180deg,#E6F0FF 0%,#F0E8FF 48%,#FCE7F2 100%)' }}>

      <div className="relative z-10 text-center pt-3.5 pb-1 font-display text-[1rem]" style={{ fontWeight: 700, color: '#7A5CC8' }}>
        🐾 Choose a level!
      </div>

      <div className="relative" style={{ height: mapH }}>
        {/* clouds */}
        {clouds.map((c, i) => (
          <div key={i} style={{ position: 'absolute', top: c.top, left: (c as any).left, right: (c as any).right, animation: `float ${5 + i}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }}>
            <MapCloud style={{ position: 'relative' }} />
          </div>
        ))}
        {/* twinkles */}
        {twinkles.map(([l, t], i) => (
          <span key={i} className="absolute z-0 text-[#C7B4F2]" style={{ left: l, top: t, fontSize: i % 2 ? 12 : 15, animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}>✦</span>
        ))}

        {/* dotted candy trail */}
        {dots.map((d, i) => {
          const lit = d.seg < litNode;
          return (
            <div key={i} className="absolute rounded-full z-[5]" style={{
              left: `${d.x}%`, top: d.y, transform: 'translate(-50%,-50%)',
              width: lit ? 8 : 7, height: lit ? 8 : 7,
              background: lit ? 'linear-gradient(135deg,#FFD23D,#FF9D3D)' : 'rgba(168,140,255,0.28)',
              boxShadow: lit ? '0 1px 4px rgba(255,170,60,0.5)' : 'none',
            }} />
          );
        })}

        {[1, 2, 3, 4, 5].map(lvl => {
          const i = lvl - 1;
          const unlocked = isUnlocked(prog, def.id, lvl);
          const earned = stars(lvl);
          const completed = earned > 0;
          const current = unlocked && !completed;
          return (
            <motion.div key={lvl} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${NODE_X[i]}%`, top: NODE_Y[i] }}
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 280, damping: 16 }}>
              {/* bouncing bunny over current */}
              {current && (
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-[1.2rem] mb-0.5">🐰</motion.div>
              )}
              {/* stars */}
              <div className="flex gap-0.5 mb-1" style={{ height: 13 }}>
                {completed && [0, 1, 2].map(s => (
                  <motion.span key={s} initial={{ scale: 0, y: -6 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 + s * 0.08, type: 'spring', stiffness: 300, damping: 12 }}
                    style={{ fontSize: 12, lineHeight: 1, color: s < earned ? '#FFC83D' : '#E0D6F0', filter: s < earned ? 'drop-shadow(0 1px 2px rgba(255,200,61,0.6))' : 'none' }}>★</motion.span>
                ))}
              </div>
              <div className="relative">
                {/* pulsing glow ring for current */}
                {current && (
                  <motion.div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle,rgba(168,140,255,0.5),transparent 70%)' }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
                )}
                <motion.button
                  whileHover={unlocked ? { scale: 1.1, rotate: -3 } : {}} whileTap={unlocked ? { scale: 0.92 } : {}}
                  animate={current ? { scale: [1, 1.08, 1] } : completed ? { boxShadow: ['0 8px 20px rgba(255,180,40,0.35)', '0 8px 28px rgba(255,180,40,0.65)', '0 8px 20px rgba(255,180,40,0.35)'] } : {}}
                  transition={current ? { duration: 1.3, repeat: Infinity } : completed ? { duration: 2, repeat: Infinity } : {}}
                  onClick={() => unlocked && onPick(lvl)} disabled={!unlocked}
                  className="relative w-[62px] h-[62px] rounded-full flex items-center justify-center font-display"
                  style={{
                    fontWeight: 700, fontSize: '1.45rem', color: unlocked ? '#fff' : '#B6AECB',
                    background: completed ? 'linear-gradient(135deg,#FFD23D,#FF9D3D)' : current ? 'linear-gradient(135deg,#A88CFF,#FF9DC4)' : '#E9E2F5',
                    boxShadow: unlocked ? '0 8px 20px rgba(168,140,255,0.4)' : 'inset 0 2px 6px rgba(0,0,0,0.08)',
                    border: '4px solid #fff', cursor: unlocked ? 'pointer' : 'default',
                  }}>
                  {unlocked ? lvl : '🔒'}
                  {completed && <span className="absolute -top-1 -right-1 text-[0.85rem]">👑</span>}
                </motion.button>
              </div>
              {current && <span className="mt-1 font-body font-bold text-[0.6rem] px-2 py-0.5 rounded-full text-white" style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>PLAY ▶</span>}
            </motion.div>
          );
        })}

        {/* Coming soon node */}
        <motion.div className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${NODE_X[5]}%`, top: NODE_Y[5] }}
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, type: 'spring', stiffness: 280, damping: 16 }}>
          <div className="w-[62px] h-[62px] rounded-full flex items-center justify-center text-[1.5rem]"
            style={{ background: 'repeating-linear-gradient(45deg,#EEE7FA,#EEE7FA 6px,#E0D6F2 6px,#E0D6F2 12px)', border: '4px solid #fff' }}>🔒</div>
          <span className="mt-1.5 font-body font-bold text-[0.64rem] px-2.5 py-1 rounded-full text-white" style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>✨ Coming Soon</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Game modal (map ↔ play ↔ result)
   ════════════════════════════════════════════════════════════════ */
function GameModal({ def, prog, award, onClose }: { def: GameDef; prog: Progress; award: (id: string, lvl: number, s: number) => void; onClose: () => void }) {
  const [view, setView] = useState<'map' | 'play'>('map');
  const [level, setLevel] = useState(1);
  const [counting, setCounting] = useState(false);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);

  const startLevel = (lvl: number) => { setLevel(lvl); setResult(null); setView('play'); setCounting(true); setCount(3); };
  useEffect(() => {
    if (!counting) return;
    if (count <= 0) { setCounting(false); return; }
    const t = setTimeout(() => setCount(c => c - 1), 650); return () => clearTimeout(t);
  }, [counting, count]);

  const finish = (r: Result) => { award(def.id, level, r.stars); setResult(r); };
  const totalStars = Object.values(prog[def.id] || {}).reduce((a, b) => a + b, 0);
  const Game = def.Game;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6" style={{ background: 'rgba(50,38,80,0.62)', backdropFilter: 'blur(7px)' }}>
      <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }} onClick={e => e.stopPropagation()}
        className="relative w-[min(96vw,560px)] bg-white rounded-[28px] overflow-hidden flex flex-col" style={{ maxHeight: '94vh', boxShadow: '0 30px 90px rgba(60,40,100,0.4)' }}>

        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ background: def.cover }}>
          <div className="flex items-center gap-2">
            {view === 'play' && (
              <button onClick={() => { setView('map'); setResult(null); }} aria-label="Back to map"
                className="w-8 h-8 rounded-full bg-white/85 flex items-center justify-center text-[#57506A] hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>←</button>
            )}
            <div>
              <div className="font-display text-white text-[1.05rem] leading-tight" style={{ fontWeight: 700 }}>{def.title}</div>
              <div className="font-body text-white/85 text-[0.7rem]">{view === 'map' ? `Ages ${def.age} · ⭐ ${totalStars}` : `Level ${level}`}</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[#57506A] hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>✕</button>
        </div>

        {/* body */}
        <div className="p-4 sm:p-5 overflow-y-auto relative">
          {view === 'map' && <LevelMap def={def} prog={prog} onPick={startLevel} />}

          {view === 'play' && (
            <div className="relative min-h-[420px]">
              {!counting && !result && <Game level={level} onFinish={finish} />}

              <AnimatePresence>
                {counting && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-body font-semibold text-[1rem] text-[#A88CFF] mb-1">{count > 0 ? 'Get ready!' : ''}</span>
                    <motion.span key={count} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.7, opacity: 0 }}
                      className="font-display text-[5rem] leading-none" style={{ fontWeight: 700, background: count > 0 ? 'linear-gradient(135deg,#A88CFF,#FF9DC4)' : 'linear-gradient(135deg,#7AD08A,#5FC36A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {count > 0 ? count : 'Go!'}
                    </motion.span>
                  </div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {result && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/95 rounded-[18px] px-4">
                    {result.stars >= 2 && <Confetti />}
                    <motion.div initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 13 }} className="text-[2.6rem] mb-1 relative z-10">
                      {result.stars >= 3 ? '🏆' : result.stars >= 2 ? '🎉' : '⭐'}
                    </motion.div>
                    <StarRow n={result.stars} />
                    <h4 className="font-display text-[1.25rem] mt-3 mb-0.5 relative z-10" style={{ fontWeight: 700, color: '#57506A' }}>
                      {result.stars >= 3 ? 'Amazing! 🌟' : result.stars >= 2 ? 'Well done! 🎉' : 'Good try! 💪'}
                    </h4>
                    <p className="font-body text-[0.86rem] text-[#8B86A0] mb-4 relative z-10">Level {level} · {result.scoreText}</p>
                    <div className="flex flex-col items-center gap-2.5 w-full max-w-[240px]">
                      {level < LEVELS_PER_GAME ? (
                        <button onClick={() => startLevel(level + 1)} className="btn-sia text-white w-full justify-center" style={{ padding: '11px 0', fontSize: '15px', background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)', boxShadow: '0 8px 22px rgba(168,140,255,0.4)' }}>Next level →</button>
                      ) : (
                        <div className="font-body text-[0.85rem] text-[#A88CFF] font-semibold bg-[#A88CFF]/10 rounded-full px-4 py-2">🎊 All levels done! More coming soon</div>
                      )}
                      <div className="flex gap-2.5 w-full">
                        <button onClick={() => startLevel(level)} className="flex-1 py-2.5 rounded-full font-body font-semibold text-[0.82rem]" style={{ background: 'rgba(168,140,255,0.12)', color: '#A88CFF' }}>↻ Replay</button>
                        <button onClick={() => { setView('map'); setResult(null); }} className="flex-1 py-2.5 rounded-full font-body font-semibold text-[0.82rem] text-white" style={{ background: 'linear-gradient(135deg,#A88CFF,#FF9DC4)' }}>Level map</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Section
   ════════════════════════════════════════════════════════════════ */
export default function SiaGames() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { prog, award } = useProgress();
  const scroller = useRef<HTMLDivElement>(null);
  const slide = (dir: number) => scroller.current?.scrollBy({ left: dir * 290, behavior: 'smooth' });

  return (
    <section ref={ref} className="relative py-12 sm:py-16 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg,#FFFFFF 0%,#F5F0FD 100%)' }}>
      <div className="max-w-[1400px] mx-auto">
        <motion.div className="flex items-end justify-between mb-6 sm:mb-8 gap-3" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }}>
          <div>
            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[0.8rem] tracking-widest uppercase text-[#A88CFF] bg-[#A88CFF]/12 px-4 py-1.5 rounded-full mb-3">🎮 Play</span>
            <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.2rem)] text-[#57506A] leading-tight">Play with Sia</h2>
            <p className="font-body text-[#8B86A0] text-[0.9rem] mt-1">Fun games for little explorers — ages 2 to 8! Each has 5 levels to unlock.</p>
          </div>
          {/* slider arrows */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button onClick={() => slide(-1)} aria-label="Previous games"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A88CFF] shadow-[0_4px_16px_rgba(168,140,255,0.18)] hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>←</button>
            <button onClick={() => slide(1)} aria-label="More games"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A88CFF] shadow-[0_4px_16px_rgba(168,140,255,0.18)] hover:scale-105 transition-transform" style={{ fontWeight: 700 }}>→</button>
          </div>
        </motion.div>

        {/* slider */}
        <div ref={scroller} className="flex gap-4 sm:gap-5 overflow-x-auto no-scroll pb-3 -mx-1 px-1" style={{ scrollSnapType: 'x mandatory' }}>
          {GAMES.map((g, i) => {
            const earned = Object.values(prog[g.id] || {}).reduce((a, b) => a + b, 0);
            const cleared = Object.values(prog[g.id] || {}).filter(s => s > 0).length;
            return (
              <motion.div key={g.id} initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.06 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} onClick={() => setOpenIdx(i)}
                className="group cursor-pointer shrink-0" style={{ width: 250, scrollSnapAlign: 'start' }}>
                <motion.div whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  className="relative overflow-hidden bg-white h-full" style={{ borderRadius: 26, boxShadow: '0 10px 30px rgba(168,140,255,0.14)' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '26px 26px 0 0' }}>
                    <g.Thumb />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="font-body font-bold text-[0.6rem] px-2.5 py-1 rounded-full text-white" style={{ background: 'rgba(0,0,0,0.3)' }}>Ages {g.age}</span>
                    </div>
                    <div className="absolute top-2.5 right-2.5 font-body font-bold text-[0.6rem] px-2 py-1 rounded-full text-white" style={{ background: 'rgba(0,0,0,0.3)' }}>{cleared}/{LEVELS_PER_GAME} ✓</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="font-display text-[0.95rem] text-[#57506A] leading-tight" style={{ fontWeight: 700 }}>{g.title}</div>
                      <span className="font-body text-[0.72rem]" style={{ color: '#FFC83D', fontWeight: 700 }}>★ {earned}</span>
                    </div>
                    <p className="font-body text-[0.72rem] text-[#8B86A0] leading-snug mb-2">{g.desc}</p>
                    <span className="font-body font-semibold text-[0.76rem] inline-flex items-center gap-1" style={{ color: g.accent }}>▶ Play now</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && <GameModal def={GAMES[openIdx]} prog={prog} award={award} onClose={() => setOpenIdx(null)} />}
      </AnimatePresence>
    </section>
  );
}
