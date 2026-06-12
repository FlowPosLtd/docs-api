import { memo, useState } from "react";
import { stripStatus } from "../utils/strip-status";

interface ResponseShapeProps {
  data: unknown;
  description?: string;
}

const S = {
  bracket: { color: "var(--code-text)" },
  comma:   { color: "var(--code-muted)" },
  key:     { color: "var(--code-syn-key)" },
  str:     { color: "var(--code-syn-string)" },
  num:     { color: "var(--code-syn-number)" },
  bool:    { color: "var(--code-syn-bool)" },
  nil:     { color: "var(--code-syn-null)" },
} as const;

function JsonValue({ value }: { value: unknown }) {
  if (value === null) return <span style={S.nil}>null</span>;
  if (typeof value === "boolean")
    return <span style={S.bool}>{String(value)}</span>;
  if (typeof value === "number")
    return <span style={S.num}>{value}</span>;
  if (typeof value === "string")
    return <span style={S.str}>"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={S.bracket}>[]</span>;
    return (
      <span>
        <span style={S.bracket}>{"["}</span>
        <div className="ml-4">
          {value.map((item, i) => (
            <div key={i}>
              <JsonValue value={item} />
              {i < value.length - 1 && <span style={S.comma}>,</span>}
            </div>
          ))}
        </div>
        <span style={S.bracket}>{"]"}</span>
      </span>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span style={S.bracket}>{"{}"}</span>;
    return (
      <span>
        <span style={S.bracket}>{"{"}</span>
        <div className="ml-4">
          {entries.map(([k, v], i) => (
            <div key={k} className="leading-6">
              <span style={S.key}>"{k}"</span>
              <span style={S.comma}>: </span>
              <JsonValue value={v} />
              {i < entries.length - 1 && <span style={S.comma}>,</span>}
            </div>
          ))}
        </div>
        <span style={S.bracket}>{"}"}</span>
      </span>
    );
  }

  return <span style={S.bracket}>{String(value)}</span>;
}

const RESPONSE_PREVIEW_PX = 320;

export const ResponseShape = memo(function ResponseShape({ data, description }: ResponseShapeProps) {
  const [expanded, setExpanded] = useState(false);
  const cleaned = stripStatus(data);
  const jsonText = JSON.stringify(cleaned, null, 2);
  const lineCount = jsonText.split("\n").length;
  const needsCollapse = lineCount > 18;

  return (
    <div className="mb-6">
      <h4 className="t-caption mb-3">Response</h4>
      {description && <p className="t-body-sm mb-3">{description}</p>}
      <div className="bg-code rounded-lg overflow-hidden border border-code">
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-code bg-code-head">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-get"></span>
            <span className="text-xs text-code-muted font-mono">200 OK</span>
          </div>
          {needsCollapse && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="inline-flex items-center gap-1.5 text-xs text-code-dim hover:text-code transition-colors font-mono"
            >
              <span>{expanded ? "Collapse" : "Expand"}</span>
              <svg
                className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        <pre
          className="p-4 text-sm font-mono overflow-x-auto text-code leading-6"
          style={needsCollapse && !expanded
            ? { maxHeight: RESPONSE_PREVIEW_PX, overflowY: "auto" }
            : undefined}
        >
          <JsonValue value={cleaned} />
        </pre>
      </div>
    </div>
  );
});
