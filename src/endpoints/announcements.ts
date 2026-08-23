import { Announcement } from '@/payload-types';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';
import { draftMode } from 'next/dist/server/request/draft-mode';

export const getAnnouncementBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'announcements',
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

export const getAnnouncements = async ({
  fields,
  limit,
}: {
  fields?: (keyof Announcement)[];
  limit?: number;
} = {}) => {
  const payload = await getPayload({ config: configPromise });
  const announcements = await payload.find({
    collection: 'announcements',
    draft: false,
    limit: limit ?? 1000,
    overrideAccess: false,
    pagination: false,
    ...(fields ? { select: Object.fromEntries(fields.map((field) => [field, true])) } : {}),
  });

  return announcements;
};
