import { useTranslation } from 'react-i18next'
import bgVideo from '../../assets/bg.mp4'

export default function AboutHero() {
  const { t } = useTranslation()
  const features = [
    {
      icon: '⚡',
      title: t('about.lightningFast.title'),
      description: t('about.lightningFast.description')
    },
    {
      icon: '📊',
      title: t('about.automatedBillingSystem.title'),
      description: t('about.automatedBillingSystem.description')
    },
    {
      icon: '🔒',
      title: t('about.securePayment.title'),
      description: t('about.securePayment.description')
    }
  ]

  return (
    <section className="py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mx-auto text-gray-900">
        {t('about.title')} <span className="text-green-500">{t('about.subtitle')}</span>
      </h1>
      <p className="text-base md:text-lg text-slate-600 text-center mt-4 max-w-3xl mx-auto leading-relaxed">
        {t('about.description1')}
      </p>
      <p className="text-sm md:text-base text-slate-500 text-center mt-4 max-w-2xl mx-auto">
        {t('about.description2')}
      </p>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10 relative">
        <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-green-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        <video 
          className="w-auto rounded-xl h-80 object-cover"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
        />

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{t('about.latestFeatures')}</h1>
          <p className="text-sm text-slate-500 mt-2">
            {t('about.latestFeaturesDescription')}
          </p>

          <div className="flex flex-col gap-10 mt-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="size-9 p-2 bg-green-50 border border-green-200 rounded flex items-center justify-center text-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-700">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

