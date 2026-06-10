import type { HttpMethod } from "../types";
import { METHOD_PILL } from "../utils/method-colors";

export function MethodBadge({
  method,
  size = "sm",
}: {
  method: HttpMethod;
  size?: "sm" | "md";
}) {
  const base =
    size === "sm"
      ? "inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-bold tracking-wide uppercase font-mono"
      : "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold tracking-wide uppercase font-mono";
  return <span className={`${base} ${METHOD_PILL[method]}`}>{method}</span>;
}
