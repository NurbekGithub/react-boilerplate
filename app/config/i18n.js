import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";

i18n
  .use(XHR)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "ru",
    ns: ["header", "common"],
    defaultNS: "common",
    fallbackNS: "common",
    nonExplicitWhitelist: true,
    lng: "ru", // 'kk' | 'en' | 'ru'
    // debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    }
  });
