import { MdClose } from 'react-icons/md'
import { RiFolderInfoLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import type { FeedProduct } from '../../data/feedProducts'

export default function FeedDetailModal({
  product,
  onClose,
}: {
  product: FeedProduct | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feed-detail-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-dk-line bg-white font-sans shadow-dk-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 id="feed-detail-title" className="font-serif text-[24px] font-semibold leading-tight text-dk-green-900">
              {product.name}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-1 text-dk-muted transition hover:bg-dk-green-100 hover:text-dk-ink"
              aria-label={t('common.close')}
            >
              <MdClose className="h-6 w-6" />
            </button>
          </div>

          <img
            src={product.image}
            alt=""
            className="mb-4 h-64 w-full rounded-xl object-cover"
          />

          <p className="mb-6 font-sans text-[18px] font-normal leading-[1.55] text-dk-ink-2">{product.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {(
              [
                ['Protein', product.nutrients.protein],
                ['Fiber', product.nutrients.fiber],
                ['Moisture', product.nutrients.moisture],
                ['Energy', product.nutrients.energy],
              ] as const
            ).map(([label, val]) => (
              <div key={label} className="rounded-xl border border-dk-line bg-dk-cream p-4">
                <div className="font-sans text-[13px] text-dk-muted">{label}</div>
                <div className="font-serif text-[17px] font-semibold tabular-nums text-dk-green-900">{val}</div>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-xl border border-dk-green-200 bg-dk-green-100/60 p-4">
            <p className="font-sans text-[14.5px] font-normal leading-[1.55] text-dk-ink-2">{product.additionalInfo}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-[18px] py-[11px] text-[14px] font-semibold leading-none text-white shadow-dk-sm transition hover:bg-dk-green-900"
            >
              <RiFolderInfoLine />
              {t('feedsPage.detailMoreInfo')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-[18px] py-[11px] text-[14px] font-medium leading-none text-dk-ink-2 transition hover:bg-dk-green-100"
            >
              <MdClose />
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
