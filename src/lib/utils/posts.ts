import fs from 'fs';
import path from 'path';

import { routing } from '@/i18n/routing';

interface PostMetadata {
  title: string;
  description: string;
  publishedDate: string;
  modifiedDate: string;
  timeToRead: string;
  heroImage: string;
  tags: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

interface Posts {
  posts: Post[];
  totalPages: number;
}

interface Tag {
  name: string;
  count: number;
}

export async function getPost(slug: string, locale: string): Promise<Post> {
  const file = await import(`../../../translations/posts/${slug}/${locale}.mdx`);

  if (file?.metadata) {
    if (!file.metadata.title || !file.metadata.description || !file.metadata.publishedDate) {
      throw new Error(`Missing some required metadata fields in: ${slug}`);
    }

    if (!Array.isArray(file.metadata.tags)) {
      throw new Error(`Post tags must be defined as an array even if they are empty, in: ${slug}`);
    }

    return { slug, metadata: file.metadata };
  }

  throw new Error(`Unable to find metadata for ${slug}.mdx`);
}

export function getPostSlugs(): string[] {
  const postsDirectory = path.resolve(process.cwd(), 'translations/posts');
  return fs.readdirSync(postsDirectory);
}

export async function getPosts(locale: string, limit = -1, offset = 0): Promise<Posts> {
  const postSlugs = getPostSlugs();

  const posts = await Promise.all(
    postSlugs.map(async (slug) => {
      const postData = await getPost(slug, locale);

      return { ...postData, slug };
    }),
  );

  return {
    posts: posts
      .sort((a, b) =>
        new Date(a.metadata.publishedDate) > new Date(b.metadata.publishedDate) ? -1 : 1,
      )
      .slice(offset, limit === -1 ? posts.length : offset + limit),
    totalPages: Math.ceil(posts.length / (limit === -1 ? 1 : limit)),
  };
}

export async function getPostsByTag(
  tag: string,
  locale: string,
  limit = -1,
  offset = 0,
): Promise<Posts> {
  const { posts } = await getPosts(locale);
  const filteredPosts = posts.filter((post) => post.metadata.tags.includes(tag));

  return {
    posts: filteredPosts.slice(offset, limit === -1 ? filteredPosts.length : offset + limit),
    totalPages: Math.ceil(filteredPosts.length / (limit === -1 ? 1 : limit)),
  };
}

export async function getTags(): Promise<Tag[]> {
  const { posts } = await getPosts(routing.defaultLocale);

  const tags = posts.reduce((tags: Tag[], post) => {
    post.metadata.tags.forEach((tag) => {
      const existingTag = tags.find((t) => t.name === tag);

      if (existingTag) {
        existingTag.count += 1;
      } else {
        tags.push({ name: tag, count: 1 });
      }
    });

    return tags;
  }, []);

  return tags.sort((a, b) => (a.count > b.count ? -1 : 1));
}

export function formatPostDate(dateString: string, locale: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
