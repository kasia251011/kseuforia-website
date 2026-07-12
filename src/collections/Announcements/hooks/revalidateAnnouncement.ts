import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';

import { revalidatePath, revalidateTag } from 'next/cache';

import type { Announcement } from '@/payload-types';

export const revalidateAnnouncement: CollectionAfterChangeHook<Announcement> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/announcements/${doc.slug}`;

      payload.logger.info(`Revalidating announcement at path: ${path}`);

      revalidatePath(path);
      revalidateTag('announcements-sitemap', 'max');
    }

    // If the announcement was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/announcements/${previousDoc.slug}`;

      payload.logger.info(`Revalidating old announcement at path: ${oldPath}`);

      revalidatePath(oldPath);
      revalidateTag('announcements-sitemap', 'max');
    }
  }
  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Announcement> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/announcements/${doc?.slug}`;

    revalidatePath(path);
    revalidateTag('announcements-sitemap', 'max');
  }

  return doc;
};
