import { useTranslation } from 'react-i18next';

type Step = { num: string; title: string; desc: string };

export default function HomeHowItWorks() {
  const { t } = useTranslation();
  const how = t('homePage.how', { returnObjects: true }) as {
    eyebrow: string;
    titleBefore: string;
    titleEm: string;
    titleAfter: string;
    steps: Step[];
  };

  return (
    <section
      id="home-how-works"
      aria-labelledby="how-heading"
      className="relative w-full overflow-hidden bg-dk-green-100 py-16 sm:py-20 md:py-24"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-dk-green-200/60 blur-3xl"
        aria-hidden
      />
      <div className="home-section-inner relative">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
          <span className="inline-block rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 shadow-dk-sm sm:text-[13px]">
            {how.eyebrow}
          </span>
          <h2
            id="how-heading"
            className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl"
          >
            {how.titleBefore}
            <em className="not-italic font-medium text-dk-green-700">{how.titleEm}</em>
            {how.titleAfter}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {how.steps.map((step) => (
            <article
              key={step.num}
              className="rounded-[22px] border border-dk-line bg-white p-6 shadow-dk-sm sm:p-7 md:p-8"
            >
              <div className="font-serif text-4xl font-semibold leading-none text-dk-green-300 sm:text-[42px]">{step.num}</div>
              <h3 className="font-serif mt-3.5 text-lg font-semibold text-dk-green-900 sm:text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dk-ink-2">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
