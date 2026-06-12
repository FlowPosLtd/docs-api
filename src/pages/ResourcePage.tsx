import { useState, useEffect, useRef, useCallback } from "react";
import type { Endpoint, HttpMethod } from "../types";
import { CodeExamples } from "../components/CodeExamples";
import { ApiExplorer } from "../components/ApiExplorer";
import { METHOD_PANEL_BADGE } from "../utils/method-colors";

function prefillFromParams(
  params: Endpoint["bodyParams"],
): Record<string, string> {
  const values: Record<string, string> = {};
  (params || []).forEach((p) => {
    if (p.example && p.type !== "object[]") values[p.name] = p.example;
  });
  return values;
}

interface RightPanelContentProps {
  endpoint: Endpoint;
  apiKey: string;
  baseUrl: string;
  showExplorer: boolean;
  setShowExplorer: (v: boolean) => void;
}

export function RightPanelContent({
  endpoint,
  apiKey,
  baseUrl,
  showExplorer,
  setShowExplorer,
}: RightPanelContentProps) {
  const [pathValues, setPathValues] = useState<Record<string, string>>(() =>
    prefillFromParams(endpoint.pathParams),
  );
  const [queryValues, setQueryValues] = useState<Record<string, string>>(() =>
    prefillFromParams(endpoint.queryParams),
  );
  const [bodyValues, setBodyValues] = useState<Record<string, string>>(() =>
    prefillFromParams(endpoint.bodyParams),
  );

  useEffect(() => {
    setPathValues(prefillFromParams(endpoint.pathParams));
    setQueryValues(prefillFromParams(endpoint.queryParams));
    setBodyValues(prefillFromParams(endpoint.bodyParams));
  }, [endpoint.id]);

  const onPathChange = useCallback((k: string, v: string) =>
    setPathValues((p) => ({ ...p, [k]: v })), []);
  const onQueryChange = useCallback((k: string, v: string) =>
    setQueryValues((p) => ({ ...p, [k]: v })), []);
  const onBodyChange = useCallback((k: string, v: string) =>
    setBodyValues((p) => ({ ...p, [k]: v })), []);
  const [shown, setShown] = useState(endpoint);
  const [hidden, setHidden] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (shown.id === endpoint.id) return;

    if (timerRef.current !== undefined) clearTimeout(timerRef.current);

    setHidden(true);

    timerRef.current = setTimeout(() => {
      setShown(endpoint);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHidden(false);
        });
      });
    }, 140);

    return () => clearTimeout(timerRef.current);
  }, [endpoint.id]);

  const contentCls = [
    "flex-1 overflow-y-auto flex flex-col",
    "transition-[opacity,transform] duration-[160ms] ease-in-out",
    hidden
      ? "opacity-0 translate-y-2 pointer-events-none"
      : "opacity-100 translate-y-0",
  ].join(" ");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="px-4 py-3 border-b border-pitch-600 bg-pitch-800 shrink-0">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase font-mono px-1.5 py-0.5 rounded ${METHOD_PANEL_BADGE[endpoint.method as HttpMethod]}`}
          >
            {endpoint.method}
          </span>
          <code className="text-xs font-mono text-pitch-300 truncate">
            {endpoint.path}
          </code>
        </div>
      </div>

      {showExplorer ? (
        <div className={contentCls}>
          <ApiExplorer
            endpoint={shown}
            apiKey={apiKey}
            baseUrl={baseUrl}
            pathValues={pathValues}
            queryValues={queryValues}
            bodyValues={bodyValues}
            onPathChange={onPathChange}
            onQueryChange={onQueryChange}
            onBodyChange={onBodyChange}
          />
          <div className="px-4 pb-4 mt-auto shrink-0">
            <button
              onClick={() => setShowExplorer(false)}
              className="cursor-pointer text-xs text-pitch-400 hover:text-pitch-200 transition-colors"
            >
              ← Back to code examples
            </button>
          </div>
        </div>
      ) : (
        <div className={contentCls}>
          <CodeExamples
            endpoint={shown}
            apiKey={apiKey}
            pathValues={pathValues}
            queryValues={queryValues}
            bodyValues={bodyValues}
            onTryIt={() => setShowExplorer(true)}
            isTryItOpen={false}
          />
        </div>
      )}
    </div>
  );
}
