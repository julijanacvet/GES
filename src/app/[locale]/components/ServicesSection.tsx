'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const servicesData = [
  {
    imageSrc: '/locales/images/Residential solar.jpg',
    dataAiHint: 'home solar installation',
    titleKey: 'services.residentialTitle',
    descriptionKey: 'services.residentialDesc',
    ctaKey: 'services.getResidentialQuoteBtn',
    ctaLink: '/#contact',
  },
  {
    imageSrc: '/locales/images/Commercial solar.jpg',
    dataAiHint: 'business solar panels',
    titleKey: 'services.commercialTitle',
    descriptionKey: 'services.commercialDesc',
    ctaKey: 'services.getCommercialQuoteBtn',
    ctaLink: '/#contact',
  },
  {
    imageSrc: '/locales/images/Solar Power Plants.jpg',
    dataAiHint: 'solar farm field',
    titleKey: 'services.solarPlantsTitle',
    descriptionKey: 'services.solarPlantsDesc',
    ctaKey: 'services.exploreSolarPlantsBtn',
    ctaLink: '/#contact',
  },
];

const ServiceCard = ({ imageSrc, dataAiHint, titleKey, descriptionKey, ctaKey, ctaLink }: (typeof servicesData)[0]) => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <div className="service-card" data-ai-hint={dataAiHint}>
      <div className="service-card__background" style={{ backgroundImage: `url(${imageSrc})` }} />
      <div className="service-card__overlay"></div>
      <div className="service-card__content">
        <h3 className="service-card__title">{t(titleKey)}</h3>
        <p className="service-card__copy">{t(descriptionKey)}</p>
        <Button
          size="lg"
          asChild
          className="bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out group"
        >
           <Link href={`/${locale}${ctaLink}`}>
            {t(ctaKey)}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const { t, i18n } = useTranslation('common');
  const isMacedonian = i18n.language === 'mk';

  return (
    <section id="services" className="bg-muted/30 dark:bg-background/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {isMacedonian ? 'Соларни решенија' : t('services.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
