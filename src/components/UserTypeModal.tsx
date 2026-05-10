import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_STARTED_PORTAL_ENTRIES } from '../constants/portalEntryLinks';
import { PORTAL_LINKS_LIVE } from '../hooks/useLaunchSoonModal';
import LaunchSoonModal from './home/LaunchSoonModal';

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserTypeModal({ isOpen, onClose }: UserTypeModalProps) {
  const { t } = useTranslation();
  const [launchSoonOpen, setLaunchSoonOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setLaunchSoonOpen(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && !launchSoonOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen, launchSoonOpen]);

  if (!isOpen && !launchSoonOpen) return null;

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-type-modal-title"
          onClick={onClose}
        >
          <div
            className="relative z-[221] mx-auto w-full max-w-[min(100%,56rem)] rounded-2xl bg-white p-6 shadow-xl sm:p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="user-type-modal-title" className="text-2xl font-semibold text-gray-900">
                {t('userTypeModal.title')}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 transition hover:text-gray-600"
                aria-label={t('common.close')}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mb-6 text-gray-600">{t('userTypeModal.description')}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {GET_STARTED_PORTAL_ENTRIES.map((entry) => (
                <div
                  key={entry.role}
                  className="flex min-h-0 flex-col rounded-xl border-2 border-gray-200 p-5 transition-all hover:border-green-500 hover:bg-green-50 sm:p-6"
                >
                  {PORTAL_LINKS_LIVE ? (
                    <Link
                      to={entry.path}
                      onClick={onClose}
                      className="group flex w-full flex-1 flex-col items-center justify-center text-center"
                    >
                      <span className="mb-3 text-4xl" aria-hidden>
                        {entry.icon}
                      </span>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition group-hover:text-green-600">
                        {t(entry.nameKey)}
                      </h3>
                      <p className="text-balance text-center text-sm text-gray-600">{t(entry.descriptionKey)}</p>
                      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-green-700 opacity-0 transition group-hover:opacity-100">
                        {t('userTypeModal.openPage')}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLaunchSoonOpen(true)}
                      className="group flex w-full flex-1 flex-col items-center justify-center text-center"
                    >
                      <span className="mb-3 text-4xl" aria-hidden>
                        {entry.icon}
                      </span>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition group-hover:text-green-600">
                        {t(entry.nameKey)}
                      </h3>
                      <p className="text-balance text-center text-sm text-gray-600">{t(entry.descriptionKey)}</p>
                      <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-green-700">
                        {t('userTypeModal.openAppSoon', { defaultValue: 'Launching soon' })}
                      </span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <LaunchSoonModal
        isOpen={launchSoonOpen}
        onClose={() => {
          setLaunchSoonOpen(false);
          onClose();
        }}
      />
    </>
  );
}
