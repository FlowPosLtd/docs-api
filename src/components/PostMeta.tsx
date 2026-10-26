import { authorLine, formatPostDate, type BlogPost } from "../data/blog";

/** Author, date and reading time, on one line. */
export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-tertiary">
      <span className="text-ink-secondary">{authorLine(post)}</span>
      {post.date && (
        <>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </>
      )}
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}
