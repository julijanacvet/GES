
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/#home', labelKey: 'nav.home' },
    { href: '/systems-for-industry', labelKey: 'nav.systemsForIndustry' },
    { href: '/systems-for-home', labelKey: 'nav.systemsForHome' },
    { href: '/technical-maintenance', labelKey: 'nav.technicalMaintenance' },
    { href: '/#calculator', labelKey: 'nav.calculator' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <motion.footer 
      className="relative bg-background-dark text-text-light-on-dark bg-[url('/locales/images/bg-footer-1.webp')] bg-cover bg-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div> {/* Overlay */}
      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          variants={containerVariants}
        >
          {/* Column 1: Logo & Description */}
          <motion.div variants={itemVariants}>
            <Link href={`/${locale}/#home`} className="flex items-center gap-2 mb-4">
              <Image src="/locales/images/ges_logo_dark.png" alt={t('appName').split(' - ')[0] || 'GES Logo'} width={120} height={40} />
            </Link>
            <p className="text-sm opacity-80">{t('footer.description')}</p>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.navTitle')}</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                 <li key={link.labelKey}>
                  <Link href={`/${locale}${link.href}`} className="text-sm hover:text-accent transition-colors opacity-80 hover:opacity-100">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contactTitle')}</h3>
            <address className="text-sm not-italic space-y-2 opacity-80">
              <p><strong>{t('footer.phoneLabel')}</strong> <a href={`tel:${t('footer.phoneValue')}`} className="hover:text-accent transition-colors">{t('footer.phoneValue')}</a></p>
              <p><strong>{t('footer.emailLabel')}</strong> <a href={`mailto:${t('footer.emailValue')}`} className="hover:text-accent transition-colors">{t('footer.emailValue')}</a></p>
            </address>
          </motion.div>
          
          {/* Column 4: Social Media Icons */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-text-light-on-dark hover:text-accent transition-colors opacity-80 hover:opacity-100">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-text-light-on-dark hover:text-accent transition-colors opacity-80 hover:opacity-100">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-text-light-on-dark hover:text-accent transition-colors opacity-80 hover:opacity-100">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-700 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm opacity-70">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
