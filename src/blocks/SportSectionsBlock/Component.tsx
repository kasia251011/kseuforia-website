import type { SportSectionsBlock as SportSectionsBlockProps } from '@/payload-types';

import { getSportSections } from '@/endpoints/sportSections';
import { SportSectionCard } from '@/components/SportSectionCard';
import { CMSLink } from '@/components/Link';
import clsx from 'clsx';

const sectionLengthToGridCols = (length: number) => {
  switch (length) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-3';
    case 4:
      return 'grid-cols-4';
    default:
      return 'grid-cols-5';
  }
};

export const SportSectionsBlock = async ({
  id,
  header,
  subheader,
  link,
}: SportSectionsBlockProps & { id?: string }) => {
  const sportSections = await getSportSections();

  return (
    <div className="container my-16 flex flex-col gap-8" id={`block-${id}`}>
      <div className="flex flex-col gap-1 md:gap-2">
        {subheader && <p className="text-xl font-semibold text-primary">{subheader}</p>}
        <h2>{header}</h2>
      </div>
      <div
        className={clsx(
          'grid max-md:grid-cols-1 gap-7',
          sectionLengthToGridCols(sportSections.docs.length),
        )}
      >
        {sportSections.docs.map(({ name, slug, cardImage }) => (
          <SportSectionCard
            className="col-span-1"
            key={slug}
            name={name}
            slug={slug}
            cardImage={cardImage}
          />
        ))}
      </div>
      {link?.label && (
        <div className="flex justify-end">
          <CMSLink {...link} appearance="default" className="self-start" />
        </div>
      )}
    </div>
  );
};
