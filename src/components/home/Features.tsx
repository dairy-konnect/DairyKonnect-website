import { FaExchangeAlt, FaFileInvoiceDollar, FaCreditCard } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export default function Features() {
  const { t } = useTranslation()
  const features = [
    {
      icon: FaExchangeAlt,
      title: t('features.transactionManagement.title'),
      description: t('features.transactionManagement.description'),
      color: "bg-blue-50 border-blue-200 text-blue-600"
    },
    {
      icon: FaFileInvoiceDollar,
      title: t('features.automatedBilling.title'),
      description: t('features.automatedBilling.description'),
      color: "bg-green-50 border-green-200 text-green-600"
    },
    {
      icon: FaCreditCard,
      title: t('features.paymentTracking.title'),
      description: t('features.paymentTracking.description'),
      color: "bg-purple-50 border-purple-200 text-purple-600"
    }
  ]

  return (
    <section aria-labelledby="features-heading" className="py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-semibold text-center text-gray-900">
          {t('features.title')}
        </h2>
        <p className="text-sm md:text-base text-slate-500 text-center mt-3 max-w-2xl mx-auto">
          {t('features.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index} 
                className="group bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

