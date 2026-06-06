'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/hooks/useBadges';

/* ── Badge earned toast ── */
export function BadgeToast({ badge, onClose }: { badge: Badge | null; onClose: () => void }) {
  useEffect(() => {
    if (!badge) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [badge, onClose]);

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999]
                     flex items-center gap-4 px-6 py-4 rounded-[24px]
                     shadow-[0_12px_48px_rgba(122,92,170,0.35)]"
          style={{ background: 'white', minWidth: 260, maxWidth: 340 }}
        >
          <div className="w-14 h-14 rounded-[18px] flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: badge.bg }}>
            {badge.emoji}
          </div>
          <div>
            <p className="font-display text-[0.7rem] tracking-widest uppercase"
              style={{ color: '#9A8AB0' }}>Badge Earned!</p>
            <p className="font-display text-[1.1rem]" style={{ color: '#4A3860' }}>{badge.name}</p>
            <p className="text-[0.78rem] font-semibold" style={{ color: '#7A6890' }}>{badge.desc}</p>
          </div>
          <button onClick={onClose} className="ml-auto text-[#9A8AB0] hover:text-[#4A3860] transition-colors text-xl">✕</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Generic info toast ── */
interface ToastMsg { id: number; msg: string; emoji?: string; }

let listeners: ((t: ToastMsg) => void)[] = [];
let idCounter = 0;

export function showToast(msg: string, emoji = '✨') {
  listeners.forEach(fn => fn({ id: ++idCounter, msg, emoji }));
}

export function ToastContainer() {
  const [toasts, setToasts] = (typeof window !== 'undefined')
    ? [[] as ToastMsg[], (f: any) => {}]
    : [[] as ToastMsg[], (f: any) => {}];

  // Use proper React state
  return null; // placeholder see SimpleToast below
}

/* Simpler self-contained version used in pages */
export function SimpleToast({ msg, emoji = '✨', visible, onClose }:
  { msg: string; emoji?: string; visible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[99999]
                     flex items-center gap-3 px-6 py-3.5 rounded-full
                     shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)', color: 'white' }}
        >
          <span className="text-xl">{emoji}</span>
          <span className="font-bold text-[0.95rem]">{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
