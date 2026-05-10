import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import {
  FaArrowRight,
  FaChartLine,
  FaFileDownload,
  FaLink,
  FaMobileAlt,
  FaTable,
  FaTint,
} from 'react-icons/fa';
import FeatureHighlightGrid from './FeatureHighlightGrid';

export default function FarmerWebProductPage() {
  const { t } = useTranslation();
  const raw = t('farmerWebPage.features', { returnObjects: true }) as { title: string; body: string }[];
  const featureItems: { title: string; body: string; Icon: IconType }[] = [
    { ...raw[0], Icon: FaTable },
    { ...raw[1], Icon: FaChartLine },
    { ...raw[2], Icon: FaTint },
    { ...raw[3], Icon: FaFileDownload },
  ];

  return (
    <div className="min-h-full bg-dk-cream pb-20 pt-[72px] md:pt-[76px]">
      <section className="dk-page-inner">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#fef0d4] px-3 py-1.5 text-xs font-semibold text-[#a8761c]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a8761c] shadow-[0_0_0_4px_#fef0d4]" aria-hidden />
              {t('farmerWebPage.eyebrow')}
            </div>
            <h1 className="font-serif mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.65rem]">
              {t('farmerWebPage.titleBefore')}
              <em className="not-italic text-[#a8761c]">{t('farmerWebPage.titleEm')}</em>
              {t('farmerWebPage.titleAfter')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dk-ink-2 sm:text-[17px]">{t('farmerWebPage.lead')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-5 py-3 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900"
              >
                {t('farmerWebPage.ctaPrimary')}
                <FaArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/farmer/app"
                className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-5 py-3 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:border-dk-green-300"
              >
                <FaMobileAlt className="h-4 w-4 text-dk-green-700" aria-hidden />
                {t('farmerWebPage.ctaMobile')}
              </Link>
            </div>

            <div className="mt-8 flex max-w-[560px] items-start gap-3.5 rounded-2xl bg-gradient-to-br from-[#fef0d4] to-[#f9d97a] p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#a8761c] shadow-sm">
                <FaLink className="h-5 w-5" aria-hidden />
              </div>
              <div className="text-left">
                <strong className="block text-sm text-[#7a5510]">{t('farmerWebPage.syncTitle')}</strong>
                <p className="mt-1 text-[13px] leading-snug text-[#7a5510]/95">{t('farmerWebPage.syncBody')}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[420px] w-full max-w-md items-center justify-center lg:min-h-[480px]">
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-90"
              style={{ background: 'radial-gradient(circle, #fef0d4, transparent 68%)' }}
              aria-hidden
            />
            <div className="relative w-full max-w-[440px] rounded-[28px] bg-gradient-to-br from-[#a8761c] to-[#5e4515] p-8 text-white shadow-[0_30px_80px_rgba(168,118,28,0.3)]">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-white/70">{t('farmerWebPage.previewWelcome')}</div>
                  <div className="font-serif mt-1 text-[22px] font-semibold leading-tight">{t('farmerWebPage.previewUser')}</div>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-dk-green-500 to-dk-green-800 font-serif text-sm font-bold text-white">
                  SK
                </div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2.5">
                <div className="rounded-xl bg-white/10 px-3.5 py-3">
                  <div className="text-[11px] text-white/70">{t('farmerWebPage.previewCattle')}</div>
                  <div className="font-serif mt-1 text-[22px] font-semibold">{t('farmerWebPage.previewCattleVal')}</div>
                </div>
                <div className="rounded-xl bg-white/10 px-3.5 py-3">
                  <div className="text-[11px] text-white/70">{t('farmerWebPage.previewMonth')}</div>
                  <div className="font-serif mt-1 text-[22px] font-semibold">{t('farmerWebPage.previewMonthVal')}</div>
                </div>
              </div>
              <div className="rounded-xl bg-white/10 px-3.5 py-3">
                <div className="text-[11px] font-medium uppercase tracking-wide text-white/70">{t('farmerWebPage.previewToday')}</div>
                <div className="font-serif mt-1 text-2xl font-semibold">{t('farmerWebPage.previewTodayVal')}</div>
                <div className="mt-2 flex h-8 items-end gap-0.5">
                  {[50, 60, 55, 75, 65, 85, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-white/25 first:bg-white/30"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-semibold text-dk-green-900 sm:text-3xl">{t('farmerWebPage.featuresTitle')}</h2>
          <p className="mt-3 text-base text-dk-ink-2">{t('farmerWebPage.featuresLead')}</p>
        </div>
        <FeatureHighlightGrid items={featureItems} />
      </section>
    </div>
  );
}
