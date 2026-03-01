import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { NAVIGATION_ROUTES } from '../routes/config';
import UserTypeModal from './UserTypeModal';
import LanguageSwitcher from './ui/LanguageSwitcher';

import LOGO from '../assets/logo.png';

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  return (
    <>
      {/* <AnnouncementBanner /> */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all border-b border-black">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={LOGO}
            alt={t('common.ourDairy')}
            className="object-contain"
            style={{ height: '56px', width: '140px' }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          {NAVIGATION_ROUTES.map(route => {
            const active = isActive(route.path);
            return (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`hover:text-gray-500/80 transition ${active ? 'text-green-500 font-medium' : ''}`}
                >
                  {getRouteTranslation(route.path, route.name)}
                </Link>
              </li>
            );
          })}

          {/* Our Apps Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 hover:text-gray-500/80 transition ${portalLinks.some(link => isActive(link.path)) ? 'text-green-500 font-medium' : ''}`}
            >
              {t('common.ourApps')}
              <FaChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-30">
                {portalLinks.map(link => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-green-50 transition ${active ? 'text-green-500 font-medium bg-green-50' : 'text-gray-700'}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </li>
        </ul>

        {/* Language Switcher and Get Started Button - Desktop */}
        <div className="md:flex hidden items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={() => setIsUserTypeModalOpen(true)}
            className="relative bg-green-400 text-white px-9 py-2 rounded-full active:scale-95 transition-all overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('common.getStarted')}
              <FaArrowRight className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#000">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <ul className="flex flex-col space-y-4 text-lg">
            {NAVIGATION_ROUTES.map(route => {
              const active = isActive(route.path);
              return (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm ${active ? 'text-green-500 font-medium' : ''}`}
                  >
                    {getRouteTranslation(route.path, route.name)}
                  </Link>
                </li>
              );
            })}

            {/* Mobile Our Apps Section */}
            <li className="pt-2 border-t border-gray-200">
              <div className="text-sm font-semibold text-gray-700 mb-2">{t('common.ourApps')}</div>
              <ul className="flex flex-col space-y-2 pl-4">
                {portalLinks.map(link => {
                  const active = isActive(link.path);
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-sm ${active ? 'text-green-500 font-medium' : 'text-gray-600'}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsUserTypeModalOpen(true)
              }}
              className="relative bg-green-400 text-white text-sm active:scale-95 transition-all w-40 h-11 rounded-full overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('common.getStarted')}
                <FaArrowRight className="w-3 h-3" />
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </button>
          </div>
        </div>
      </nav>
      <UserTypeModal
        isOpen={isUserTypeModalOpen}
        onClose={() => setIsUserTypeModalOpen(false)}
      />
    </>
  );
}
