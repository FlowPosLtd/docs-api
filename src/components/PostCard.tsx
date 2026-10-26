import { Link } from "../utils/use-router";
import { blogPath } from "../utils/paths";
import type { BlogPost } from "../data/blog";
import { AudienceBadge } from "./AudienceBadge";
import { PostMeta } from "./PostMeta";

/** A post as a card, on the blog list and the home page. */
export function PostCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={blogPath(post.slug)}
      className={`group flex h-full flex-col rounded-xl border border-line bg-canvas hover:border-line-strong hover:bg-canvas-subtle transition-colors ${
        featured ? "p-6 sm:p-8" : "p-5"
      }`}
    >
      <div className="mb-3">
        <AudienceBadge audience={post.audience} />
      </div>
      <h2
        className={`${featured ? "t-title" : "t-subheading"} mb-2 group-hover:text-accent-ink transition-colors`}
      >
        {post.title}
      </h2>
      {post.description && (
        <p className={`${featured ? "t-body" : "t-body-sm"} mb-4`}>
          {post.description}
        </p>
      )}
      <div className="mt-auto">
        <PostMeta post={post} />
      </div>
    </Link>
  );
}
