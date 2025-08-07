'use client';

import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const differentiatorsKeys = [
  'whyChooseUs.expertise',
  'whyChooseUs.quality',
  'whyChooseUs.installers',
  'whyChooseUs.support',
  'whyChooseUs.sustainability',
];

export default function WhyChooseGES() {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section id="why-ges" className="bg-muted/30 dark:bg-background/50">
      <motion.div 
        className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('whyChooseUs.headline')}
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <motion.ul 
            className="space-y-6"
            variants={containerVariants}
          >
            {differentiatorsKeys.map((key) => (
              <motion.li 
                key={key} 
                className="flex items-start p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
              >
                <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                <p className="text-foreground">{t(key)}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
