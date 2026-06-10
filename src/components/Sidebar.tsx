import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "../utils/use-router";
import { MethodBadge } from "./MethodBadge";
import { resources } from "../data/resources";
import type { HttpMethod } from "../types";

interface SidebarProps {
  currentPath: string;
  onNavigate: () => void;
}

const topLinks = [
  { href: "/", label: "Getting Started" },
  { href: "/authentication", label: "Authentication" },
  { href: "/errors", label: "Errors" },
  { href: "/constants", label: "Constants & Enums" },
];

const resourceGroups = [
  {
    label: "CORE",
    ids: ["customers", "customer-groups", "orders", "products", "categories"],
  },
  {
    label: "PAYMENTS",
    ids: [
      "payments",
      "payment-links",
      "discounts",
      "subscriptions",
      "payouts",
      "payment-account",
      "payment-settings",
    ],
  },
  {
    label: "OPERATIONS",
    ids: [
      "inventory",
      "employees",
      "locations",
      "sections",
      "terminal-readers",
      "shipping-rates",
      "addon-groups",
      "attachments",
    ],
  },
  {
    label: "TEAM & ACCESS",
    ids: ["roles"],
  },
  {
    label: "SETTINGS",
    ids: ["business-settings", "domains"],
  },
  {
    label: "DEVELOPER",
    ids: ["webhooks", "api-keys"],
  },
];

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    resources.forEach((r) => {
      if (currentPath === `/${r.id}` || currentPath.startsWith(`/${r.id}/`)) {
        initial[r.id] = true;
      }
    });
    return initial;
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const isActive = (href: string) => currentPath === href;

  return (
    <nav className="h-full overflow-y-auto py-4">
      <div className="px-3 mb-6">
        {topLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
              isActive(link.href)
                ? "bg-accent-faint text-accent-ink font-medium border-accent-muted"
                : "text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {resourceGroups.map((group) => {
        const groupResources = resources.filter((r) =>
          group.ids.includes(r.id),
        );
        return (
          <div key={group.label} className="mb-4 px-3">
            <p className="px-3 mb-1 t-caption">{group.label}</p>
            {groupResources.map((resource) => {
              const isResourceActive =
                currentPath === `/${resource.id}` ||
                currentPath.startsWith(`/${resource.id}/`);
              const isOpen = expanded[resource.id] ?? isResourceActive;
              return (
                <div key={resource.id}>
                  <button
                    onClick={() => {
                      toggle(resource.id);
                      navigate(`/${resource.id}`);
                      onNavigate();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors text-left ${
                      isResourceActive
                        ? "text-ink-primary font-medium"
                        : "text-ink-secondary hover:text-ink-primary hover:bg-canvas-subtle"
                    }`}
                  >
                    <span>{resource.name}</span>
                    <svg
                      className={`w-3.5 h-3.5 text-ink-tertiary transition-transform ${isOpen ? "rotate-90" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="ml-3 mt-0.5 mb-1 border-l border-line pl-2">
                      {resource.endpoints.map((ep) => (
                        <button
                          key={ep.id}
                          onClick={() => {
                            navigate(`/${resource.id}`);
                            onNavigate();
                            setTimeout(() => {
                              document.getElementById(ep.id)?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }, 50);
                          }}
                          className="cursor-pointer w-full flex items-center gap-2 px-2 py-1 rounded text-xs text-ink-tertiary hover:text-ink-primary hover:bg-canvas-subtle transition-colors text-left"
                        >
                          <MethodBadge
                            method={ep.method as HttpMethod}
                            size="sm"
                          />
                          <span className="truncate">{ep.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
