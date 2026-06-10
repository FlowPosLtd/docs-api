import type { HttpMethod } from "../types";

export const METHOD_TEXT: Record<HttpMethod, string> = {
  GET: "text-get",
  POST: "text-post",
  PUT: "text-put",
  PATCH: "text-patch",
  DELETE: "text-destroy",
};

export const METHOD_PILL: Record<HttpMethod, string> = {
  GET: "bg-get-wash text-get dark:bg-get-wash-dark",
  POST: "bg-post-wash text-post dark:bg-post-wash-dark",
  PUT: "bg-put-wash text-put dark:bg-put-wash-dark",
  PATCH: "bg-patch-wash text-patch dark:bg-patch-wash-dark",
  DELETE: "bg-destroy-wash text-destroy dark:bg-destroy-wash-dark",
};

export const METHOD_PANEL_BADGE: Record<HttpMethod, string> = {
  GET: "bg-get-wash-dark text-get",
  POST: "bg-post-wash-dark text-post",
  PUT: "bg-put-wash-dark text-put",
  PATCH: "bg-patch-wash-dark text-patch",
  DELETE: "bg-destroy-wash-dark text-destroy",
};
