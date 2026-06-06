'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Cursor from '@/components/ui/Cursor';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSound } from '@/hooks/useSound';
import { useBadges } from '@/hooks/useBadges';
import { BadgeToast } from '@/components/Toast';

const PALETTE = [
  '#7A5CAA','#AABFE0','#C8A8D8','#FFB8C4','#F5E088',
  '#A8D8C4','#8AB890','#E2C898','#B0B8C8','#FF6B6B',
  '#FFD700','#98D8C8','#F4A460','#DDA0DD','#87CEEB',
  '#FFFFFF','#E0E0E0','#A0A0A0','#4A3860','#000000',
];

// SVG scenes as inline SVG with fill-able regions
const SCENES = [
  { id: 'sia', label: 'Sia in Meadow',   emoji: '🐰' },
  { id: 'cottage', label: "Sia's Cottage", emoji: '🏠' },
  { id: 'garden',  label: 'Pom Garden',   emoji: '🌸' },
];

// Each scene has regions: { id, path/shape, defaultFill }
const SCENE_REGIONS: Record<string, { id: string; type: string; props: any; defaultFill: string; label: string }[]> = {
  sia: [
    { id: 'sky',      type: 'rect', props: { x:0,y:0,width:400,height:200 }, defaultFill: '#B8E0FF', label: 'Sky' },
    { id: 'sun',      type: 'circle', props: { cx:340,cy:50,r:35 }, defaultFill: '#FFE840', label: 'Sun' },
    { id: 'grass',    type: 'path', props: { d:'M0 200 Q100 160 200 185 Q300 210 400 175 L400 280 L0 280 Z' }, defaultFill: '#8AB870', label: 'Grass' },
    { id: 'ground',   type: 'rect', props: { x:0,y:280,width:400,height:20 }, defaultFill: '#6A9850', label: 'Ground' },
    { id: 'body',     type: 'ellipse', props: { cx:200,cy:230,rx:45,ry:55 }, defaultFill: '#F5F0F0', label: "Sia's Body" },
    { id: 'head',     type: 'circle', props: { cx:200,cy:165,r:38 }, defaultFill: '#F5F0F0', label: "Sia's Head" },
    { id: 'ear_l',    type: 'ellipse', props: { cx:180,cy:118,rx:12,ry:30 }, defaultFill: '#F5F0F0', label: 'Left Ear' },
    { id: 'ear_r',    type: 'ellipse', props: { cx:220,cy:118,rx:12,ry:30 }, defaultFill: '#F5F0F0', label: 'Right Ear' },
    { id: 'ear_l_in', type: 'ellipse', props: { cx:180,cy:118,rx:7,ry:22 }, defaultFill: '#FFB8C4', label: 'Ear Inside L' },
    { id: 'ear_r_in', type: 'ellipse', props: { cx:220,cy:118,rx:7,ry:22 }, defaultFill: '#FFB8C4', label: 'Ear Inside R' },
    { id: 'eye_l',    type: 'circle', props: { cx:187,cy:160,r:7 }, defaultFill: '#7A5CAA', label: 'Left Eye' },
    { id: 'eye_r',    type: 'circle', props: { cx:213,cy:160,r:7 }, defaultFill: '#7A5CAA', label: 'Right Eye' },
    { id: 'nose',     type: 'ellipse', props: { cx:200,cy:173,rx:5,ry:4 }, defaultFill: '#FFB8C4', label: 'Nose' },
    { id: 'dress',    type: 'path', props: { d:'M165 225 Q200 210 235 225 L245 280 Q200 290 155 280 Z' }, defaultFill: '#C8A8D8', label: 'Dress' },
    { id: 'dress_bow',type: 'path', props: { d:'M192 213 Q200 205 208 213 Q200 220 192 213 Z' }, defaultFill: '#FFB8C4', label: 'Bow' },
    { id: 'flower1',  type: 'circle', props: { cx:80,cy:240,r:12 }, defaultFill: '#FFB8C4', label: 'Flower 1' },
    { id: 'flower2',  type: 'circle', props: { cx:320,cy:235,r:10 }, defaultFill: '#F5E088', label: 'Flower 2' },
    { id: 'flower3',  type: 'circle', props: { cx:130,cy:255,r:8 },  defaultFill: '#C8A8D8', label: 'Flower 3' },
    { id: 'stem1',    type: 'line',   props: { x1:80,y1:252,x2:80,y2:270,strokeWidth:3 }, defaultFill: '#72A878', label: 'Stem 1' },
    { id: 'stem2',    type: 'line',   props: { x1:320,y1:245,x2:320,y2:262,strokeWidth:3 }, defaultFill: '#72A878', label: 'Stem 2' },
    { id: 'rainbow',  type: 'path', props: { d:'M20 100 Q200 -20 380 100', fill:'none', stroke:'#FF6B6B', strokeWidth:6, strokeLinecap:'round' }, defaultFill: '#FF6B6B', label: 'Rainbow' },
    { id: 'cloud1',   type: 'ellipse', props: { cx:80,cy:55,rx:50,ry:22 }, defaultFill: 'white', label: 'Cloud' },
  ],
  cottage: [
    { id: 'sky',    type: 'rect', props: { x:0,y:0,width:400,height:220 }, defaultFill: '#B8E0FF', label: 'Sky' },
    { id: 'grass',  type: 'rect', props: { x:0,y:220,width:400,height:80 }, defaultFill: '#8AB870', label: 'Grass' },
    { id: 'wall',   type: 'rect', props: { x:110,y:150,width:180,height:100 }, defaultFill: '#D4B898', label: 'Cottage Wall' },
    { id: 'roof',   type: 'polygon', props: { points:'100,150 200,80 300,150' }, defaultFill: '#C09060', label: 'Roof' },
    { id: 'door',   type: 'rect', props: { x:178,y:210,width:44,height:40 }, defaultFill: '#8A6040', label: 'Door' },
    { id: 'win_l',  type: 'rect', props: { x:120,y:165,width:38,height:32 }, defaultFill: '#CCE8FF', label: 'Window Left' },
    { id: 'win_r',  type: 'rect', props: { x:242,y:165,width:38,height:32 }, defaultFill: '#CCE8FF', label: 'Window Right' },
    { id: 'chimney',type: 'rect', props: { x:240,y:95,width:25,height:50 }, defaultFill: '#A08060', label: 'Chimney' },
    { id: 'sun',    type: 'circle', props: { cx:50,cy:50,r:30 }, defaultFill: '#FFE840', label: 'Sun' },
    { id: 'flower1',type: 'circle', props: { cx:90,cy:235,r:12 }, defaultFill: '#FFB8C4', label: 'Flower' },
    { id: 'flower2',type: 'circle', props: { cx:310,cy:233,r:12 }, defaultFill: '#C8A8D8', label: 'Flower' },
    { id: 'flower3',type: 'circle', props: { cx:60,cy:250,r:9 },  defaultFill: '#F5E088', label: 'Flower' },
    { id: 'flower4',type: 'circle', props: { cx:340,cy:248,r:9 }, defaultFill: '#A8D8C4', label: 'Flower' },
    { id: 'path',   type: 'path', props: { d:'M178 250 Q200 270 222 250 L225 300 Q200 310 175 300 Z' }, defaultFill: '#C8A888', label: 'Garden Path' },
    { id: 'cloud1', type: 'ellipse', props: { cx:330,cy:50,rx:55,ry:24 }, defaultFill: 'white', label: 'Cloud' },
    { id: 'tree',   type: 'circle', props: { cx:55,cy:155,r:38 }, defaultFill: '#4A8A40', label: 'Tree' },
    { id: 'trunk',  type: 'rect', props: { x:47,y:193,width:16,height:30 }, defaultFill: '#7A5A30', label: 'Trunk' },
  ],
  garden: [
    { id: 'sky',    type: 'rect', props: { x:0,y:0,width:400,height:180 }, defaultFill: '#B8E0FF', label: 'Sky' },
    { id: 'grass',  type: 'rect', props: { x:0,y:180,width:400,height:100 }, defaultFill: '#8AB870', label: 'Grass' },
    { id: 'rainbow',type: 'path', props: { d:'M10,170 Q200,-30 390,170', fill:'none', strokeWidth:8, strokeLinecap:'round' }, defaultFill: '#FF6B6B', label: 'Rainbow Arc' },
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `pom${i}`,
      type: 'circle' as const,
      props: { cx: 30 + i * 48, cy: 195 + (i % 2) * 15, r: 14 + (i % 3) * 4 },
      defaultFill: ['#FFB8C4','#C8A8D8','#F5E088','#A8D8C4','#A8C8E0','#FFB8C4','#C8A8D8','#F5E088'][i],
      label: `Pom Flower ${i+1}`,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      id: `stem${i}`,
      type: 'line' as const,
      props: { x1: 30 + i * 48, y1: 209 + (i%2)*15, x2: 30 + i * 48, y2: 240 + (i%2)*10, strokeWidth: 3 },
      defaultFill: '#72A878',
      label: `Stem ${i+1}`,
    })),
    { id: 'butterfly1', type: 'ellipse', props: { cx:200,cy:120,rx:16,ry:10 }, defaultFill: '#C8A8D8', label: 'Butterfly Wing' },
    { id: 'butterfly2', type: 'ellipse', props: { cx:230,cy:120,rx:16,ry:10 }, defaultFill: '#C8A8D8', label: 'Butterfly Wing' },
    { id: 'butterfly_body', type: 'ellipse', props: { cx:215,cy:120,rx:4,ry:8 }, defaultFill: '#4A3860', label: 'Butterfly Body' },
    { id: 'sun', type: 'circle', props: { cx:360,cy:50,r:32 }, defaultFill: '#FFE840', label: 'Sun' },
    { id: 'cloud', type: 'ellipse', props: { cx:80,cy:60,rx:55,ry:24 }, defaultFill: 'white', label: 'Cloud' },
  ],
};

