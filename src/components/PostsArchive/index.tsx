import type { Post } from '@/payload-types';

import { PostCard } from '@/components/PostCard';

type Props = {
  posts: Post[];
};

export const PostsArchive = ({ posts }: Props) => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post) => (
          <PostCard
            content={post.content}
            heroImage={post.heroImage}
            key={post.id}
            meta={post.meta}
            publishedAt={post.publishedAt}
            slug={post.slug}
            title={post.title}
          />
        ))}
      </div>
    </div>
  );
};

