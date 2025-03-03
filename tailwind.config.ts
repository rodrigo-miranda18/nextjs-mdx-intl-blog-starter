import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-hover': 'var(--color-background-hover)',
        'secondary-background': 'var(--color-secondary-background)',
        foreground: 'var(--color-foreground)',
        'secondary-foreground': 'var(--color-secondary-foreground)',
        'tertiary-foreground': 'var(--color-tertiary-foreground)',
        border: 'var(--color-border)',
        'secondary-border': 'var(--color-secondary-border)',
        main: 'var(--color-main)',
      },
      fontFamily: {
        sans: ['var(--sans-font)', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '4.5': '1.125rem',
      },
      width: {
        '4.5': '1.125rem',
      },
      spacing: {
        18: '4.5rem',
      },
      // @ts-expect-error Tailwind typography plugin
      typography: ({ theme }) => ({
        custom: {
          css: {
            '--tw-prose-body': theme('colors.secondary-foreground'),
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-lead': 'var(--color-tertiary-foreground)',
            '--tw-prose-links': theme('colors.main'),
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': theme('colors.main'),
            '--tw-prose-bullets': theme('colors.main'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': 'var(--color-main)',
            '--tw-prose-quote-borders': 'var(--color-main)',
            '--tw-prose-captions': theme('colors.secondary-foreground'),
            '--tw-prose-code': 'var(--color-foreground)',
            '--tw-prose-pre-code': 'var(--color-background)',
            '--tw-prose-pre-bg': 'var(--color-foreground)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            '--tw-prose-invert-body': theme('colors.secondary-foreground'),
            '--tw-prose-invert-headings': 'var(--color-foreground)',
            '--tw-prose-invert-lead': 'var(--color-tertiary-foreground)',
            '--tw-prose-invert-links': theme('colors.main'),
            '--tw-prose-invert-bold': 'var(--color-foreground)',
            '--tw-prose-invert-counters': theme('colors.main'),
            '--tw-prose-invert-bullets': theme('colors.main'),
            '--tw-prose-invert-hr': 'var(--color-secondary-border)',
            '--tw-prose-invert-quotes': 'var(--color-main)',
            '--tw-prose-invert-quote-borders': 'var(--color-main)',
            '--tw-prose-invert-captions': theme('colors.secondary-foreground'),
            '--tw-prose-invert-code': 'var(--color-foreground)',
            '--tw-prose-invert-pre-code': 'var(--color-foreground)',
            '--tw-prose-invert-pre-bg': 'var(--color-secondary-background)',
            '--tw-prose-invert-th-borders': 'var(--color-border)',
            '--tw-prose-invert-td-borders': 'var(--color-border)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
