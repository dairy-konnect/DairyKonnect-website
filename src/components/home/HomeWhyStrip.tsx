import { FaGlobe, FaMicrochip, FaShieldAlt } from 'react-icons/fa';
import { MdWifiOff } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

type WhyFeature = { title: string; desc: string };

const icons = [FaGlobe, MdWifiOff, FaShieldAlt, FaMicrochip];

export default function HomeWhyStrip() {
  const { t } = useTranslation();
  const why = t('homePage.why', { returnObjects: true }) as {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    features: WhyFeature[];
  };
  const features = why.features;

  return (
    <section
      aria-labelledby="why-strip-heading"
      className="w-full border-y border-dk-line/80 bg-gradient-to-b from-dk-cream to-white py-16 sm:py-20 md:py-24"
    >
      <div className="home-section-inner">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
          <span className="inline-block rounded-full bg-dk-green-100 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 sm:text-[13px]">
            {why.eyebrow}
          </span>
          <h2
            id="why-strip-heading"
            className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl"
          >
            {why.titleBefore}
            <em className="not-italic font-medium text-dk-green-700">{why.titleEm}</em>
            {why.titleAfter}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {features.map((f, i) => {
            const Icon = icons[i] ?? FaGlobe;
            return (
              <article
                key={f.title}
                className="rounded-[20px] border border-dk-line bg-white p-6 shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-400 sm:p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-dk-green-200 text-dk-green-800 sm:h-[46px] sm:w-[46px]">
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
                </div>
                <h3 className="font-serif text-lg font-semibold text-dk-green-900 sm:text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dk-ink-2 sm:text-[15px]">{f.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
