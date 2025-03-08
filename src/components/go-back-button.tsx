'use client';

import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

import { useRouter } from '@/i18n/routing';

export default function GoBackButton({ children }: { children: ReactNode }) {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  return (
    <button className="flex items-center gap-x-1 text-sm font-semibold text-main" onClick={goBack}>
      <ChevronLeft size={20} />
      {children}
    </button>
  );
}
