import { authorLine, formatPostDate, type BlogPost } from "../data/blog";

/** Author, date, reading time and tags, on one line. */
export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="t-caption flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="text-ink-secondary">{authorLine(post)}</span>
      {post.date && (
        <>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </>
      )}
      <span aria-hidden>·</span>
      <span>{post.readingMinutes} min read</span>
      {post.tags.length > 0 && (
        <>
          <span aria-hidden>·</span>
          <span>{post.tags.map((t) => `#${t}`).join(" ")}</span>
        </>
      )}
    </p>
  );
}
