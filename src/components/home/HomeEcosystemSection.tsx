import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  FaBuilding,
  FaChevronRight,
  FaDesktop,
  FaStethoscope,
  FaTachometerAlt,
  FaTractor,
  FaWarehouse,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type Role = { id: string; title: string; desc: string };
type DashCard = {
  id: string;
  path: string;
  title: string;
  desc: string;
  chips: string[];
  link: string;
};
type AppCard = {
  id: string;
  path: string;
  featured: boolean;
  title: string;
  desc: string;
  chips: string[];
  link: string;
  visualLine1: string;
  visualLine2: string;
};

const roleIcon: Record<string, IconType> = {
  dairy: FaBuilding,
  vendor: FaWarehouse,
  farmer: FaTractor,
  vet: FaStethoscope,
};

const roleStyle: Record<string, string> = {
  dairy: 'bg-[#e0eef9] text-[#345d80]',
  vendor: 'bg-dk-green-100 text-dk-green-800',
  farmer: 'bg-[#fef0d4] text-[#a8761c]',
  vet: 'bg-[#fee9d6] text-[#c4521a]',
};

const dashIcon: Record<string, IconType> = {
  dairy: FaBuilding,
  vendor: FaWarehouse,
  farmer: FaTractor,
};

const dashIconStyle: Record<string, string> = {
  dairy: 'bg-[#e0eef9] text-[#345d80]',
  vendor: 'bg-dk-green-100 text-dk-green-800',
  farmer: 'bg-[#fef0d4] text-[#a8761c]',
};

const rolePath: Record<string, string> = {
  dairy: '/dairy',
  vendor: '/vendor',
  farmer: '/farmer',
  vet: '/vet',
};

