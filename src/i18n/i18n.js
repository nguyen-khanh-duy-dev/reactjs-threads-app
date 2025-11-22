import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "@/locales/en/home.json";
import HOME_VI from "@/locales/vi/home.json";
import AUTH_EN from "@/locales/en/auth.json";
import AUTH_VI from "@/locales/vi/auth.json";

export const locales = {
  en: "English",
  vi: "Tiếng việt",
};

const resources = {
  en: {
    home: HOME_EN,
    auth: AUTH_EN,
  },
  vi: {
    home: HOME_VI,
    auth: AUTH_VI,
  },
};

const defaultNS = "home";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns: ["home"],
    fallbackLng: "vi",
    defaultNS,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
