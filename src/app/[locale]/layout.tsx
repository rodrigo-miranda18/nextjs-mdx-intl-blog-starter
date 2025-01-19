import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist } from 'next/font/google';

import { routing } from '@/i18n/routing';

import Header from './header';

import '../globals.css';

const SansFont = Geist({
  variable: '--sans-font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'pt-BR')) {
    notFound();
  }

  // Providing all translations to the client
  const messages = await getMessages();

  // Get the user's theme preference
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  return (
    <html
      lang={locale}
      className={`${SansFont.variable}${theme && theme.value === 'dark' ? 'dark' : ''}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
