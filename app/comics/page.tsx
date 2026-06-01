import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import ComicsLibrary from '@/components/ComicsLibrary';

export const metadata: Metadata = {
  title: "Sia's Comic Adventures — Read All Comics",
  description: 'Flip through every Adventures of Sia comic book in order, right in your browser.',
};

export default function ComicsPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <ComicsLibrary />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
