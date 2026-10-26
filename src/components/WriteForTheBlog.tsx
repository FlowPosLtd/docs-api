/** Where to send someone who wants to write a post: the repo's how-to. */
export const WRITE_A_POST_URL =
  "https://github.com/FlowPosLtd/docs-api#writing-a-blog-post";

/** "Want to write for the blog?" — pointing at the contribution guide. */
export function WriteForTheBlog({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line bg-canvas-subtle p-6 ${className}`}
    >
      <div>
        <p className="t-subheading mb-1">Want to write for the blog?</p>
        <p className="t-body-sm">
          Posts are Markdown files in the docs repo. Add yours and open a pull
          request — it goes live once it's merged.
        </p>
      </div>
      <a
        href={WRITE_A_POST_URL}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 inline-flex items-center justify-center rounded-lg border border-line-strong bg-canvas px-4 py-2 text-sm font-medium text-ink-primary hover:bg-canvas-inset transition-colors"
      >
        How to write a post
      </a>
    </div>
  );
}
