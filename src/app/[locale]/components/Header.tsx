
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const navLinks: { href: string; labelKey: string }[] = [
  // { href: '#home', labelKey: 'nav.home' }, // Removed
];

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-transparent backdrop-blur-sm' : 'bg-background'}`}>
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href={`/${locale}/#home`} 
          className="flex items-center gap-2"
          onClick={(e) => handleSmoothScroll(e, `/${locale}/#home`)}
        >
          <Image src="/locales/images/ges_logo_dark.png" alt={t('appName').split(' - ')[0] || 'GES Logo'} width={100} height={32} priority />
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map(link => (
            <Button
              key={link.labelKey}
              variant="outline"
              size="sm"
              asChild
              className="font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
            >
              <Link 
                href={`/${locale}${link.href}`}
                onClick={(e) => handleSmoothScroll(e, `/${locale}${link.href}`)}
              >
                {t(link.labelKey)}
              </Link>
            </Button>
          ))}
           <Button
              variant="outline"
              size="sm"
              asChild
              className="font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
            >
              <Link 
                href={`/${locale}/#calculator`}
                onClick={(e) => handleSmoothScroll(e, `/${locale}/#calculator`)}
              >
                {t('nav.calculator')}
              </Link>
            </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
          >
            <Link 
              href={`/${locale}/#contact`}
              onClick={(e) => handleSmoothScroll(e, `/${locale}/#contact`)}
            >
              {t('nav.getQuote')}
            </Link>
          </Button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
        </div>

        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">{t('nav.mobileMenuTitle')}</SheetTitle>
              <div className="flex flex-col h-full p-6">
                <Link 
                  href={`/${locale}/#home`} 
                  className="flex items-center gap-2 mb-8"
                  onClick={(e) => {
                    handleSmoothScroll(e, `/${locale}/#home`);
                    // Optionally close the sheet if SheetClose doesn't handle it for a direct Link
                    const closeButton = document.querySelector('[data-radix-dialog-default-open="false"]'); // This selector might need adjustment
                    if (closeButton instanceof HTMLElement) closeButton.click();
                  }}
                >
                   <Image src="/locales/images/ges_logo_dark.png" alt={t('appName').split(' - ')[0] || 'GES Logo'} width={100} height={32} />
                </Link>
                <nav className="flex flex-col space-y-4 mb-8">
                  {navLinks.map(link => (
                    <SheetClose asChild key={link.labelKey}>
                       <Button
                        variant="outline"
                        size="sm" 
                        asChild
                        className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                      >
                        <Link 
                          href={`/${locale}${link.href}`}
                          onClick={(e) => handleSmoothScroll(e, `/${locale}${link.href}`)}
                        >
                          {t(link.labelKey)}
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                       <Button
                        variant="outline"
                        size="sm" 
                        asChild
                        className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                      >
                        <Link 
                          href={`/${locale}/#calculator`}
                          onClick={(e) => handleSmoothScroll(e, `/${locale}/#calculator`)}
                        >
                          {t('nav.calculator')}
                        </Link>
                      </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                    >
                        <Link 
                          href={`/${locale}/#contact`}
                          onClick={(e) => handleSmoothScroll(e, `/${locale}/#contact`)}
                        >
                          {t('nav.getQuote')}
                        </Link>
                    </Button>
                  </SheetClose>
                </nav>
                <div className="mt-auto space-y-4">
                  <LanguageSwitcher isMobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
