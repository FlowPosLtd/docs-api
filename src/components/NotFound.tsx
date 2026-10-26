import { Link } from "../utils/use-router";

/** The 404, for any page that doesn't exist. */
export function NotFound() {
  return (
    <div className="text-center py-20 px-6">
      <p className="text-5xl font-bold text-ink-tertiary mb-4">404</p>
      <p className="t-body-sm mb-4">Page not found.</p>
      <Link href="/" className="text-accent-ink hover:underline text-sm">
        Back to home →
      </Link>
    </div>
  );
}
