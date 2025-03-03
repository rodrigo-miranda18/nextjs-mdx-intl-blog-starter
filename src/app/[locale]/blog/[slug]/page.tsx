import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ChevronLeft } from 'lucide-react';

import { formatPostDate, getPost, getPostSlugs } from '@/lib/utils/posts';
import { getPathname, Link, routing } from '@/i18n/routing';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { metadata } = await getPost(slug, locale);

  const ogImage = metadata.heroImage
    ? {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${metadata.heroImage}`,
      }
    : null;

  const pathname = getPathname({ locale, href: `/blog/${slug}` });

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    },
    openGraph: {
      type: 'article',
      title: metadata.title,
      description: metadata.description,
      siteName: 'Next.js i18n Starter Blog',
      locale,
      publishedTime: metadata.publishedDate,
      modifiedTime: metadata.modifiedDate || metadata.publishedDate,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blog/${slug}`,
      ...(ogImage && { images: [ogImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export function generateStaticParams() {
  const slugs = getPostSlugs();
  const paths = slugs.flatMap((slug) => routing.locales.map((locale) => ({ locale, slug })));

  return paths;
}

export default async function PostSingle({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'postSingle' });

  try {
    const { default: Post } = await import(`@/../translations/posts/${slug}/${locale}.mdx`);
    const post = await getPost(slug, locale);

    return (
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-20">
        <Link href="/blog" className="flex items-center gap-x-1 text-sm font-semibold text-main">
          <ChevronLeft size={20} />
          {t('goBack')}
        </Link>

        <dl className="mt-8">
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-secondary-foreground">
            <time dateTime={post.metadata.publishedDate}>
              {formatPostDate(post.metadata.publishedDate, locale)}
            </time>
          </dd>
        </dl>

        <h1 className="mt-3 text-5xl font-semibold leading-tight">{post.metadata.title}</h1>

        <p className="mt-5 text-base leading-7 text-secondary-foreground">
          {post.metadata.description}
        </p>

        <dl className="mt-6">
          <dt className="sr-only">Time to read</dt>
          <dd className="text-sm font-semibold text-main">{post.metadata.timeToRead}</dd>
        </dl>

        {post.metadata.heroImage && (
          <Image
            className="relative mt-5 h-auto w-full"
            src={post.metadata.heroImage}
            alt={post.metadata.title}
            height={376}
            width={720}
            sizes="(min-width: 768px) 720px, 89vw"
          />
        )}

        <hr className="mt-10 border-border dark:border-secondary-border" />

        <div className="prose prose-custom mt-8 dark:prose-invert lg:prose-xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-a:font-semibold prose-li:text-base prose-li:marker:font-semibold lg:prose-p:text-lg lg:prose-li:text-lg">
          <Post />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
