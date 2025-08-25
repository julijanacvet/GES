
'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToActionBlock() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const textVariants = {
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
  
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.split('#')[1];
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };


  return (
    <section id="contact" className="bg-primary text-primary-foreground py-16 md:py-24">
      <motion.div 
        className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          variants={textVariants}
        >
          {t('cta.finalHeadline')}
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl mb-8 opacity-90"
          variants={textVariants}
        >
          {t('cta.finalSubheadline')}
        </motion.p>
        <motion.div variants={textVariants}>
          <Button
            size="lg"
            asChild
            className="bg-accent hover:bg-yellow-500 text-accent-foreground font-bold py-4 px-8 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Link href={`/${locale}/#contact`} onClick={(e) => handleSmoothScroll(e, `/${locale}/#contact`)}>{t('cta.requestFreeQuoteBtn')}</Link>
          </Button>
        </motion.div>
        <motion.div 
          className="mt-6 text-sm opacity-90"
          variants={textVariants}
        >
          <p className="text-primary-foreground">{t('footer.phoneLabel')} <a href={`tel:${t('footer.phoneValue')}`} className="text-primary-foreground hover:underline">{t('footer.phoneValue')}</a></p>
          <p className="text-primary-foreground">{t('footer.emailLabel')} <a href={`mailto:${t('footer.emailValue')}`} className="text-primary-foreground hover:underline">{t('footer.emailValue')}</a></p>
        </motion.div>
      </motion.div>
    </section>
  );
}
