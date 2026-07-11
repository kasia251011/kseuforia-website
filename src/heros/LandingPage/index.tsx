'use client';
import React from 'react';

import type { Page } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const LandingPageHero = ({ media, header, subheader }: Page['hero']) => {
  return (
    <div
      className="relative flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex flex-col items-center justify-center">
        <h1 className="text-7xl md:text-[112px] font-alfa-slab-one uppercase max-w-175 text-center">
          <span className="whitespace-nowrap">KS Grot</span> Euforia
        </h1>
        <div className="max-w-140 w-full flex items-center justify-center gap-4">
          <span className="h-1.75 w-44 bg-white"></span>
          <p className="text-4xl text-center ">Pabianice</p>
          <span className="h-1.75 w-44 bg-white"></span>
        </div>
        <div className="max-w-120 md:text-center mt-8">
          {subheader && <RichText className="text-lg mb-6" data={subheader} enableGutter={false} />}
        </div>
      </div>
      <div className="h-dvh select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
        <div className="absolute inset-0 -z-[5] bg-hero-overlay" />
      </div>
    </div>
  );
};
