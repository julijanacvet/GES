
// src/app/i18n.ts
import { createInstance, type i18n as I18nInstanceType } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
// @ts-ignore
import i18nConfig from '../../next-i18next.config.js';

export const getOptions = (lng = i18nConfig.defaultLocale, ns = 'common') => {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    lng,
    ns,
    defaultNS: 'common',
    react: {
      useSuspense: true, // Recommended for React 18+ and App Router
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  };
};

const initTranslations = async (
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nInstanceType, 
) => {
  const instance = i18nInstance || createInstance();
  instance.use(initReactI18next);
  instance.use(resourcesToBackend((language: string, namespace: string) =>
    import(`../locales/${language}/${namespace}.json`)));
  
  await instance.init(getOptions(locale, namespaces));
  return instance;
};


export default initTranslations;
