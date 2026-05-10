import type { IconType } from 'react-icons';
import { FaUsers, FaTint, FaTruck, FaMoneyBillWave, FaMapMarkerAlt, FaClipboardCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const featureIconShells: string[] = [
  'bg-[#fef0d4] text-[#a8761c]',
  'bg-dk-green-100 text-dk-green-800',
  'bg-[#e0eef9] text-[#345d80]',
  'bg-[#fff3d6] text-[#a8761c]',
  'bg-[#e7e0ff] text-[#5a3da6]',
  'bg-[#fee9d6] text-[#c4521a]',
];

export default function Vendor() {
  const { t } = useTranslation();
  const features: { icon: IconType; title: string; description: string; shell: string }[] = [
    {
      icon: FaUsers,
      title: t('vendor.features.farmerManagement.title'),
      description: t('vendor.features.farmerManagement.description'),
      shell: featureIconShells[0] ?? 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: FaTint,
      title: t('vendor.features.milkCollection.title'),
      description: t('vendor.features.milkCollection.description'),
      shell: featureIconShells[1] ?? 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: FaTruck,
      title: t('vendor.features.dailySupply.title'),
      description: t('vendor.features.dailySupply.description'),
      shell: featureIconShells[2] ?? 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: FaMoneyBillWave,
      title: t('vendor.features.paymentLedger.title'),
      description: t('vendor.features.paymentLedger.description'),
      shell: featureIconShells[3] ?? 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: FaMapMarkerAlt,
      title: t('vendor.features.routeManagement.title'),
      description: t('vendor.features.routeManagement.description'),
      shell: featureIconShells[4] ?? 'bg-dk-green-100 text-dk-green-800',
    },
    {
      icon: FaClipboardCheck,
      title: t('vendor.features.qualityVerification.title'),
      description: t('vendor.features.qualityVerification.description'),
      shell: featureIconShells[5] ?? 'bg-dk-green-100 text-dk-green-800',
    },
  ];

  const responsibilities = [
    t('vendor.responsibilities.collect'),
    t('vendor.responsibilities.verify'),
    t('vendor.responsibilities.supply'),
    t('vendor.responsibilities.payments'),
    t('vendor.responsibilities.records'),
  ];

  const steps = [
    { title: t('vendor.steps.step1Title'), desc: t('vendor.steps.step1Desc') },
    { title: t('vendor.steps.step2Title'), desc: t('vendor.steps.step2Desc') },
    { title: t('vendor.steps.step3Title'), desc: t('vendor.steps.step3Desc') },
    { title: t('vendor.steps.step4Title'), desc: t('vendor.steps.step4Desc') },
  ];

  return (
    <div className="min-h-full bg-dk-cream pb-24 pt-[72px] text-dk-ink md:pt-[76px]">
      <section className="pb-14 pt-4 sm:pb-16">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-dk-green-600" aria-hidden />
              {t('nav.vendorDashTitle')}
            </div>
            <h1 className="font-serif mt-5 text-4xl font-semibold tracking-tight text-dk-green-900 sm:text-5xl md:text-[3.15rem]">
              {t('vendor.title')}
            </h1>
            <p className="mt-4 text-lg font-medium text-dk-ink-2 sm:text-xl">{t('vendor.subtitle')}</p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-dk-muted">{t('vendor.description')}</p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="dk-page-inner">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-dk-green-900 sm:text-[2.1rem]">{t('vendor.keyFeatures')}</h2>
            <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('vendor.keyFeaturesDesc')}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-dk-line bg-white p-6 shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-200 hover:shadow-md"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] ring-1 ring-black/5 ${feature.shell}`}
                  >
                    <IconComponent className="text-xl" aria-hidden />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-dk-green-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dk-muted">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-dk-line/80 bg-white py-16">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-serif text-3xl font-semibold text-dk-green-900 sm:text-[2.1rem]">{t('vendor.howItWorks')}</h2>
            <div className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-dk-line/70 bg-dk-cream/40 p-5 transition hover:border-dk-green-200 hover:bg-dk-cream/60 sm:gap-5 sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dk-green-100 text-sm font-bold text-dk-green-800 ring-1 ring-dk-green-200/80">
                    {i + 1}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-serif text-lg font-semibold text-dk-green-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dk-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-dk-green-900 sm:text-[2.1rem]">{t('vendor.responsibilitiesTitle')}</h2>
            <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('vendor.responsibilitiesDesc')}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {responsibilities.map((responsibility, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full border border-dk-green-200 bg-dk-green-100 px-5 py-2.5 text-sm font-medium text-dk-green-900 shadow-sm transition hover:border-dk-green-300 hover:bg-white"
                >
                  {responsibility}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="dk-page-inner">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-dk-line bg-gradient-to-br from-white to-dk-cream-2 px-8 py-10 text-center shadow-dk-lg ring-1 ring-black/5 sm:px-12 sm:py-12">
            <h2 className="font-serif text-3xl font-semibold text-dk-green-900 sm:text-[2.1rem]">{t('vendor.readyToStart')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-dk-muted">{t('vendor.readyToStartDesc')}</p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-dk-green-800 px-8 py-3.5 text-base font-semibold text-white shadow-dk-sm transition hover:bg-dk-green-900"
            >
              {t('vendor.loginButton')}
              <FaTruck className="h-5 w-5 opacity-90" aria-hidden />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
