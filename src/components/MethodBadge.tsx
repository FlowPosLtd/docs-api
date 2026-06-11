import { memo } from "react";
import type { HttpMethod } from "../types";
import { METHOD_PILL } from "../utils/method-colors";

const BASE_SM =
  "inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-bold tracking-wide uppercase font-mono";
const BASE_MD =
  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase font-mono";

export const MethodBadge = memo(function MethodBadge({
  method,
  size = "sm",
}: {
  method: HttpMethod;
  size?: "sm" | "md";
}) {
  return (
    <span className={`${size === "sm" ? BASE_SM : BASE_MD} ${METHOD_PILL[method]}`}>
      {method}
    </span>
  );
});
