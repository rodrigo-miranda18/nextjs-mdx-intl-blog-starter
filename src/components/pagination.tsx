'use client';

import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils/cn';
import { Link, usePathname } from '@/i18n/routing';

interface PaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ className = '', currentPage, totalPages }: PaginationProps) {
  const t = useTranslations('pagination');
  const pathname = usePathname();
  const basePath = pathname.replace(/^\//, '').replace(/\/page\/\d+$/, '');

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <nav className={cn('flex items-center justify-between', className)}>
      {hasPreviousPage ? (
        <Link
          href={`/${basePath}/page/${currentPage - 1}`}
          className="flex items-center gap-1 text-sm text-main"
          rel="prev"
        >
          <ChevronLeft className="inline h-5 w-5" />
          {t('previous')}
        </Link>
      ) : (
        <button className="flex items-center gap-1 text-sm text-main disabled:opacity-75" disabled>
          <ChevronLeft className="inline h-5 w-5" />
          {t('previous')}
        </button>
      )}

      <span className="text-main">
        {currentPage} {t('of')} {totalPages}
      </span>

      {hasNextPage ? (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          className="flex items-center gap-1 text-sm text-main"
          rel="next"
        >
          {t('next')}
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <button className="flex items-center gap-1 text-sm text-main disabled:opacity-75" disabled>
          {t('next')}
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </nav>
  );
}
