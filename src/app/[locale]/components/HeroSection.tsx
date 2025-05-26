
'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  { src: '/locales/images/hero-1.jpg', altKey: 'imagePlaceholders.hero', dataAiHint: 'solar panels modern house' },
  { src: '/locales/images/hero-2.jpg', altKey: 'imagePlaceholders.hero', dataAiHint: 'solar installation rooftop' },
];

export default function HeroSection() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section
      id="home"
      className="relative min-h-[70vh] md:min-h-[85vh] overflow-hidden"
    >
      <Carousel
        plugins={[plugin.current]}
        className="absolute inset-0 w-full h-full" // Carousel fills the section
        onMouseEnter={plugin.current?.stop}
        onMouseLeave={plugin.current?.reset}
        opts={{
          loop: true,
        }}
      >
        {/* CarouselContent is now expected to get h-full from its parent div in carousel.tsx */}
        <CarouselContent className="h-full"> {/* This h-full is crucial */}
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full relative"> {/* This h-full and relative is crucial */}
              {/* This div is the direct relative parent for the Image with layout="fill" */}
              <div className="relative w-full h-full"> 
                <Image
                  src={image.src}
                  alt={t(image.altKey)}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                  data-ai-hint={image.dataAiHint}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 hover:bg-background/70 text-foreground border-foreground/50 h-10 w-10 rounded-full" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 hover:bg-background/70 text-foreground border-foreground/50 h-10 w-10 rounded-full" />
      </Carousel>

      {/* Darkening overlay: z-10, on top of carousel images */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Text content: z-20, on top of overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="text-white">
          <h1 className="mb-6">
            {t('hero.headline')}
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-200/90">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border border-primary text-primary font-bold py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground rounded-[8px] transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#calculator`}>{t('hero.calculateSavingsBtn')}</Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border border-primary text-primary font-bold py-3 px-6 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground rounded-[8px] transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#contact`}>{t('hero.getConsultationBtn')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

