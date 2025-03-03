'use client';

import { Moon, Sun } from 'lucide-react';

function toggleTheme() {
  const isLightTheme = !document.documentElement.classList.contains('dark');

  document.documentElement.classList.toggle('dark', isLightTheme);
  document.cookie = `theme=${isLightTheme ? 'dark' : 'light'}`;
}

export default function ThemeToggle() {
  return (
    <button
      aria-label="Toggle dark mode"
      className="group rounded-md border border-border bg-background p-2 transition hover:bg-background-hover hover:opacity-85 dark:bg-secondary-background dark:hover:bg-background-hover"
      onClick={toggleTheme}
    >
      <Sun className="h-4.5 w-4.5 text-secondary-foreground dark:hidden" />
      <Moon className="hidden h-4.5 w-4.5 text-secondary-foreground dark:block" />
    </button>
  );
}
