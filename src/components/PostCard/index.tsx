import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { clsx } from 'clsx';
import Link from 'next/link';

import type { Post } from '@/payload-types';

import { Media } from '@/components/Media';
import dayjs from '@/utilities/dayjs';

type Props = Pick<Post, 'slug' | 'title' | 'heroImage' | 'meta' | 'content' | 'publishedAt'> & {
  className?: string;
};

export const PostCard = ({ slug, title, heroImage, meta, content, publishedAt, className }: Props) => {
  const href = `/posts/${slug}`;
  const image = heroImage || meta?.image;
  const description = convertLexicalToPlaintext({ data: content }).trim();

  return (
    <Link href={href}>
      <article
        className={clsx(
          'bg-white group border border-stroke-primary overflow-hidden hover:cursor-pointer rounded-2xl flex flex-col h-full',
          className,
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          {!image && <div className="w-full h-full bg-gray-100" />}
          {image && typeof image !== 'string' && (
            <Media
              resource={image}
              fill
              imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-4 flex flex-col gap-2">
          {publishedAt && (
            <p className="text-xs text-gray-500">{dayjs(publishedAt).format('D MMMM YYYY')}</p>
          )}
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          {description && <p className="text-sm text-gray-600 line-clamp-3">{description}</p>}
        </div>
      </article>
    </Link>
  );
};
