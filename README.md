# Next.js Starter Blog with MDX and i18n

This is a [Next.js](https://nextjs.org/) starter blog template, with [i18n](https://next-intl.dev/). It's made upon Next.js 15 and React 19, using App Router and Server Components! All posts content is managed by MDX files, using [@next/mdx](https://www.npmjs.com/package/@next/mdx) module.

This template is easily configurable, customizable, and also full optimized for SEO.

Checkout the documentation below to get started.

Otherwise, feel free to open issues reporting bugs or suggesting new features.

This is still a work in progress project, so I will updating and upgrading the template by myself, with the new features, and fixes/updates.

You can visit the [Blog Demo](https://nextjs-mdx-intl-blog-starter.vercel.app/).

## Features

- Latest version of Next.js with App Router and Typescript
- Easy styling customization with [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3)
- Easy post content styling customization using [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- Easily Internationalization setup
- Internationalized URLs optimized for SEO
- MDX components
- Light/Dark mode
- SEO Friendly
- SEO Friendly pagination
- Post SEO using Next.js metadata
- Sitemap and robots.txt
- Perfect Lighthouse score
- Analytics (if you deployed on [Vercel](https://vercel.com/))
- Post tagging
- Table of Contents
- Styled code blocks

## Quick Start Guide

1. Clone the repo

```bash
git clone git@github.com:rodrigo-miranda18/nextjs-mdx-intl-blog-starter.git
```

2. Install dependencies

```bash
# Install the dependencies
npm install
# or 
yarn
# or 
pnpm i
```

3. Create `.env` file in root dir, and set the BASE_URL

```bash
NEXT_PUBLIC_BASE_URL="Your base url comes here"
```

4. Setup the i18n by opening the file `src/i18n/routing.ts`. Choose what locales your project will support in locales attribute. The default are `locales: ['en', 'pt-BR']`.

5. Choose your default locale in `defaultLocale` attribute. You may wish not to change the `localePrefix` attribute, as changing it can break the static build of dynamic pages.

6. Open `src/middleware.ts` file and switch the locales part of `matcher` attribute with your chosen locales. For example, if you chose `fr` and `en-GB` locales, switch `/(en|pt-BR)/:path*` to `/(fr|en-GB)/:path*`.

7. Open the `/src/components/language-selector.tsx` component and change the available languages, as well as the icons too. 

8. Rename all the `.json` files from `translations` folder for your chosen languages, and translate all the content within it.

9. Remove all mocked posts from `translations/posts` folder and write your own posts, using the `{locale}.mdx` syntax for file names.

10. You may want to add your own avatar image in `public` folder. This image will be used in `/about` page as your profile image.

## Customize

- `src/i18n/routing.ts` - contains the core configuration for your internationalization setup, including supported locales and default locale.
- `src/components/language-selector.tsx` - update available languages and their display format.
- `translations/*.json` - change the site content, and basic metadata for pages seo, like titles and descriptions, for each locale you support. 
- `translations/posts/*.mdx` - write your own posts using the `{locale}.mdx` syntax for file names, and also define post metadata (that will be used to build seo too).
- `src/app/globals.css` - contains global CSS variables including the color scheme for both light and dark modes, and the color scheme for code blocks.
- `tailwind.config.ts` - customize Tailwind settings, typography plugin configuration, and extend theme colors.
- `src/app/[locale]/layout.tsx` - modify the font family using [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts).
- `public/logo.svg` - replace with your own logo.
- `public/avatar.webp` - replace with your own avatar.
- `src/app/favicon.ico` - replace with your favicon.
- `src/mdx-components.tsx` - customize the rendering of MDX elements and add custom components for your blog posts.
- `src/app/[locale]/tags/[tag]/tag-archive-template.tsx` - adjust the `POSTS_PER_PAGE` constant to control pagination.
- `src/middleware.ts` - adjust internationalization path matching rules.
- `next.config.ts` - modify MDX plugins configuration and Next.js settings.


## Deploy

The easiest way to deploy this template is on [Vercel](https://vercel.com/). Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. This template has Vercel Analytics in source code by default. To enable the analytics, follow this [simple guide](https://vercel.com/docs/analytics/quickstart#enable-web-analytics-in-vercel).

You can also use another host providers, like [Netlify](https://www.netlify.com/), [AWS](https://aws.amazon.com/), etc. Netlify usually doesn't require any additional configurations for Next.js projects, but another providers may require custom configuration and setup to support Next.js functionalities, such as SSR, ISR, and image optimization.

## Support

Support this effort by giving a star on GitHub. If you are using this template, let me know by sending me a message on [Linkedin](https://www.linkedin.com/in/rodrigoamiranda/).

## License

[MIT](https://github.com/rodrigo-miranda18/nextjs-mdx-intl-blog-starter/blob/master/LICENSE) © [Rodrigo Miranda](https://rodrigoamiranda.dev)
