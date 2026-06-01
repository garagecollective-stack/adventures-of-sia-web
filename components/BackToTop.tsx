'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: .8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: .8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: .92 }}
          className="fixed bottom-6 right-6 z-[9000] w-12 h-12 rounded-full flex items-center
                     justify-center text-white shadow-[0_8px_24px_rgba(122,92,170,0.4)]"
          style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}
          aria-label="Back to top">
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
