import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import HeroVisual from './HeroVisual';

export type HeroProps = {
  onGetStarted: () => void;
  onWatchDemo: () => void;
};

export default function Hero({ onGetStarted, onWatchDemo }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="home-hero w-full" aria-labelledby="hero-heading">
      <div className="home-section-inner relative pb-14 pt-20 sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 xl:gap-16">
          <div className="flex max-w-[560px] flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 shadow-dk-sm sm:text-[13px]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-dk-green-500 shadow-[0_0_0_4px_var(--green-200)]" aria-hidden />
              {t('hero.eyebrow')}
            </div>

            <h1 id="hero-heading" className="feeds-hero-title mb-5 mt-4">
              <span className="text-dk-green-900">{t('hero.headlineBefore')}</span>
              <em className="feeds-hero-em">{t('hero.headlineEm')}</em>
              <span className="text-dk-green-900">{t('hero.headlineAfter')}</span>
            </h1>

            <p className="mt-5 max-w-lg text-base text-dk-ink-2 sm:text-lg">{t('hero.description')}</p>

            <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:justify-start">
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-dk-green-800 px-5 text-sm font-semibold text-white shadow-dk-sm transition hover:brightness-110 active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base"
              >
                {t('hero.explorePlatform')}
                <FaArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
              <button
                type="button"
                onClick={onWatchDemo}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-dk-line bg-white px-5 text-sm font-semibold text-dk-ink transition hover:border-dk-green-700 hover:text-dk-green-800 active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base"
              >
                <FaPlay className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                {t('hero.watchDemo')}
              </button>
            </div>

            {/* <HeroStats /> */}
          </div>

          <div className="relative w-full shrink-0 lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
