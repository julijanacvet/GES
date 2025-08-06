
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';

const videos = [
  { type: 'youtube', src: 'https://www.youtube.com/embed/efgX7WjLTAk?autoplay=1&mute=1&loop=1&playlist=efgX7WjLTAk&controls=0&modestbranding=1&showinfo=0&rel=0' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/HvKsMUNY8KA?autoplay=1&mute=1&loop=1&playlist=HvKsMUNY8KA&controls=0&modestbranding=1&showinfo=0&rel=0' },
];

export default function VideoCarousel() {
  const [api, setApi] = useState<CarouselApi>();

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

    return () => {
      api.off("select", playCurrentVideo);
      api.off("reInit", playCurrentVideo);
    };
  }, [api]);

  return (
    <section id="video-showcase" className="bg-muted/30 dark:bg-background/50 py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel setApi={setApi} className="w-full video-carousel" opts={{ loop: true }}>
          <CarouselContent>
            {videos.map((video, index) => (
              <CarouselItem key={index} className="embla__slide">
                <Card className="h-full w-full overflow-hidden rounded-xl shadow-lg">
                  <CardContent className="flex items-center justify-center p-0 h-full">
                    {video.type === 'local' ? (
                      <video
                        src={video.src}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={video.src}
                        title={`YouTube video player ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    )}
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
