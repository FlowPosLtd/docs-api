import { Link } from "../utils/use-router";
import { apiPath, blogPath } from "../utils/paths";
import { resources } from "../data/resources";
import { posts } from "../data/blog";
import { PostCard } from "../components/PostCard";
import { WriteForTheBlog } from "../components/WriteForTheBlog";

const endpointCount = resources.reduce((n, r) => n + r.endpoints.length, 0);

const GUIDE_LINKS = [
  { label: "Authentication", href: apiPath("authentication") },
  { label: "Orders", href: apiPath("orders") },
  { label: "Products", href: apiPath("products") },
  { label: "Webhooks", href: apiPath("webhooks") },
  { label: "Errors", href: apiPath("errors") },
];

/**
 * The front door: what's here, a way into the developer guide and the blog,
 * and the newest posts.
 */
export function LandingPage() {
  const latest = posts.slice(0, 3);

  return (
    <div>
      <section className="border-b border-line bg-canvas-subtle">
        <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
          <h1 className="t-display text-4xl sm:text-5xl max-w-3xl mb-5">
            Run your business on FlowPOS, and build on it.
          </h1>
          <p className="t-body text-lg max-w-2xl mb-8">
            Guides and news for the people using FlowPOS every day, and a
            complete API reference for the developers connecting it to
            everything else.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={apiPath()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Read the developer guide
            </Link>
            <Link
              href={blogPath()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-canvas px-5 py-2.5 text-sm font-semibold text-ink-primary hover:bg-canvas-inset transition-colors"
            >
              Browse the blog
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col rounded-xl border border-line p-6">
            <h2 className="t-title mb-2">Developer guide</h2>
            <p className="t-body-sm mb-5">
              {resources.length} resources and {endpointCount} endpoints, with
              request examples and a live API explorer. Authenticate with an API
              key and start making calls.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {GUIDE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1 rounded border border-line text-xs font-medium text-ink-secondary hover:text-accent-ink hover:border-accent-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={apiPath()}
              className="mt-auto text-sm font-semibold text-accent-ink hover:underline"
            >
              Open the API reference
            </Link>
          </div>

          <div className="flex flex-col rounded-xl border border-line p-6">
            <h2 className="t-title mb-2">Blog</h2>
            <p className="t-body-sm mb-6">
              What's new in FlowPOS, step-by-step how-tos for you and your
              team, and notes on API changes. Every post is written by the
              people who build FlowPOS.
            </p>
            <Link
              href={blogPath()}
              className="mt-auto text-sm font-semibold text-accent-ink hover:underline"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex items-end justify-between gap-4 mb-5">
          <h2 className="t-heading">Latest from the blog</h2>
          {posts.length > 3 && (
            <Link
              href={blogPath()}
              className="text-sm font-medium text-accent-ink hover:underline shrink-0"
            >
              All posts
            </Link>
          )}
        </div>

        {latest.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-6 rounded-xl border border-dashed border-line">
            <p className="t-subheading mb-1">No posts yet</p>
            <p className="t-body-sm">The first one is on its way.</p>
          </div>
        )}

        <WriteForTheBlog className="mt-6" />
      </section>
    </div>
  );
}
