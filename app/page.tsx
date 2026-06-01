import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import MeetSia from '@/components/MeetSia';
import Family from '@/components/Family';
import WatchVideos from '@/components/WatchVideos';
import SiaComics from '@/components/SiaComics';
import SiaGames from '@/components/SiaGames';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <MeetSia />
        <Family />
        <SiaComics />
        <WatchVideos />
        <SiaGames />
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
