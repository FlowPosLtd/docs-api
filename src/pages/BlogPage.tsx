import { useSearchParams } from "react-router-dom";
import { AUDIENCE_LABELS, posts, type PostAudience } from "../data/blog";
import { PostCard } from "../components/PostCard";
import { WriteForTheBlog } from "../components/WriteForTheBlog";

const FILTERS: { value: PostAudience | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "businesses", label: AUDIENCE_LABELS.businesses },
  { value: "developers", label: AUDIENCE_LABELS.developers },
];

/**
 * Every post, newest first. The filter keeps "For everyone" posts in both
 * audiences, and lives in the URL (?for=developers) so it can be shared.
 */
export function BlogPage() {
  const [params, setParams] = useSearchParams();
  const filter = (params.get("for") as PostAudience | null) ?? "all";

  const shown = posts.filter(
    (p) => filter === "all" || p.audience === filter || p.audience === "everyone",
  );
  const [featured, ...rest] = shown;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16">
      <div className="mb-8">
        <h1 className="t-display mb-3">Blog</h1>
        <p className="t-body max-w-2xl">
          Product news and how-tos for running your business on FlowPOS, and
          guides and API changes for developers building on it.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Who the post is for"
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
        <div className="text-center py-16 px-6 rounded-xl border border-dashed border-line">
          <p className="t-subheading mb-1">No posts yet</p>
          <p className="t-body-sm">Check back soon.</p>
        </div>
      ) : (
        <>
          <PostCard post={featured} featured />
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}

      <WriteForTheBlog className="mt-12" />
    </div>
  );
}
