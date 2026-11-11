import { Post } from '@/payload-types';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';
import { draftMode } from 'next/dist/server/request/draft-mode';

export const getPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'posts',
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

export const getPosts = async ({
  fields,
  limit,
}: {
  fields?: (keyof Post)[];
  limit?: number;
} = {}) => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: limit ?? 1000,
    overrideAccess: false,
    pagination: false,
    sort: '-publishedAt',
    ...(fields ? { select: Object.fromEntries(fields.map((field) => [field, true])) } : {}),
  });

  return posts;
};
