import { memo, useState } from "react";

interface ResponseShapeProps {
  data: unknown;
  description?: string;
}

function JsonValue({ value }: { value: unknown }) {
  if (value === null) return <span className="text-syn-null">null</span>;
  if (typeof value === "boolean")
    return <span className="text-syn-boolean">{String(value)}</span>;
  if (typeof value === "number")
    return <span className="text-syn-number">{value}</span>;
  if (typeof value === "string")
    return <span className="text-syn-string">"{value}"</span>;

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-pitch-200">[]</span>;
    return (
      <span>
        <span className="text-pitch-200">{"["}</span>
        <div className="ml-4">
          {value.map((item, i) => (
            <div key={i}>
              <JsonValue value={item} />
              {i < value.length - 1 && (
                <span className="text-pitch-400">,</span>
              )}
            </div>
          ))}
        </div>
        <span className="text-pitch-200">{"]"}</span>
      </span>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0)
      return <span className="text-pitch-200">{"{}"}</span>;
    return (
      <span>
        <span className="text-pitch-200">{"{"}</span>
        <div className="ml-4">
          {entries.map(([k, v], i) => (
            <div key={k} className="leading-6">
              <span className="text-syn-key">"{k}"</span>
              <span className="text-pitch-400">: </span>
              <JsonValue value={v} />
              {i < entries.length - 1 && (
                <span className="text-pitch-400">,</span>
              )}
            </div>
          ))}
        </div>
        <span className="text-pitch-200">{"}"}</span>
      </span>
    );
  }

  return <span className="text-pitch-200">{String(value)}</span>;
}

const RESPONSE_PREVIEW_PX = 320;

export const ResponseShape = memo(function ResponseShape({ data, description }: ResponseShapeProps) {
  const [expanded, setExpanded] = useState(false);
  const jsonText = JSON.stringify(data, null, 2);
  const lineCount = jsonText.split("\n").length;
  const needsCollapse = lineCount > 18;

  return (
    <div className="mb-6">
      <h4 className="t-caption mb-3">Response</h4>
      {description && <p className="t-body-sm mb-3">{description}</p>}
      <div className="bg-pitch-900 rounded-lg overflow-hidden border border-pitch-600">
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-pitch-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-get"></span>
            <span className="text-xs text-pitch-300 font-mono">200 OK</span>
          </div>
          {needsCollapse && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="inline-flex items-center gap-1.5 text-xs text-pitch-400 hover:text-pitch-200 transition-colors font-mono"
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
          className="p-4 text-sm font-mono overflow-x-auto text-pitch-200 leading-6"
          style={needsCollapse && !expanded
            ? { maxHeight: RESPONSE_PREVIEW_PX, overflowY: "auto" }
            : undefined}
        >
          <JsonValue value={data} />
        </pre>
      </div>
    </div>
  );
});
