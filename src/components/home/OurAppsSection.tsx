import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AppRowProps {
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  onStoreClick: () => void;
}

function AppRow({ name, description, color, icon, onStoreClick }: AppRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 border-b border-gray-200 last:border-b-0">
      {/* Icon */}
      <div className={`flex-shrink-0 w-14 h-14 ${color} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>

      {/* Name & Description */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-0.5">{description}</p>
      </div>

      {/* Store Badges - open launch soon modal */}
      <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 flex-wrap">
        <button
          type="button"
          onClick={onStoreClick}
          className="transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
          aria-label="Download on the App Store"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-9 sm:h-10 w-auto"
          />
        </button>
        <button
          type="button"
          onClick={onStoreClick}
          className="transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
          aria-label="Get it on Google Play"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-9 sm:h-10 w-auto"
          />
        </button>
      </div>
    </div>
  );
}

export default function OurAppsSection() {
  const { t } = useTranslation();
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);

  const apps = [
    {
      name: t('common.farmer'),
      description: t('ourAppsSection.farmerDesc'),
      color: 'bg-green-100',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: t('common.ourVet'),
      description: t('ourAppsSection.vetDesc'),
      color: 'bg-red-100',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section aria-labelledby="our-apps-heading" className="py-8 sm:py-10 lg:py-12">
        <div className="text-center mb-8 sm:mb-10 px-2">
          <h2 id="our-apps-heading" className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
            {t('ourAppsSection.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-2">
            {t('ourAppsSection.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 p-4 sm:p-6 lg:p-8">
          {apps.map((app) => (
            <AppRow
              key={app.name}
              {...app}
              onStoreClick={() => setIsLaunchModalOpen(true)}
            />
          ))}
        </div>
        </div>
      </section>

      {/* Launch soon modal */}
      {isLaunchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="launch-modal-title"
          onClick={() => setIsLaunchModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 sm:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 id="launch-modal-title" className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              {t('banner.launchingSoon')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {t('banner.stayTuned')}
            </p>
            <button
              type="button"
              onClick={() => setIsLaunchModalOpen(false)}
              className="w-full rounded-full bg-green-400 text-white py-2.5 px-4 font-medium hover:bg-green-500 transition active:scale-[0.98]"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
