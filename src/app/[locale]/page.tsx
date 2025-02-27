import { getTranslations } from 'next-intl/server';
import { Circle } from 'lucide-react';

import { formatPostDate, getPosts } from '@/lib/utils/posts';

import { Link } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  const homeTranslations = await getTranslations({ locale, namespace: 'homePage' });
  const postTextsTranslations = await getTranslations({ locale, namespace: 'posts' });

  const posts = await getPosts(locale);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 lg:px-12 lg:py-16">
      <h1 className="text-3xl font-semibold">{homeTranslations('title')}</h1>

      <main className="mt-12 pl-2 lg:mt-20 lg:pl-40 xl:mt-24">
        <div className="space-y-18 border-l border-border">
          {posts.map((post) => (
            <article key={post.slug} className="relative pl-6 md:pl-12">
              <Circle className="absolute right-full top-1 h-[10px] w-[10px] translate-x-1 bg-background text-tertiary-text md:top-0" />

              <dl className="mb-2 whitespace-nowrap text-sm font-semibold text-secondary-text dark:text-tertiary-text lg:absolute lg:right-full lg:top-0 lg:mb-0 lg:-translate-x-12">
                <dt className="sr-only">Published on</dt>
                <dd>
                  <time dateTime={post.metadata.publishedDate}>
                    {formatPostDate(post.metadata.publishedDate, locale)}
                  </time>
                </dd>
              </dl>

              <h2 className="z-10 text-2xl font-semibold hover:underline">
                <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
              </h2>

              {post.metadata.tags.length > 0 && (
                <div className="mb-3 mt-2 flex flex-wrap gap-4 text-sm font-semibold uppercase text-main">
                  {post.metadata.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="transition-opacity hover:opacity-85"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              <p className="mt-3 text-base leading-7 text-tertiary-text">
                {post.metadata.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-10 block text-sm font-semibold text-main hover:underline"
              >
                {postTextsTranslations('readMore')}
              </Link>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
