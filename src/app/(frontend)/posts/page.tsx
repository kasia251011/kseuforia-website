import type { Metadata } from 'next/types'

import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

import { Media } from '@/components/Media'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostsArchive } from '@/components/PostsArchive'
import { getPosts } from '@/endpoints/posts'
import dayjs from '@/utilities/dayjs'
import { getPostsPageRange, getPostsTotalPages, splitPostsForPage } from '@/utilities/postsPagination'
import Link from 'next/link'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const { docs, totalDocs } = await getPosts()

  const { featured, posts } = splitPostsForPage(docs, 1)
  const { indexEnd, indexStart } = getPostsPageRange(1, totalDocs)
  const totalPages = getPostsTotalPages(totalDocs)
  const featuredImage = featured && (featured.heroImage || featured.meta?.image)
  const featuredDescription = featured && convertLexicalToPlaintext({ data: featured.content }).trim()

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none">
          <h1>Artykuły</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          indexEnd={indexEnd}
          indexStart={indexStart}
          totalDocs={totalDocs}
        />
      </div>

      {featured && (
        <div className="container mb-8">
          <Link href={`/posts/${featured.slug}`}>
            <article className="bg-white group border-2 border-primary shadow-lg overflow-hidden hover:cursor-pointer rounded-2xl flex flex-col md:flex-row">
              <div className="relative aspect-video md:aspect-auto md:w-1/2 overflow-hidden shrink-0">
                {!featuredImage && <div className="w-full h-full bg-gray-100" />}
                {featuredImage && typeof featuredImage !== 'string' && (
                  <Media
                    resource={featuredImage}
                    fill
                    imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 p-6 md:w-1/2 md:justify-center">
                {featured.publishedAt && (
                  <p className="text-xs text-gray-500">
                    {dayjs(featured.publishedAt).format('D MMMM YYYY')}
                  </p>
                )}
                <h2 className="font-semibold text-2xl md:text-3xl line-clamp-3">
                  {featured.title}
                </h2>
                {featuredDescription && (
                  <p className="text-base text-gray-600 line-clamp-4">{featuredDescription}</p>
                )}
              </div>
            </article>
          </Link>
        </div>
      )}

      <PostsArchive posts={posts} />

      <div className="container">
        {totalPages > 1 && <Pagination page={1} totalPages={totalPages} />}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Artykuły`,
  }
}

