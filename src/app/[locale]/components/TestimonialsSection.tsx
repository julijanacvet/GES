'use client';

import { useTranslation } from 'react-i18next';
import TestimonialCard from './TestimonialCard';

const testimonialsData = [
  { 
    quoteKey: 'testimonials.quote1', 
    authorKey: 'testimonials.author1',
    avatarSrc: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy customer'
  },
  { 
    quoteKey: 'testimonials.quote2', 
    authorKey: 'testimonials.author2',
    avatarSrc: 'https://placehold.co/100x100.png',
    dataAiHint: 'smiling person'
  },
  // Add more testimonials if needed
];

export default function TestimonialsSection() {
  const { t } = useTranslation('common');

  return (
    <section id="testimonials" className="bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('testimonials.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quoteKey={testimonial.quoteKey}
              authorKey={testimonial.authorKey}
              avatarSrc={testimonial.avatarSrc}
              dataAiHint={testimonial.dataAiHint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
