import type { HttpMethod } from "../types";

export const METHOD_TEXT: Record<HttpMethod, string> = {
  GET: "text-get",
  POST: "text-post",
  PUT: "text-put",
  PATCH: "text-patch",
  DELETE: "text-destroy",
};

export const METHOD_PILL: Record<HttpMethod, string> = {
  GET: "bg-get-wash text-get-ink ring-1 ring-inset ring-get/25 dark:bg-get-wash-dark dark:text-get dark:ring-0",
  POST: "bg-post-wash text-post-ink ring-1 ring-inset ring-post/25 dark:bg-post-wash-dark dark:text-post dark:ring-0",
  PUT: "bg-put-wash text-put-ink ring-1 ring-inset ring-put/25 dark:bg-put-wash-dark dark:text-put dark:ring-0",
  PATCH: "bg-patch-wash text-patch-ink ring-1 ring-inset ring-patch/25 dark:bg-patch-wash-dark dark:text-patch dark:ring-0",
  DELETE: "bg-destroy-wash text-destroy-ink ring-1 ring-inset ring-destroy/25 dark:bg-destroy-wash-dark dark:text-destroy dark:ring-0",
};

// The code panel follows light/dark mode, so its badge matches the pills.
export const METHOD_PANEL_BADGE: Record<HttpMethod, string> = METHOD_PILL;
