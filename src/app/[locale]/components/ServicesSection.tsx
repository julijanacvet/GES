
'use client';

import { useTranslation } from 'react-i18next';
import ServiceCard from './ServiceCard';

const servicesData = [
  {
    imageSrc: '/locales/images/Residential solar.jpg',
    imageAltKey: 'imagePlaceholders.service',
    dataAiHint: 'home solar installation',
    titleKey: 'services.residentialTitle',
    descriptionKey: 'services.residentialDesc',
    ctaKey: 'services.getResidentialQuoteBtn',
    ctaLink: '/#contact', 
  },
  {
    imageSrc: '/locales/images/Commercial solar.jpg',
    imageAltKey: 'imagePlaceholders.service',
    dataAiHint: 'business solar panels',
    titleKey: 'services.commercialTitle',
    descriptionKey: 'services.commercialDesc',
    ctaKey: 'services.getCommercialQuoteBtn',
    ctaLink: '/#contact',
  },
  {
    imageSrc: '/locales/images/Solar Power Plants.jpg',
    imageAltKey: 'imagePlaceholders.service',
    dataAiHint: 'solar farm field',
    titleKey: 'services.solarPlantsTitle',
    descriptionKey: 'services.solarPlantsDesc',
    ctaKey: 'services.exploreSolarPlantsBtn',
    ctaLink: '/#contact', 
  },
];

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
              imageSrc={service.imageSrc}
              imageAltKey={service.imageAltKey}
              dataAiHint={service.dataAiHint}
              titleKey={service.titleKey}
              descriptionKey={service.descriptionKey}
              ctaKey={service.ctaKey}
              ctaLink={service.ctaLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
