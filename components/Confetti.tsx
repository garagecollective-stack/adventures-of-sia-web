'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  rotation: number; rotSpeed: number;
  color: string; size: number;
  life: number; maxLife: number;
  shape: 'circle' | 'rect' | 'star';
}

const COLORS = ['#7A5CAA','#C8A8D8','#F5E088','#A8D8C4','#FFB8C4','#AABFE0','#E2C898','#FF6B6B','#40C040'];

function createParticles(cx: number, cy: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 10;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - .5) * 12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 5 + Math.random() * 8,
      life: 1,
      maxLife: 80 + Math.random() * 60,
      shape: (['circle','rect','star'] as const)[Math.floor(Math.random() * 3)],
    };
  });
}

interface ConfettiProps {
  trigger: boolean;
  onDone?: () => void;
  origin?: { x: number; y: number }; // 0-1 normalized
}

export default function Confetti({ trigger, onDone, origin = { x: .5, y: .4 } }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef    = useRef<number>(0);
  const running   = useRef(false);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;

    const cx = origin.x * canvas.width;
    const cy = origin.y * canvas.height;
    particles.current = [
      ...createParticles(cx, cy, 80),
      ...createParticles(cx - 60, cy + 20, 40),
      ...createParticles(cx + 60, cy + 20, 40),
    ];
    running.current = true;

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a1 = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const a2 = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) ctx.moveTo(x + r * Math.cos(a1), y + r * Math.sin(a1));
        else ctx.lineTo(x + r * Math.cos(a1), y + r * Math.sin(a1));
        ctx.lineTo(x + (r / 2) * Math.cos(a2), y + (r / 2) * Math.sin(a2));
      }
      ctx.closePath();
    };

    const loop = () => {
      if (!running.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.current.forEach(p => {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += .35; // gravity
        p.vx *= .99;
        p.rotation += p.rotSpeed;
        p.life -= 1;
        if (p.life <= 0) return;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.min(1, p.life / 20);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          drawStar(ctx, 0, 0, p.size / 2); ctx.fill();
        }
        ctx.restore();
      });
      if (alive) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        running.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onDone?.();
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); running.current = false; };
  }, [trigger]);

  if (!trigger) return null;
  return (
    <canvas ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99990]"
      style={{ width: '100vw', height: '100vh' }} />
  );
}
