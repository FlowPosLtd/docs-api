/**
 * The site has three parts: the home page at "/", the API reference under
 * "/api", and the blog under "/blogs". Build links with these helpers so a
 * section can move without hunting for hard-coded paths.
 */
export const API_BASE = "/api";
export const BLOG_BASE = "/blogs";

/** apiPath() is "/api"; apiPath("orders") is "/api/orders". */
export const apiPath = (page = "") =>
  page ? `${API_BASE}/${page.replace(/^\//, "")}` : API_BASE;

/** blogPath() is "/blogs"; blogPath("my-post") is "/blogs/my-post". */
export const blogPath = (slug = "") => (slug ? `${BLOG_BASE}/${slug}` : BLOG_BASE);

/** "orders" for "/api/orders", "" for "/api" — the API page a path is on. */
export const apiPage = (path: string) =>
  path.startsWith(API_BASE) ? path.slice(API_BASE.length).replace(/^\//, "") : "";
