import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import UserTypeModal from '../UserTypeModal'

export default function Hero() {
  const { t } = useTranslation()
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false)

  return (
    <section className="w-full">
      <main className="flex flex-col max-md:gap-20 md:flex-row pb-20 items-center justify-between mt-20 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-center md:text-left text-4xl leading-[46px] md:text-5xl md:leading-[68px] font-semibold max-w-xl text-slate-900">
            {t('hero.title')}{' '}
            <span className="text-green-500">{t('hero.subtitle')}</span>
          </h1>

          <p className="text-center md:text-left text-sm text-slate-700 max-w-lg mt-2">
            {t('hero.description')}
          </p>

          <div className="flex items-center gap-4 mt-8 text-sm">
            <button
              className="relative bg-green-400 text-white active:scale-95 transition rounded-full px-7 h-11 overflow-hidden group"
              onClick={() => setIsUserTypeModalOpen(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('common.getStarted')}
                <FaArrowRight className="w-4 h-4" />
              </span>
              <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
            </button>
            <Link
              to="/about"
              className="flex items-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-full px-6 h-11"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                <rect x="2" y="6" width="14" height="12" rx="2" />
              </svg>
              <span>{t('common.learnMore')}</span>
            </Link>
          </div>
        </div>

        <img
          src="/hero.png"
          alt={t('common.ourDairy')}
          className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl transition-all duration-300 rounded-tl-[6rem] rounded-br-[6rem]"
        />
      </main>

      <UserTypeModal
        isOpen={isUserTypeModalOpen}
        onClose={() => setIsUserTypeModalOpen(false)}
      />
    </section>
  )
}

