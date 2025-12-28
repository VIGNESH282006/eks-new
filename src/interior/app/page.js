import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SplitStickySection from '@/components/SplitStickySection';
import FlyingMaskTransition from '@/components/FlyingMaskTransition';
import StackingCardsSection from '@/components/StackingCardsSection';

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <SplitStickySection />
        <FlyingMaskTransition />
        <StackingCardsSection />
      </main>
    </SmoothScroll>
  );
}
