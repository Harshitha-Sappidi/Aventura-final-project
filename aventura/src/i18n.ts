import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

// i18n for internationalization
i18n
  .use(HttpApi)
  .use(initReactI18next)
  // init i18next
  .init({
    lng: 'en',
    fallbackLng: 'ta',
    ns: ['common'],
    //to load from common.js
    backend: {
        loadPath: '/i18n/{{lng}}/{{ns}}.json',
    },
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });

  export default i18n;