export default function ColouringBook() {
  const { play } = useSound();
  const { earn, newBadge, clearNew } = useBadges();
  const [scene, setScene] = useState<'sia'|'cottage'|'garden'>('sia');
  const [color, setColor] = useState('#7A5CAA');
  const [fills, setFills] = useState<Record<string, Record<string, string>>>({});
  const [saved, setSaved] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const getFill = (regionId: string) => {
    return fills[scene]?.[regionId] ?? SCENE_REGIONS[scene].find(r => r.id === regionId)?.defaultFill ?? '#FFFFFF';
  };

  const paint = (id: string) => {
    play('pop');
    setFills(prev => ({
      ...prev,
      [scene]: { ...(prev[scene] ?? {}), [id]: color },
    }));
    // Award badge after first painting action
    earn('artist');
  };

  const download = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `sia-colouring-${scene}.svg`; a.click();
    URL.revokeObjectURL(url);
    play('win');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const reset = () => {
    setFills(prev => ({ ...prev, [scene]: {} }));
    play('whoosh');
  };

  const renderRegion = (r: typeof SCENE_REGIONS[string][0]) => {
    const fill = getFill(r.id);
    const common = {
      key: r.id,
      onClick: () => paint(r.id),
      style: { cursor: 'none' },
      className: 'hover:opacity-80 transition-opacity',
    };
    if (r.type === 'rect')    return <rect    {...common} {...r.props} fill={fill} stroke="rgba(74,56,96,.15)" strokeWidth="1.5"/>;
    if (r.type === 'circle')  return <circle  {...common} {...r.props} fill={fill} stroke="rgba(74,56,96,.15)" strokeWidth="1.5"/>;
    if (r.type === 'ellipse') return <ellipse {...common} {...r.props} fill={fill} stroke="rgba(74,56,96,.15)" strokeWidth="1.5"/>;
    if (r.type === 'polygon') return <polygon {...common} {...r.props} fill={fill} stroke="rgba(74,56,96,.15)" strokeWidth="1.5"/>;
    if (r.type === 'path')    return <path    {...common} {...r.props} fill={r.props.fill ?? fill} stroke={r.props.stroke ?? 'rgba(74,56,96,.15)'} strokeWidth={r.props.strokeWidth ?? 1.5}/>;
    if (r.type === 'line')    return <line    {...common} {...r.props} stroke={fill} strokeLinecap="round"/>;
    return null;
  };

  return (
    <>
      <Navigation />
      <Cursor />
      <BadgeToast badge={newBadge} onClose={clearNew} />
      <div className="min-h-screen px-4 pt-28 pb-8" style={{ background: '#F8F0FC' }}>

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/games" className="flex items-center gap-2 font-bold text-brand-violet
                                          hover:text-[#5A3E8A] transition-colors text-[.9rem]">
              ← Games
            </Link>
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                onClick={reset}
                className="btn-sia font-display text-[.85rem] px-5 py-2.5 border-2 text-brand-violet flex items-center gap-1.5"
                style={{ background: 'white', borderColor: 'rgba(122,92,170,.25)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                Clear
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }}
                onClick={download}
                className="btn-sia text-white font-display text-[.85rem] px-5 py-2.5 flex items-center gap-1.5"
                style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
                {saved ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Saved!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Save
                  </>
                )}
              </motion.button>
            </div>
          </div>
          <h1 className="font-display text-[2rem] text-text-deep text-center mb-2">Colouring Book</h1>
          <p className="text-center text-text-mid text-[.9rem] mb-4">Click any area, then click a colour to fill it!</p>

          {/* Scene selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
            {SCENES.map(s => (
              <button key={s.id} onClick={() => setScene(s.id as any)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-display text-[.82rem] sm:text-[.9rem]
                           transition-all duration-200"
                style={{
                  background: scene === s.id ? '#7A5CAA' : 'white',
                  color: scene === s.id ? 'white' : '#7A6890',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
          {/* Canvas */}
          <div className="flex-1 rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
            style={{ background: 'white' }}>
            <svg ref={svgRef} viewBox="0 0 400 300" style={{ width: '100%', display: 'block' }}
              xmlns="http://www.w3.org/2000/svg">
              {/* Layer 1: filled colourable regions */}
              {SCENE_REGIONS[scene].map(r => renderRegion(r))}

              {/* Layer 2: Bold outline pass on top creates colouring-book look */}
              {SCENE_REGIONS[scene].map(r => {
                const outlineProps = { key:`ol-${r.id}`, fill:'none',
                  stroke:'rgba(58,40,80,0.55)', strokeWidth:'2',
                  strokeLinejoin:'round' as const, strokeLinecap:'round' as const,
                  pointerEvents:'none' as const };
                if (r.type === 'rect')    return <rect    {...outlineProps} {...r.props} />;
                if (r.type === 'circle')  return <circle  {...outlineProps} {...r.props} />;
                if (r.type === 'ellipse') return <ellipse {...outlineProps} {...r.props} />;
                if (r.type === 'polygon') return <polygon {...outlineProps} {...r.props} />;
                if (r.type === 'path' && !r.props.stroke)
                  return <path {...outlineProps} {...r.props} fill="none" stroke="rgba(58,40,80,0.55)" strokeWidth="2"/>;
                return null;
              })}
            </svg>
          </div>

          {/* Colour palette */}
          <div className="lg:w-48 rounded-[28px] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            style={{ background: 'white' }}>
            <p className="font-display text-[1rem] text-text-deep mb-4 text-center">Choose Colour</p>
            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
              {PALETTE.map(c => (
                <motion.button key={c}
                  whileHover={{ scale: 1.15 }} whileTap={{ scale: .9 }}
                  onClick={() => { setColor(c); play('click'); }}
                  className="w-full aspect-square rounded-full transition-all duration-200"
                  style={{
                    background: c,
                    border: color === c ? '3px solid #4A3860' : '2px solid rgba(0,0,0,0.1)',
                    boxShadow: color === c ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                    transform: color === c ? 'scale(1.2)' : 'scale(1)',
                  }} />
              ))}
            </div>
            {/* Custom color */}
            <div className="mt-3">
              <p className="text-[.75rem] font-bold text-text-mid mb-2 text-center">Custom</p>
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="w-full h-10 rounded-xl cursor-none border-0"
                style={{ padding: '0 4px' }} />
            </div>
            {/* Current color preview */}
            <div className="mt-4 p-3 rounded-[16px] flex items-center gap-2"
              style={{ background: 'rgba(0,0,0,0.04)' }}>
              <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ background: color }} />
              <span className="text-[.75rem] font-bold text-text-mid">Active colour</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="max-w-4xl mx-auto mt-6">
          <div className="grid sm:grid-cols-3 gap-3">
            {['Click any shape to fill it with your chosen colour 🖌',
              "Try different colours for each part of Sia's world! 🌈",
              'Click Save to download your masterpiece! ⬇'].map((tip, i) => (
              <div key={i} className="p-4 rounded-[18px] text-center"
                style={{ background: 'white' }}>
                <p className="text-[.82rem] font-semibold text-text-mid">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
