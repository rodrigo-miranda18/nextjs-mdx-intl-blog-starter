import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getPathname, routing } from '@/i18n/routing';
import { getPosts } from '@/lib/utils/posts';

import TagArchiveTemplate, { POSTS_PER_PAGE } from '../../../tags/[tag]/tag-archive-template';

interface PageProps {
  params: Promise<{ locale: string; page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, page } = await params;
  const pageNumber = parseInt(page);

  if (pageNumber < 1 || isNaN(pageNumber)) {
    return notFound();
  }

  const t = await getTranslations({ locale, namespace: 'blogPage' });

  return {
    title: `${t('metadata.title')} - Page ${pageNumber}`,
    description: t('metadata.description'),
    alternates: {
      canonical: getPathname({ locale, href: `/blog/page/${pageNumber}` }),
    },
    // Add pagination metadata when next.js supports it
  };
}

export async function generateStaticParams() {
  const localePaths = await Promise.all(
    routing.locales.map(async (locale) => {
      const { totalPages } = await getPosts(locale, POSTS_PER_PAGE, 0);

      return Array.from({ length: totalPages }, (_, i) => ({
        locale,
        page: (i + 1).toString(),
      }));
    }),
  );
  const paths = localePaths.flat();

  return paths;
}

export default async function PaginatedBlogPage({ params }: PageProps) {
  const { locale, page } = await params;
  const pageNumber = parseInt(page);

  if (pageNumber < 1 || isNaN(pageNumber)) {
    return notFound();
  }

  return <TagArchiveTemplate locale={locale} page={pageNumber} />;
}
