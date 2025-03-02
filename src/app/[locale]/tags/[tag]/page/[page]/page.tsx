import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getPathname, routing } from '@/i18n/routing';
import { getTags } from '@/lib/utils/posts';

import TagArchiveTemplate, { POSTS_PER_PAGE } from '../../tag-archive-template';

interface PageProps {
  params: Promise<{ locale: string; tag: string; page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, tag, page } = await params;
  const pageNumber = parseInt(page);

  if (pageNumber < 1 || isNaN(pageNumber)) {
    return notFound();
  }

  const t = await getTranslations({ locale, namespace: 'tagSingle' });

  return {
    title: `${tag.toUpperCase()} - Page ${pageNumber}`,
    description: t('metadata.description', { tag }),
    alternates: {
      canonical: getPathname({ locale, href: `/tags/${tag}/page/${pageNumber}` }),
    },
    // Add pagination metadata when next.js supports it
  };
}

export async function generateStaticParams() {
  const tags = await getTags();

  const paths = tags.flatMap((tag) => {
    const pages = Math.ceil(tag.count / POSTS_PER_PAGE);
    return routing.locales.flatMap((locale) =>
      Array.from({ length: pages }, (_, i) => ({
        locale,
        tag: encodeURI(tag.name),
        page: (i + 1).toString(),
      })),
    );
  });

  return paths;
}

export default async function PaginatedTagArchivePage({ params }: PageProps) {
  const { locale, tag: encodedTag, page } = await params;
  const pageNumber = parseInt(page);
  const tag = decodeURI(encodedTag);

  if (pageNumber < 1 || isNaN(pageNumber)) {
    return notFound();
  }

  return <TagArchiveTemplate locale={locale} tag={tag} page={pageNumber} />;
}
