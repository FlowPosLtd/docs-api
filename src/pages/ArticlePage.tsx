import { useParams } from "react-router-dom";
import { Link } from "../utils/use-router";
import { MarkdocRenderer } from "../components/MarkdocRenderer";
import { AudienceBadge } from "../components/AudienceBadge";
import { articles, getArticle } from "../data/articles";
import { ArticleMeta } from "../components/ArticleMeta";

/** One article: its header from the front matter, then the Markdoc body. */
export function ArticlePage({ notFound }: { notFound: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;
  if (!article) return <>{notFound}</>;

  // `articles` is newest first, so the one after this is older.
  const index = articles.indexOf(article);
  const newer = articles[index - 1];
  const older = articles[index + 1];

  return (
    <article>
      <Link
        href="/articles"
        className="inline-flex items-center gap-1 text-sm text-ink-tertiary hover:text-ink-primary transition-colors mb-6"
      >
        ← All articles
      </Link>

      <header className="mb-8 pb-8 border-b border-line">
        <div className="mb-3">
          <AudienceBadge audience={article.audience} />
        </div>
        <h1 className="t-display mb-3">{article.title}</h1>
        {article.description && (
          <p className="t-body text-lg mb-4">{article.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-2">
          {article.author && (
            <>
              <span className="t-caption font-medium text-ink-secondary">
                {article.author}
              </span>
              <span aria-hidden className="t-caption">
                ·
              </span>
            </>
          )}
          <ArticleMeta article={article} />
        </div>
      </header>

      <MarkdocRenderer content={article.body} />

      {(newer || older) && (
        <nav
          aria-label="More articles"
          className="mt-12 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {older ? (
            <NeighbourLink label="Previous" title={older.title} slug={older.slug} />
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && (
            <NeighbourLink
              label="Next"
              title={newer.title}
              slug={newer.slug}
              alignEnd
            />
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
      href={`/articles/${slug}`}
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
