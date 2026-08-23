import type { AnnouncementsBlock as AnnouncementsBlockProps } from '@/payload-types';

import { getAnnouncements } from '@/endpoints/announcements';
import { AnnouncementCard } from '@/components/AnnouncementCard';
import { CMSLink } from '@/components/Link';

export const AnnouncementsBlock = async ({
  id,
  header,
  subheader,
  link,
}: AnnouncementsBlockProps & { id?: string }) => {
  const announcements = await getAnnouncements({ limit: 3 });

  return (
    <div className="my-16 container flex flex-col gap-8" id={`block-${id}`}>
      <div className="flex flex-col gap-2">
        {subheader && <p className="subheader">{subheader}</p>}
        <h2>{header}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announcements.docs.map(({ title, slug, publishedAt }) => (
          <AnnouncementCard key={slug} title={title} slug={slug} publishedAt={publishedAt} />
        ))}
      </div>
      {link?.label && (
        <div className="flex justify-end">
          <CMSLink {...link} appearance="default" className="self-start bg-white" />
        </div>
      )}
    </div>
  );
};