function Chip({ children, featured }: { children: string; featured?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
        featured ? 'bg-white/15 text-white' : 'bg-dk-green-100 text-dk-green-800'
      }`}
    >
      {children}
    </span>
  );
}

export default function HomeEcosystemSection() {
  const { t } = useTranslation();
  const ecosystem = t('homePage.ecosystem', { returnObjects: true }) as Record<string, string>;
  const roles = t('homePage.roles', { returnObjects: true }) as Role[];
  const dashboards = t('homePage.dashboards', { returnObjects: true }) as DashCard[];
  const mobileApps = t('homePage.mobileApps', { returnObjects: true }) as AppCard[];

  return (
    <section aria-labelledby="ecosystem-heading" className="w-full py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="home-section-inner">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-14 md:mb-16">
          <span className="inline-block rounded-full bg-dk-green-100 px-3.5 py-1.5 text-xs font-semibold text-dk-green-800 sm:text-[13px]">
            {ecosystem.eyebrow}
          </span>
          <h2
            id="ecosystem-heading"
            className="font-serif mt-4 text-3xl font-semibold leading-tight tracking-tight text-dk-green-900 sm:text-4xl md:text-5xl"
          >
            {ecosystem.titleBefore}
            <em className="not-italic font-medium text-dk-green-700">{ecosystem.titleEm}</em>
          </h2>
          <p className="mt-4 text-base text-dk-ink-2 sm:text-lg">{ecosystem.description}</p>
        </header>

        <div className="mb-12 grid grid-cols-2 gap-3 sm:mb-14 sm:grid-cols-2 sm:gap-3.5 md:mb-16 md:grid-cols-4">
          {roles.map((role) => {
            const Icon = roleIcon[role.id] ?? FaTractor;
            const to = rolePath[role.id] ?? '/';
            return (
              <Link
                key={role.id}
                to={to}
                className="group rounded-[18px] border border-dk-line bg-white p-4 text-center shadow-dk-sm transition hover:-translate-y-0.5 hover:border-dk-green-300 hover:shadow-dk-md sm:p-5"
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] ${roleStyle[role.id] ?? 'bg-dk-green-100 text-dk-green-800'}`}
                >
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" aria-hidden />
                </div>
                <strong className="font-serif block text-base text-dk-green-900 sm:text-[17px]">{role.title}</strong>
                <span className="mt-1 block text-xs leading-snug text-dk-muted">{role.desc}</span>
              </Link>
            );
          })}
        </div>

        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-dk-cream-2 px-3 py-1.5 text-xs font-semibold text-dk-ink-2">
            <FaDesktop className="h-3.5 w-3.5 text-dk-green-800" aria-hidden />
            {ecosystem.dashboardEyebrow}
          </span>
          <h3 className="font-serif mt-3.5 text-2xl font-semibold leading-tight text-dk-green-900 sm:text-3xl">
            {ecosystem.dashboardTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {dashboards.map((card) => {
            const Icon = dashIcon[card.id] ?? FaTachometerAlt;
            return (
              <article
                key={card.id}
                className="group flex flex-col rounded-3xl border border-dk-line bg-white p-6 shadow-dk-sm transition duration-300 hover:-translate-y-1.5 hover:border-dk-green-300 hover:shadow-dk-lg sm:p-8"
              >
                <div
                  className={`mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-[14px] ${dashIconStyle[card.id] ?? 'bg-dk-green-100 text-dk-green-800'}`}
                >
                  <Icon className="h-[26px] w-[26px]" aria-hidden />
                </div>
                <h3 className="font-serif text-xl font-semibold text-dk-green-900 sm:text-2xl">{card.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-dk-ink-2">{card.desc}</p>
                <div className="mb-5 mt-4 flex flex-wrap gap-1.5">
                  {card.chips.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
                <Link
                  to={card.path}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-dk-green-800 transition group-hover:gap-2"
                >
                  {card.link}
                  <FaChevronRight className="h-3 w-3" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mb-8 mt-16 text-center sm:mb-10 sm:mt-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-dk-cream-2 px-3 py-1.5 text-xs font-semibold text-dk-ink-2">
            <span className="text-sm" aria-hidden>
              📱
            </span>
            {ecosystem.appsEyebrow}
          </span>
          <h3 className="font-serif mt-3.5 text-2xl font-semibold leading-tight text-dk-green-900 sm:text-3xl">
            {ecosystem.appsTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {mobileApps.map((app) => (
            <article
              key={app.id}
              className={`group flex flex-col rounded-3xl border p-6 shadow-dk-sm transition duration-300 sm:p-8 ${
                app.featured
                  ? 'border-transparent bg-gradient-to-br from-dk-green-900 to-dk-green-700 text-white shadow-dk-lg hover:shadow-dk-lg'
                  : 'border-dk-line bg-white hover:-translate-y-1.5 hover:border-dk-green-300 hover:shadow-dk-lg'
              }`}
            >
              <div
                className={`mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-[14px] ${
                  app.featured ? 'bg-white/15 text-white' : 'bg-[#fee9d6] text-[#c4521a]'
                }`}
              >
                {app.id === 'farmerApp' ? (
                  <FaTractor className="h-[26px] w-[26px]" aria-hidden />
                ) : (
                  <FaStethoscope className="h-[26px] w-[26px]" aria-hidden />
                )}
              </div>
              <h3 className={`font-serif text-xl font-semibold sm:text-2xl ${app.featured ? 'text-white' : 'text-dk-green-900'}`}>
                {app.title}
              </h3>
              <p className={`mt-2 flex-1 text-[15px] leading-relaxed ${app.featured ? 'text-white/85' : 'text-dk-ink-2'}`}>{app.desc}</p>
              <div className="mb-5 mt-4 flex flex-wrap gap-1.5">
                {app.chips.map((c) => (
                  <Chip key={c} featured={app.featured}>
                    {c}
                  </Chip>
                ))}
              </div>
              <Link
                to={app.path}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition group-hover:gap-2 ${
                  app.featured ? 'text-white' : 'text-dk-green-800'
                }`}
              >
                {app.link}
                <FaChevronRight className="h-3 w-3" aria-hidden />
              </Link>
              <div
                className={`mt-5 rounded-2xl border p-4 text-[13px] leading-snug ${
                  app.featured
                    ? 'border-white/25 bg-white/10 text-white/90'
                    : 'border-dashed border-dk-green-400 bg-dk-green-100 text-dk-green-900'
                }`}
              >
                {app.id === 'farmerApp' ? (
                  <>
                    <div className="flex flex-wrap justify-between gap-2 font-medium">
                      <span>{app.visualLine1}</span>
                      <strong>📱 + 💻</strong>
                    </div>
                    <p className={`mt-2 text-xs ${app.featured ? 'text-white/80' : 'text-dk-ink-2'}`}>{app.visualLine2}</p>
                  </>
                ) : (
                  <>
                    <div className="font-medium leading-snug">{app.visualLine1}</div>
                    <div className={`mt-2 font-medium leading-snug ${app.featured ? 'text-white/90' : 'text-dk-green-900'}`}>
                      {app.visualLine2}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
