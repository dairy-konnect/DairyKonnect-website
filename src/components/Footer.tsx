import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { NAVIGATION_ROUTES } from '../routes/config';
import LOGO from '../assets/logo.png';

export default function Footer() {
  const { t } = useTranslation();

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

  return (
    <footer className="w-full border-t border-black bg-white text-gray-700">
      {/* Main footer content */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-14 xl:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
          {/* Brand block */}
          <div className="shrink-0 lg:max-w-sm xl:max-w-md">
            <Link
              to="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
              aria-label={t('common.ourDairy')}
            >
              <img
                src={LOGO}
                alt={t('common.ourDairy')}
                className="object-contain"
                style={{
                  height: 'clamp(56px, 8vw, 72px)',
                  width: 'clamp(140px, 22vw, 200px)',
                }}
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
              {t('footer.description')}
            </p>
          </div>

          {/* Links grid */}
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-14">
            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {t('common.company')}
              </h3>
              <ul className="mt-4 space-y-3 sm:mt-5">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5"
                  >
                    {t('common.home')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5"
                  >
                    {t('common.about')}
                  </Link>
                </li>
                {NAVIGATION_ROUTES.filter(
                  (r) => r.path !== '/' && r.path !== '/about'
                ).map((route) => (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5"
                    >
                      {getRouteTranslation(route.path, route.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Apps */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {t('common.ourApps')}
              </h3>
              <ul className="mt-4 space-y-3 sm:mt-5">
                <li>
                  <a
                    href="http://localhost:5174/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5 inline-block"
                  >
                    {t('common.farmer')}
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:5175/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5 inline-block"
                  >
                    {t('common.vendor')}
                  </a>
                </li>
                <li>
                  <a
                    href="http://localhost:5176/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5 inline-block"
                  >
                    {t('common.dairy')}
                  </a>
                </li>
                <li>
                  <Link
                    to="/vet"
                    className="text-sm text-gray-600 transition hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5"
                  >
                    {t('common.ourVet')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get in touch */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {t('common.getInTouch')}
              </h3>
              <div className="mt-4 space-y-2 sm:mt-5">
                <p>
                  <a
                    href="tel:+917981474788"
                    className="text-sm text-gray-600 transition hover:text-green-500 break-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5 inline-block"
                  >
                    +91 7981474788
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:dairykonnect@gmail.com"
                    className="text-sm text-gray-600 transition hover:text-green-500 break-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1 py-0.5 -mx-1 -my-0.5 inline-block"
                  >
                    dairykonnect@gmail.com
                  </a>
                </p>
              </div>
              <Link
                to="/about#contact"
                className="relative mt-5 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-green-400 px-5 py-2.5 text-sm font-medium text-white transition active:scale-[0.98] hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 group sm:mt-6 sm:px-6 sm:py-3"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('common.contactUs')}
                  <FaArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-black transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-10 xl:px-12">
          <p className="text-center text-xs text-gray-500 sm:text-sm">
            {t('common.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
