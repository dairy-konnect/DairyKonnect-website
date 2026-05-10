import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaDownload, FaMicrophone, FaPlay, FaQrcode, FaBell, FaUsers } from 'react-icons/fa';
import AppStoreBadges from './AppStoreBadges';
import FeatureHighlightGrid from './FeatureHighlightGrid';
import { FARMER_DASHBOARD_DEMO } from '../../constants/farmerDashboardDemo';

const featureIcons: IconType[] = [FaMicrophone, FaQrcode, FaBell, FaUsers];

function FarmerHeroBento({
  items,
}: {
  items: { title: string; body: string; Icon: IconType }[];
}) {
  const { t } = useTranslation();
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-4 -top-10 h-48 w-48 rounded-full opacity-45 blur-3xl sm:h-56 sm:w-56"
        style={{ background: 'radial-gradient(circle, rgba(67,196,126,.4), transparent 72%)' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-6 h-36 w-36 rounded-full opacity-30 blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(200,155,58,.22), transparent 70%)' }}
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-[28px] border border-dk-line/90 bg-white shadow-[0_24px_60px_rgba(15,58,46,0.1),0_8px_24px_rgba(15,58,46,0.06)] ring-1 ring-black/5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90" aria-hidden />
        <div className="relative border-b border-dk-line/80 bg-gradient-to-br from-dk-green-100/90 via-dk-cream to-dk-cream-2 px-6 py-6 sm:px-9 sm:py-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-dk-green-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-sm backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-dk-green-600 shadow-[0_0_0_3px_rgba(31,122,77,0.2)]" aria-hidden />
            {t('farmerAppPage.eyebrow')}
          </div>
          <h2 className="font-serif mt-4 text-2xl font-semibold tracking-tight text-dk-green-900 sm:text-[1.65rem]">
            {t('farmerAppPage.titleEm')}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-dk-ink-2">{t('farmerAppPage.heroPanelBlurb')}</p>
        </div>
        <div className="relative grid gap-3.5 bg-dk-cream/30 p-5 sm:grid-cols-2 sm:gap-4 sm:p-7">
          {items.map(({ title, body, Icon }, index) => (
            <div
              key={title}
              className="group flex gap-3.5 rounded-2xl border border-dk-line/70 bg-white/90 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-dk-green-300/80 hover:bg-white hover:shadow-md sm:p-[18px]"
            >
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-dk-green-100 to-dk-green-200/60 text-dk-green-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-dk-green-200/50 transition group-hover:from-dk-green-200/80 group-hover:to-dk-green-100">
                <Icon className="h-[22px] w-[22px]" aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="font-mono text-[10px] font-bold tabular-nums text-dk-muted/80">0{index + 1}</span>
                  <h3 className="font-serif text-[17px] font-semibold leading-tight text-dk-green-900">{title}</h3>
                </div>
                <p className="text-[13.5px] leading-snug text-dk-ink-2">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-dk-line/80 bg-gradient-to-r from-dk-cream-2/80 via-white to-dk-cream-2/80 px-6 py-4 sm:px-9 sm:py-5">
          <Link
            to="/farmer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dk-green-200 bg-dk-green-800 px-4 py-3.5 text-sm font-semibold text-white shadow-dk-sm transition hover:border-dk-green-700 hover:bg-dk-green-900 sm:w-auto sm:justify-start sm:px-5"
          >
            {t('farmerAppPage.webDashLink')}
            <FaArrowRight
              className="h-3.5 w-3.5 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FarmerAppProductPage() {
  const { t } = useTranslation();
  const demo = { ...FARMER_DASHBOARD_DEMO };
  const raw = t('farmerAppPage.features', { returnObjects: true }) as { title: string; body: string }[];
  const featureItems = raw.map((item, i) => ({
    ...item,
    Icon: featureIcons[i] ?? FaMicrophone,
  }));

  return (
    <div className="min-h-full bg-dk-cream pb-20 pt-[72px] md:pt-[76px]">
      <section className="dk-page-inner">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-dk-green-100 px-3 py-1.5 text-xs font-semibold text-dk-green-800">
              <span className="h-1.5 w-1.5 rounded-full bg-dk-green-700" aria-hidden />
              {t('farmerAppPage.eyebrow')}
            </div>
            <h1 className="font-serif mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-dk-green-900 sm:text-4xl md:text-[2.65rem]">
              {t('farmerAppPage.titleBefore')}
              <em className="not-italic text-dk-green-700">{t('farmerAppPage.titleEm')}</em>
              {t('farmerAppPage.titleAfter')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-dk-ink-2 sm:text-[17px]">
              {t('farmerAppPage.lead')}{' '}
              <Link to="/farmer" className="font-semibold text-dk-green-700 underline-offset-2 hover:underline">
                {t('farmerAppPage.webDashLink')}
              </Link>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-5 py-3 text-sm font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900"
              >
                <FaDownload className="h-4 w-4" aria-hidden />
                {t('farmerAppPage.ctaPrimary')}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-dk-line bg-white px-5 py-3 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:border-dk-green-300"
              >
                <FaPlay className="h-3.5 w-3.5" aria-hidden />
                {t('farmerAppPage.ctaSecondary')}
              </button>
            </div>
            <AppStoreBadges
              appleLabel={t('farmerAppPage.storeAppleLabel')}
              appleTitle={t('farmerAppPage.storeAppleTitle')}
              googleLabel={t('farmerAppPage.storeGoogleLabel')}
              googleTitle={t('farmerAppPage.storeGoogleTitle')}
            />
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-dk-muted">
              {t('farmerAppPage.demoRecordNote', { ...demo })}
            </p>
          </div>

          <FarmerHeroBento items={featureItems} />
        </div>

        <FeatureHighlightGrid items={featureItems} />
      </section>
    </div>
  );
}
