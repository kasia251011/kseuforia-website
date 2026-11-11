export const POSTS_PAGE_SIZE = 12;
export const FEATURED_POSTS_COUNT = 1;

const FIRST_PAGE_SIZE = POSTS_PAGE_SIZE + FEATURED_POSTS_COUNT;

export const splitPostsForPage = <T>(
  allPosts: T[],
  page: number,
): { featured: T | null; posts: T[] } => {
  if (page <= 1) {
    return {
      featured: allPosts[0] ?? null,
      posts: allPosts.slice(1, FIRST_PAGE_SIZE),
    };
  }

  const offset = FIRST_PAGE_SIZE + (page - 2) * POSTS_PAGE_SIZE;

  return {
    featured: null,
    posts: allPosts.slice(offset, offset + POSTS_PAGE_SIZE),
  };
};

export const getPostsTotalPages = (totalDocs: number): number => {
  if (totalDocs <= FIRST_PAGE_SIZE) return 1;

  return 1 + Math.ceil((totalDocs - FIRST_PAGE_SIZE) / POSTS_PAGE_SIZE);
};

export const getPostsPageRange = (
  page: number,
  totalDocs: number,
): { indexEnd: number; indexStart: number } => {
  if (totalDocs <= 0) return { indexEnd: 0, indexStart: 0 };

  const indexStart = page <= 1 ? 1 : FIRST_PAGE_SIZE + (page - 2) * POSTS_PAGE_SIZE + 1;

  if (indexStart > totalDocs) return { indexEnd: 0, indexStart: 0 };

  const pageSize = page <= 1 ? FIRST_PAGE_SIZE : POSTS_PAGE_SIZE;
  const indexEnd = Math.min(indexStart + pageSize - 1, totalDocs);

  return { indexEnd, indexStart };
};
