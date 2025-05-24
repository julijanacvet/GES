// src/components/TranslationsProvider.tsx
'use client';

import { I18nextProvider, ReactI18NextChild } from 'react-i18next';
import { initClientTranslations } from '@/app/i18n';
import { ReactNode, useEffect, useState } from 'react';
import { createInstance, i18n as I18nInstanceType } from 'i18next';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: any; // This should be Record<string, any> or a more specific type
}) {
  // Initialize i18n instance on the client side
  const [i18n, setI18n] = useState<I18nInstanceType | null>(null);

  useEffect(() => {
    const instance = createInstance();
    initClientTranslations(locale, namespaces, instance, resources).then(() => {
      setI18n(instance);
    });
  }, [locale, namespaces, resources]);

  if (!i18n) {
    // You can render a loading state here if needed
    return null; 
  }

  return <I18nextProvider i18n={i18n}>{children as ReactI18NextChild}</I18nextProvider>;
}
