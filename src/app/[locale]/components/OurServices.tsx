
'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const services = [
  { imgSrc: '/locales/images/services/Panel instalation.png', textKey: 'ourServices.panelInstallation' },
  { imgSrc: '/locales/images/services/Cleaning.webp', textKey: 'ourServices.cleaning' },
  { imgSrc: '/locales/images/services/Maintenance.jpg', textKey: 'ourServices.maintenance' },
  { imgSrc: '/locales/images/services/Energy monitoring.jpg', textKey: 'ourServices.energyMonitoring' },
  { imgSrc: '/locales/images/services/Battery maintenance.png', textKey: 'ourServices.batteryMaintenance' },
  { imgSrc: '/locales/images/services/Troubleshooting.jpg', textKey: 'ourServices.troubleshooting' },
  { imgSrc: '/locales/images/services/Inverter repair.png', textKey: 'ourServices.inverterRepair' },
  { imgSrc: '/locales/images/services/Calibration.webp', textKey: 'ourServices.calibration' },
];

const serviceTranslations: { [key: string]: { [lang: string]: string } } = {
  'ourServices.panelInstallation': { en: 'Panel Installation', mk: 'Инсталација на панели' },
  'ourServices.cleaning': { en: 'Cleaning', mk: 'Чистење' },
  'ourServices.maintenance': { en: 'Maintenance', mk: 'Одржување' },
  'ourServices.energyMonitoring': { en: 'Energy Monitoring', mk: 'Мониторинг на енергија' },
  'ourServices.batteryMaintenance': { en: 'Battery Maintenance', mk: 'Одржување на батерии' },
  'ourServices.troubleshooting': { en: 'Troubleshooting', mk: 'Решавање проблеми' },
  'ourServices.inverterRepair': { en: 'Inverter Repair', mk: 'Поправка на инвертер' },
  'ourServices.calibration': { en: 'Calibration', mk: 'Калибрација' },
};


export default function OurServices() {
  const { i18n } = useTranslation('common');
  const isMacedonian = i18n.language === 'mk';
  const locale = i18n.language;

  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: true }),
    []
  );

  return (
    <section id="our-services" className="bg-background py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {isMacedonian ? 'Ги нудиме следните услуги' : 'Our Services'}
          </h2>
        </div>
        <Carousel
          plugins={[autoplayPlugin]}
          className="w-full our-services-carousel"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                <div className="embla__slide">
                  <Image
                    src={service.imgSrc}
                    alt={serviceTranslations[service.textKey][locale]}
                    width={400}
                    height={250}
                    className="object-cover"
                  />
                  <div className="embla__slide__overlay">
                    <span className="embla__slide__text">{serviceTranslations[service.textKey][locale]}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-navigation-buttons">
            <CarouselPrevious className="bg-accent text-accent-foreground border-accent hover:bg-accent/80" />
            <CarouselNext className="bg-transparent text-accent-foreground border-accent hover:bg-accent/10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
