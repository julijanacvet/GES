// src/app/i18n.ts
import { createInstance, type i18n as I18nInstanceType } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
// @ts-ignore
import { i18n as i18nConfig } from '../../next-i18next.config.js';

export const getOptions = (lng = i18nConfig.defaultLocale, ns = 'common') => {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLngs: i18nConfig.locales,
    fallbackLng: i18nConfig.defaultLocale,
    lng,
    ns,
    defaultNS: 'common',
    // Explicitly tell i18next to not use localStorage or cookies for language detection on server
    // detection: {
    //   order: [], // No detection order on server
    //   caches: [], // No caching on server
    // },
  };
};

// Initialization for Server Components
const initServerTranslations = async (
  locale: string,
  namespaces: string[],
  i18nInstance?: I18nInstanceType, 
) => {
  const instance = i18nInstance || createInstance();
  instance.use(initReactI18next);
  instance.use(resourcesToBackend((language: string, namespace: string) =>
    import(`../../public/locales/${language}/${namespace}.json`)));
  
  await instance.init(getOptions(locale, namespaces));
  return instance;
};

export default initServerTranslations;


// Initialization for Client Components (via TranslationsProvider)
export async function initClientTranslations(
  locale: string,
  namespaces: string[],
  instance?: I18nInstanceType,
  resources?: any
) {
  const i18n = instance || createInstance();
  i18n.use(initReactI18next);
  if (!resources) { // Only use backend if resources are not preloaded (e.g. on client first load)
    i18n.use(resourcesToBackend((language: string, namespace: string) => 
      import(`../../public/locales/${language}/${namespace}.json`)));
  }
  await i18n.init(getOptions(locale, namespaces));

  if (resources && i18n.services.resourceStore) {
     Object.keys(resources).forEach((lang) => {
       if (resources[lang]) { // Check if lang exists
         Object.keys(resources[lang]).forEach((ns) => {
           if (resources[lang][ns]) { // Check if ns exists
             i18n.services.resourceStore.addResourceBundle(lang, ns, resources[lang][ns], true, true);
           }
         });
       }
     });
  }
  return i18n;
}
