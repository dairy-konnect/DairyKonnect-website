import { useTranslation } from 'react-i18next';
import AboutHeroVisual from './AboutHeroVisual';

export default function AboutHero() {
  const { t } = useTranslation();
  const features = [
    {
      icon: '⚡',
      title: t('about.lightningFast.title'),
      description: t('about.lightningFast.description'),
    },
    {
      icon: '📊',
      title: t('about.automatedBillingSystem.title'),
      description: t('about.automatedBillingSystem.description'),
    },
    {
      icon: '🔒',
      title: t('about.securePayment.title'),
      description: t('about.securePayment.description'),
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-dk-line/80 bg-gradient-to-b from-dk-cream via-white to-dk-cream pb-12 pt-6 sm:pb-16 sm:pt-8">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl sm:h-96 sm:w-96"
        style={{ background: 'radial-gradient(circle, rgba(67,196,126,.25), transparent 70%)' }}
        aria-hidden
      />
      <div className="home-section-inner relative">
        <header className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_var(--green-200)]" aria-hidden />
            {t('common.about')}
          </div>
          <h1 className="font-serif mt-5 text-4xl font-semibold tracking-tight text-dk-green-900 sm:text-5xl md:text-[3.15rem]">
            {t('about.title')}{' '}
            <em className="not-italic font-medium text-dk-green-700">{t('about.subtitle')}</em>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-dk-ink-2 sm:text-lg">{t('about.description1')}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-dk-muted sm:text-base">{t('about.description2')}</p>
        </header>

        <div className="relative mx-auto mt-12 flex max-w-5xl flex-col items-stretch gap-10 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md shrink-0 md:mx-0 md:max-w-lg">
            <AboutHeroVisual />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl font-semibold text-dk-green-900 sm:text-3xl">{t('about.latestFeatures')}</h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-dk-muted sm:text-base">{t('about.latestFeaturesDescription')}</p>

            <ul className="mt-8 flex flex-col gap-4 sm:gap-5">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-2xl border border-dk-line/80 bg-white/90 p-4 shadow-dk-sm transition hover:border-dk-green-200 sm:p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dk-green-100 text-xl ring-1 ring-dk-green-200/60">
                    <span aria-hidden>{feature.icon}</span>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-serif text-base font-semibold text-dk-green-900 sm:text-lg">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-dk-ink-2">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

