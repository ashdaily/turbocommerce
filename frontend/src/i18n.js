import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import en_translations from '../src/locales/en/translation.json'
import ja_translations from '../src/locales/ja/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: { ...en_translations }
      },
      ja: {
        translation: { ...ja_translations }
      }
    },
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;