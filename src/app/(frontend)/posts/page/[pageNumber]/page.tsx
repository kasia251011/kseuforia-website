import type { Metadata } from 'next/types'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostsArchive } from '@/components/PostsArchive'
import { getPosts } from '@/endpoints/posts'
import { getPostsPageRange, getPostsTotalPages, splitPostsForPage } from '@/utilities/postsPagination'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber) || sanitizedPageNumber < 1) notFound()

  const { docs, totalDocs } = await getPosts()

  const { posts } = splitPostsForPage(docs, sanitizedPageNumber)
  const { indexEnd, indexStart } = getPostsPageRange(sanitizedPageNumber, totalDocs)
  const totalPages = getPostsTotalPages(totalDocs)

  if (sanitizedPageNumber > totalPages) notFound()

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

      <PostsArchive posts={posts} />

      <div className="container">
        {totalPages > 1 && <Pagination page={sanitizedPageNumber} totalPages={totalPages} />}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Artykuły - strona ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const { totalDocs } = await getPosts({ fields: ['id'] })

  const totalPages = getPostsTotalPages(totalDocs)

  const pages: { pageNumber: string }[] = []

  for (let i = 2; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}

