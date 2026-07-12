import { cn } from '@/utilities/ui';
import Link from 'next/link';
import dayjs from 'dayjs';
import Bullhorn from '@/assets/icons/bullhorn.svg';

import type { Announcement } from '@/payload-types';
import Image from 'next/image';

export const AnnouncementCard = ({
  slug,
  title,
  publishedAt,
}: Pick<Announcement, 'title' | 'slug' | 'publishedAt'>) => {
  const href = `/ogloszenia/${slug}`;

  return (
    <Link href={href}>
      <div className="border-3 p-6 flex gap-4  border-pink rounded-lg overflow-hidden hover:cursor-pointer">
        <Image src={Bullhorn} alt="bullhorn" className="size-10 " />
        <div className="">
          {publishedAt && (
            <p className="pb-2 text-xs text-gray-600">{dayjs(publishedAt).format('DD/MM/YYYY')}</p>
          )}
          <h3 className=" font-semibold">{title}</h3>
        </div>
      </div>
    </Link>
  );
};
