import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import generatePageMetadata from '@/lib/utils/seo';
import { getTags } from '@/lib/utils/posts';
import { getPathname, Link } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tagsPage' });

  const url = getPathname({ locale, href: '/tags' });

  return generatePageMetadata({
    title: t('metadata.title'),
    description: t('metadata.description'),
    url,
    locale,
  });
}

export default async function TagsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'tagsPage' });

  const tags = await getTags();

  return (
    <section className="mx-auto max-w-2xl px-6 pb-16 pt-20">
      <h1 className="text-3xl font-semibold">{t('title')}</h1>

      <hr className="mt-6 border-border dark:border-secondary-border" />

      <ul className="mt-7 flex flex-wrap gap-8 md:gap-10">
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link href={`/tags/${tag.name}`} className="text-sm font-semibold uppercase text-main">
              {tag.name} <span className="text-text">({tag.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
