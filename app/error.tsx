'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(180deg,#EBF6FF,#FFFBF4)' }}>
      <div className="text-[5rem] mb-4 anim-float">😟</div>
      <h1 className="font-display text-[2.2rem] text-text-deep mb-3">Something went wobbly!</h1>
      <p className="text-text-mid text-[1rem] leading-[1.8] mb-8 max-w-md">
        Even Sia has wobbly days. Don&apos;t worry we can fix this!
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={reset}
          className="btn-sia text-white font-display text-[1rem] px-8 py-3.5"
          style={{ background: 'linear-gradient(135deg,#7A5CAA,#AABFE0)' }}>
          🔄 Try Again
        </button>
        <Link href="/"
          className="btn-sia font-display text-[1rem] px-8 py-3.5 border-2 text-brand-violet"
          style={{ background:'rgba(255,255,255,.7)', borderColor:'rgba(122,92,170,.35)' }}>
          🏠 Home
        </Link>
      </div>
    </main>
  );
}
