import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type Props = {
  onStartFree: () => void;
  onStartTrial: () => void;
};

export default function HomePricingSection({ onStartFree, onStartTrial }: Props) {
  const { t } = useTranslation();
  const p = t('homePage.pricing', { returnObjects: true }) as Record<string, string | string[]>;

  return (
    <section id="home-pricing" className="w-full bg-dk-cream-2 py-16 sm:py-20 md:py-24" aria-labelledby="pricing-heading">
      <div className="home-section-inner">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
          <span className="inline-block rounded-full bg-dk-green-100 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 sm:text-[13px]">
            {String(p.eyebrow)}
          </span>
          <h2
            id="pricing-heading"
            className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl"
          >
            {String(p.titleBefore)}
            <em className="not-italic font-medium text-dk-green-700">{String(p.titleEm)}</em>
            {String(p.titleAfter ?? '')}
          </h2>
          <p className="mt-4 text-base text-dk-ink-2 sm:text-lg">{String(p.lead)}</p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {/* Starter */}
          <article className="relative flex flex-col rounded-3xl border border-dk-line bg-white p-7 shadow-dk-sm sm:p-9">
            <h3 className="font-serif text-2xl text-dk-green-900">{String(p.starterName)}</h3>
            <p className="mt-2 min-h-[42px] text-sm text-dk-muted">{String(p.starterDesc)}</p>
            <div className="mt-2 font-serif text-4xl font-semibold leading-none text-dk-green-800 sm:text-5xl">
              <sup className="mr-0.5 text-lg font-normal text-dk-muted">₹</sup>
              {String(p.starterPrice)}
              <small className="text-sm font-normal text-dk-muted"> {String(p.starterPriceNote)}</small>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {(p.starterFeats as string[]).map((line) => (
                <li key={line} className="flex gap-2.5 text-sm text-dk-ink-2">
                  <FaCheck className="mt-0.5 h-4 w-4 shrink-0 text-dk-green-700" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onStartFree}
              className="mt-8 w-full rounded-xl border border-dk-green-800 py-3 text-sm font-semibold text-dk-green-800 transition hover:bg-dk-green-800 hover:text-white active:scale-[0.98]"
            >
              {String(p.starterCta)}
            </button>
          </article>

          {/* Vendor Pro */}
          <article className="relative flex flex-col rounded-3xl border-2 border-dk-green-700 bg-white p-7 shadow-dk-lg sm:p-9 md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-dk-green-800 px-3.5 py-1 text-xs font-semibold text-white">
              {String(p.vendorTag)}
            </div>
            <h3 className="font-serif text-2xl text-dk-green-900">{String(p.vendorName)}</h3>
            <p className="mt-2 min-h-[42px] text-sm text-dk-muted">{String(p.vendorDesc)}</p>
            <div className="mt-2 font-serif text-4xl font-semibold leading-none text-dk-green-800 sm:text-5xl">
              <sup className="mr-0.5 text-lg font-normal text-dk-muted">₹</sup>
              {String(p.vendorPrice)}
              <small className="text-sm font-normal text-dk-muted"> {String(p.vendorPriceNote)}</small>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {(p.vendorFeats as string[]).map((line) => (
                <li key={line} className="flex gap-2.5 text-sm text-dk-ink-2">
                  <FaCheck className="mt-0.5 h-4 w-4 shrink-0 text-dk-green-700" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onStartTrial}
              className="mt-8 w-full rounded-xl bg-dk-green-800 py-3 text-sm font-semibold text-white shadow-dk-sm transition hover:brightness-110 active:scale-[0.98]"
            >
              {String(p.vendorCta)}
            </button>
          </article>

          {/* Enterprise */}
          <article className="relative flex flex-col rounded-3xl border border-dk-line bg-white p-7 shadow-dk-sm sm:p-9">
            <h3 className="font-serif text-2xl text-dk-green-900">{String(p.enterpriseName)}</h3>
            <p className="mt-2 min-h-[42px] text-sm text-dk-muted">{String(p.enterpriseDesc)}</p>
            <div className="mt-2 font-serif text-[2.125rem] font-semibold leading-none text-dk-green-800 sm:text-4xl">
              {String(p.enterprisePrice)}
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {(p.enterpriseFeats as string[]).map((line) => (
                <li key={line} className="flex gap-2.5 text-sm text-dk-ink-2">
                  <FaCheck className="mt-0.5 h-4 w-4 shrink-0 text-dk-green-700" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-8 flex w-full items-center justify-center rounded-xl border border-dk-line bg-white py-3 text-sm font-semibold text-dk-ink transition hover:border-dk-green-700 hover:text-dk-green-800"
            >
              {String(p.enterpriseCta)}
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
