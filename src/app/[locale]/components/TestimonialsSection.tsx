
"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const { t } = useTranslation('common');

  const testimonials = [
    {
      quote: t('testimonials.quote1'),
      name: t('testimonials.author1').split(',')[0],
      title: t('testimonials.author1').split(',')[1],
    },
    {
      quote: t('testimonials.quote2'),
      name: t('testimonials.author2').split(',')[0],
      title: t('testimonials.author2').split(',')[1],
    },
    {
      quote: t('testimonials.quote3'),
      name: t('testimonials.author3').split(',')[0],
      title: t('testimonials.author3').split(',')[1],
    },
    {
      quote: t('testimonials.quote4'),
      name: t('testimonials.author4').split(',')[0],
      title: t('testimonials.author4').split(',')[1],
    },
  ];

  return (
    <section id="testimonials" className="bg-background py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('testimonials.title')}
        </h2>
      </div>
      <div className="h-[25rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </section>
  );
}
