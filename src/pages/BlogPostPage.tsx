import { useParams } from "react-router-dom";
import { Link } from "../utils/use-router";
import { blogPath } from "../utils/paths";
import { MarkdocRenderer } from "../components/MarkdocRenderer";
import { AudienceBadge } from "../components/AudienceBadge";
import { PostMeta } from "../components/PostMeta";
import { NotFound } from "../components/NotFound";
import { getPost, posts } from "../data/blog";

/** One post: its header from the front matter, then the Markdoc body. */
export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <NotFound />;

  // `posts` is newest first, so the one after this is older.
  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
      <Link
        href={blogPath()}
        className="inline-flex items-center gap-1 text-sm text-ink-tertiary hover:text-ink-primary transition-colors mb-6"
      >
        ← All posts
      </Link>

      <header className="mb-8 pb-8 border-b border-line">
        <div className="mb-3">
          <AudienceBadge audience={post.audience} />
        </div>
        <h1 className="t-display mb-3">{post.title}</h1>
        {post.description && (
          <p className="t-body text-lg mb-4">{post.description}</p>
        )}
        <PostMeta post={post} />
      </header>

      <MarkdocRenderer content={post.body} />

      {(newer || older) && (
        <nav
          aria-label="More posts"
          className="mt-12 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {older ? (
            <NeighbourLink label="Previous" title={older.title} slug={older.slug} />
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && (
            <NeighbourLink label="Next" title={newer.title} slug={newer.slug} alignEnd />
          )}
        </nav>
      )}
    </article>
  );
}

function NeighbourLink({
  label,
  title,
  slug,
  alignEnd = false,
}: {
  label: string;
  title: string;
  slug: string;
  alignEnd?: boolean;
}) {
  return (
    <Link
      href={blogPath(slug)}
      className={`block rounded-xl border border-line p-4 hover:border-line-strong hover:bg-canvas-subtle transition-colors ${
        alignEnd ? "sm:text-right" : ""
      }`}
    >
      <span className="t-caption block mb-1">
        {alignEnd ? `${label} →` : `← ${label}`}
      </span>
      <span className="t-subheading">{title}</span>
    </Link>
  );
}
