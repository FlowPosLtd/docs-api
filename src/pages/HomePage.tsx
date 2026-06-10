import { Link } from "../utils/use-router";
import { resources } from "../data/resources";

export function HomePage() {
  return (
    <div>
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-faint border border-accent-muted text-accent-ink text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          REST API v1
        </div>
        <h1 className="t-display mb-4">FlowPOS API Reference</h1>
        <p className="t-body max-w-2xl">
          The FlowPOS API lets you programmatically manage customers, orders,
          products, payments, and every other part of your FlowPOS account. It's
          organised around REST principles, all requests use standard HTTP
          verbs, return JSON, and use predictable resource-oriented URLs.
        </p>
      </div>

      <div className="mb-10 p-5 rounded-xl border border-line bg-canvas-subtle">
        <h2 className="t-heading mb-3">Quick start</h2>
        <div className="space-y-3">
          {[
            {
              title: "Generate an API key",
              body: "Go to your FlowPOS Dashboard → Settings → API Keys and create a new key with the permissions you need.",
            },
            {
              title: "Authenticate your request",
              body: (
                <>
                  Pass your key in the <code className="t-code">x-api-key</code>{" "}
                  header on every request.
                </>
              ),
            },
            {
              title: "Make your first call",
              body: (
                <div className="mt-1 bg-pitch-900 rounded-lg p-3 font-mono text-xs text-pitch-200 overflow-x-auto border border-pitch-600">
                  curl -G https://api.flowpos.co.uk/v1/customers \<br />
                  &nbsp;&nbsp;-H 'x-api-key: your_api_key_here'
                </div>
              ),
            },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="t-subheading mb-0.5">{step.title}</p>
                <p className="t-body-sm">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="t-heading mb-4">Key concepts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "Authentication",
              desc: "All requests require x-api-key header",
              href: "/authentication",
            },
            {
              title: "Errors",
              desc: "Standard HTTP status codes + error shapes",
              href: "/errors",
            },
            {
              title: "Constants & Enums",
              desc: "Status values, types, and modes",
              href: "/constants",
            },
            {
              title: "Pagination",
              desc: "All list endpoints return paginated responses",
              href: "/customers",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 p-4 rounded-lg border border-line bg-canvas hover:border-accent-muted hover:bg-accent-faint transition-colors group"
            >
              <div>
                <p className="t-subheading group-hover:text-accent-ink transition-colors">
                  {item.title}
                </p>
                <p className="t-body-sm mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="t-heading mb-4">API Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {resources.map((resource) => (
            <Link
              key={resource.id}
              href={`/${resource.id}`}
              className="flex items-center justify-between p-3 rounded-lg border border-line bg-canvas hover:border-line-strong hover:bg-canvas-subtle transition-colors group"
            >
              <div>
                <p className="t-subheading group-hover:text-accent-ink transition-colors">
                  {resource.name}
                </p>
                <p className="t-body-sm mt-0.5">
                  {resource.endpoints.length} endpoint
                  {resource.endpoints.length !== 1 ? "s" : ""}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-ink-tertiary group-hover:text-accent transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
