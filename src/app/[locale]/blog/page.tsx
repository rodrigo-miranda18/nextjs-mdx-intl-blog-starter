import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import generatePageMetadata from '@/lib/utils/seo';
import { getPathname } from '@/i18n/routing';

import TagArchiveTemplate from '../tags/[tag]/tag-archive-template';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });

  return generatePageMetadata({
    title: t('metadata.title'),
    description: t('metadata.description'),
    url: getPathname({ locale, href: '/blog' }),
    locale,
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;

  return <TagArchiveTemplate locale={locale} />;
}
