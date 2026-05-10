import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GET_STARTED_PORTAL_ENTRIES } from '../constants/portalEntryLinks';

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserTypeModal({ isOpen, onClose }: UserTypeModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">{t('userTypeModal.title')}</h2>
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {GET_STARTED_PORTAL_ENTRIES.map((entry) => (
            <Link
              key={entry.role}
              to={entry.path}
              onClick={onClose}
              className="group flex w-full flex-col items-center rounded-lg border-2 border-gray-200 p-6 transition-all hover:border-green-500 hover:bg-green-50"
            >
              <span className="mb-3 text-4xl" aria-hidden>
                {entry.icon}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 transition group-hover:text-green-600">
                {t(entry.nameKey)}
              </h3>
              <p className="text-center text-sm text-gray-600">{t(entry.descriptionKey)}</p>
              <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-green-700 opacity-0 transition group-hover:opacity-100">
                {t('userTypeModal.openPage')}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
