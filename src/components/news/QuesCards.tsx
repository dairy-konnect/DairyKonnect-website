import { useTranslation } from 'react-i18next'
import Cards from './Cards';

export default function QuesCards() {
  const { t } = useTranslation()
  return (
    <section className="relative">
      <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm dark:bg-dk-cream-2/90">
          <span className="h-1.5 w-1.5 rounded-full bg-dk-green-500" aria-hidden />
          {t('common.ourNews')}
        </div>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.35rem]">
          {t('common.ourLatestNews')}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-dk-muted sm:text-[15px]">
          {t('common.exploreArticles')}
        </p>
        <div
          className="mx-auto mt-6 h-px max-w-xs bg-gradient-to-r from-transparent via-dk-gold/50 to-transparent"
          aria-hidden
        />
      </header>
      <Cards />
    </section>
  );
}
