import { useState, useEffect, useRef } from "react";
import type { Endpoint, HttpMethod } from "../types";
import { CodeExamples } from "../components/CodeExamples";
import { ApiExplorer } from "../components/ApiExplorer";
import { METHOD_PANEL_BADGE } from "../utils/method-colors";

interface RightPanelContentProps {
  endpoint: Endpoint;
  apiKey: string;
  baseUrl: string;
  showExplorer: boolean;
  setShowExplorer: (v: boolean) => void;
  pathValues: Record<string, string>;
  queryValues: Record<string, string>;
  bodyValues: Record<string, string>;
  onPathChange: (k: string, v: string) => void;
  onQueryChange: (k: string, v: string) => void;
  onBodyChange: (k: string, v: string) => void;
}

export function RightPanelContent({
  endpoint,
  apiKey,
  baseUrl,
  showExplorer,
  setShowExplorer,
  pathValues,
  queryValues,
  bodyValues,
  onPathChange,
  onQueryChange,
  onBodyChange,
}: RightPanelContentProps) {
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
