import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend) // loads translations from your public/locales folder
    .use(LanguageDetector) // detects user language
    .use(initReactI18next) // passes i18n instance to react-i18next
    .init({
        fallbackLng: 'en', // default language
        debug: false, // enable debug mode for development
        interpolation: {
            escapeValue: false, // react already escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // path to your translation files
        },
        supportedLngs: ['en', 'te', 'kn', 'hi', 'ta'], // supported languages
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});

// Set initial lang attribute
if (typeof document !== 'undefined') {
    document.documentElement.lang = i18n.language;
}

export default i18n;

