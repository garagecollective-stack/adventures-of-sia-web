'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 14 }: TiltCardProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const config = { stiffness: 180, damping: 28 };
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), config);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), config);
  const shineX  = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const shineY  = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const shineBackground = useTransform(
    [shineX, shineY] as [typeof shineX, typeof shineY],
    (latest: number[]) =>
      `radial-gradient(circle at ${latest[0] * 100}% ${latest[1] * 100}%, rgba(255,255,255,0.28) 0%, transparent 60%)`
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top)  / rect.height);
  }, [rawX, rawY, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      whileHover={{ z: 30, scale: 1.02 }}
      transition={{ scale: { type: 'spring', stiffness: 200, damping: 25 } }}
      className={`relative ${className}`}
    >
      {children}
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 opacity-0
                   group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: shineBackground }}
      />
    </motion.div>
  );
}
