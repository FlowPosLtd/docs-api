import type { Param } from "../types";

interface ParamTableProps {
  title: string;
  params: Param[];
}

export function ParamTable({ title, params }: ParamTableProps) {
  if (!params.length) return null;
  return (
    <div className="mb-6">
      <h4 className="t-caption mb-3">{title}</h4>
      <div className="border border-line rounded-lg overflow-hidden">
        {params.map((param, i) => (
          <div
            key={param.name}
            className={`flex flex-col sm:flex-row gap-2 px-4 py-3 bg-canvas ${
              i > 0 ? "border-t border-line-subtle" : ""
            }`}
          >
            <div className="sm:w-48 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <code className="text-[13px] font-mono font-semibold text-ink-primary">
                  {param.name}
                </code>
                {param.required ? (
                  <span className="text-[10px] font-semibold text-destroy uppercase tracking-wide">
                    required
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-ink-tertiary uppercase tracking-wide">
                    optional
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[11px] text-ink-tertiary font-mono">
                  {param.type}
                </span>
                {param.default && (
                  <span className="text-[10px] text-ink-tertiary">
                    · default:{" "}
                    <code className="font-mono">{param.default}</code>
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="t-body-sm">{param.description}</p>
              {param.enum && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {param.enum.map((v) => (
                    <code
                      key={v}
                      className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-canvas-subtle border border-line text-ink-secondary"
                    >
                      {v}
                    </code>
                  ))}
                </div>
              )}
              {param.example && (
                <p className="mt-1 text-[11px] text-ink-tertiary">
                  Example: <code className="font-mono">{param.example}</code>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
