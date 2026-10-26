import Markdoc from "@markdoc/markdoc";

/**
 * The blog: product news and how-tos for businesses, and guides and API
 * changes for developers. Everything is static: each post is a Markdoc file
 * in src/content/blog/ — the file name is its URL (`/blogs/<file>`) — that
 * starts with a front matter block:
 *
 *   ---
 *   title: Introducing fulfillment pipelines
 *   description: Track every order from kitchen to doorstep.
 *   date: 2026-10-27
 *   author: Sam Smith           # shown as "By Sam Smith · FlowPOS"
 *   audience: businesses        # businesses | developers | everyone
 *   tags: [orders, fulfillment]
 *   ---
 *
 * Files starting with "_" (like _TEMPLATE.md) are never published.
 * `npm run new-post` creates a post from the template.
 */

export type PostAudience = "businesses" | "developers" | "everyone";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  /** The writer's name; the site adds "· FlowPOS". */
  author?: string;
  audience: PostAudience;
  tags: string[];
  /** The Markdoc body, without the front matter. */
  body: string;
  readingMinutes: number;
}

export const AUDIENCE_LABELS: Record<PostAudience, string> = {
  businesses: "For businesses",
  developers: "For developers",
  everyone: "For everyone",
};

const AUDIENCES = Object.keys(AUDIENCE_LABELS) as PostAudience[];

const files = import.meta.glob<string>(
  ["../content/blog/*.md", "!../content/blog/_*.md"],
  { query: "?raw", import: "default", eager: true },
);

/**
 * The front matter is a handful of `key: value` lines, so it's read here
 * rather than pulling in a YAML parser: plain values, optional quotes, and
 * `[a, b]` lists. Anything after a `#` is a comment.
 */
export function parseFrontmatter(source: string): Record<string, string | string[]> {
  const fields: Record<string, string | string[]> = {};
  for (const raw of source.split("\n")) {
    const line = raw.replace(/\s+#.*$/, "").trim();
    const match = line.match(/^([a-zA-Z_]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    const unquote = (v: string) => v.trim().replace(/^(["'])(.*)\1$/, "$2");
    fields[key] = value.startsWith("[")
      ? value
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map(unquote)
          .filter(Boolean)
      : unquote(value);
  }
  return fields;
}

const text = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value.join(", ") : (value ?? "");

export function toPost(slug: string, source: string): BlogPost {
  const ast = Markdoc.parse(source);
  const front = parseFrontmatter(
    (ast.attributes.frontmatter as string | undefined) ?? "",
  );
  const body = source.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const audience = text(front.audience) as PostAudience;
  const tags = front.tags;
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: text(front.title) || slug,
    description: text(front.description),
    date: text(front.date),
    author: text(front.author) || undefined,
    audience: AUDIENCES.includes(audience) ? audience : "everyone",
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    body,
    // About 200 words a minute, and never "0 min".
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/** Newest first. */
export const posts: BlogPost[] = Object.entries(files)
  .map(([path, source]) =>
    toPost(path.split("/").pop()!.replace(/\.md$/, ""), source),
  )
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Every post is by FlowPOS: "By Sam Smith · FlowPOS", or "By FlowPOS". */
export function authorLine(post: Pick<BlogPost, "author">): string {
  return post.author ? `By ${post.author} · FlowPOS` : "By FlowPOS";
}

/** "27 October 2026". Dates are calendar days, so no time zone shifting. */
export function formatPostDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
