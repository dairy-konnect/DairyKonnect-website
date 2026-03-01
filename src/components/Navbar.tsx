import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_ROUTES } from '../routes/config';
import UserTypeModal from './UserTypeModal';
import LanguageSwitcher from './ui/LanguageSwitcher';

import LOGO from '../assets/logo.png';

const NAV_HEIGHT = 72;

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsDrawerOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  const getRouteTranslation = (path: string, name?: string) => {
    const translationMap: Record<string, string> = {
      '/about': 'common.about',
      '/market': 'common.market',
      '/milk-prices': 'milkPrices.title',
      '/feeds': 'common.feeds',
      '/news': 'common.news',
    };
    const key = translationMap[path];
    return key ? t(key) : (name || '');
  };

  const portalLinks = [
    { path: '/farmer', name: t('common.farmer') },
    { path: '/vendor', name: t('common.vendor') },
    { path: '/dairy', name: t('common.dairy') },
    { path: '/vet', name: t('common.ourVet') },
  ];

  // Nav order: Our Apps first, then Feeds, About, News
  const mainNavOrder = ['/feeds', '/about', '/news'];
  const orderedNavRoutes = mainNavOrder
    .map((path) => NAVIGATION_ROUTES.find((r) => r.path === path))
    .filter(Boolean) as typeof NAVIGATION_ROUTES;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black bg-white text-gray-900 transition-all"
        style={{ height: `${NAV_HEIGHT}px` }}
      >
        {/* Logo - responsive sizing */}
        <Link
          to="/"
          className="flex shrink-0 items-center pl-4 sm:pl-6 md:pl-8 lg:pl-10 xl:pl-12 2xl:pl-16"
          aria-label={t('common.ourDairy')}
        >
          <img
            src={LOGO}
            alt={t('common.ourDairy')}
            className="object-contain transition-all duration-200"
            style={{
              height: 'clamp(40px, 5vw, 52px)',
              width: 'clamp(100px, 18vw, 130px)',
            }}
          />
        </Link>

        {/* Desktop Navigation - Our Apps first, then Feeds, About, News */}
        <ul className="hidden items-center md:flex md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 md:pl-8 lg:pl-12 xl:pl-16">
          {/* Our Apps Dropdown - first */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 whitespace-nowrap text-sm font-medium transition hover:text-gray-500/80 lg:text-base ${
                portalLinks.some((link) => isActive(link.path))
                  ? 'text-green-500 font-medium'
                  : ''
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {t('common.ourApps')}
              <FaChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full z-30 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                >
                  {portalLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition hover:bg-green-50 ${
                          active
                            ? 'bg-green-50 font-medium text-green-500'
                            : 'text-gray-700'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {orderedNavRoutes.map((route) => {
            const active = isActive(route.path);
            return (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`whitespace-nowrap text-sm font-medium transition hover:text-gray-500/80 lg:text-base ${
                    active ? 'text-green-500 font-medium' : ''
                  }`}
                >
                  {getRouteTranslation(route.path, route.name)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop: Language + CTA */}
        <div className="hidden items-center gap-3 md:flex md:pr-6 lg:gap-4 lg:pr-8 xl:pr-10 2xl:pr-16">
          <LanguageSwitcher />
          <button
            onClick={() => setIsUserTypeModalOpen(true)}
            className="relative bg-green-400 text-white px-6 py-2.5 rounded-full active:scale-95 transition-all overflow-hidden group lg:px-8 lg:py-3 lg:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('common.getStarted')}
              <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </button>
        </div>

        {/* Mobile: Menu button */}
        <div className="flex items-center pr-4 sm:pr-6 md:hidden">
          <button
            type="button"
            aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-900 transition hover:bg-gray-100 active:scale-95"
          >
            {isDrawerOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer: overlay + panel */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel - slides from right */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(320px,88vw)] flex-col border-l border-black bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  {t('common.menu', 'Menu')}
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <HiX className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable content - Our Apps first, then Feeds, About, News */}
              <div className="flex flex-1 flex-col overflow-y-auto py-4">
                {/* Our Apps section in drawer - first */}
                <div className="px-3 pb-4">
                  <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t('common.ourApps')}
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {portalLinks.map((link) => {
                      const active = isActive(link.path);
                      return (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                              active
                                ? 'bg-green-50 text-green-500 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-2 border-t border-gray-200 px-3 pt-4">
                  <ul className="flex flex-col px-0">
                    {orderedNavRoutes.map((route) => {
                      const active = isActive(route.path);
                      return (
                        <li key={route.path}>
                          <Link
                            to={route.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className={`block rounded-xl px-4 py-3.5 text-base font-medium transition ${
                              active
                                ? 'bg-green-50 text-green-500 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {getRouteTranslation(route.path, route.name)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Drawer footer: language + CTA */}
                <div className="mt-auto border-t border-gray-200 px-4 py-5">
                  <div className="mb-4">
                    <LanguageSwitcher />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setIsUserTypeModalOpen(true);
                    }}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-green-400 py-3.5 text-base font-medium text-white transition-all active:scale-[0.98]"
                  >
                    <span className="relative z-10">
                      {t('common.getStarted')}
                    </span>
                    <FaArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                  </button>
                </div>
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
