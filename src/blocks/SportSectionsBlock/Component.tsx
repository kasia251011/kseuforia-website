import type { SportSectionsBlock as SportSectionsBlockProps } from '@/payload-types';

import { getSportSections } from '@/endpoints/sportSections';
import { SportSectionCard } from '@/components/SportSectionCard';

export const SportSectionsBlock = async ({
  id,
  header,
  subheader,
}: SportSectionsBlockProps & { id?: string }) => {
  const sportSections = await getSportSections();

  return (
    <div className="my-16" id={`block-${id}`}>
      <h2>{header}</h2>
      {subheader && <p className="text-lg text-gray-600">{subheader}</p>}
      <div className="">
        {sportSections.docs.map(({ name, slug, cardImage }) => (
          <SportSectionCard key={slug} name={name} slug={slug} cardImage={cardImage} />
        ))}
      </div>
    </div>
  );
};
