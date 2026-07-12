'use client';
import React from 'react';

import type { Page } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const HighImpactHero: React.FC<Page['hero']> = ({
  media,
  subheader,
  header,
  aboveHeader,
}) => {
  const [firstWord, ...rest] = header?.split(' ') || [''];

  return (
    <div className="relative  flex items-center justify-center border-b-2">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-146 text-center text-primary">
          {aboveHeader && <p className="uppercase font-semibold mb-4">{aboveHeader}</p>}
          {header && (
            <h1 className="mb-6 uppercase">
              <span className="text-[#2877D5]">{firstWord}</span> {rest.join(' ')}
            </h1>
          )}
          {subheader && <RichText className="mb-6" data={subheader} enableGutter={false} />}
        </div>
      </div>
      <div className="h-[60vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  );
};
