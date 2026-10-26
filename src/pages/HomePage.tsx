import { Link } from "../utils/use-router";
import { resources } from "../data/resources";
import { resourceGroups } from "../data/resource-groups";
import { apiPath, blogPath } from "../utils/paths";

const BASE_URL = "https://api.flowpos.co.uk/v1";

const endpointCount = resources.reduce((n, r) => n + r.endpoints.length, 0);

const GUIDES = [
  {
    title: "Authentication",
    desc: "Send your API key in the x-api-key header on every request.",
    href: apiPath("authentication"),
  },
  {
    title: "Errors",
    desc: "Status codes and the shape of every error response.",
    href: apiPath("errors"),
  },
  {
    title: "Webhooks",
    desc: "Get notified when orders, payments and products change.",
    href: apiPath("webhooks"),
  },
  {
    title: "Developer blog",
    desc: "Guides and walkthroughs: payments, webhooks and more.",
    href: `${blogPath()}?for=developers`,
  },
];

/** The API reference's front page: where to start, and a map of the API. */
export function HomePage() {
  return (
    <div>
      <div className="mb-10">
        <p className="t-caption mb-3 text-accent-ink">API reference</p>
        <h1 className="t-display mb-4">FlowPOS API</h1>
        <p className="t-body max-w-2xl">
          Manage customers, orders, products, payments and every other part of
          your FlowPOS account from your own code. The API is organised around
          REST: predictable resource URLs, standard HTTP verbs, and JSON in and
          out.
        </p>
      </div>

      <dl className="mb-10 grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] rounded-xl border border-line overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-line">
        <div className="p-4">
          <dt className="t-caption mb-1">Base URL</dt>
          <dd className="font-mono text-sm text-ink-primary break-all">{BASE_URL}</dd>
        </div>
        <div className="p-4">
          <dt className="t-caption mb-1">Authentication</dt>
          <dd className="text-sm text-ink-primary">
            <code className="t-code">x-api-key</code> header
          </dd>
        </div>
        <div className="p-4">
          <dt className="t-caption mb-1">Format</dt>
          <dd className="text-sm text-ink-primary">
            JSON · {resources.length} resources · {endpointCount} endpoints
          </dd>
        </div>
      </dl>

      <section className="mb-12">
        <h2 className="t-heading mb-4">Quick start</h2>
        <ol className="space-y-5">
          <Step n={1} title="Create an API key">
            In your FlowPOS dashboard go to <strong>Settings → API keys</strong>{" "}
            and create a key with only the permissions your integration needs.
          </Step>
          <Step n={2} title="Send it with every request">
            Put the key in the <code className="t-code">x-api-key</code> header.
            There's no login step or token exchange.
          </Step>
          <Step n={3} title="Make your first call">
            <pre className="mt-2 rounded-lg border border-code bg-code p-4 font-mono text-xs leading-relaxed text-code overflow-x-auto">
              {`curl ${BASE_URL}/customers \\\n  -H 'x-api-key: your_api_key_here'`}
            </pre>
          </Step>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="t-heading mb-4">Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-xl border border-line p-4 hover:border-accent-border hover:bg-accent-faint transition-colors"
            >
              <p className="t-subheading mb-1 group-hover:text-accent-ink transition-colors">
                {guide.title} →
              </p>
              <p className="t-body-sm">{guide.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="t-heading mb-4">Explore the API</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {resourceGroups.map((group) => {
            const groupResources = group.ids
              .map((id) => resources.find((r) => r.id === id))
              .filter((r): r is (typeof resources)[number] => r !== undefined);
            if (groupResources.length === 0) return null;
            return (
              <div key={group.label}>
                <p className="t-nav-heading mb-2">{group.label}</p>
                <ul className="space-y-1">
                  {groupResources.map((resource) => (
                    <li key={resource.id}>
                      <Link
                        href={apiPath(resource.id)}
                        className="group flex items-baseline justify-between gap-3 py-1 text-sm text-ink-secondary hover:text-accent-ink transition-colors"
                      >
                        <span>{resource.name}</span>
                        <span className="text-xs text-ink-tertiary tabular-nums">
                          {resource.endpoints.length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="w-7 h-7 rounded-full bg-accent text-white text-xs flex items-center justify-center font-semibold shrink-0">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="t-subheading mb-1">{title}</p>
        <div className="t-body-sm">{children}</div>
      </div>
    </li>
  );
}
