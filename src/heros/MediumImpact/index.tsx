import React from 'react';

import type { Page } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const MediumImpactHero: React.FC<Page['hero']> = ({ media, header, subheader }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {header && <h1 className="mb-6">{header}</h1>}

        {subheader && <RichText className="mb-6" data={subheader} enableGutter={false} />}
      </div>
      <div className="container ">
        {media && typeof media === 'object' && (
          <div>
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
