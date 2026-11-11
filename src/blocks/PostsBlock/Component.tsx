import type { PostsBlock as PostsBlockProps } from '@/payload-types';

import { getPosts } from '@/endpoints/posts';
import { CMSLink } from '@/components/Link';
import { PostCard } from '@/components/PostCard';

export const PostsBlockComponent = async ({
  id,
  link,
  subheader,
  header,
}: PostsBlockProps & { id?: string }) => {
  const { docs: posts } = await getPosts({ limit: 3 });

  return (
    <div className="container my-16 flex flex-col gap-8" id={`block-${id}`}>
      <div className="flex flex-col gap-2">
        {subheader && <p className="subheader">{subheader}</p>}
        <h2>{header}</h2>
      </div>
      <div className="grid max-md:grid-cols-1 md:grid-cols-3 gap-7">
        {posts.map(({ id: postId, slug, title, heroImage, meta, content, publishedAt }) => (
          <PostCard
            content={content}
            heroImage={heroImage}
            key={postId}
            meta={meta}
            publishedAt={publishedAt}
            slug={slug}
            title={title}
          />
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
