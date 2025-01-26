'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

import { routing, usePathname, useRouter as usei18nRouter } from '@/i18n/routing';

import {
  Root as Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectViewport,
} from '@radix-ui/react-select';

const languages = [
  { icon: '🇺🇸', name: 'EN', value: 'en' },
  { icon: '🇧🇷', name: 'PT', value: 'pt-BR' },
];

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();

  const router = useRouter();
  const routeri18n = usei18nRouter();

  const selectedItem = languages.find(({ value }) => value === locale);

  function handleSelect(value: string) {
    if (value === routing.defaultLocale) {
      router.push(`${value}/${pathname}`);
      return;
    }

    routeri18n.replace(pathname, { locale: value });
  }

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="focus:ring-ring flex h-9 w-full items-center justify-between gap-x-2 whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 dark:bg-secondary-background">
        <span>{selectedItem?.icon}</span>
        <span>{selectedItem?.name}</span>
        <SelectIcon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          className="data-[side=bottom]:slide-in-from-top-2 relative z-50 overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1"
          position="popper"
        >
          <SelectViewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
            {languages.map(({ icon, name, value }) => (
              <SelectItem
                key={value}
                className="focus:ring-ring flex w-full items-center whitespace-nowrap border border-border bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-colors hover:bg-secondary-background focus:outline-none focus:ring-1 focus-visible:bg-secondary-background"
                value={value}
                asChild
              >
                <div className="flex cursor-pointer gap-x-2">
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
