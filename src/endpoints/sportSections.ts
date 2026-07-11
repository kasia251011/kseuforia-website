import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { SportSection } from '@/payload-types';

export const getSportSectionBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'sport-sections',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

export const getSportSections = async (fields?: (keyof SportSection)[]) => {
  const payload = await getPayload({ config: configPromise });
  const sportSections = await payload.find({
    collection: 'sport-sections',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    ...(fields ? { select: Object.fromEntries(fields.map((field) => [field, true])) } : {}),
  });

  return sportSections;
};
