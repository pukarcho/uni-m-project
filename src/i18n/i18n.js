import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const English = require('./en.json');
const Bulgarian = require('./bg.json');

const resources = {
  en: {
    translation: English
  },
  bg: {
    translation: Bulgarian
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language'),
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;