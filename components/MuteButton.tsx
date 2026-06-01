'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSoundMuted, setSoundMuted } from '@/hooks/useSound';

export default function MuteButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => { setMuted(getSoundMuted()); }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: .9 }}
      title={muted ? 'Unmute sounds' : 'Mute sounds'}
      className="w-9 h-9 rounded-full flex items-center justify-center text-base
                 transition-colors duration-200"
      style={{
        background: muted ? 'rgba(122,92,170,.15)' : 'rgba(122,92,170,.08)',
        color: muted ? '#7A5CAA' : '#9A8AB0',
      }}>
      {muted ? '🔇' : '🔊'}
    </motion.button>
  );
}
