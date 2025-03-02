import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getPathname, routing } from '@/i18n/routing';
import { getTags } from '@/lib/utils/posts';

import TagArchiveTemplate from './tag-archive-template';

interface PageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations({ locale, namespace: 'tagSingle' });

  return {
    title: tag.toUpperCase(),
    description: t('metadata.description', { tag }),
    alternates: {
      canonical: getPathname({ locale, href: `/tags/${tag}` }),
    },
  };
}

export async function generateStaticParams() {
  const tags = await getTags();
  const paths = tags.flatMap((tag) =>
    routing.locales.map((locale) => ({ locale, tag: encodeURI(tag.name) })),
  );

  return paths;
}

export default async function TagArchivePage({ params }: PageProps) {
  const { locale, tag: encodedTag } = await params;
  const tag = decodeURI(encodedTag);
  const tags = await getTags();

  if (!tags.find((t) => t.name === tag)) {
    // Doing the check because dynamicParams false will not work as we are using
    // next cookies function in locale layout.tsx file.
    // Use a next/headers module in a high level file force the route to be dynamic
    return notFound();
  }

  return <TagArchiveTemplate locale={locale} tag={tag} />;
}
