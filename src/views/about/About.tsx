import { useTranslation } from 'react-i18next';
import AboutHero from '../../components/about/AboutHero';
// import StatsSection from '../../components/about/StatsSection';
import Team from '../../components/about/Team';
import {
  FaUserShield,
  FaIndustry,
  FaTruck,
  FaUserTie,
  FaClipboardList,
  FaShieldAlt,
  FaEye,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaExpandArrowsAlt,
} from 'react-icons/fa';

const moduleIconShells = [
  'bg-dk-sky/25 text-dk-green-900 ring-1 ring-dk-line',
  'bg-dk-green-100 text-dk-green-800 ring-1 ring-dk-green-200/60',
  'bg-dk-gold/20 text-dk-green-900 ring-1 ring-dk-line',
  'bg-dk-cream-2 text-dk-green-800 ring-1 ring-dk-line',
];

const moduleRoleKeys = ['admin', 'dairy', 'vendor', 'farmer'] as const;
const moduleIcons = [FaUserShield, FaIndustry, FaTruck, FaUserTie] as const;

const benefitIcons = [FaClipboardList, FaShieldAlt, FaEye, FaMoneyBillWave, FaTachometerAlt, FaExpandArrowsAlt] as const;

const benefitShells = [
  'bg-dk-green-100 text-dk-green-800',
  'bg-dk-coral/15 text-dk-green-900',
  'bg-dk-green-100 text-dk-green-800',
  'bg-dk-gold/20 text-dk-green-900',
  'bg-dk-sky/25 text-dk-green-900',
  'bg-dk-cream-2 text-dk-green-900 ring-1 ring-dk-line',
];

export default function About() {
  const { t } = useTranslation();

  const modules = moduleRoleKeys.map((key, index) => ({
    icon: moduleIcons[index] ?? FaUserShield,
    title: t(`about.modules.${key}.title`),
    description: t(`about.modules.${key}.description`),
    shell: moduleIconShells[index] ?? 'bg-dk-green-100 text-dk-green-800',
  }));

  const workflow = t('about.workflowSteps', { returnObjects: true }) as { title: string; description: string }[];

  const benefitsCards = t('about.benefitsCards', { returnObjects: true }) as { title: string; body: string }[];
  const benefits = benefitsCards.map((card, i) => ({
    ...card,
    icon: benefitIcons[i] ?? FaClipboardList,
  }));

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-dk-cream pt-[72px] text-dk-ink md:pt-[76px]">
      <AboutHero />

      <main className="dk-page-inner pb-20 pt-10 sm:pt-14 md:pt-16">
        {/* Our Impact in Numbers — temporarily hidden
        <StatsSection />
        */}

        <section aria-labelledby="modules-heading" className="mb-16 md:mb-20">
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-dk-line bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-dk-green-800 shadow-dk-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-dk-green-600" aria-hidden />
              {t('about.platformEyebrow')}
            </span>
            <h2 id="modules-heading" className="font-serif mt-4 text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">
              {t('about.platformModulesTitle')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('about.platformModulesDesc')}</p>
          </header>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <article
                  key={module.title}
                  className="rounded-2xl border border-dk-line bg-white p-6 shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-200 hover:shadow-md sm:p-7"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[10px] ${module.shell}`}
                  >
                    <IconComponent className="text-xl" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-dk-green-900">{module.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dk-muted sm:text-[15px]">{module.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="workflow-heading"
          className="mb-16 rounded-[28px] border border-dk-line bg-white py-12 shadow-dk-sm ring-1 ring-dk-line md:mb-20 md:py-16"
        >
          <header className="mx-auto mb-10 max-w-2xl px-2 text-center sm:mb-12">
            <h2 id="workflow-heading" className="font-serif text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">
              {t('about.workflowTitle')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('about.workflowDesc')}</p>
          </header>
          <div className="mx-auto max-w-3xl space-y-3 px-1 sm:px-2">
            {workflow.map((item, index) => (
              <div key={item.title}>
                <div className="flex gap-4 rounded-2xl border border-dk-line/70 bg-dk-cream/40 p-5 transition hover:border-dk-green-200 hover:bg-dk-cream/60 sm:gap-5 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-dk-green-100 text-sm font-bold text-dk-green-800 ring-1 ring-dk-green-200/80">
                    {index + 1}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="font-serif text-lg font-semibold text-dk-green-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dk-muted sm:text-[15px]">{item.description}</p>
                  </div>
                </div>
                {index < workflow.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden>
                    <div className="h-6 w-px bg-gradient-to-b from-dk-green-300 to-dk-line" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="benefits-heading" className="py-16 md:py-20">
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <h2 id="benefits-heading" className="font-serif text-3xl font-semibold tracking-tight text-dk-green-900 sm:text-4xl">
              {t('about.benefitsTitle')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-dk-muted">{t('about.benefitsDesc')}</p>
          </header>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              const shell = benefitShells[i] ?? 'bg-dk-green-100 text-dk-green-800';
              return (
                <article
                  key={b.title}
                  className="rounded-[20px] border border-dk-line bg-white p-6 shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-300 sm:p-7"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-dk-line ${shell}`}>
                    <Icon className="text-xl" aria-hidden />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-dk-green-900 sm:text-xl">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dk-ink-2 sm:text-[15px]">{b.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="team-heading" className="mb-16 md:mb-20">
          <Team />
        </section>
      </main>
    </div>
  );
}
