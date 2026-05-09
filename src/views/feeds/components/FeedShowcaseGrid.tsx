import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FEED_BAG_PRESET_GRADIENT,
  feedProductsWithShowcase,
  type FeedCategory,
  type FeedProduct,
} from '../../../data/feedProducts'

function starDisplay(rating: number): string {
  if (rating >= 4.85) return '★★★★★'
  if (rating >= 4.65) return '★★★★☆'
  if (rating >= 4.45) return '★★★★☆'
  return '★★★★☆'
}

const CATEGORY_KEYS: { id: 'all' | FeedCategory; labelKey: string }[] = [
  { id: 'all', labelKey: 'feedsPage.catAll' },
  { id: 'concentrate', labelKey: 'feedsPage.catConcentrate' },
  { id: 'mineral', labelKey: 'feedsPage.catMineral' },
  { id: 'calf', labelKey: 'feedsPage.catCalf' },
  { id: 'buffalo', labelKey: 'feedsPage.catBuffalo' },
  { id: 'silage', labelKey: 'feedsPage.catSilage' },
  { id: 'supplement', labelKey: 'feedsPage.catSupplement' },
]

type Props = {
  onOpenProduct: (product: FeedProduct) => void
}

export default function FeedShowcaseGrid({ onOpenProduct }: Props) {
  const { t } = useTranslation()
  const [category, setCategory] = useState<'all' | FeedCategory>('all')

  const items = useMemo(() => {
    const all = feedProductsWithShowcase()
    if (category === 'all') return all
    return all.filter((p) => p.showcase?.category === category)
  }, [category])

  return (
    <section className="bg-dk-cream px-4 py-[60px] font-sans sm:px-6 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Mock: category row mb 40px, .btn 14px / 600 */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {CATEGORY_KEYS.map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCategory(id)}
              className={`rounded-xl px-[18px] py-[11px] text-[14px] font-semibold leading-none transition ${
                category === id
                  ? 'bg-dk-green-800 text-white shadow-dk-sm'
                  : 'border border-dk-line bg-white text-dk-ink-2 hover:border-dk-green-600 hover:text-dk-green-800'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        {/* Mock .feed-grid: gap 24px */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => {
            const s = product.showcase!
            const grad = FEED_BAG_PRESET_GRADIENT[s.bagPreset]
            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-[22px] border border-dk-line bg-white shadow-dk-sm transition hover:-translate-y-1 hover:border-dk-green-300 hover:shadow-dk-md"
              >
                {/* Mock .feed-img: height 200px */}
                <div className={`relative flex h-[200px] items-center justify-center ${grad}`}>
                  {/* Mock .feed-bag: 120×150, inner type sizes */}
                  <div className="relative flex h-[150px] w-[120px] flex-col items-center justify-center rounded-b-lg rounded-t-[14px] border border-dk-line/80 bg-white px-3.5 pb-3.5 pt-7 text-center shadow-[0_14px_30px_rgba(0,0,0,0.12)]">
                    <span
                      className={`absolute -top-3 rounded-full px-[10px] py-[3px] font-sans text-[9.5px] font-semibold uppercase tracking-[0.05em] text-white ${s.badgeBgClass}`}
                    >
                      {s.badge}
                    </span>
                    <p className="font-serif text-[14px] font-bold leading-none text-dk-green-900">{s.brandLine}</p>
                    <p className="mt-[3px] font-sans text-[10px] text-dk-muted">{s.variant}</p>
                    <p className="mt-2 font-serif text-[18px] font-bold leading-none text-dk-green-700">
                      {s.weightKg}
                      <small className="text-[10px] font-normal text-dk-muted">kg</small>
                    </p>
                  </div>
                </div>
                {/* Mock .feed-info padding 22px */}
                <div className="p-[22px]">
                  <h4 className="mb-1.5 font-serif text-[19px] font-semibold leading-tight text-dk-green-900">
                    {s.cardTitle}
                  </h4>
                  <p className="mb-3.5 font-sans text-[13.5px] leading-snug text-dk-muted">{s.cardDescription}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dk-line/60 pt-3">
                    <div className="font-serif text-[22px] font-semibold leading-none text-dk-green-800">
                      ₹ {s.priceInr.toLocaleString('en-IN')}
                      <small className="font-sans text-[12px] font-normal text-dk-muted"> {s.priceSuffix}</small>
                    </div>
                    <div className="flex items-center gap-0.5 font-sans text-[12px] text-dk-muted">
                      <span className="text-dk-gold">{starDisplay(s.stars)}</span>
                      <span className="ml-1">
                        ({s.stars.toFixed(1)} · {s.reviewCount})
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="mt-3.5 flex w-full items-center justify-center rounded-xl bg-dk-green-800 py-[11px] text-[14px] font-semibold leading-none text-white shadow-dk-sm transition hover:bg-dk-green-900"
                  >
                    {t('feedsPage.addToCart')}
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {items.length === 0 && (
          <p className="py-12 text-center text-[15px] text-dk-muted">{t('feedsPage.noCategoryMatch')}</p>
        )}
      </div>
    </section>
  )
}
