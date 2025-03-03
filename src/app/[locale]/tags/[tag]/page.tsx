import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import generatePageMetadata from '@/lib/utils/seo';
import { getTags } from '@/lib/utils/posts';
import { getPathname, routing } from '@/i18n/routing';

import TagArchiveTemplate from './tag-archive-template';

interface PageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, tag } = await params;
  const t = await getTranslations({ locale, namespace: 'tagSingle' });

  const pathname = getPathname({ locale, href: `/tags/${tag}` });

  return generatePageMetadata({
    title: tag.toUpperCase(),
    description: t('metadata.description', { tag }),
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    locale,
  });
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
