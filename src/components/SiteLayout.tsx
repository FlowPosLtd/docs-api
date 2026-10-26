import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "../utils/use-router";
import { useTheme } from "../hooks/use-theme";
import { apiPath, blogPath, BLOG_BASE } from "../utils/paths";
import { FlowPOSIcon } from "./FlowPOSIcon";

const DASHBOARD_URL = "https://app.flowpos.co.uk/";

/**
 * The frame for the home page and the blog: a top bar, the page, a footer.
 * The API reference has its own layout with the sidebar (Layout.tsx).
 */
export function SiteLayout() {
  const { dark, toggleDark } = useTheme();
  const { pathname } = useLocation();

  // A new page starts at the top, not where the last one was scrolled to.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navLink = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      active
        ? "text-ink-primary bg-canvas-subtle"
        : "text-ink-secondary hover:text-ink-primary"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="max-w-5xl mx-auto h-14 px-4 sm:px-6 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 mr-2 sm:mr-4">
            <FlowPOSIcon className="w-7 h-7 shrink-0" />
            <span className="hidden sm:inline text-sm font-semibold text-ink-primary">
              FlowPOS Docs
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href={apiPath()} className={navLink(false)}>
              API reference
            </Link>
            <Link
              href={blogPath()}
              className={navLink(pathname.startsWith(BLOG_BASE))}
            >
              Blog
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={toggleDark}
              className="cursor-pointer p-2 rounded-md text-ink-secondary hover:bg-canvas-subtle transition-colors"
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-md text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FlowPOSIcon className="w-5 h-5" />
            <span className="t-caption normal-case tracking-normal">
              © {new Date().getFullYear()} FlowPOS
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-tertiary">
            <Link href={apiPath()} className="hover:text-ink-primary">
              API reference
            </Link>
            <Link href={blogPath()} className="hover:text-ink-primary">
              Blog
            </Link>
            <a href={DASHBOARD_URL} target="_blank" rel="noreferrer" className="hover:text-ink-primary">
              Dashboard
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
