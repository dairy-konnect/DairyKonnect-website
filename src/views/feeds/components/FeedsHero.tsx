import { useTranslation } from 'react-i18next'
import { FaCartShopping } from 'react-icons/fa6'
import { FaSyncAlt } from 'react-icons/fa'

type Props = {
  onBrowseCatalog: () => void
  onSubscribeScroll: () => void
}

export default function FeedsHero({ onBrowseCatalog, onSubscribeScroll }: Props) {
  const { t } = useTranslation()

  return (
    <section className="border-b border-dk-line/80 bg-dk-cream px-4 py-[60px] font-sans sm:px-6 md:px-8 lg:py-[80px]">
      <div className="mx-auto mb-[60px] grid max-w-[1320px] grid-cols-1 items-center gap-[30px] lg:mb-[80px] lg:grid-cols-2 lg:gap-[60px]">
        <div className="max-w-[560px] font-sans">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-[14px] py-1.5 font-sans text-[12.5px] font-semibold leading-none text-[#a8761c] shadow-dk-sm">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full bg-dk-gold shadow-[0_0_0_4px_#fef0d4]"
              aria-hidden
            />
            {t('feedsPage.heroEyebrow')}
          </div>

          <h1 className="feeds-hero-title mb-5">
            <span className="text-dk-green-900">{t('feedsPage.heroTitle')}</span>{' '}
            <em className="feeds-hero-em">{t('feedsPage.heroTitleEm')}</em>
          </h1>

          <p className="mb-8 max-w-[520px] font-sans text-[18px] font-normal leading-[1.55] text-dk-ink-2">
            {t('feedsPage.heroLead')}
          </p>

          <div className="flex flex-wrap gap-3.5 font-sans">
            <button
              type="button"
              onClick={onBrowseCatalog}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-dk-green-800 px-6 text-[14px] font-semibold leading-none text-white shadow-dk-sm transition hover:-translate-y-px hover:bg-dk-green-900 hover:shadow-dk-md"
            >
              <FaCartShopping className="h-4 w-4 shrink-0" aria-hidden />
              {t('feedsPage.ctaBrowse')}
            </button>
            <button
              type="button"
              onClick={onSubscribeScroll}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-dk-line bg-white px-6 text-[14px] font-semibold leading-none text-dk-ink-2 shadow-dk-sm transition hover:border-dk-green-600 hover:text-dk-green-800"
            >
              <FaSyncAlt className="h-4 w-4 shrink-0" aria-hidden />
              {t('feedsPage.ctaSubscribe')}
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[300px] w-full max-w-[420px] items-center justify-center lg:min-h-[420px]">
          <div
            className="absolute h-[280px] w-[280px] rounded-full opacity-90"
            style={{
              background: 'radial-gradient(circle, #fef0d4, transparent 70%)',
            }}
            aria-hidden
          />
          <div
            className="feeds-hero-bag relative flex flex-col items-center border border-dk-line/90 bg-gradient-to-b from-white to-dk-cream-2 px-5 pb-7 pt-9 text-center font-sans"
            style={{ fontSize: '1.2em' }}
          >
            <span className="absolute -top-3 z-10 rounded-full bg-dk-green-800 px-[10px] py-[3px] font-sans text-[9.5px] font-semibold uppercase tracking-[0.05em] text-white">
              {t('feedsPage.heroBagTag')}
            </span>
            <p className="font-serif text-[22px] font-bold leading-none text-dk-green-900">DairyMax</p>
            <p className="mt-2 max-w-[11em] font-sans text-[13px] leading-snug text-dk-muted">
              {t('feedsPage.heroBagVariant')}
            </p>
            <p className="mt-5 font-serif text-[32px] font-bold leading-none text-dk-green-900">
              50
              <span className="font-serif text-[0.44em] font-normal text-dk-muted">kg</span>
            </p>
            <p className="mt-3 max-w-[12em] whitespace-pre-line font-sans text-[11px] leading-relaxed text-dk-muted">
              {t('feedsPage.heroBagFootnote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
