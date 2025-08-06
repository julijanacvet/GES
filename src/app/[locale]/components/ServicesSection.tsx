
'use client';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
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
    <Card className="service-card group h-[450px]">
      <Image
        src={imageSrc}
        alt={t(titleKey)}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        className="service-card__background"
        data-ai-hint={dataAiHint}
      />
      <div className="service-card__content">
        <h3 className="text-2xl font-bold mb-2">{t(titleKey)}</h3>
        <p className="text-base mb-4 opacity-90">
          {t(descriptionKey)}
        </p>
        <Button asChild className="w-full mt-auto btn-secondary group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent">
          <Link href={`/${locale}${ctaLink}`}>
            {t(ctaKey)} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default function ServicesSection() {
  const { t } = useTranslation('common');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.service-card');
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="services" className="bg-muted/30 dark:bg-background/50" ref={sectionRef}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('services.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
