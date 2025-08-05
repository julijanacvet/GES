'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleMobileLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScroll(event, href);
    setIsMobileMenuOpen(false);
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
              Побарај понуда
            </Link>
          </Button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
        </div>

        <div className="md:hidden flex items-center">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
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
                  onClick={(e) => handleMobileLinkClick(e, `/${locale}/#home`)}
                >
                   <Image src="/locales/images/ges_logo_dark.png" alt={t('appName').split(' - ')[0] || 'GES Logo'} width={100} height={32} />
                </Link>
                <nav className="flex flex-col space-y-4 mb-8">
                  {navLinks.map(link => (
                       <Button
                        variant="outline"
                        size="sm" 
                        asChild
                        key={link.labelKey}
                        className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                      >
                        <Link 
                          href={`/${locale}${link.href}`}
                          onClick={(e) => handleMobileLinkClick(e, `/${locale}${link.href}`)}
                        >
                          {t(link.labelKey)}
                        </Link>
                      </Button>
                  ))}
                   <Button
                    variant="outline"
                    size="sm" 
                    asChild
                    className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                  >
                    <Link 
                      href={`/${locale}/#calculator`}
                      onClick={(e) => handleMobileLinkClick(e, `/${locale}/#calculator`)}
                    >
                      {t('nav.calculator')}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]"
                  >
                    <Link 
                      href={`/${locale}/#contact`}
                      onClick={(e) => handleMobileLinkClick(e, `/${locale}/#contact`)}
                    >
                      Побарај понуда
                    </Link>
                  </Button>
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
    