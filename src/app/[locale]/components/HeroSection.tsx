
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center text-center min-h-[70vh] md:min-h-[85vh] py-16 md:py-24 overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1545209463-e2825498edbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8c29sYXIlMjBwYW5lbHN8ZW58MHx8fHwxNzQ4MTA1MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
        alt={t('imagePlaceholders.hero')}
        layout="fill"
        objectFit="cover"
        className="-z-20" // Behind content and overlay
        data-ai-hint="solar panels modern house"
        priority
      />
      <div className="absolute inset-0 bg-black/50 -z-10"></div> {/* Darkening overlay */}
      
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-foreground"> {/* Ensure text color contrasts with dark overlay/image */}
          <h1 className="mb-6">
            {t('hero.headline')}
          </h1>
          <p className="mb-8 text-lg md:text-xl text-foreground/90"> {/* Slightly muted subheadline for better hierarchy */}
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              variant="outline"
              className="bg-transparent border border-primary text-primary font-bold py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground rounded-[8px] transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#calculator`}>{t('hero.calculateSavingsBtn')}</Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="bg-transparent border border-primary text-primary font-bold py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground rounded-[8px] transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#contact`}>{t('hero.getConsultationBtn')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
