
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
  { imgSrc: '/locales/images/services/Panel instalation.png', titleKey: 'ourServices.panelInstallation', descKey: 'ourServices.panelInstallationDesc' },
  { imgSrc: '/locales/images/services/Cleaning.webp', titleKey: 'ourServices.cleaning', descKey: 'ourServices.cleaningDesc' },
  { imgSrc: '/locales/images/services/Maintenance.jpg', titleKey: 'ourServices.maintenance', descKey: 'ourServices.maintenanceDesc' },
  { imgSrc: '/locales/images/services/Energy monitoring.jpg', titleKey: 'ourServices.energyMonitoring', descKey: 'ourServices.energyMonitoringDesc' },
  { imgSrc: '/locales/images/services/Battery maintenance.png', titleKey: 'ourServices.batteryMaintenance', descKey: 'ourServices.batteryMaintenanceDesc' },
  { imgSrc: '/locales/images/services/Troubleshooting.jpg', titleKey: 'ourServices.troubleshooting', descKey: 'ourServices.troubleshootingDesc' },
  { imgSrc: '/locales/images/services/Inverter repair.png', titleKey: 'ourServices.inverterRepair', descKey: 'ourServices.inverterRepairDesc' },
  { imgSrc: '/locales/images/services/Calibration.webp', titleKey: 'ourServices.calibration', descKey: 'ourServices.calibrationDesc' },
];

export default function OurServices() {
  const { t, i18n } = useTranslation('common');
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
            {t('ourServices.title')}
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
                <div className="embla__slide group">
                  <Image
                    src={service.imgSrc}
                    alt={t(service.titleKey)}
                    width={400}
                    height={250}
                    className="object-cover"
                  />
                  <div className="embla__slide__overlay">
                     <div className="embla__slide__content">
                        <h4 className="embla__slide__title">{t(service.titleKey)}</h4>
                        <p className="embla__slide__description">{t(service.descKey)}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-navigation-buttons">
            <CarouselPrevious className="bg-black/50 border border-primary text-primary hover:bg-[#80ac53] hover:text-primary-foreground" />
            <CarouselNext className="bg-black/50 border border-primary text-primary hover:bg-[#80ac53] hover:text-primary-foreground" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
