import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Hero from '../../components/home/Hero';
import Features from '../../components/home/Features';
import VideoSection from '../../components/home/VideoSection';
import OurAppsSection from '../../components/home/OurAppsSection';
import UserTypeModal from '../../components/UserTypeModal';

export default function Home() {
  const { t } = useTranslation();
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);

  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <Hero />

      {/* Main content - responsive padding for all screens */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-10 lg:py-16 xl:px-12 xl:py-20 2xl:px-16">
        <Features />

        <VideoSection />

        <OurAppsSection />

        {/* CTA section */}
        <section aria-labelledby="cta-heading" className="py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-6 sm:gap-8 px-2 sm:px-4 md:px-6 lg:px-10 border-x border-dashed border-slate-200 py-12 sm:py-16 md:py-20 -mt-8 -mb-8 sm:-mt-10 sm:-mb-10 w-full">
              <p className="text-base sm:text-lg md:text-xl font-medium max-w-md text-slate-800">
                {t('home.ctaText')}
              </p>
              <button
                onClick={() => setIsUserTypeModalOpen(true)}
                className="relative flex items-center justify-center gap-2 rounded-full py-3 px-6 sm:px-8 bg-green-400 text-white text-sm sm:text-base transition overflow-hidden group shrink-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{t('common.getStarted')}</span>
                  <FaArrowRight className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <UserTypeModal
        isOpen={isUserTypeModalOpen}
        onClose={() => setIsUserTypeModalOpen(false)}
      />
    </div>
  );
}
