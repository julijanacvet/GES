
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

  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );

  return (
    <section
      id="home"
      className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] overflow-hidden"
    >
      <Carousel
        plugins={[autoplayPlugin]}
        className="absolute inset-0 w-full h-full"
        onMouseEnter={autoplayPlugin.stop}
        onMouseLeave={autoplayPlugin.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full relative">
              <div className={`relative w-full h-full`}>
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

      <div className="absolute inset-0 bg-black/10 z-10"></div> {/* Overlay for image darkening */}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20 py-6 sm:py-10 md:py-12">
        <div className="text-white">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.75)]">
            {t('hero.headline')}
          </h1>
          <div className="mb-6 bg-black/20 px-3 py-1 sm:px-4 sm:py-2 rounded-md inline-block">
            <p className="text-base sm:text-lg md:text-xl text-gray-200/90 [text-shadow:0_3px_8px_rgba(0,0,0,0.85)]">
              {t('hero.subheadline')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-black/50 border border-primary text-primary font-bold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#calculator`}>{t('hero.calculateSavingsBtn')}</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-black/50 border border-primary text-primary font-bold py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out"
            >
              <Link href={`/${locale}/#contact`}>{t('hero.getConsultationBtn')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
