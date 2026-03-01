import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import UserTypeModal from '../UserTypeModal';

export default function Hero() {
  const { t } = useTranslation();
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden">
      <main className="flex flex-col max-md:gap-12 md:flex-row md:gap-8 lg:gap-12 xl:gap-16 pb-12 sm:pb-16 md:pb-20 items-center justify-between mt-14 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start w-full max-w-xl">
          <h1 className="text-center md:text-left text-3xl leading-tight sm:text-4xl sm:leading-[2.75rem] md:text-5xl md:leading-[3.25rem] lg:text-5xl lg:leading-[3.5rem] xl:text-6xl xl:leading-[4rem] font-semibold text-slate-900">
            {t('hero.title')}{' '}
            <span className="text-green-500">{t('hero.subtitle')}</span>
          </h1>

          <p className="text-center md:text-left text-sm sm:text-base text-slate-700 max-w-lg mt-3 sm:mt-4">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto justify-center md:justify-start">
            <button
              className="relative bg-green-400 text-white active:scale-95 transition rounded-full px-6 sm:px-7 h-10 sm:h-11 overflow-hidden group w-full sm:w-auto text-sm sm:text-base"
              onClick={() => setIsUserTypeModalOpen(true)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('common.getStarted')}
                <FaArrowRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            </button>
            <Link
              to="/about"
              className="flex items-center justify-center gap-2 border border-slate-600 active:scale-95 hover:bg-slate-50 transition text-slate-600 rounded-full px-5 sm:px-6 h-10 sm:h-11 w-full sm:w-auto text-sm sm:text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              <span>{t('common.learnMore')}</span>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl shrink-0">
          <img
            src="/hero.png"
            alt={t('common.ourDairy')}
            className="w-full h-auto object-contain rounded-tl-[4rem] rounded-br-[4rem] sm:rounded-tl-[5rem] sm:rounded-br-[5rem] md:rounded-tl-[6rem] md:rounded-br-[6rem] transition-all duration-300"
          />
        </div>
      </main>

      <UserTypeModal
        isOpen={isUserTypeModalOpen}
        onClose={() => setIsUserTypeModalOpen(false)}
      />
    </section>
  );
}
