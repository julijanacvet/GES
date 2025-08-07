"use client";

import React from "react";
import { useTranslation } from 'react-i18next';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

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
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
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
