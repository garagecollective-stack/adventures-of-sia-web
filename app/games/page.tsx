import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SiaGames from '@/components/SiaGames';

export default function GamesPage() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main className="pt-24 sm:pt-28">
        <SiaGames />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
