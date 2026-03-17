import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './translations/fr.json';
import en from './translations/en.json';
import ar from './translations/ar.json';

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Set HTML lang and dir attributes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;
