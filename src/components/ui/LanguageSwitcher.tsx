import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-dk-line bg-dk-cream px-3 text-sm font-medium leading-none text-dk-ink transition hover:border-dk-green-700 hover:text-dk-green-800"
        aria-label="Change language"
      >
        <span>{currentLanguage.nativeName}</span>
        <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-30 mt-2 w-44 rounded-[14px] border border-dk-line bg-white py-2 shadow-[0_20px_50px_rgba(15,58,46,0.15)] dark:bg-dk-cream-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm transition hover:bg-dk-green-100 ${
                i18n.language === lang.code
                  ? 'bg-dk-green-100 font-medium text-dk-green-800'
                  : 'text-dk-ink-2'
              }`}
            >
              <div className="flex flex-col">
                <span>{lang.nativeName}</span>
                <span className="text-xs text-dk-muted">{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

