import { cn } from '@/utilities/ui';
import Link from 'next/link';
import React, { Fragment } from 'react';

import type { Post, SportSection } from '@/payload-types';

import { Media } from '@/components/Media';

export const SportSectionCard = ({
  slug,
  name,
  cardImage,
}: Pick<SportSection, 'cardImage' | 'name' | 'slug'>) => {
  const href = `/sekcje-sportowe/${slug}`;

  return (
    <Link href={href}>
      <div
        className={cn(
          'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        )}
      >
        <div className="relative w-full ">
          {!cardImage && <div className="">No image</div>}
          {cardImage && typeof cardImage !== 'string' && <Media resource={cardImage} size="33vw" />}
        </div>
        <div className="p-4">
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  );
};
