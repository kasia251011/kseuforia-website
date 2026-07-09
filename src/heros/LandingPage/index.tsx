'use client';
import React from 'react';

import type { Page } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const LandingPageHero: React.FC<Page['hero']> = ({ media, header, subheader }) => {
  return (
    <div
      className="relative mt-[-10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-146 md:text-center">
          {subheader && <RichText className="text-xl mb-6" data={subheader} enableGutter={false} />}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  );
};
