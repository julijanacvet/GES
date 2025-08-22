
'use client';

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  type NavItem,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');

  const navItems: NavItem[] = [
    {
      name: "nav.photovoltaicSystems",
      hasDropdown: true,
      dropdownItems: [
        { name: "nav.systemsForIndustry", link: "#" },
        { name: "nav.systemsForHome", link: "#" },
        { name: "nav.technicalMaintenance", link: "#" },
      ],
    },
    {
      name: "nav.energyStorage",
      link: "#",
    },
    {
      name: "nav.projects",
      hasDropdown: true,
      dropdownItems: [
        { name: "nav.project1", link: "#" },
        { name: "nav.project2", link: "#" },
      ],
    },
    {
      name: "nav.contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar navItems={navItems}>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          <NavbarButton variant="secondary">{t('nav.calculator')}</NavbarButton>
          <NavbarButton variant="primary">{t('nav.getQuote')}</NavbarButton>
          <LanguageSwitcher />
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <LanguageSwitcher isMobile={true} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          items={navItems}
        >
          <NavbarButton
            onClick={() => setIsMobileMenuOpen(false)}
            variant="secondary"
            className="w-full"
          >
            {t('nav.calculator')}
          </NavbarButton>
          <NavbarButton
            onClick={() => setIsMobileMenuOpen(false)}
            variant="primary"
            className="w-full"
          >
            {t('nav.getQuote')}
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
