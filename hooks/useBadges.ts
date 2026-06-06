'use client';
import { useState, useCallback, useEffect } from 'react';

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  color: string;
  bg: string;
  earned: boolean;
  earnedAt?: string;
};

export const BADGE_DEFS: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  { id: 'explorer',   name: 'Explorer',       emoji: '🔍', desc: 'Visited Sia\'s world map',    color: '#307A5A', bg: '#A8D8C4' },
  { id: 'artist',     name: 'Super Artist',   emoji: '🎨', desc: 'Coloured a picture of Sia',   color: '#7A5CAA', bg: '#C8A8D8' },
  { id: 'memory',     name: 'Memory Master',  emoji: '🧠', desc: 'Won the memory card game',    color: '#806010', bg: '#F5E088' },
  { id: 'puzzle',     name: 'Puzzle Solver',  emoji: '🔎', desc: 'Found all the differences',   color: '#A0406A', bg: '#FFB8C4' },
  { id: 'adventurer', name: 'Adventurer',     emoji: '🌟', desc: 'Watched an episode',          color: '#2870A8', bg: '#A8C8E0' },
  { id: 'voter',      name: 'Star Voter',     emoji: '⭐', desc: 'Answered Sia\'s question',    color: '#9A7010', bg: '#F0E0A0' },
  { id: 'maker',      name: 'Creative Maker', emoji: '✏️', desc: 'Downloaded an activity',      color: '#3A7850', bg: '#8AB890' },
  { id: 'superfan',   name: 'Super Fan',      emoji: '💜', desc: 'Earned 5 badges wow!',      color: '#FFFFFF', bg: '#7A5CAA' },
];

function load(): Record<string, { earned: boolean; earnedAt?: string }> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('sia-badges') ?? '{}'); }
  catch { return {}; }
}

function save(data: Record<string, { earned: boolean; earnedAt?: string }>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sia-badges', JSON.stringify(data));
}

export function useBadges() {
  const [data, setData] = useState<Record<string, { earned: boolean; earnedAt?: string }>>({});
  const [newBadge, setNewBadge] = useState<Badge | null>(null);

  useEffect(() => { setData(load()); }, []);

  const earn = useCallback((id: string) => {
    setData(prev => {
      if (prev[id]?.earned) return prev;
      const next = { ...prev, [id]: { earned: true, earnedAt: new Date().toISOString() } };
      const count = Object.values(next).filter(b => b.earned).length;
      if (count >= 5 && !next['superfan']?.earned)
        next['superfan'] = { earned: true, earnedAt: new Date().toISOString() };
      save(next);
      const def = BADGE_DEFS.find(b => b.id === id);
      if (def) setNewBadge({ ...def, earned: true });
      return next;
    });
  }, []);

  const clearNew = useCallback(() => setNewBadge(null), []);

  const badges: Badge[] = BADGE_DEFS.map(b => ({
    ...b,
    earned: !!data[b.id]?.earned,
    earnedAt: data[b.id]?.earnedAt,
  }));

  const earnedCount = badges.filter(b => b.earned).length;

  return { badges, earn, earnedCount, newBadge, clearNew };
}
