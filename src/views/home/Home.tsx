import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import Hero from '../../components/home/Hero'
import Features from '../../components/home/Features'
import VideoSection from '../../components/home/VideoSection'
import OurAppsSection from '../../components/home/OurAppsSection'
import TestimonialSlider from '../../components/home/TestimonialSlider'
import UserTypeModal from '../../components/UserTypeModal'

export default function Home() {
  const { t } = useTranslation()
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false)

  return (
    <div className="min-h-full">
      <Hero />

      {/* Main content sections */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 py-12">
        <Features />

        <VideoSection />

        {/* <section aria-labelledby="testimonial-heading" className="mb-16">
          <h2 id="testimonial-heading" className="text-3xl font-semibold text-center text-gray-900 mb-8">
            {t('common.testimonials')}
          </h2>
          <TestimonialSlider />
        </section> */}


        <OurAppsSection />


        

        <section aria-labelledby="cta-heading" className="py-12">
          <div className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
              <p className="text-xl font-medium max-w-md text-slate-800">
                {t('home.ctaText')}
              </p>
              <button
                onClick={() => setIsUserTypeModalOpen(true)}
                className="relative flex items-center gap-2 rounded-full py-3 px-8 bg-green-400 text-white transition overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>{t('common.getStarted')}</span>
                  <FaArrowRight className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
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
  )
}
