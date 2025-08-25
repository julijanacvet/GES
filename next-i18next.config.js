/** @type {import('next-i18next').UserConfig} */
module.exports = {
    defaultLocale: 'mk', // Macedonian as default
    locales: ['mk', 'en'], // Supported languages
  // For production, you might want to cache translations longer
  // localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  // reloadOnPrerender: process.env.NODE_ENV === 'development',
  // ns: ['common'], // default namespace
  // serializeConfig: false, // Important for App Router
  // use: [], // if you have any i18next plugins
};
