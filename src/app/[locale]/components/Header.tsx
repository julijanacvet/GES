
'use client';

import {
  MobileNav,
  NavbarLogo,
  MobileNavToggle,
  MobileNavMenu,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Header() {
  const { t } = useTranslation('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';


  const navItems: NavItem[] = [
    {
      name: "nav.photovoltaicSystems",
      hasDropdown: true,
      dropdownItems: [
        { name: "nav.systemsForIndustry", link: "/#services" },
        { name: "nav.systemsForHome", link: "/#services" },
        { name: "nav.technicalMaintenance", link: "/#our-services" },
      ],
    },
    {
      name: "nav.energyStorage",
      link: "/#",
    },
    {
      name: "nav.projects",
      hasDropdown: true,
      dropdownItems: [
        { name: "nav.project1", link: "/#video-showcase" },
        { name: "nav.project2", link: "/#video-showcase" },
      ],
    },
    {
      name: "nav.contact",
      link: "/#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavItems items={navItems} />
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]">
             <Link href={`/${locale}/#calculator`}>{t('nav.calculator')}</Link>
          </Button>
           <Button variant="outline" size="sm" asChild className="font-bold text-primary border-primary shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-[#80ac53] hover:text-primary-foreground transition-all duration-300 ease-in-out rounded-[8px]">
             <Link href={`/${locale}/#contact`}>{t('nav.getQuote')}</Link>
          </Button>
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher isMobile={true} />
           <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
        </div>

        {/* Mobile Menu */}
        <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            items={navItems}
          >
            <div className="flex w-full flex-col gap-4 mt-auto">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="w-full"
              >
                {t('nav.calculator')}
              </Button>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="primary"
                className="w-full"
              >
                {t('nav.getQuote')}
              </Button>
            </div>
        </MobileNavMenu>

      </div>
    </header>
  );
}
