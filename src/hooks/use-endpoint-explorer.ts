import { useState, useEffect, useCallback, useRef } from "react";
import type { Endpoint } from "../types";

function prefillFromParams(
  params: Endpoint["bodyParams"],
): Record<string, string> {
  const values: Record<string, string> = {};
  (params || []).forEach((p) => {
    if (p.example && p.type !== "object[]") values[p.name] = p.example;
  });
  return values;
}

export function useEndpointExplorer(path: string) {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint | null>(null);
  const [showExplorer, setShowExplorer] = useState(false);
  const [pathValues, setPathValues] = useState<Record<string, string>>({});
  const [queryValues, setQueryValues] = useState<Record<string, string>>({});
  const [bodyValues, setBodyValues] = useState<Record<string, string>>({});

  const activeEndpointIdRef = useRef<string | null>(null);

  const handleEndpointFocus = useCallback((ep: Endpoint) => {
    if (activeEndpointIdRef.current !== ep.id) {
      activeEndpointIdRef.current = ep.id;
      setShowExplorer(false);

      setPathValues(prefillFromParams(ep.pathParams));
      setQueryValues(prefillFromParams(ep.queryParams));
      setBodyValues(prefillFromParams(ep.bodyParams));
    }
    setActiveEndpoint(ep);
  }, []);

  useEffect(() => {
    const segment = path.replace(/^\//, "").split("/")[0];
    if (["", "authentication", "errors", "constants"].includes(segment)) {
      setActiveEndpoint(null);
      activeEndpointIdRef.current = null;
    }
  }, [path]);

  return {
    activeEndpoint,
    showExplorer,
    setShowExplorer,
    pathValues,
    queryValues,
    bodyValues,
    onPathChange: (k: string, v: string) =>
      setPathValues((p) => ({ ...p, [k]: v })),
    onQueryChange: (k: string, v: string) =>
      setQueryValues((p) => ({ ...p, [k]: v })),
    onBodyChange: (k: string, v: string) =>
      setBodyValues((p) => ({ ...p, [k]: v })),
    handleEndpointFocus,
  };
}
