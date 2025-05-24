'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Sun } from 'lucide-react'; // Using Sun as a placeholder for GES logo
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#residential', labelKey: 'nav.residential' },
  { href: '#business', labelKey: 'nav.business' },
  { href: '#solar-plants', labelKey: 'nav.solarPlants' },
  { href: '#calculator', labelKey: 'nav.calculator' },
];

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const NavLinkItem = ({ href, labelKey, onClick }: { href: string, labelKey: string, onClick?: () => void }) => (
    <Link
      href={`/${locale}${href}`}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      onClick={onClick}
    >
      {t(labelKey)}
    </Link>
  );


  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur shadow-sm' : 'bg-background'}`}>
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}/#home`} className="flex items-center gap-2">
          <Sun className="h-7 w-7 text-primary" />
          <span className="font-bold text-xl text-foreground">{t('appName').split(' - ')[0]}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => <NavLinkItem key={link.labelKey} href={link.href} labelKey={link.labelKey} />)}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <Button variant="default" size="sm" asChild className="btn-primary">
            <Link href={`/${locale}/#contact`}>{t('nav.getQuote')}</Link>
          </Button>
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
              <div className="flex flex-col h-full p-6">
                <Link href={`/${locale}/#home`} className="flex items-center gap-2 mb-8">
                   <Sun className="h-7 w-7 text-primary" />
                  <span className="font-bold text-xl text-foreground">{t('appName').split(' - ')[0]}</span>
                </Link>
                <nav className="flex flex-col space-y-4 mb-8">
                  {navLinks.map(link => (
                    <SheetClose asChild key={link.labelKey}>
                       <NavLinkItem href={link.href} labelKey={link.labelKey} />
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto space-y-4">
                  <LanguageSwitcher isMobile />
                   <SheetClose asChild>
                    <Button variant="default" className="w-full btn-primary" asChild>
                        <Link href={`/${locale}/#contact`}>{t('nav.getQuote')}</Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
