import type { AnnouncementsBlock as AnnouncementsBlockProps } from '@/payload-types';

import { getAnnouncements } from '@/endpoints/announcements';
import { AnnouncementCard } from '@/components/AnnouncementCard';

export const AnnouncementsBlock = async ({
  id,
  header,
  subheader,
}: AnnouncementsBlockProps & { id?: string }) => {
  const announcements = await getAnnouncements();

  //TODO: Only 3

  return (
    <div className="my-16 container" id={`block-${id}`}>
      {subheader && <p className="subheader mb-2">{subheader}</p>}
      <h2>{header}</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {announcements.docs.map(({ title, slug, publishedAt }) => (
          <AnnouncementCard key={slug} title={title} slug={slug} publishedAt={publishedAt} />
        ))}
      </div>
    </div>
  );
};
