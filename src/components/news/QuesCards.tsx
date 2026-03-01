import { useTranslation } from 'react-i18next'
import Cards from './Cards';

export default function QuesCards() {
  const { t } = useTranslation()
  return (
    <section>
      <div className="mb-8 text-center">
        <h3 className="text-sm text-green-500 font-medium mb-2">{t('common.ourNews')}</h3>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
          {t('common.ourLatestNews')}
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          {t('common.exploreArticles')}
        </p>
      </div>
      <Cards />
    </section>
  );
}
