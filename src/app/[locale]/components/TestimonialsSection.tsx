
'use client';

import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

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
];

function TestimonialCard({ quoteKey, authorKey, avatarSrc, dataAiHint }: (typeof testimonialsData)[0]) {
  const { t } = useTranslation('common');
  const authorName = t(authorKey).split(',')[0];
  const authorLocation = t(authorKey).split(',')[1]?.trim();
  const authorInitial = authorName ? authorName.charAt(0) : 'U';

  return (
    <Card className="bg-background p-6 rounded-xl shadow-lg h-full flex flex-col">
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-accent fill-accent" />
        ))}
      </div>
      <blockquote className="text-lg text-foreground italic mb-4 flex-grow">
        "{t(quoteKey)}"
      </blockquote>
      <div className="flex items-center mt-auto">
        <div>
          <p className="font-semibold text-foreground">{authorName}</p>
          <p className="text-sm text-muted-foreground">{authorLocation}</p>
        </div>
      </div>
    </Card>
  );
}


export default function TestimonialsSection() {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
            <motion.div key={index} variants={itemVariants} className="h-full">
               <TestimonialCard 
                quoteKey={testimonial.quoteKey}
                authorKey={testimonial.authorKey}
                avatarSrc={testimonial.avatarSrc}
                dataAiHint={testimonial.dataAiHint}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
