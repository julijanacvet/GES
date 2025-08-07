'use client';

import { useTranslation } from 'react-i18next';
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from 'react';


const testimonialsData = [
  { 
    quoteKey: 'testimonials.quote1', 
    authorKey: 'testimonials.author1',
    authorLinkKey: 'testimonials.author1Link'
  },
  { 
    quoteKey: 'testimonials.quote2', 
    authorKey: 'testimonials.author2',
    authorLinkKey: 'testimonials.author2Link'
  },
   { 
    quoteKey: 'testimonials.quote3', 
    authorKey: 'testimonials.author3',
    authorLinkKey: 'testimonials.author3Link'
  },
];

export default function TestimonialsSection() {
  const { t } = useTranslation('common');
  const autoplayPlugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: true }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="testimonials" className="bg-black text-white py-16 md:py-24">
      <motion.div 
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <Carousel
          plugins={[autoplayPlugin]}
          className="w-full"
           onMouseEnter={autoplayPlugin.stop}
           onMouseLeave={autoplayPlugin.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-8">
            {testimonialsData.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-8 md:basis-1/2 lg:basis-1/3">
                 <motion.div variants={itemVariants} className="h-full">
                    <TestimonialCard
                        quoteKey={testimonial.quoteKey}
                        authorKey={testimonial.authorKey}
                        authorLinkKey={testimonial.authorLinkKey}
                    />
                 </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2">
                    <CarouselPrevious className="static -translate-y-0 text-white border-white/50 hover:bg-white/10 hover:text-white" />
                    <CarouselNext className="static -translate-y-0 text-white border-white/50 hover:bg-white/10 hover:text-white" />
                </div>
           </div>
        </Carousel>
      </motion.div>
    </section>
  );
}
