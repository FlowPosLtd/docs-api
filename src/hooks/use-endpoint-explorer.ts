import { useState, useEffect, useCallback, useRef } from "react";
import type { Endpoint } from "../types";

export function useEndpointExplorer(path: string) {
  const [activeEndpoint, setActiveEndpoint] = useState<Endpoint | null>(null);
  const [showExplorer, setShowExplorer] = useState(false);

  const activeEndpointIdRef = useRef<string | null>(null);

  const handleEndpointFocus = useCallback((ep: Endpoint) => {
    if (activeEndpointIdRef.current !== ep.id) {
      activeEndpointIdRef.current = ep.id;
      setShowExplorer(false);
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
    handleEndpointFocus,
  };
}
