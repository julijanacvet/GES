'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin, Sun } from 'lucide-react'; // Using Sun as placeholder for GES logo

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/#home', labelKey: 'nav.home' },
    { href: '/#residential', labelKey: 'nav.residential' },
    { href: '/#business', labelKey: 'nav.business' },
    { href: '/#solar-plants', labelKey: 'nav.solarPlants' },
    { href: '/#calculator', labelKey: 'nav.calculator' },
  ];

  return (
    <footer className="bg-background-dark text-text-light-on-dark">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Link href={`/${locale}/#home`} className="flex items-center gap-2 mb-4">
              <Sun className="h-8 w-8 text-accent" />
              <span className="font-bold text-2xl text-white">{t('appName').split(' - ')[0]}</span>
            </Link>
            <p className="text-sm opacity-80">{t('footer.description')}</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
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
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contactTitle')}</h3>
            <address className="text-sm not-italic space-y-2 opacity-80">
              <p><strong>{t('footer.addressLabel')}</strong> {t('footer.addressValue')}</p>
              <p><strong>{t('footer.phoneLabel')}</strong> <a href={`tel:${t('footer.phoneValue')}`} className="hover:text-accent transition-colors">{t('footer.phoneValue')}</a></p>
              <p><strong>{t('footer.emailLabel')}</strong> <a href={`mailto:${t('footer.emailValue')}`} className="hover:text-accent transition-colors">{t('footer.emailValue')}</a></p>
            </address>
          </div>
          
          {/* Column 4: Social Media Icons */}
          <div>
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
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center md:flex md:justify-between">
          <p className="text-sm opacity-70 mb-4 md:mb-0">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="space-x-4 text-sm">
            <Link href="#" className="hover:text-accent transition-colors opacity-70 hover:opacity-100">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="#" className="hover:text-accent transition-colors opacity-70 hover:opacity-100">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
