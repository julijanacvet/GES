
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore // i18n config is a .js file
import i18nConfig from '../next-i18next.config.js'; // { locales: string[], defaultLocale: string }
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// This function can remain for potential future use or other scenarios,
// but for the initial redirect, we'll bypass it if a locale is missing.
function getLocaleBasedOnHeaders(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18nConfig.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  
  try {
    return matchLocale(languages, locales, i18nConfig.defaultLocale);
  } catch (e) {
    return i18nConfig.defaultLocale; 
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const fileExtensionRegex = /\.[^\/]+$/; 
  if (
    pathname.startsWith('/_next/') ||   
    pathname.startsWith('/api/') ||     
    pathname.startsWith('/assets/') ||  
    fileExtensionRegex.test(pathname)   
  ) {
    return NextResponse.next();
  }
  
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // Always use the defaultLocale from the config if no locale is in the path
    const locale = i18nConfig.defaultLocale; 

    const newPathPrefix = `/${locale}`;
    const newPath = pathname === '/' ? `${newPathPrefix}/` : `${newPathPrefix}${pathname}`;

    return NextResponse.redirect(
      new URL(`${newPath}${request.nextUrl.search}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/|_next/static/|_next/image/|assets/|favicon\\.ico|sw\\.js|robots\\.txt|site\\.webmanifest|manifest\\.json).*)'
  ],
};
