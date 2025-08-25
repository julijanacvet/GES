
'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
// @ts-ignore
import i18nConfig from '../../../../next-i18next.config.js';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const { i18n, t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = i18n.language;

  const changeLanguage = (newLocale: string) => {
    // Remove current locale from pathname if present
    const currentPathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
      ? pathname.substring(`/${currentLocale}`.length) || '/'
      : pathname;
    router.push(`/${newLocale}${currentPathWithoutLocale}`);
  };

  if (isMobile) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-sm">
            <Globe className="w-4 h-4 mr-2" />
            {currentLocale.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {i18nConfig.locales.map((locale: string) => (
            <DropdownMenuItem
              key={locale}
              onClick={() => changeLanguage(locale)}
              className={currentLocale === locale ? 'font-bold bg-accent' : ''}
            >
              {t(`languageSwitcher.${locale}`)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {i18nConfig.locales.map((locale: string) => (
        <button
          key={locale}
          onClick={() => changeLanguage(locale)}
          className={`px-2 py-1 text-sm rounded-md transition-colors
            ${currentLocale === locale 
              ? 'font-bold text-primary bg-primary/10' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
        >
          {t(`languageSwitcher.${locale}`)}
        </button>
      ))}
    </div>
  );
}
