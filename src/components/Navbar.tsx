import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import {
  FaTractor,
  FaStethoscope,
  FaBuilding,
  FaWarehouse,
  FaMobileScreenButton,
} from 'react-icons/fa6';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ROUTES } from '../routes/config';
import UserTypeModal from './UserTypeModal';
import LanguageSwitcher from './ui/LanguageSwitcher';
import LOGO from '../assets/logo.png';
import { PORTAL_PATHS } from '../constants/portalEntryLinks';

const navLinkBase =
  'inline-flex items-center rounded-[11px] px-[16px] py-[11px] text-[15px] font-medium leading-none text-dk-ink-2 transition-all duration-200 hover:bg-dk-green-100 hover:text-dk-green-800';
const navLinkActive =
  'bg-dk-green-800 text-white shadow-dk-sm hover:bg-dk-green-800 hover:text-white';

type MegaLink = {
  path: string;
  titleKey: string;
  descKey: string;
  icon: IconType;
  iconShell: string;
};

const dashboardLinks: MegaLink[] = [
  {
    path: PORTAL_PATHS.dairy,
    titleKey: 'nav.dairyDashTitle',
    descKey: 'nav.dairyDashDesc',
    icon: FaBuilding,
    iconShell: 'bg-[#e0eef9] text-[#345d80]',
  },
  {
    path: PORTAL_PATHS.vendor,
    titleKey: 'nav.vendorDashTitle',
    descKey: 'nav.vendorDashDesc',
    icon: FaWarehouse,
    iconShell: 'bg-[#eefbf2] text-[#155e3f]',
  },
  {
    path: PORTAL_PATHS.farmer,
    titleKey: 'nav.farmerDashTitle',
    descKey: 'nav.farmerDashDesc',
    icon: FaTractor,
    iconShell: 'bg-[#fef0d4] text-[#a8761c]',
  },
];

const mobileAppLinks: MegaLink[] = [
  {
    path: '/farmer/app',
    titleKey: 'nav.farmerAppTitle',
    descKey: 'nav.farmerAppDesc',
    icon: FaMobileScreenButton,
    iconShell: 'bg-[#fef0d4] text-[#a8761c]',
  },
  {
    path: '/vet',
    titleKey: 'nav.vetAppTitle',
    descKey: 'nav.vetAppDesc',
    icon: FaStethoscope,
    iconShell: 'bg-[#fee9d6] text-[#c4521a]',
  },
];

const dashboardPaths = dashboardLinks.map((l) => l.path);
const mobilePaths = mobileAppLinks.map((l) => l.path);

