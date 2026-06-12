import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Link } from "../utils/use-router";
import { resources } from "../data/resources";
import { METHOD_PILL } from "../utils/method-colors";
import type { HttpMethod } from "../types";

interface LayoutProps {
  currentPath: string;
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

function FlowPOSIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.82 0C4.4 0 0 4.39 0 9.82V32.54C0 37.97 4.4 42.36 9.82 42.36H32.54C37.97 42.36 42.36 37.96 42.36 32.54V9.82C42.37 4.39 37.98 0 32.55 0H9.82Z"
        fill="url(#fp-g)"
      />
      <path
        d="M33.48 13.58H8.9C6.7 13.58 4.92 11.8 4.92 9.61C4.92 7.41 6.7 5.64 8.9 5.64H33.48C35.67 5.64 37.45 7.42 37.45 9.62C37.45 11.81 35.67 13.58 33.48 13.58Z"
        fill="white"
      />
      <path
        d="M21.18 25.15H8.9C6.7 25.15 4.92 23.37 4.92 21.18C4.92 18.98 6.7 17.2 8.9 17.2H21.18C23.38 17.2 25.16 18.98 25.16 21.18C25.16 23.38 23.38 25.15 21.18 25.15Z"
        fill="white"
      />
      <path
        d="M15.05 36.72H8.9C6.7 36.72 4.92 34.94 4.92 32.74C4.92 30.55 6.7 28.77 8.9 28.77H15.05C17.24 28.77 19.02 30.55 19.02 32.74C19.01 34.95 17.23 36.72 15.05 36.72Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="fp-g"
          x1="-0.62"
          y1="42.99"
          x2="44.14"
          y2="-1.78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7728EB" />
          <stop offset="1" stopColor="#E876E1" />
        </linearGradient>
      </defs>
    </svg>
  );
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
                    navigate(`/${r.resourceId}`);
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
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const closeSearch  = useCallback(() => setSearchOpen(false), []);
  const toggleDark   = useCallback(() => setDark((d) => !d), []);
  const openSearch   = useCallback(() => setSearchOpen(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

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
            href="/"
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
