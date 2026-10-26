import { useSearchParams } from "react-router-dom";
import { Link } from "../utils/use-router";
import {
  AUDIENCE_LABELS,
  articles,
  type Article,
  type ArticleAudience,
} from "../data/articles";
import { AudienceBadge } from "../components/AudienceBadge";
import { ArticleMeta } from "../components/ArticleMeta";

const FILTERS: { value: ArticleAudience | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "businesses", label: AUDIENCE_LABELS.businesses },
  { value: "developers", label: AUDIENCE_LABELS.developers },
];

/**
 * Every article, newest first. The filter keeps "For everyone" articles in
 * both audiences, and lives in the URL (?for=developers) so it can be shared.
 */
export function ArticlesPage() {
  const [params, setParams] = useSearchParams();
  const filter = (params.get("for") as ArticleAudience | null) ?? "all";

  const shown = articles.filter(
    (a) => filter === "all" || a.audience === filter || a.audience === "everyone",
  );
  const [featured, ...rest] = shown;

  return (
    <div>
      <div className="mb-8">
        <h1 className="t-display mb-3">Articles</h1>
        <p className="t-body max-w-2xl">
          Product news and how-tos for running your business on FlowPOS, and
          guides and API changes for developers building on it.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Who the article is for"
        className="flex flex-wrap gap-2 mb-8"
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={active}
              onClick={() =>
                setParams(f.value === "all" ? {} : { for: f.value }, {
                  replace: true,
                })
              }
              className={`cursor-pointer px-3 py-1.5 rounded-full text-sm border transition-colors ${
                active
                  ? "bg-accent-faint border-accent-muted text-accent-ink font-medium"
                  : "border-line text-ink-secondary hover:text-ink-primary hover:border-line-strong"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-line">
          <p className="t-subheading mb-1">No articles yet</p>
          <p className="t-body-sm">Check back soon.</p>
        </div>
      ) : (
        <>
          <ArticleCard article={featured} featured />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {rest.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block rounded-xl border border-line bg-canvas hover:border-line-strong hover:bg-canvas-subtle transition-colors ${
        featured ? "p-6" : "p-5"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <AudienceBadge audience={article.audience} />
        {featured && (
          <span className="text-xs font-medium text-ink-tertiary">Latest</span>
        )}
      </div>
      <h2
        className={`${featured ? "t-title" : "t-subheading"} mb-2 group-hover:text-accent-ink transition-colors`}
      >
        {article.title}
      </h2>
      {article.description && (
        <p className={`${featured ? "t-body" : "t-body-sm"} mb-4`}>
          {article.description}
        </p>
      )}
      <ArticleMeta article={article} />
    </Link>
  );
}
