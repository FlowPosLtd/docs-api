import { useState, useCallback, useEffect, useRef, memo } from "react";
import { EndpointSection } from "../components/EndpointSection";
import { ParamTable } from "../components/ParamTable";
import { METHOD_TEXT } from "../utils/method-colors";
import type { Resource, Endpoint, HttpMethod } from "../types";

const NavButton = memo(function NavButton({
  ep,
  isActive,
  onFocus,
}: {
  ep: Endpoint;
  isActive: boolean;
  onFocus: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onFocus(ep.id);
    document.getElementById(ep.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [onFocus, ep.id]);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors ${
        isActive
          ? "border-accent-muted bg-accent-faint text-accent-ink"
          : "border-line text-ink-tertiary hover:border-line-strong hover:text-ink-secondary"
      }`}
    >
      <span className={`text-[9px] font-bold uppercase font-mono ${METHOD_TEXT[ep.method as HttpMethod]}`}>
        {ep.method}
      </span>
      <span>{ep.title}</span>
    </button>
  );
});

interface ResourcePageContentProps {
  resource: Resource;
  onEndpointFocus: (ep: Endpoint) => void;
}


export const ResourcePageContent = memo(function ResourcePageContent({
  resource,
  onEndpointFocus,
}: ResourcePageContentProps) {
  const [activeId, setActiveId] = useState(resource.endpoints[0]?.id ?? "");

  const activeIdRef  = useRef(resource.endpoints[0]?.id ?? "");
  const sectionRefs  = useRef<Map<string, HTMLDivElement>>(new Map());
  const visibleMap   = useRef<Map<string, DOMRectReadOnly>>(new Map());
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Always up-to-date without being a dep of the IntersectionObserver effect
  const resourceRef      = useRef(resource);
  const onEndpointFocusRef = useRef(onEndpointFocus);
  resourceRef.current      = resource;
  onEndpointFocusRef.current = onEndpointFocus;

  const handleFocus = useCallback((id: string) => {
    if (activeIdRef.current === id) return;
    activeIdRef.current = id;
    setActiveId(id);
    const ep = resourceRef.current.endpoints.find((e) => e.id === id);
    if (ep) onEndpointFocusRef.current(ep);
  }, []); // stable forever — reads latest values via refs

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
        if (score < bestScore) { bestScore = score; bestId = id; }
      });
      if (bestId) handleFocus(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMap.current.set(entry.target.getAttribute("data-ep-id")!, entry.boundingClientRect);
          } else {
            visibleMap.current.delete(entry.target.getAttribute("data-ep-id")!);
          }
        });
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(decide, 120);
      },
      { threshold: 0, rootMargin: "-60px 0px -35% 0px" },
    );

    sectionRefs.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(debounceTimer.current);
      visibleMap.current.clear();
    };
  }, [resource.id]); // only re-runs on resource change, not on every handleFocus recreation

  const setRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const id = el.getAttribute("data-ep-id")!;
    sectionRefs.current.set(id, el);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="t-title mb-2">{resource.name}</h1>
        <p className="t-body">{resource.description}</p>
      </div>

      {resource.attributes && resource.attributes.length > 0 && (
        <div className="mb-10 pb-10 border-b border-line">
          <h2 className="t-subheading text-ink-tertiary uppercase tracking-widest mb-1">
            The {resource.objectName ?? resource.name.toLowerCase()} object
          </h2>
          <ParamTable title="Attributes" params={resource.attributes} showBadges={false} collapsible />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {resource.endpoints.map((ep) => (
          <NavButton
            key={ep.id}
            ep={ep}
            isActive={activeId === ep.id}
            onFocus={handleFocus}
          />
        ))}
      </div>

      {resource.endpoints.map((ep, i) => (
        <div key={ep.id} ref={setRef} data-ep-id={ep.id}>
          {i > 0 && <hr className="border-line mb-12" />}
          <EndpointSection
            endpoint={ep}
            onFocus={handleFocus}
          />
        </div>
      ))}
    </div>
  );
});
