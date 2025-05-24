'use client';

import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
  { questionKey: 'faq.question1', answerKey: 'faq.answer1' },
  { questionKey: 'faq.question2', answerKey: 'faq.answer2' },
  { questionKey: 'faq.question3', answerKey: 'faq.answer3' },
  // Add more FAQs if needed
];

export default function FAQSection() {
  const { t } = useTranslation('common');

  return (
    <section id="faq" className="bg-muted/30 dark:bg-background/50">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('faq.title')}
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg shadow-md px-6 data-[state=open]:shadow-xl">
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                {t(faq.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground pt-2">
                {t(faq.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
