import { useState, useCallback, useEffect, useRef } from "react";
import { EndpointSection } from "../components/EndpointSection";
import { METHOD_TEXT } from "../utils/method-colors";
import type { Resource, Endpoint, HttpMethod } from "../types";

interface ResourcePageContentProps {
  resource: Resource;
  onEndpointFocus: (ep: Endpoint) => void;
}

export function ResourcePageContent({
  resource,
  onEndpointFocus,
}: ResourcePageContentProps) {
  const [activeId, setActiveId] = useState(resource.endpoints[0]?.id ?? "");

  const activeIdRef = useRef(resource.endpoints[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const visibleMap = useRef<Map<string, DOMRectReadOnly>>(new Map());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleFocus = useCallback(
    (id: string) => {
      if (activeIdRef.current === id) return;
      activeIdRef.current = id;
      setActiveId(id);
      const ep = resource.endpoints.find((e) => e.id === id);
      if (ep) onEndpointFocus(ep);
    },
    [resource.id, onEndpointFocus],
  );

  useEffect(() => {
    if (resource.endpoints.length > 0) {
      handleFocus(resource.endpoints[0].id);
    }
  }, [resource.id]);

  useEffect(() => {
    visibleMap.current.clear();

    const decide = () => {
      if (visibleMap.current.size === 0) return;

      let bestId: string | null = null;
      let bestScore = Infinity;

      visibleMap.current.forEach((rect, id) => {
        const score = rect.top >= 0 ? rect.top : rect.top + 100_000;
        if (score < bestScore) {
          bestScore = score;
          bestId = id;
        }
      });

      if (bestId) handleFocus(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.current.set(
              entry.target.getAttribute("data-ep-id")!,
              entry.boundingClientRect,
            );
          } else {
            visibleMap.current.delete(entry.target.getAttribute("data-ep-id")!);
          }
        });

        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(decide, 60);
      },
      { threshold: 0, rootMargin: "-60px 0px -35% 0px" },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer.current);
      visibleMap.current.clear();
    };
  }, [resource.id, handleFocus]);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current.set(id, el);
    else sectionRefs.current.delete(id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="t-title mb-2">{resource.name}</h1>
        <p className="t-body">{resource.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {resource.endpoints.map((ep) => (
          <button
            key={ep.id}
            onClick={() => {
              handleFocus(ep.id);
              document
                .getElementById(ep.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors ${
              activeId === ep.id
                ? "border-accent-muted bg-accent-faint text-accent-ink"
                : "border-line text-ink-tertiary hover:border-line-strong hover:text-ink-secondary"
            }`}
          >
            <span
              className={`text-[9px] font-bold uppercase font-mono ${METHOD_TEXT[ep.method as HttpMethod]}`}
            >
              {ep.method}
            </span>
            <span>{ep.title}</span>
          </button>
        ))}
      </div>

      {resource.endpoints.map((ep, i) => (
        <div key={ep.id} ref={setRef(ep.id)} data-ep-id={ep.id}>
          {i > 0 && <hr className="border-line mb-12" />}
          <EndpointSection
            endpoint={ep}
            isActive={activeId === ep.id}
            onFocus={() => handleFocus(ep.id)}
          />
        </div>
      ))}
    </div>
  );
}
