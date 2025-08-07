'use client';

import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const faqData = [
  { questionKey: 'faq.question1', answerKey: 'faq.answer1' },
  { questionKey: 'faq.question2', answerKey: 'faq.answer2' },
  { questionKey: 'faq.question3', answerKey: 'faq.answer3' },
  // Add more FAQs if needed
];

export default function FAQSection() {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section id="faq" className="bg-muted/30 dark:bg-background/50">
      <motion.div 
        className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('faq.title')}
          </h2>
        </motion.div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <AccordionItem value={`item-${index}`} className="bg-background rounded-lg shadow-md px-6 data-[state=open]:shadow-xl">
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {t(faq.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  {t(faq.answerKey)}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
