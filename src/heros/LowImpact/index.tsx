import React from 'react';

import type { Page } from '@/payload-types';

import RichText from '@/components/RichText';

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      subheader?: never;
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never;
      subheader?: Page['hero']['subheader'];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, subheader }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (subheader && <RichText data={subheader} enableGutter={false} />)}
      </div>
    </div>
  );
};
