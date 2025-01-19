'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';

import LanguageSelector from '@/components/language-selector';
import ThemeToggle from '@/components/theme-toggle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>();

  const t = useTranslations('menu');
  const menuItems = [
    {
      name: t('items.blog'),
      link: '/blog',
    },
    {
      name: t('items.tags'),
      link: '/tags',
    },
    {
      name: t('items.about'),
      link: '/about',
    },
  ];

  function toggleMenu() {
    setMenuOpen((value) => !value);
  }

  return (
    <header className="border-b border-secondary-border dark:bg-secondary-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex gap-4">
          <Image
            className="h-7 w-7 invert dark:filter-none"
            src="/logo.svg"
            alt="Vercel logomark"
            width={26}
            height={26}
          />

          <div className="hidden w-[1px] rotate-[24deg] bg-secondary-border lg:block" />

          <div className="hidden text-lg font-semibold text-text lg:block">Next.js Blog</div>
        </div>

        <div className="flex items-center gap-10">
          <nav
            data-open={menuOpen}
            className="absolute inset-0 top-[77px] z-50 flex w-full translate-x-[-100%] flex-col items-center gap-9 bg-background px-9 pt-14 transition-transform duration-300 data-[open=true]:translate-x-0 lg:static lg:translate-x-0 lg:flex-row lg:gap-6 lg:p-0"
          >
            {menuItems.map((menuItem) => (
              <a
                key={menuItem.link}
                href={menuItem.link}
                className="text-[15px] text-secondary-text transition-colors hover:text-text"
              >
                {menuItem.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />

            <button className="text-tertiary-text lg:hidden" onClick={toggleMenu}>
              {menuOpen && <X className="h-5 w-5" />}
              {!menuOpen && <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
