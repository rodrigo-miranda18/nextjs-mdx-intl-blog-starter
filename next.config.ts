import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkSugarHigh from 'remark-sugar-high';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false, // MDX-related plugins does not work with the rust compiler enabled
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkToc, { heading: 'Table of contents' }], remarkSugarHigh],
    rehypePlugins: [rehypeSlug],
    // Add markdown plugins here, as desired
  },
});

export default withNextIntl(withMDX(nextConfig));
