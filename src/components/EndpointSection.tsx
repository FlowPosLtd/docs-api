import { memo, useCallback } from "react";
import { MethodBadge } from "./MethodBadge";
import { ParamTable } from "./ParamTable";
import { ResponseShape } from "./ResponseShape";
import type { Endpoint, HttpMethod } from "../types";

interface EndpointSectionProps {
  endpoint: Endpoint;
  onFocus: (id: string) => void;
}

export const EndpointSection = memo(function EndpointSection({ endpoint, onFocus }: EndpointSectionProps) {
  const handleClick = useCallback(() => onFocus(endpoint.id), [onFocus, endpoint.id]);
  return (
    <section id={endpoint.id} onClick={handleClick} className="mb-12 scroll-mt-6">
      <div className="flex items-start gap-3 mb-4">
        <MethodBadge method={endpoint.method as HttpMethod} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="t-heading">{endpoint.title}</h3>
          <code className="mt-0.5 text-sm font-mono text-ink-tertiary break-all">
            {endpoint.path}
          </code>
        </div>
      </div>

      <p className="t-body mb-6">{endpoint.description}</p>

      {endpoint.notes && endpoint.notes.length > 0 && (
        <div className="mb-6 flex flex-col gap-2">
          {endpoint.notes.map((note, i) => (
            <div
              key={i}
              className="flex items-start gap-2 px-4 py-3 rounded-lg bg-accent-faint border border-accent-muted t-body-sm text-accent-ink"
            >
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {note}
            </div>
          ))}
        </div>
      )}

      {endpoint.pathParams && endpoint.pathParams.length > 0 && (
        <ParamTable title="Path Parameters" params={endpoint.pathParams} />
      )}
      {endpoint.queryParams && endpoint.queryParams.length > 0 && (
        <ParamTable title="Query Parameters" params={endpoint.queryParams} />
      )}
      {endpoint.bodyParams && endpoint.bodyParams.length > 0 && (
        <ParamTable title="Body Parameters" params={endpoint.bodyParams} />
      )}

      {endpoint.response && (
        <ResponseShape
          data={endpoint.response}
          description={endpoint.responseDescription}
        />
      )}
    </section>
  );
});
