import { cn } from '@/utilities/ui';
import Link from 'next/link';

import type { SportSection } from '@/payload-types';

import { Media } from '@/components/Media';
import { clsx } from 'clsx';

type Props = Pick<SportSection, 'cardImage' | 'name' | 'slug'> & { className?: string };

export const SportSectionCard = ({ slug, name, cardImage, className }: Props) => {
  const href = `/sekcje-sportowe/${slug}`;

  return (
    <Link href={href}>
      <div
        className={clsx(
          'bg-white group border border-stroke-primary overflow-hidden bg-card hover:cursor-pointer rounded-2xl h-77.5 flex flex-col',
          className,
        )}
      >
        <div className="relative flex-1 overflow-hidden">
          {!cardImage && <div className="">No image</div>}
          {cardImage && typeof cardImage !== 'string' && (
            <Media
              resource={cardImage}
              fill
              imgClassName="object-contain transition-transform duration-300 group-hover:scale-105 z-1"
            />
          )}
        </div>
        <div className="p-4 bg-primary">
          <h3 className="text-white text-center font-semibold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};
