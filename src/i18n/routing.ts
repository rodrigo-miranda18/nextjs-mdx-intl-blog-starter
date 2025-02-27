import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'pt-BR'], // A list of all locales that are supported
  localeDetection: true,
  localePrefix: 'always',
  defaultLocale: 'en', // Used when no locale matches
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
