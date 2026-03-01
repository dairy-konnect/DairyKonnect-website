import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { NAVIGATION_ROUTES } from '../routes/config'
import LOGO from '../assets/logo.png';

export default function Footer() {
  const { t } = useTranslation()
  
  const getRouteTranslation = (path: string, name?: string) => {
    const translationMap: Record<string, string> = {
      '/about': 'common.about',
      '/market': 'common.market',
      '/feeds': 'common.feeds',
      '/news': 'common.news',
    };
    const key = translationMap[path];
    return key ? t(key) : (name || '');
  };
  
  return (
    <footer className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-6 sm:pt-8 w-full text-gray-500 border-t border-black">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-8 sm:gap-10 border-b border-gray-500/30 pb-6">
        <div className="w-full lg:max-w-96 mb-6 lg:mb-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={LOGO}
              alt={t('common.ourDairy')}
              className="object-contain"
              style={{ height: '88px', width: '240px' }}
            />
          </Link>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm">
            {t('footer.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 lg:flex-1 lg:justify-end">
          <div>
            <h2 className="font-semibold mb-4 sm:mb-5 text-gray-800 text-sm sm:text-base">{t('common.company')}</h2>
            <ul className="text-xs sm:text-sm space-y-2">
              <li>
                <Link to="/" className="hover:text-green-600 transition">{t('common.home')}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-green-600 transition">{t('common.about')}</Link>
              </li>
              {NAVIGATION_ROUTES.filter(route => route.path !== '/about' && route.path !== '/feeds').map(route => (
                <li key={route.path}>
                  <Link to={route.path} className="hover:text-green-600 transition">
                    {getRouteTranslation(route.path, route.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 sm:mb-5 text-gray-800 text-sm sm:text-base">{t('common.ourApps')}</h2>
            <ul className="text-xs sm:text-sm space-y-2">
              <li>
                <a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
                  {t('common.farmer')}
                </a>
              </li>
              <li>
                <a href="http://localhost:5175/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
                  {t('common.vendor')}
                </a>
              </li>
              <li>
                <a href="http://localhost:5176/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition">
                  {t('common.dairy')}
                </a>
              </li>
              <li>
                <Link to="/vet" className="hover:text-green-600 transition">
                  {t('common.ourVet')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-semibold mb-4 sm:mb-5 text-gray-800 text-sm sm:text-base">{t('common.getInTouch')}</h2>
            <div className="text-xs sm:text-sm space-y-2">
              <p>
                <a href="tel:+917981474788" className="hover:text-green-600 transition break-all">
                  +91 7981474788
                </a>
              </p>
              <p>
                <a href="mailto:dairykonnect@gmail.com" className="hover:text-green-600 transition break-all">
                  dairykonnect@gmail.com
                </a>
              </p>
            </div>
            <Link
              to="/about#contact"
              className="relative flex items-center justify-center gap-2 mt-4 bg-green-400 hover:bg-green-500 text-white py-2 sm:py-2.5 px-4 sm:px-6 rounded-full transition overflow-hidden group text-xs sm:text-sm w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('common.contactUs')}
                <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-xs sm:text-sm pb-4 sm:pb-5 px-4">
        {t('common.copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  )
}
