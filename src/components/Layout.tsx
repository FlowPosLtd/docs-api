import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { FlowPOSIcon } from "./FlowPOSIcon";
import { useTheme } from "../hooks/use-theme";
import { apiPath, blogPath } from "../utils/paths";
import { Link } from "../utils/use-router";
import { resources } from "../data/resources";
import { METHOD_PILL } from "../utils/method-colors";
import type { HttpMethod } from "../types";

interface LayoutProps {
  currentPath: string;
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

const SearchModal = memo(function SearchModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const lowerQuery = query.toLowerCase();
  const results = useMemo(
    () =>
      query.length > 1
        ? resources
            .flatMap((r) =>
              r.endpoints
                .filter(
                  (e) =>
                    e.title.toLowerCase().includes(lowerQuery) ||
                    e.path.toLowerCase().includes(lowerQuery) ||
                    e.description.toLowerCase().includes(lowerQuery),
                )
                .map((e) => ({ ...e, resourceId: r.id, resourceName: r.name })),
            )
            .slice(0, 8)
        : [],
    [query],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-canvas rounded-xl shadow-2xl w-full max-w-xl border border-line overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <svg
            className="w-4 h-4 text-ink-tertiary shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Search endpoints, parameters…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-ink-primary placeholder-ink-tertiary"
          />
          <kbd className="text-[10px] font-mono text-ink-tertiary border border-line rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => {
                    navigate(apiPath(r.resourceId));
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById(r.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-canvas-subtle text-left transition-colors"
                >
                  <span
                    className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase font-mono shrink-0 ${METHOD_PILL[r.method as HttpMethod]}`}
                  >
                    {r.method}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-primary">
                      {r.title}
                    </p>
                    <p className="text-xs text-ink-tertiary font-mono truncate">
                      {r.path}
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-ink-tertiary shrink-0">
                    {r.resourceName}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.length > 1 ? (
          <p className="px-4 py-6 text-sm text-center text-ink-tertiary">
            No results for "{query}"
          </p>
        ) : (
          <p className="px-4 py-6 text-sm text-center text-ink-tertiary">
            Type to search endpoints…
          </p>
        )}
      </div>
    </div>
  );
});

export function Layout({ currentPath, children, rightPanel }: LayoutProps) {
  const { dark, toggleDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeSearch  = useCallback(() => setSearchOpen(false), []);
  const openSearch   = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-canvas border-r border-line flex flex-col
        transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-14 flex items-center px-5 border-b border-line shrink-0">
          <Link
            href={apiPath()}
            className="flex items-center gap-2.5"
            onClick={closeSidebar}
          >
            <FlowPOSIcon className="w-7 h-7 shrink-0" />
            <span className="text-sm font-semibold text-ink-primary">
              FlowPOS API
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-hidden">
          <Sidebar
            currentPath={currentPath}
            onNavigate={closeSidebar}
          />
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <header className="h-14 border-b border-line flex items-center px-4 gap-3 bg-canvas shrink-0 z-10">
          <button
            className="lg:hidden p-1.5 rounded-md text-ink-secondary hover:bg-canvas-subtle"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-line bg-canvas-subtle text-sm text-ink-tertiary hover:border-line-strong transition-colors flex-1 max-w-sm"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="flex-1 text-left text-sm">Search docs…</span>
            <kbd className="hidden sm:inline-flex text-[10px] font-mono bg-canvas border border-line rounded px-1.5 py-0.5 text-ink-tertiary">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:block text-xs font-medium text-ink-tertiary hover:text-ink-primary transition-colors px-2 py-1"
            >
              Home
            </Link>
            <Link
              href={blogPath()}
              className="text-xs font-medium text-ink-tertiary hover:text-ink-primary transition-colors px-2 py-1"
            >
              Blog
            </Link>
            <button
              onClick={toggleDark}
              className="cursor-pointer p-1.5 rounded-md text-ink-secondary hover:bg-canvas-subtle transition-colors"
              title="Toggle dark mode"
            >
              {dark ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href="https://app.flowpos.co.uk/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:block text-xs font-medium text-ink-tertiary hover:text-ink-primary transition-colors px-2 py-1"
            >
              flowpos.co.uk ↗
            </a>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto scroll-smooth">
            <div className={`py-10 ${rightPanel ? 'px-8 xl:px-10' : 'max-w-3xl px-6 xl:px-10 mx-auto'}`}>
              {children}
            </div>
          </main>

          {rightPanel && (
            <aside className="hidden xl:flex w-[420px] shrink-0 bg-code border-l border-code overflow-y-auto scroll-smooth">
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {searchOpen && <SearchModal onClose={closeSearch} />}
    </div>
  );
}
