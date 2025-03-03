import { MetadataRoute } from 'next';
import { routing, getPathname } from '@/i18n/routing';

import { getPosts, getTags, Post } from '@/lib/utils/posts';

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href, lastModified: string) {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });

  return `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await getPosts(routing.locales[0]);
  const postsRoutes = posts.map((post: Post) =>
    getEntry(`/blog/${post.slug}`, post.metadata.modifiedDate || post.metadata.publishedDate),
  );

  const tags = await getTags();
  const tagsRoutes = tags.map((tag) =>
    getEntry(`/tags/${tag.name}`, new Date().toISOString().split('T')[0]),
  );

  const routes = ['', '/blog', '/tags', '/about'].map((route) =>
    getEntry(route, new Date().toISOString().split('T')[0]),
  );

  return [...routes, ...postsRoutes, ...tagsRoutes];
}
