import { constantGroups } from "../data/constants-data";

export function ConstantsPage() {
  return (
    <div>
      <h1 className="t-title mb-1">Constants & Enums</h1>
      <p className="t-body-sm mb-2">
        Enumerated values used throughout the FlowPOS API
      </p>
      <p className="t-body mb-8">
        Many API fields accept or return a fixed set of string values. This page
        documents every enum and constant used by the FlowPOS API so you can
        implement the correct logic in your integration.
      </p>

      <div className="space-y-10">
        {constantGroups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-6">
            <h2 className="t-heading mb-1">{group.name}</h2>
            <p className="t-body-sm mb-4">{group.description}</p>

            <div className="border border-line rounded-lg overflow-hidden">
              <div className="grid grid-cols-[200px_1fr] t-caption px-4 py-2 bg-canvas-subtle border-b border-line">
                <span>Value</span>
                <span>Description</span>
              </div>
              {group.constants.map((c, i) => (
                <div
                  key={c.value}
                  className={`grid grid-cols-[200px_1fr] gap-4 items-start px-4 py-3 bg-canvas ${
                    i > 0 ? "border-t border-line-subtle" : ""
                  }`}
                >
                  <code className="font-mono text-xs font-semibold text-accent-ink bg-accent-faint px-2 py-1 rounded border border-accent-muted self-start">
                    {c.value}
                  </code>
                  <span className="t-body-sm">{c.description}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
