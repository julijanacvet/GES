
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <section id="home" className="relative bg-gradient-to-br from-background to-green-50/50 dark:from-background dark:to-green-900/20 pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        {/* Decorative background pattern or image if desired */}
      </div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="mb-6">
              {t('hero.headline')}
            </h1>
            <p className="mb-8 text-lg md:text-xl text-muted-foreground">
              {t('hero.subheadline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="btn-secondary shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground"
              >
                <Link href={`/${locale}/#calculator`}>{t('hero.calculateSavingsBtn')}</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="btn-secondary shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground"
              >
                <Link href={`/${locale}/#contact`}>{t('hero.getConsultationBtn')}</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl shadow-2xl overflow-hidden group">
             <Image 
              src="https://placehold.co/600x400.png" 
              alt={t('imagePlaceholders.hero')} 
              layout="fill"
              objectFit="cover"
              className="transform group-hover:scale-105 transition-transform duration-500"
              data-ai-hint="solar panels nature"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
              {t('imagePlaceholders.hero')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

