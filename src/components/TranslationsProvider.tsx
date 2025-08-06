
// src/components/TranslationsProvider.tsx
'use client';

import { I18nextProvider, ReactI18NextChild } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { ReactNode, useEffect, useState } from 'react';
import { createInstance, i18n as I18nInstanceType } from 'i18next';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
}) {
  const [i18n, setI18n] = useState<I18nInstanceType | null>(null);

  useEffect(() => {
    const instance = createInstance();
    initTranslations(locale, namespaces, instance).then(() => {
      setI18n(instance);
    });
  }, [locale, namespaces]);

  if (!i18n) {
    return null; 
  }

  return <I18nextProvider i18n={i18n}>{children as ReactI18NextChild}</I18nextProvider>;
}
