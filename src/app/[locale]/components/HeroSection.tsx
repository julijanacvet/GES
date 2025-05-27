
'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageWrapperVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

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
              <motion.div
                className="relative w-full h-full"
                variants={imageWrapperVariants}
                initial="hidden"
                animate="visible" // Use animate for mount-based animation
                transition={{ duration: 0.6, delay: 0.2 + (index * 0.3) }} // Staggered delay
              >
                <Image
                  src={image.src}
                  alt={t(image.altKey)}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                  data-ai-hint={image.dataAiHint}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 hover:bg-background/70 text-foreground border-foreground/50 h-10 w-10 rounded-full" />
        <CarouselNext className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-background/50 hover:bg-background/70 text-foreground border-foreground/50 h-10 w-10 rounded-full" />
      </Carousel>

      <div className="absolute inset-0 bg-black/10 z-10"></div> {/* Overlay for image darkening */}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-20 py-6 sm:py-10 md:py-12">
        <div className="text-white">
          <motion.h1
            className="mb-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight [text-shadow:0_2px_6px_rgba(0,0,0,0.75)]"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('hero.headline')}
          </motion.h1>
          <motion.div
            className="mb-4 bg-black/20 px-2 py-0.5 sm:px-4 sm:py-2 rounded-md inline-block"
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}

          >
            <p className="text-sm sm:text-lg md:text-xl text-gray-200/90 [text-shadow:0_3px_8px_rgba(0,0,0,0.85)]">
              {t('hero.subheadline')}
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                asChild
                className="bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out"
              >
                <Link href={`/${locale}/#calculator`}>{t('hero.calculateSavingsBtn')}</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                size="lg"
                asChild
                className="bg-black/50 border border-primary text-primary font-bold py-1.5 px-3 text-xs sm:py-3 sm:px-6 sm:text-base rounded-[8px] shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition duration-300 ease-in-out"
              >
                <Link href={`/${locale}/#contact`}>{t('hero.getConsultationBtn')}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
