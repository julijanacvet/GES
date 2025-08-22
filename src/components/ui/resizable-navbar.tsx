
"use client";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  navItems: NavItem[];
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export type NavItem = {
  name: string;
  link?: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    name: string;
    link: string;
  }[];
};

export const Navbar = ({ children, className, navItems }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
       className={cn(
        "relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const { i18n, t } = useTranslation('common');
  const locale = i18n.language;

  return (
    <motion.div
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
                  className="relative px-3 py-1.5 text-primary flex items-center gap-1 rounded-[8px] transition-colors duration-300 hover:bg-[#80ac53] hover:text-primary-foreground focus:outline-none"
                >
                  <span className="relative z-20">{t(item.name)}</span>
                  <ChevronDown className="h-4 w-4 relative z-20" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.dropdownItems?.map((dropdownItem, dropdownIdx) => (
                    <DropdownMenuItem key={`dropdown-link-${dropdownIdx}`}>
                      <Link href={`/${locale}${dropdownItem.link}`}>{t(dropdownItem.name)}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={item.link ? `/${locale}${item.link}` : '#'}
                onClick={onItemClick}
                className="relative px-3 py-1.5 text-primary rounded-[8px] transition-colors duration-300 hover:bg-[#80ac53] hover:text-primary-foreground"
              >
                <span className="relative z-20">{t(item.name)}</span>
              </Link>
            )}
        </div>
      ))}
    </motion.div>
  );
};


export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
       className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {items.map((item, idx) => (
            <React.Fragment key={`mobile-link-group-${idx}`}>
              {item.hasDropdown ? (
                 <div className="w-full">
                  <span className="block text-primary font-medium px-4 py-2">
                    {t(item.name)}
                  </span>
                  <div className="flex flex-col pl-4">
                    {item.dropdownItems?.map((dropdownItem, dropdownIdx) => (
                      <Link
                        key={`mobile-dropdown-link-${dropdownIdx}`}
                        href={`/${locale}${dropdownItem.link}`}
                        onClick={onClose}
                        className="relative text-primary py-2"
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
                  onClick={onClose}
                  className="relative text-primary px-4 py-2"
                >
                  <span className="block">{t(item.name)}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
          <div className="flex w-full flex-col gap-4 mt-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <X className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <Menu className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  const { t, i18n } = useTranslation("common");
  const locale = i18n.language;
  return (
    <Link
      href={`/${locale}/#home`}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <img
        src="/locales/images/ges_logo_dark.png"
        alt={t('appName').split(' - ')[0] || 'GES Logo'}
        width={100}
        height={32}
      />
    </Link>
  );
};

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
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
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
