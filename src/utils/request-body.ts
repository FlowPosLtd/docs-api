import type { Param } from "../types";

/**
 * Encodes a path parameter value for the URL. Slashes are kept, because some
 * parameters are file paths (e.g. `pages/about-us.liquid`).
 */
export function encodePathValue(value: string): string {
  return encodeURIComponent(value).replace(/%2F/gi, "/");
}

/**
 * Turns a documented param name into a form-data key PHP reads as nested
 * input: `address.city` -> `address[city]`, `items[].name` -> `items[0][name]`.
 * A trailing `[]` (several files under one field) is kept as is.
 */
export function toFormKey(name: string): string {
  const [head, ...rest] = name.split(".");
  const base = rest.length ? head.replace(/\[\]$/, "[0]") : head;
  return base + rest.map((seg) => `[${seg.replace(/\[\]$/, "][0")}]`).join("");
}

function coerce(raw: string, type: string): unknown {
  if (raw === "null") return null;
  if (type === "integer" || type === "number") {
    const n = Number(raw);
    return raw.trim() === "" || isNaN(n) ? raw : n;
  }
  if (type === "boolean") {
    return raw === "true" ? true : raw === "false" ? false : raw;
  }
  if (type.endsWith("[]") || type === "array" || type === "object") {
    try {
      return JSON.parse(raw);
    } catch {
      const items = raw.split(",").map((s) => s.trim()).filter(Boolean);
      return type === "integer[]" || type === "number[]"
        ? items.map((s) => (isNaN(Number(s)) ? s : Number(s)))
        : items;
    }
  }
  return raw;
}

/**
 * Builds the JSON body for a request from the form's string values.
 *
 * `address.city` nests under `address`, `items[].name` becomes a field of the
 * single example item in `items`, and every value is converted to the type its
 * param declares, so the code samples and the live request send the same body.
 */
export function buildJsonBody(
  params: Param[] | undefined,
  values: Record<string, string>,
): Record<string, unknown> {
  const body: Record<string, unknown> = {};

  for (const p of params ?? []) {
    if (p.type === "file" || p.type === "object[]") continue;
    const raw = values[p.name];
    if (raw === undefined || raw === "") continue;

    const segments = p.name.split(".");
    let target: Record<string, unknown> = body;

    for (let i = 0; i < segments.length - 1; i++) {
      const isArray = segments[i].endsWith("[]");
      const key = isArray ? segments[i].slice(0, -2) : segments[i];

      if (isArray) {
        if (!Array.isArray(target[key])) target[key] = [{}];
        target = (target[key] as Record<string, unknown>[])[0];
      } else {
        if (typeof target[key] !== "object" || target[key] === null) target[key] = {};
        target = target[key] as Record<string, unknown>;
      }
    }

    target[segments[segments.length - 1]] = coerce(raw, p.type);
  }

  return body;
}
