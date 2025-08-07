
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

// Using public placeholder videos to ensure they are always accessible.
const videos = [
    { type: 'local', src: '/locales/video/ges_solar_field_finished_project1.mp4' },
    { type: 'local', src: '/locales/video/ges_solar_field_finished_project2.mp4' },
];

export default function VideoCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const { t } = useTranslation('common');

  const handleVideoEnded = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const playCurrentVideo = () => {
      api.slideNodes().forEach((slide, index) => {
        const video = slide.querySelector('video');
        if (video) {
          if (api.selectedScrollSnap() === index) {
            video.play().catch(error => console.error("Video play failed:", error));
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    };

    playCurrentVideo();
    api.on("select", playCurrentVideo);
    api.on("reInit", playCurrentVideo);

    // Cleanup
    return () => {
      api.off("select", playCurrentVideo);
      api.off("reInit", playCurrentVideo);
    };
  }, [api]);

  const textAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };


  return (
    <section id="video-showcase" className="bg-muted/30 dark:bg-background/50 py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            variants={textAnimation}
          >
            {t('videoShowcase.title')}
          </motion.h2>
           <motion.p 
            className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground"
            variants={textAnimation}
          >
            {t('videoShowcase.intro')}
          </motion.p>
        </motion.div>

        <Carousel setApi={setApi} className="w-full video-carousel" opts={{ loop: true }}>
          <CarouselContent>
            {videos.map((video, index) => (
              <CarouselItem key={index} className="embla__slide">
                <Card className="h-full w-full overflow-hidden rounded-xl shadow-lg">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                    <video
                      src={video.src}
                      autoPlay
                      muted
                      playsInline
                      controls
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </CardContent>
                </Card>
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
