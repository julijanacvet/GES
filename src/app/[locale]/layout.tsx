
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css'; // Adjusted path
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
// @ts-ignore
import { i18n as i18nConfig } from '../../../next-i18next.config.js';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale: string) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'GES - Green Energy Solutions', // This can be localized later if needed
  description: 'Sustainable Solar Solutions for Macedonia.',
};

const i18nNamespaces = ['common'];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={inter.variable}>
      <body className="antialiased">
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
          {children}
          <Toaster />
        </TranslationsProvider>
      </body>
    </html>
  );
}
