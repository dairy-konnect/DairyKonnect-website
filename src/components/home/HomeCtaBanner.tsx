import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type Props = {
  onGetStarted: () => void;
};

export default function HomeCtaBanner({ onGetStarted }: Props) {
  const { t } = useTranslation();
  const c = t('homePage.finalCta', { returnObjects: true }) as {
    titleLine1: string;
    titleLine2: string;
    description: string;
    button: string;
  };

  return (
    <section aria-labelledby="home-cta-heading" className="w-full py-12 sm:py-16 md:py-20">
      <div className="home-section-inner">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.25rem] bg-gradient-to-br from-dk-green-800 to-dk-green-600 px-6 py-14 text-center shadow-dk-lg sm:px-10 sm:py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            aria-hidden
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1), transparent 40%)',
            }}
          />
          <div className="relative">
            <h2
              id="home-cta-heading"
              className="font-serif mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              {c.titleLine1}
              <br />
              {c.titleLine2}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{c.description}</p>
            <button
              type="button"
              onClick={onGetStarted}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-dk-green-900 shadow-dk-sm transition hover:bg-dk-cream active:scale-[0.98] sm:text-base"
            >
              {c.button}
              <FaArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
