import { memo } from "react";

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

export const ResponseShape = memo(function ResponseShape({ data, description }: ResponseShapeProps) {
  return (
    <div className="mb-6">
      <h4 className="t-caption mb-3">Response</h4>
      {description && <p className="t-body-sm mb-3">{description}</p>}
      <div className="bg-pitch-900 rounded-lg overflow-hidden border border-pitch-600">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
          <span className="w-2 h-2 rounded-full bg-get"></span>
          <span className="text-xs text-pitch-300 font-mono">200 OK</span>
        </div>
        <pre className="p-4 text-sm font-mono overflow-x-auto text-pitch-200 leading-6">
          <JsonValue value={data} />
        </pre>
      </div>
    </div>
  );
});
