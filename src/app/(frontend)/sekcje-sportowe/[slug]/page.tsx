import type { Metadata } from 'next';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { draftMode } from 'next/headers';
import { Media } from '@/components/Media';

import type { Post } from '@/payload-types';
import { generateMeta } from '@/utilities/generateMeta';
import PageClient from './page.client';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import { getSportSectionBySlug, getSportSections } from '@/endpoints/sportSections';

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

export default async function Post({ params: paramsPromise }: SportSectionProps) {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);
  const url = '/sport-sections/' + decodedSlug;
  const sportSection = await getSportSectionBySlug({ slug: decodedSlug });

  if (!sportSection) return <PayloadRedirects url={url} />;

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="relative w-full h-[80vh]">
        <div className="container z-10 text-white">
          <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{sportSection.name}</h1>
        </div>
        <div className="min-h-[80vh] select-none">
          {sportSection.heroImage && typeof sportSection.heroImage !== 'string' && (
            <Media
              fill
              priority
              imgClassName="-z-10 object-cover"
              resource={sportSection.heroImage}
            />
          )}
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <h4>Kategoria Wiekowa</h4>
          <p>{sportSection.ageCategory}</p>
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
  const post = await getSportSectionBySlug({ slug: decodedSlug });

  return generateMeta({ doc: post });
}
