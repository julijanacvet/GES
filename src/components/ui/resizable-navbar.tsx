
"use client";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./button";

// Main Component Types
// =================================================================
export type NavItem = {
  name: string;
  link?: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    name: string;
    link: string;
  }[];
};

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

// Logo Component
// =================================================================
export const NavbarLogo = () => {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language;
  return (
    <Link
      href={`/${locale}/#home`}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <Image
        src="/locales/images/ges_logo_dark.png"
        alt={t('appName').split(' - ')[0] || 'GES Logo'}
        width={100}
        height={32}
      />
    </Link>
  );
};


// Desktop Navigation Components
// =================================================================
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const { i18n, t } = useTranslation('common');
  const locale = i18n.language;

  return (
    <nav
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
         <div key={`link-${idx}`} className="relative">
            {item.hasDropdown ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="relative px-3 py-1.5 text-primary flex items-center gap-1 rounded-[8px] transition-colors duration-300 hover:bg-primary focus:outline-none data-[state=open]:bg-primary hover:text-primary-foreground focus:text-primary-foreground data-[state=open]:text-primary-foreground"
                >
                  <span className="relative z-20">{t(item.name)}</span>
                  <ChevronDown className="h-4 w-4 relative z-20" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.dropdownItems?.map((dropdownItem, dropdownIdx) => (
                    <DropdownMenuItem key={`dropdown-link-${dropdownIdx}`} asChild>
                       <Link
                        href={`/${locale}${dropdownItem.link}`}
                        className="w-full text-left hover:text-primary-foreground focus:text-primary-foreground"
                      >
                        {t(dropdownItem.name)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={item.link ? `/${locale}${item.link}` : '#'}
                onClick={onItemClick}
                className="relative px-3 py-1.5 text-primary rounded-[8px] transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <span className="relative z-20">{t(item.name)}</span>
              </Link>
            )}
        </div>
      ))}
    </nav>
  );
};

// Mobile Navigation Components
// =================================================================
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className="md:hidden p-2" aria-label="Toggle menu">
      {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
    </button>
  );
};


export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
  items,
}: MobileNavMenuProps) => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split('#')[1];
    if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    onClose();
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className={cn(
          "w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-sm p-0",
          className,
        )}
      >
        <SheetHeader className="flex-row items-center justify-between border-b p-4">
            <SheetTitle className="sr-only">{t('nav.mobileMenuTitle')}</SheetTitle>
            <NavbarLogo />
            <SheetClose asChild>
                <button aria-label="Close menu">
                    <X className="h-6 w-6 text-foreground" />
                </button>
            </SheetClose>
        </SheetHeader>
        <div className="flex flex-col h-full p-4">
            <nav className="flex flex-col space-y-2 text-lg">
                 {items.map((item, idx) => (
                  <React.Fragment key={`mobile-link-group-${idx}`}>
                      {item.hasDropdown ? (
                        <div className="w-full">
                           <span className="block text-muted-foreground font-medium px-4 py-2 text-sm">
                                {t(item.name)}
                           </span>
                           <div className="flex flex-col pl-4">
                            {item.dropdownItems?.map((dropdownItem, dropdownIdx) => (
                              <Link
                                key={`mobile-dropdown-link-${dropdownIdx}`}
                                href={`/${locale}${dropdownItem.link}`}
                                onClick={(e) => handleLinkClick(e,`/${locale}${dropdownItem.link}`)}
                                className="relative block rounded-md text-foreground px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
                               >
                                  <span className="block">{t(dropdownItem.name)}</span>
                              </Link>
                            ))}
                           </div>
                        </div>
                      ) : (
                          <Link
                            key={`mobile-link-${idx}`}
                            href={item.link ? `/${locale}${item.link}` : '#'}
                            onClick={(e) => item.link && handleLinkClick(e, `/${locale}${item.link}`)}
                            className="relative block rounded-md text-foreground px-4 py-2 transition-colors hover:bg-primary/10 hover:text-primary"
                          >
                           <span className="block">{t(item.name)}</span>
                          </Link>
                      )}
                  </React.Fragment>
              ))}
            </nav>
            <div className="mt-auto space-y-4 pt-4 border-t">
              <Button
                onClick={() => {
                  onClose();
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                className="w-full rounded-lg shadow-md font-bold text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t('nav.calculator')}
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="default"
                className="w-full rounded-lg shadow-md font-bold"
              >
                {t('nav.getQuote')}
              </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};


// Deprecated components - can be removed later if not used
export const Navbar = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const NavBody = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const MobileNav = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const MobileNavHeader = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-transparent text-primary border border-primary hover:bg-primary/10",
    dark: "bg-black text-white",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
