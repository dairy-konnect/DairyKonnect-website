import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  FaArrowDown,
  FaBuilding,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartLine,
  FaChevronRight,
  FaClipboardList,
  FaCloudDownloadAlt,
  FaCoins,
  FaDesktop,
  FaExclamationCircle,
  FaFileAlt,
  FaFlask,
  FaFolderOpen,
  FaLayerGroup,
  FaLaptop,
  FaMobileAlt,
  FaPlus,
  FaQrcode,
  FaRobot,
  FaRoute,
  FaShoppingBag,
  FaStethoscope,
  FaStore,
  FaSyringe,
  FaTachometerAlt,
  FaTags,
  FaTint,
  FaTractor,
  FaTruck,
  FaUserMd,
  FaUsers,
  FaVideo,
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
  vetWeb: FaStethoscope,
};

const dashIconStyle: Record<string, string> = {
  dairy: 'bg-[#e0eef9] text-[#345d80]',
  vendor: 'bg-dk-green-100 text-dk-green-800',
  farmer: 'bg-[#fef0d4] text-[#a8761c]',
  vetWeb: 'bg-[#fee9d6] text-[#c4521a]',
};

/** Chip icons by dashboard id, same order as translation `chips` */
const dashChipIcons: Record<string, IconType[]> = {
  dairy: [FaArrowDown, FaFlask, FaLayerGroup, FaTruck],
  vendor: [FaQrcode, FaRoute, FaTags],
  farmer: [FaClipboardList, FaChartLine, FaCoins, FaFileAlt],
  vetWeb: [FaFolderOpen, FaSyringe, FaCalendarAlt, FaVideo],
};

const appChipIcons: Record<string, IconType[]> = {
  farmerApp: [FaClipboardList, FaTint, FaCoins, FaCalendarCheck, FaShoppingBag, FaCloudDownloadAlt],
  vetApp: [FaUsers, FaVideo, FaRobot, FaSyringe, FaStore, FaExclamationCircle],
};

const rolePath: Record<string, string> = {
  dairy: '/dairy',
  vendor: '/vendor',
  farmer: '/farmer',
  vet: '/vet',
};

function Chip({
  children,
  featured,
  icon: Icon,
}: {
  children: string;
  featured?: boolean;
  icon?: IconType;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
        featured ? 'bg-white/15 text-white' : 'bg-dk-green-100 text-dk-green-800'
      }`}
    >
      {Icon ? <Icon className="h-3 w-3 shrink-0 opacity-90" aria-hidden /> : null}
      {children}
    </span>
  );
}

function VetKonnectFlowFooter({
  line1,
  line2,
  mutedFeatured,
}: {
  line1: string;
  line2: string;
  mutedFeatured: boolean;
}) {
  const splitLine = (s: string) => {
    const idx = s.indexOf(' — ');
    if (idx === -1) return { title: s, detail: '' };
    return { title: s.slice(0, idx).trim(), detail: s.slice(idx + 3).trim() };
  };
  const a = splitLine(line1);
  const b = splitLine(line2);
  const itemsA = a.detail ? a.detail.split(',').map((x) => x.trim()).filter(Boolean) : [];
  const itemsB = b.detail ? b.detail.split(',').map((x) => x.trim()).filter(Boolean) : [];

  const box = (title: string, items: string[], Icon: IconType) => (
    <div className="flex gap-2.5">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          mutedFeatured ? 'bg-white/15 text-white' : 'bg-dk-green-200/80 text-dk-green-900'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </div>
      <div className="min-w-0">
        <div className="font-semibold leading-tight">{title}</div>
        {items.length > 0 ? (
          <ul
            className={`mt-1.5 list-inside list-disc space-y-0.5 text-[11.5px] leading-snug ${
              mutedFeatured ? 'text-white/80' : 'text-dk-green-900/90'
            }`}
          >
            {items.map((it) => (
              <li key={it} className="marker:text-current">
                {it}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );

  if (!itemsA.length && !itemsB.length) {
    return (
      <>
        <div className="font-medium leading-snug">{line1}</div>
        <div className={`mt-2 font-medium leading-snug ${mutedFeatured ? 'text-white/90' : 'text-dk-green-900'}`}>{line2}</div>
      </>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
      {box(a.title || line1, itemsA, FaTractor)}
      {box(b.title || line2, itemsB, FaUserMd)}
    </div>
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
                  {card.chips.map((c, i) => {
                    const ChipIcon = dashChipIcons[card.id]?.[i];
                    return (
                      <Chip key={c} icon={ChipIcon}>
                        {c}
                      </Chip>
                    );
                  })}
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
            <FaMobileAlt className="h-3.5 w-3.5 text-dk-green-800" aria-hidden />
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
                {app.chips.map((c, i) => {
                  const ChipIcon = appChipIcons[app.id]?.[i];
                  return (
                    <Chip key={c} featured={app.featured} icon={ChipIcon}>
                      {c}
                    </Chip>
                  );
                })}
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
                    <div className="flex flex-wrap items-center justify-between gap-2 font-medium">
                      <span>{app.visualLine1}</span>
                      <span className="inline-flex items-center gap-1.5 opacity-95" aria-hidden>
                        <FaMobileAlt className="h-4 w-4" />
                        <FaPlus className="h-2.5 w-2.5 opacity-80" />
                        <FaLaptop className="h-4 w-4" />
                      </span>
                    </div>
                    <p className={`mt-2 text-xs ${app.featured ? 'text-white/80' : 'text-dk-ink-2'}`}>{app.visualLine2}</p>
                  </>
                ) : (
                  <VetKonnectFlowFooter line1={app.visualLine1} line2={app.visualLine2} mutedFeatured={app.featured} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
