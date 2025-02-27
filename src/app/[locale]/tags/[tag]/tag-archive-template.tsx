import { getTranslations } from 'next-intl/server';

import { formatPostDate, getPosts, getPostsByTag, getTags } from '@/lib/utils/posts';

import { Link } from '@/i18n/routing';

interface TemplateLayoutProps {
  locale: string;
  tag?: string;
}

export default async function TagArchiveTemplate({ locale, tag }: TemplateLayoutProps) {
  const blogTranslations = await getTranslations({ locale, namespace: 'blogPage' });
  const postTextsTranslations = await getTranslations({ locale, namespace: 'posts' });

  const tags = await getTags();
  const posts = await (tag ? getPostsByTag(tag, locale) : getPosts(locale));

  return (
    <section className="mx-auto flex w-full max-w-4xl px-6 py-12 lg:px-10 lg:py-20">
      {tags.length > 0 && (
        <aside className="hidden min-w-48 border-r border-border md:block">
          <h3 className="text-xl font-semibold">{blogTranslations('tagsTitle')}</h3>

          <ul className="mt-7 space-y-3.5">
            {tags.map((tag) => (
              <li key={tag.name}>
                <Link
                  href={`/tags/${tag.name}`}
                  className="text-sm uppercase text-secondary-text hover:font-semibold hover:text-main"
                >
                  {tag.name} ({tag.count})
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <main className="space-y-8 md:pl-8 lg:pl-12">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="relative border-b border-border pb-10 last:border-b-0"
          >
            <dl className="mb-2 text-sm text-secondary-text dark:text-tertiary-text">
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

            <p className="mt-5 text-base leading-7 text-tertiary-text">
              {post.metadata.description}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-8 block text-sm font-semibold text-main hover:underline"
            >
              {postTextsTranslations('readMore')}
            </Link>
          </article>
        ))}
      </main>
    </section>
  );
}
