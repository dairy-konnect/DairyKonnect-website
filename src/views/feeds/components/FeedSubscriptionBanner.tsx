import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'

export default function FeedSubscriptionBanner() {
  const { t } = useTranslation()

  return (
    <section className="bg-dk-cream px-4 pb-[60px] pt-0 font-sans sm:px-6 md:px-8 lg:pb-[80px]">
      <div className="mx-auto max-w-[1320px]">
        <div className="relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[30px] bg-gradient-to-br from-dk-green-900 to-dk-green-700 p-8 text-white shadow-[0_30px_80px_rgba(15,58,46,0.2)] md:grid-cols-[1.4fr_1fr] md:gap-10 md:p-12 lg:p-[50px]">
          <div
            className="pointer-events-none absolute -right-24 -top-20 h-[300px] w-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(67,196,126,0.2), transparent 70%)',
            }}
            aria-hidden
          />
          <div className="relative">
            {/* Mock: badge 12px, padding 5px 12px, mb 14px */}
            <div className="mb-3.5 inline-block rounded-full bg-white/15 px-3 py-[5px] text-[12px] font-semibold leading-none">
              {t('feedsPage.subBadge')}
            </div>
            {/* Mock: h3 Fraunces 36px / lh 1.1 */}
            <h3 className="font-serif text-[clamp(1.625rem,3vw,2.25rem)] font-bold leading-[1.1] text-white">
              {t('feedsPage.subTitle')}
            </h3>
            <p className="mt-3 font-sans text-[16px] font-normal leading-[1.55] text-white/85">{t('feedsPage.subLead')}</p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-[18px] py-[11px] text-[14px] font-semibold leading-none text-dk-green-900 shadow-dk-sm transition hover:-translate-y-px hover:shadow-dk-md"
            >
              {t('feedsPage.subCta')}
              <FaArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </button>
          </div>
          <div className="relative rounded-[20px] border border-white/15 bg-white/[0.08] p-6 backdrop-blur-[10px]">
            <div className="mb-3.5 text-[12px] font-semibold uppercase leading-none tracking-[0.06em] text-white/85">
              {t('feedsPage.subSavingsLabel')}
            </div>
            <div className="flex justify-between border-b border-white/10 py-2.5 text-[14px] leading-normal">
              <span>{t('feedsPage.subRowBill')}</span>
              <span>₹ 4,320</span>
            </div>
            <div className="flex justify-between border-b border-white/10 py-2.5 text-[14px] leading-normal">
              <span>{t('feedsPage.subRowDiscount')}</span>
              <span className="text-dk-green-400">– ₹ 518</span>
            </div>
            <div className="flex justify-between pt-3.5 font-serif text-[24px] font-semibold leading-none">
              <span>{t('feedsPage.subRowYouPay')}</span>
              <span>₹ 3,802</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
