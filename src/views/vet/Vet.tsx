import { FaStethoscope, FaPills, FaUserMd, FaSearch, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function Vet() {
  const { t } = useTranslation()
  const features = [
    {
      icon: FaSearch,
      title: t('vet.features.symptomFinder.title'),
      description: t('vet.features.symptomFinder.description'),
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      icon: FaUserMd,
      title: t('vet.features.consult.title'),
      description: t('vet.features.consult.description'),
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      icon: FaPills,
      title: t('vet.features.medicineDatabase.title'),
      description: t('vet.features.medicineDatabase.description'),
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    {
      icon: FaClipboardCheck,
      title: t('vet.features.healthRecords.title'),
      description: t('vet.features.healthRecords.description'),
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    },
    {
      icon: FaShieldAlt,
      title: t('vet.features.preventiveCare.title'),
      description: t('vet.features.preventiveCare.description'),
      color: 'bg-red-50 border-red-200 text-red-600'
    },
    {
      icon: FaStethoscope,
      title: t('vet.features.emergencyCare.title'),
      description: t('vet.features.emergencyCare.description'),
      color: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    }
  ]

  const animals = [
    t('vet.animals.cows'),
    t('vet.animals.buffaloes'),
    t('vet.animals.goats'),
    t('vet.animals.sheep'),
    t('vet.animals.poultry')
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-green-50 to-[#f7f9ff]">
      {/* Hero Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('vet.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            {t('vet.subtitle')}
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {t('vet.description')}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-4">
            {t('vet.keyFeatures')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('vet.keyFeaturesDesc')}
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
            {t('vet.howItWorks')}
          </h2>
          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('vet.steps.step1Title')}</h3>
                <p className="text-gray-600">
                  {t('vet.steps.step1Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('vet.steps.step2Title')}</h3>
                <p className="text-gray-600">
                  {t('vet.steps.step2Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('vet.steps.step3Title')}</h3>
                <p className="text-gray-600">
                  {t('vet.steps.step3Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('vet.steps.step4Title')}</h3>
                <p className="text-gray-600">
                  {t('vet.steps.step4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Animals Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t('vet.supportedAnimals')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('vet.supportedAnimalsDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {animals.map((animal, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white border border-green-200 rounded-full text-gray-700 font-medium hover:bg-green-50 hover:border-green-400 transition"
              >
                {animal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {t('vet.readyToStart')}
          </h2>
          <p className="text-gray-600 mb-8">
            {t('vet.readyToStartDesc')}
          </p>
          <button className="relative bg-green-400 hover:bg-green-500 text-white py-3 px-8 rounded-full transition overflow-hidden group text-lg font-medium">
            <span className="relative z-10 flex items-center gap-2">
              {t('vet.loginButton')}
              <FaStethoscope className="w-5 h-5" />
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          </button>
        </div>
      </section>
    </div>
  )
}

