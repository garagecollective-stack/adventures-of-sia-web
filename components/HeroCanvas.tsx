'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const COLORS = [
  '#C8A8D8', '#C8A8D8', '#C8A8D8',
  '#A8D8C4', '#A8D8C4', '#A8D8C4',
  '#F0E0A0', '#F0E0A0',
  '#A8C8E0', '#A8C8E0', '#A8C8E0',
  '#FFB8C4', '#FFB8C4',
  '#AABFE0', '#AABFE0',
  '#F5E088',
  '#7A5CAA',
  '#E2C898',
  '#B0B8C8',
  '#DDD0EC',
];

interface Orb {
  id: number;
  pos: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
}

function PomOrb({ pos, color, scale, speed, distort }: Omit<Orb, 'id'>) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float speed={speed} rotationIntensity={0.15} floatIntensity={2.5}>
      <mesh ref={meshRef} position={pos}>
        <sphereGeometry args={[scale, 28, 28]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.5}
          roughness={0.85}
          metalness={0.0}
          opacity={0.72}
          transparent
        />
      </mesh>
    </Float>
  );
}

function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -4]}>
      <sphereGeometry args={[4, 32, 32]} />
      <meshBasicMaterial color="#C8A8D8" transparent opacity={0.04} />
    </mesh>
  );
}

export default function HeroCanvas() {
  const orbs = useMemo<Orb[]>(() =>
    Array.from({ length: 48 }, (_, i) => ({
      id: i,
      pos: [
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10 - 2,
      ] as [number, number, number],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      scale: 0.1 + Math.random() * 0.55,
      speed: 0.3 + Math.random() * 1.8,
      distort: 0.15 + Math.random() * 0.45,
    }))
  , []);

  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 58 }}
      style={{ background: 'transparent', position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={2.2} color="#fff9f5" />
      <directionalLight position={[10, 10, 10]} intensity={0.9} color="#fffaf0" />
      <pointLight position={[-7, 5, 8]}  intensity={1.4} color="#C8A8D8" />
      <pointLight position={[8, -4, 6]}  intensity={1.0} color="#A8D8C4" />
      <pointLight position={[0, 8, 4]}   intensity={0.7} color="#A8C8E0" />

      <Stars
        radius={40}
        depth={30}
        count={700}
        factor={1.3}
        saturation={0.4}
        fade
        speed={0.25}
      />

      <GlowOrb />

      {orbs.map(({ id, ...rest }) => (
        <PomOrb key={id} {...rest} />
      ))}
    </Canvas>
  );
}
