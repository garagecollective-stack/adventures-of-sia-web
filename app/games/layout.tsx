import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games — Adventures of Sia',
  description: 'Play fun games with Sia the bunny!',
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