function MegaMenuPanel({
  links,
  isActive,
  onNavigate,
}: {
  links: MegaLink[];
  isActive: (path: string) => boolean;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="min-w-[280px] rounded-[14px] border border-[#e3e9e2] bg-[#ffffff] p-2 text-[#0c1f17] shadow-[0_20px_50px_rgba(15,58,46,0.15)] dark:border-[#e3e9e2] dark:bg-[#ffffff] dark:text-[#0c1f17]">
      {links.map((link) => {
        const active = isActive(link.path);
        const Icon = link.icon;
        return (
          <Link
            key={`${link.path}-${link.titleKey}`}
            to={link.path}
            onClick={() => onNavigate?.()}
            className={`flex cursor-pointer gap-3 rounded-[10px] p-3 transition-colors hover:bg-[#eefbf2] ${
              active ? 'bg-[#e8f4ee]' : ''
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${link.iconShell}`}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-sm font-semibold text-[#0f3a2e]">{t(link.titleKey)}</span>
              <span className="mt-0.5 block text-xs leading-snug text-[#5a6b62]">{t(link.descKey)}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function NavDropdown({
  labelKey,
  links,
  pathname,
}: {
  labelKey: string;
  links: MegaLink[];
  pathname: string;
}) {
  const { t } = useTranslation();
  const isActivePath = (path: string) => pathname === path;
  const sectionActive = links.some((l) => isActivePath(l.path));

  return (
    <li className="group relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1 ${navLinkBase} ${sectionActive ? navLinkActive : ''}`}
        aria-haspopup="true"
      >
        {t(labelKey)}
        <FaChevronDown className="h-3 w-3 shrink-0 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none invisible absolute left-0 top-full z-40 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
        <MegaMenuPanel links={links} isActive={isActivePath} />
      </div>
    </li>
  );
}

type MobileDrawerSection = null | 'dashboards' | 'mobileApps';

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] =
    useState<MobileDrawerSection>(null);

  useEffect(() => {
    setIsDrawerOpen(false);
    setMobileOpenSection(null);
  }, [pathname]);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isDrawerOpen]);

  const isActivePath = (path: string) => pathname === path;

  const getRouteTranslation = (path: string, name?: string) => {
    const translationMap: Record<string, string> = {
      '/market': 'nav.marketplace',
      '/milk-prices': 'nav.pricing',
      '/feeds': 'common.feeds',
      '/news': 'common.news',
    };
    const key = translationMap[path];
    return key ? t(key) : (name || '');
  };

  const mainNavOrder = ['/market', '/milk-prices', '/feeds', '/news'];
  const orderedNavRoutes = mainNavOrder
    .map((path) => NAVIGATION_ROUTES.find((r) => r.path === path))
    .filter(Boolean) as typeof NAVIGATION_ROUTES;

  const dashboardsActive = dashboardPaths.some((p) => isActivePath(p));
  const mobileAppsActive = mobilePaths.some((p) => isActivePath(p));

  const toggleMobileSection = (section: Exclude<MobileDrawerSection, null>) => {
    setMobileOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-dk-line bg-[rgba(251,249,243,0.85)] backdrop-blur-[20px]">
        <div className="dk-page-inner flex items-center justify-between gap-5 py-[14px] md:py-[15px]">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={t('common.ourDairy')}
          >
            <img
              src={LOGO}
              alt=""
              width={38}
              height={38}
              className="h-[38px] w-[38px] shrink-0 rounded-xl object-contain"
            />
            <span className="font-serif text-[22px] font-bold leading-none tracking-tight text-dk-green-900">
              {t('common.ourDairy')}
            </span>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center md:flex">
            <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-1.5">
              <li>
                <Link
                  to="/"
                  className={`inline-flex ${navLinkBase} ${isActivePath('/') ? navLinkActive : ''}`}
                >
                  {t('common.home')}
                </Link>
              </li>

              <NavDropdown
                labelKey="nav.dashboards"
                links={dashboardLinks}
                pathname={pathname}
              />
              <NavDropdown
                labelKey="nav.mobileApps"
                links={mobileAppLinks}
                pathname={pathname}
              />

              {orderedNavRoutes.map((route) => {
                const active = isActivePath(route.path);
                return (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className={`inline-flex ${navLinkBase} ${active ? navLinkActive : ''}`}
                    >
                      {getRouteTranslation(route.path, route.name)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setIsUserTypeModalOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-transparent bg-dk-green-800 px-[18px] text-sm font-semibold leading-none text-white shadow-dk-sm transition-all duration-200 hover:-translate-y-px hover:bg-dk-green-900 hover:shadow-dk-md active:translate-y-0"
            >
              {t('common.getStarted')}
              <FaArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              aria-label={isDrawerOpen ? t('common.close') : t('common.menu')}
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-[10px] text-dk-ink transition hover:bg-dk-green-100 active:scale-95"
            >
              {isDrawerOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenuAlt3 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>
      {/* Reserve space so content does not sit under the fixed bar */}
      <div className="h-[68px] shrink-0 md:h-[70px]" aria-hidden />

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(340px,92vw)] flex-col border-l border-dk-line bg-dk-cream shadow-dk-lg md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={t('common.menu')}
            >
              <div className="flex items-center justify-between border-b border-dk-line px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-dk-muted">
                  {t('common.menu')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label={t('common.close')}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-dk-muted transition hover:bg-dk-green-100 hover:text-dk-ink"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
                <Link
                  to="/"
                  onClick={() => setIsDrawerOpen(false)}
                  className={`mb-1 rounded-[10px] px-4 py-3 text-base font-medium ${isActivePath('/') ? navLinkActive : `${navLinkBase} text-dk-ink-2`}`}
                >
                  {t('common.home')}
                </Link>

                <div className="mt-1 border-t border-dk-line pt-3">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('dashboards')}
                    className={`flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left text-base font-medium ${dashboardsActive ? navLinkActive : 'text-dk-ink-2 hover:bg-dk-green-100'}`}
                  >
                    {t('nav.dashboards')}
                    <FaChevronDown
                      className={`h-3 w-3 shrink-0 transition-transform ${mobileOpenSection === 'dashboards' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileOpenSection === 'dashboards' && (
                    <div className="mt-2">
                      <MegaMenuPanel
                        links={dashboardLinks}
                        isActive={isActivePath}
                        onNavigate={() => setIsDrawerOpen(false)}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-3 border-t border-dk-line pt-3">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection('mobileApps')}
                    className={`flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left text-base font-medium ${mobileAppsActive ? navLinkActive : 'text-dk-ink-2 hover:bg-dk-green-100'}`}
                  >
                    {t('nav.mobileApps')}
                    <FaChevronDown
                      className={`h-3 w-3 shrink-0 transition-transform ${mobileOpenSection === 'mobileApps' ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileOpenSection === 'mobileApps' && (
                    <div className="mt-2">
                      <MegaMenuPanel
                        links={mobileAppLinks}
                        isActive={isActivePath}
                        onNavigate={() => setIsDrawerOpen(false)}
                      />
                    </div>
                  )}
                </div>

                <ul className="mt-4 flex flex-col border-t border-dk-line pt-3">
                  {orderedNavRoutes.map((route) => {
                    const active = isActivePath(route.path);
                    return (
                      <li key={route.path}>
                        <Link
                          to={route.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`mb-1 block rounded-[10px] px-4 py-3 text-base font-medium ${active ? navLinkActive : `${navLinkBase} text-dk-ink-2`}`}
                        >
                          {getRouteTranslation(route.path, route.name)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-dk-line px-4 py-5">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsUserTypeModalOpen(true);
                  }}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-dk-green-800 text-sm font-semibold leading-none text-white shadow-dk-sm transition hover:-translate-y-px hover:brightness-110 active:translate-y-0"
                >
                  {t('common.getStarted')}
                  <FaArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <UserTypeModal
        isOpen={isUserTypeModalOpen}
        onClose={() => setIsUserTypeModalOpen(false)}
      />
    </>
  );
}
