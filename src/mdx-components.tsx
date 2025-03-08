import { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { cn } from './lib/utils/cn';

type ImageProps = ComponentPropsWithoutRef<'img'>;

const components: MDXComponents = {
  img: ({ src, alt, className, ...props }: ImageProps) => (
    <Image
      {...props}
      className={cn('h-auto w-full', className)}
      src={src || ''}
      alt={alt || ''}
      width={720}
      height={492}
      sizes="(min-width: 768px) 690px, (min-width: 1024px) 720px, 89vw"
    />
  ),
};

type MDXProvidedComponents = typeof components;

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
