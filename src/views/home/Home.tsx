import { useCallback, useState } from 'react';
import Hero from '../../components/home/Hero';
import HomeEcosystemSection from '../../components/home/HomeEcosystemSection';
import HomeWhyStrip from '../../components/home/HomeWhyStrip';
import HomeHowItWorks from '../../components/home/HomeHowItWorks';
import HomeAiSection from '../../components/home/HomeAiSection';
// import HomeTestimonialsSection from '../../components/home/HomeTestimonialsSection';
import HomeRewardsSection from '../../components/home/HomeRewardsSection';
import HomePricingSection from '../../components/home/HomePricingSection';
import HomeFaqSection from '../../components/home/HomeFaqSection';
import HomeCtaBanner from '../../components/home/HomeCtaBanner';
import UserTypeModal from '../../components/UserTypeModal';

export default function Home() {
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);

  const openUserTypeModal = useCallback(() => setIsUserTypeModalOpen(true), []);
  const closeUserTypeModal = useCallback(() => setIsUserTypeModalOpen(false), []);

  const scrollToHow = useCallback(() => {
    document.getElementById('home-how-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <Hero onGetStarted={openUserTypeModal} onWatchDemo={scrollToHow} />
      <HomeEcosystemSection />
      <HomeWhyStrip />
      <HomeHowItWorks />
      <HomeAiSection />
      {/* <HomeTestimonialsSection /> */}
      <HomeRewardsSection />
      <HomePricingSection onStartFree={openUserTypeModal} onStartTrial={openUserTypeModal} />
      <HomeFaqSection />
      <HomeCtaBanner onGetStarted={openUserTypeModal} />
      <UserTypeModal isOpen={isUserTypeModalOpen} onClose={closeUserTypeModal} />
    </div>
  );
}
