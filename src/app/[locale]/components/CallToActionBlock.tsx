
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallToActionBlock() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <section id="contact" className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('cta.finalHeadline')}
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          {t('cta.finalSubheadline')}
        </p>
        <Button
          size="lg"
          asChild
          className="bg-accent hover:bg-yellow-500 text-accent-foreground font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href={`/${locale}/#contact`}>{t('cta.requestFreeQuoteBtn')}</Link>
        </Button>
        {/* Optional: Secondary CTA with phone/email */}
        <div className="mt-6 text-sm opacity-90">
          <p className="text-primary-foreground">{t('footer.phoneLabel')} <a href={`tel:${t('footer.phoneValue')}`} className="text-primary-foreground hover:underline">{t('footer.phoneValue')}</a></p>
          <p className="text-primary-foreground">{t('footer.emailLabel')} <a href={`mailto:${t('footer.emailValue')}`} className="text-primary-foreground hover:underline">{t('footer.emailValue')}</a></p>
        </div>
      </div>
    </section>
  );
}
