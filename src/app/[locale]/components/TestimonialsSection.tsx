'use client';

import { useTranslation } from 'react-i18next';
import TestimonialCard from './TestimonialCard';
import { motion } from 'framer-motion';

const testimonialsData = [
  { 
    quoteKey: 'testimonials.quote1', 
    authorKey: 'testimonials.author1',
  },
  { 
    quoteKey: 'testimonials.quote2', 
    authorKey: 'testimonials.author2',
  },
  // Add more testimonials if needed
];

export default function TestimonialsSection() {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="testimonials" className="bg-background">
      <motion.div 
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('testimonials.title')}
          </h2>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard
                quoteKey={testimonial.quoteKey}
                authorKey={testimonial.authorKey}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
