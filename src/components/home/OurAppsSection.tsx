import { useTranslation } from 'react-i18next';

interface AppRowProps {
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  appStoreLink?: string;
  playStoreLink?: string;
}

function AppRow({ name, description, color, icon, appStoreLink = '#', playStoreLink = '#' }: AppRowProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-6 border-b border-gray-200 last:border-b-0">
      {/* Icon */}
      <div className={`flex-shrink-0 w-14 h-14 ${color} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>

      {/* Name & Description */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Store Badges */}
      <div className="flex items-center gap-3">
        <a
          href={appStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:opacity-80"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-10"
          />
        </a>
        <a
          href={playStoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:opacity-80"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="h-10"
          />
        </a>
      </div>
    </div>
  );
}

export default function OurAppsSection() {
  const { t } = useTranslation();

  const apps = [
    {
      name: t('common.farmer'),
      description: t('ourAppsSection.farmerDesc'),
      color: 'bg-green-100',
      icon: (
        <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      appStoreLink: '#',
      playStoreLink: '#',
    },
    {
      name: t('common.vendor'),
      description: t('ourAppsSection.vendorDesc'),
      color: 'bg-blue-100',
      icon: (
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      appStoreLink: '#',
      playStoreLink: '#',
    },
    {
      name: t('common.dairy'),
      description: t('ourAppsSection.dairyDesc'),
      color: 'bg-purple-100',
      icon: (
        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      appStoreLink: '#',
      playStoreLink: '#',
    },
    {
      name: t('common.ourVet'),
      description: t('ourAppsSection.vetDesc'),
      color: 'bg-red-100',
      icon: (
        <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      appStoreLink: '#',
      playStoreLink: '#',
    },
  ];

  return (
    <section aria-labelledby="our-apps-heading" className="py-12">
      <div className="text-center mb-10">
        <h2 id="our-apps-heading" className="text-3xl font-semibold text-gray-900 mb-4">
          {t('ourAppsSection.title')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('ourAppsSection.description')}
        </p>
      </div>

      {/* Container with solid border like testimonial cards */}
      <div className="border border-gray-200 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 max-w-4xl mx-auto p-6 sm:p-8">
        {apps.map((app) => (
          <AppRow key={app.name} {...app} />
        ))}
      </div>
    </section>
  );
}
