import Markdoc from "@markdoc/markdoc";

/**
 * Articles: product news and how-tos for businesses, and guides and API
 * changes for developers. Each one is a Markdoc file in
 * src/content/articles/ — the file name is its URL (`/articles/<file>`) — that
 * starts with a front matter block:
 *
 *   ---
 *   title: Introducing fulfillment pipelines
 *   description: Track every order from kitchen to doorstep.
 *   date: 2026-10-27
 *   audience: businesses        # businesses | developers | everyone
 *   tags: [orders, fulfillment]
 *   author: FlowPOS team
 *   ---
 *
 * Files starting with "_" (like _TEMPLATE.md) are never published.
 */

export type ArticleAudience = "businesses" | "developers" | "everyone";

export interface Article {
  slug: string;
  title: string;
  description: string;
  /** ISO date, yyyy-mm-dd. */
  date: string;
  audience: ArticleAudience;
  tags: string[];
  author?: string;
  /** The Markdoc body, without the front matter. */
  body: string;
  readingMinutes: number;
}

export const AUDIENCE_LABELS: Record<ArticleAudience, string> = {
  businesses: "For businesses",
  developers: "For developers",
  everyone: "For everyone",
};

const AUDIENCES = Object.keys(AUDIENCE_LABELS) as ArticleAudience[];

const files = import.meta.glob<string>(
  ["../content/articles/*.md", "!../content/articles/_*.md"],
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

export function toArticle(slug: string, source: string): Article {
  const ast = Markdoc.parse(source);
  const front = parseFrontmatter(
    (ast.attributes.frontmatter as string | undefined) ?? "",
  );
  const body = source.replace(/^---\n[\s\S]*?\n---\n?/, "");
  const audience = text(front.audience) as ArticleAudience;
  const tags = front.tags;
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: text(front.title) || slug,
    description: text(front.description),
    date: text(front.date),
    audience: AUDIENCES.includes(audience) ? audience : "everyone",
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    author: text(front.author) || undefined,
    body,
    // About 200 words a minute, and never "0 min".
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

/** Newest first. */
export const articles: Article[] = Object.entries(files)
  .map(([path, source]) =>
    toArticle(path.split("/").pop()!.replace(/\.md$/, ""), source),
  )
  .sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** "27 October 2026". Dates are calendar days, so no time zone shifting. */
export function formatArticleDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
