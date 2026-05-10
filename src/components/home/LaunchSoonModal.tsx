import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LaunchSoonModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[280] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-dk-line bg-dk-cream p-6 text-center shadow-dk-lg sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-dk-green-100 sm:h-16 sm:w-16">
          <svg className="h-7 w-7 text-dk-green-800 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 id="launch-modal-title" className="text-lg font-semibold text-dk-ink sm:text-xl">
          {t('banner.launchingSoon')}
        </h3>
        <p className="mt-2 text-sm text-dk-ink-2 sm:text-base">{t('banner.stayTuned')}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-dk-green-800 py-2.5 text-sm font-medium text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          {t('common.close')}
        </button>
      </div>
    </div>
  );
}
