import { useTranslation } from 'react-i18next';
import aboutVideo from '../../assets/about.mp4';

export default function VideoSection() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="video-heading" className="py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Title & Description */}
        <div className="text-center mb-8 sm:mb-10 px-2">
          <h2 id="video-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('videoSection.title')}
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-base sm:text-lg font-medium px-2">
            {t('videoSection.description')}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden" style={{ boxShadow: 'inset 0 0 0 2px #e5e7eb' }}>
          <div className="absolute inset-0 w-full h-full">
            <video
              src={aboutVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content overlay - responsive min-height and padding */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">{t('videoSection.feature1Title')}</h3>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1">{t('videoSection.feature1Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">{t('videoSection.feature2Title')}</h3>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1">{t('videoSection.feature2Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 sm:col-span-2 lg:col-span-1">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">{t('videoSection.feature3Title')}</h3>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1">{t('videoSection.feature3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
