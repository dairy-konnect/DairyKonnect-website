import { FaIndustry, FaUsers, FaChartBar, FaMoneyBillWave, FaClipboardList, FaTachometerAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function Dairy() {
  const { t } = useTranslation()
  const features = [
    {
      icon: FaUsers,
      title: t('dairy.features.vendorManagement.title'),
      description: t('dairy.features.vendorManagement.description'),
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      icon: FaIndustry,
      title: t('dairy.features.farmerNetwork.title'),
      description: t('dairy.features.farmerNetwork.description'),
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      icon: FaClipboardList,
      title: t('dairy.features.collectionReports.title'),
      description: t('dairy.features.collectionReports.description'),
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    {
      icon: FaMoneyBillWave,
      title: t('dairy.features.paymentManagement.title'),
      description: t('dairy.features.paymentManagement.description'),
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    },
    {
      icon: FaChartBar,
      title: t('dairy.features.analytics.title'),
      description: t('dairy.features.analytics.description'),
      color: 'bg-red-50 border-red-200 text-red-600'
    },
    {
      icon: FaTachometerAlt,
      title: t('dairy.features.qualityMonitoring.title'),
      description: t('dairy.features.qualityMonitoring.description'),
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    }
  ]

  const capabilities = [
    t('dairy.capabilities.central'),
    t('dairy.capabilities.oversight'),
    t('dairy.capabilities.quality'),
    t('dairy.capabilities.analytics'),
    t('dairy.capabilities.payment')
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-green-50 to-[#f7f9ff]">
      {/* Hero Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('dairy.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            {t('dairy.subtitle')}
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {t('dairy.description')}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
            {t('dairy.keyFeatures')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('dairy.keyFeaturesDesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
            {t('dairy.howItWorks')}
          </h2>
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dairy.steps.step1Title')}</h3>
                <p className="text-gray-600">
                  {t('dairy.steps.step1Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dairy.steps.step2Title')}</h3>
                <p className="text-gray-600">
                  {t('dairy.steps.step2Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dairy.steps.step3Title')}</h3>
                <p className="text-gray-600">
                  {t('dairy.steps.step3Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dairy.steps.step4Title')}</h3>
                <p className="text-gray-600">
                  {t('dairy.steps.step4Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                5
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dairy.steps.step5Title')}</h3>
                <p className="text-gray-600">
                  {t('dairy.steps.step5Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t('dairy.capabilitiesTitle')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('dairy.capabilitiesDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white border border-green-200 rounded-full text-gray-700 font-medium hover:bg-green-50 hover:border-green-400 transition"
              >
                {capability}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t('dairy.readyToStart')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('dairy.readyToStartDesc')}
          </p>
          <button className="relative bg-green-400 hover:bg-green-500 text-white py-3 px-8 rounded-full transition overflow-hidden group text-lg font-medium">
            <span className="relative z-10 flex items-center gap-2">
              {t('dairy.loginButton')}
              <FaIndustry className="w-5 h-5" />
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          </button>
        </div>
      </section>
    </div>
  )
}

