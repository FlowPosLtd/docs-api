import { useEffect, useRef } from "react";
import { EndpointSection } from "./EndpointSection";
import type { Endpoint } from "../types";

interface ObservedEndpointSectionProps {
  endpoint: Endpoint;
  isActive: boolean;
  onFocus: () => void;
}

export function ObservedEndpointSection({
  endpoint,
  isActive,
  onFocus,
}: ObservedEndpointSectionProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onFocus();
      },
      { threshold: 0.1, rootMargin: "-60px 0px -40% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [endpoint.id, onFocus]);

  return (
    <div id={endpoint.id} ref={elRef} className="scroll-mt-6">
      <EndpointSection
        endpoint={endpoint}
        isActive={isActive}
        onFocus={onFocus}
      />
    </div>
  );
}
