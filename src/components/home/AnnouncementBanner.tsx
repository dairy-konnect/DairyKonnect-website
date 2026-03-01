import { useTranslation } from 'react-i18next'

export default function AnnouncementBanner() {
    const { t } = useTranslation()
    return (
        <div className="text-sm text-white w-full">
            <div className="text-center font-medium py-2 bg-gradient-to-r from-green-300 via-green-400 to-emerald-400">
                <p>
                    {t('banner.launchingSoon')}{' '}
                    <span className="underline underline-offset-2">{t('banner.stayTuned')}</span>
                </p>
            </div>
        </div>
    )
}

