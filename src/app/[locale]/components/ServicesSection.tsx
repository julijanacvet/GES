'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

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


const ServiceCard = ({ imageSrc, imageAltKey, dataAiHint, titleKey, descriptionKey, ctaKey, ctaLink }: (typeof servicesData)[0]) => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full h-56">
        <Image 
          src={imageSrc}
          alt={t(imageAltKey)}
          layout="fill"
          objectFit="cover"
          data-ai-hint={dataAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{t(descriptionKey)}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full btn-primary group">
          <Link href={`/${locale}${ctaLink}`}>
            {t(ctaKey)}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
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