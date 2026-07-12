import type { Metadata } from 'next';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { draftMode } from 'next/headers';
import { generateMeta } from '@/utilities/generateMeta';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { getSportSections } from '@/endpoints/sportSections';
import { getAnnouncementBySlug } from '@/endpoints/announcements';
import RichText from '@/components/RichText';

export async function generateStaticParams() {
  const sportSections = await getSportSections(['slug']);

  const params = sportSections.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
}

interface SportSectionProps {
  params: Promise<{
    slug?: string;
  }>;
}

export default async function Announcement({ params: paramsPromise }: SportSectionProps) {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);
  const url = '/announcements/' + decodedSlug;
  const announcement = await getAnnouncementBySlug({ slug: decodedSlug });

  if (!announcement) return <PayloadRedirects url={url} />;

  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="relative w-full h-[80vh]">
        <div className="container z-10 text-white">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{announcement.title}</h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <h4>Kategoria Wiekowa</h4>
          <RichText data={announcement.content} enableGutter={false} enableProse={false} />
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: SportSectionProps): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const decodedSlug = decodeURIComponent(slug);
  const announcement = await getAnnouncementBySlug({ slug: decodedSlug });

  return generateMeta({ doc: announcement });
}
