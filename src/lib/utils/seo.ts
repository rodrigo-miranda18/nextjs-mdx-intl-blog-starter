import { Metadata } from 'next';

interface BasicPageMetadata {
  title: string | { template: string; default: string; absolute?: string };
  description?: string;
  url: string;
  ogImage?: string;
  locale: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function generatePageMetadata({
  title,
  description,
  url,
  ogImage,
  locale,
  ...rest
}: BasicPageMetadata): Metadata {
  const defaultOGImage = '/twitter-card.png';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Next.js i18n Starter Blog',
      images: ogImage ? [ogImage] : [defaultOGImage],
      locale,
      type: 'website',
    },
    twitter: {
      title,
      card: 'summary_large_image',
      images: ogImage ? [ogImage] : [defaultOGImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...rest,
  };
}
