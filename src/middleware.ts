
import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore // i18n config is a .js file
import { i18n } from '../next-i18next.config.js'; // { locales: string[], defaultLocale: string }
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  
  try {
    // matchLocale can throw if languages array is empty or no match is found and no default is robustly handled by it.
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    // Fallback to default locale if matchLocale fails
    return i18n.defaultLocale; 
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the path is for a static file, API route, or Next.js internal.
  // These paths should not be localized.
  const fileExtensionRegex = /\.[^\/]+$/; // Matches a dot followed by non-slash characters at the end of the path.
  if (
    pathname.startsWith('/_next/') ||   // Next.js internal files
    pathname.startsWith('/api/') ||     // API routes
    pathname.startsWith('/assets/') ||  // Specific assets folder in public (if any)
    fileExtensionRegex.test(pathname)   // General check for files with extensions (e.g., .png, .css, .js, .ico)
  ) {
    return NextResponse.next();
  }
  
  // Check if the pathname is missing a supported locale prefix.
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If locale is missing, redirect to the path with the detected locale.
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Construct the new path: /<locale>/ or /<locale>/<path>
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
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets/ (if you have a public/assets folder)
     * - Specific common files (favicon.ico, sw.js, robots.txt, manifest files)
     * This ensures the middleware only runs on paths that are actual pages 
     * and need internationalization.
     */
    '/((?!api/|_next/static/|_next/image/|assets/|favicon\\.ico|sw\\.js|robots\\.txt|site\\.webmanifest|manifest\\.json).*)'
  ],
};
