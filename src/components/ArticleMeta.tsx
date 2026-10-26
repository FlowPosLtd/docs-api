import { formatArticleDate, type Article } from "../data/articles";

/** Date, reading time and tags, on one line. */
export function ArticleMeta({ article }: { article: Article }) {
  return (
    <p className="t-caption flex flex-wrap items-center gap-x-2 gap-y-1">
      {article.date && (
        <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
      )}
      <span aria-hidden>·</span>
      <span>{article.readingMinutes} min read</span>
      {article.tags.length > 0 && (
        <>
          <span aria-hidden>·</span>
          <span>{article.tags.map((t) => `#${t}`).join(" ")}</span>
        </>
      )}
    </p>
  );
}
