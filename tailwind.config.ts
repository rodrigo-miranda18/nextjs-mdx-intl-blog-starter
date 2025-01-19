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
        text: 'var(--color-text)',
        'secondary-text': 'var(--color-secondary-text)',
        'tertiary-text': 'var(--color-tertiary-text)',
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
    },
  },
  plugins: [],
} satisfies Config;
