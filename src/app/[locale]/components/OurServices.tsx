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
  { imgSrc: '/locales/images/services/Panel instalation.png', title: { en: 'Panel Installation', mk: 'Инсталација на панели' }, description: { en: 'A flawless start. We build your system for maximum efficiency and durability.', mk: 'Беспрекорен почеток. Го градиме Вашиот систем за максимална ефикасност и долготрајност.' } },
  { imgSrc: '/locales/images/services/Cleaning.webp', title: { en: 'Cleaning', mk: 'Чистење' }, description: { en: 'A clean panel is a productive panel. We wash away power-loss to maximize your output.', mk: 'Чист панел е продуктивен панел. Ние го отстрануваме губењето на енергија за да го максимизираме вашето производство.' } },
  { imgSrc: '/locales/images/services/Maintenance.jpg', title: { en: 'Maintenance', mk: 'Одржување' }, description: { en: 'Regular health checks to keep your system running smoothly and efficiently.', mk: 'Редовни здравствени проверки за да го одржите вашиот систем да работи непречено и ефикасно.' } },
  { imgSrc: '/locales/images/services/Energy monitoring.jpg', title: { en: 'Energy Monitoring', mk: 'Мониторинг на енергија' }, description: { en: 'Real-time tracking to ensure you\'re getting every watt of power you deserve.', mk: 'Следење во реално време за да се осигурате дека го добивате секој ват енергија што го заслужувате.' } },
  { imgSrc: '/locales/images/services/Battery maintenance.png', title: { en: 'Battery Maintenance', mk: 'Одржување на батерии' }, description: { en: 'Get the most out of your energy storage with our expert battery care.', mk: 'Извлечете го максимумот од вашето складирање на енергија со нашата стручна грижа за батериите.' } },
  { imgSrc: '/locales/images/services/Troubleshooting.jpg', title: { en: 'Troubleshooting', mk: 'Решавање проблеми' }, description: { en: 'Fast and effective solutions to get your system back to 100% performance.', mk: 'Брзи и ефективни решенија за враќање на вашиот систем на 100% перформанси.' } },
  { imgSrc: '/locales/images/services/Inverter repair.png', title: { en: 'Inverter Repair', mk: 'Поправка на инвертер' }, description: { en: 'We fix the most critical component to ensure seamless energy conversion.', mk: 'Ја поправаме најкритичната компонента за да обезбедиме непречена конверзија на енергија.' } },
  { imgSrc: '/locales/images/services/Calibration.webp', title: { en: 'Calibration', mk: 'Калибрација' }, description: { en: 'Optimizing all settings for a perfectly balanced and high-performing system.', mk: 'Оптимизирање на сите поставки за совршено избалансиран и високо-перформансен систем.' } },
];

export default function OurServices() {
  const { i18n } = useTranslation('common');
  const locale = i18n.language as 'en' | 'mk';

  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: true }),
    []
  );
  
  const sectionTitle = locale === 'mk' 
    ? 'Одржување на Вашиот систем во врвна форма' 
    : 'Keeping Your System at Peak Performance';

  const sectionIntro = locale === 'mk'
    ? 'Вашиот соларен систем е проектиран за децении на издржливост и висока ефикасност. Ние се грижиме секој панел и компонентa да испорача оптимална излезна моќ.'
    : "Your solar system is engineered for decades of durable, high-efficiency performance. We ensure every panel and component delivers optimal output, safeguarding your energy savings and giving you complete confidence in your investment.";

  return (
    <section id="our-services" className="bg-background py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {sectionTitle}
          </h2>
           <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {sectionIntro}
          </p>
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
                    alt={service.title[locale]}
                    width={400}
                    height={250}
                    className="object-cover"
                  />
                  <div className="embla__slide__overlay">
                     <div className="embla__slide__content">
                        <h4 className="embla__slide__title">{service.title[locale]}</h4>
                        <p className="embla__slide__description">{service.description[locale]}</p>
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
