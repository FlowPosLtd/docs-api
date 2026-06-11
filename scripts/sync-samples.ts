#!/usr/bin/env tsx
/**
 * sync-samples.ts
 *
 * Calls every API endpoint and updates the `response:` block in the source
 * TypeScript resource files with real BE shapes and placeholder values.
 *
 * Usage:
 *   API_KEY=<key> npx tsx scripts/sync-samples.ts
 *   API_KEY=<key> BASE_URL=https://api.flowpos.co.uk/v1 npx tsx scripts/sync-samples.ts
 *
 * Smart context:  list endpoints run first and seed real IDs into a context
 * map so that single-resource endpoints (GET /{id}, PUT /{id} …) actually
 * hit existing records instead of returning 404.
 */

import path from "path";
import fs from "fs";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { fileURLToPath } from "url";

// ── Project root ──────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const ROOT       = path.resolve(__dirname, "..");

// ── Configuration ─────────────────────────────────────────────────────────────
const BASE_URL = (process.env.BASE_URL ?? "https://api.flowpos.me/v1").replace(/\/$/, "");
const API_KEY  = process.env.API_KEY ?? "";

if (!API_KEY) {
  console.error("Error: API_KEY environment variable is required.\n");
  console.error("  API_KEY=your-key npx tsx scripts/sync-samples.ts");
  process.exit(1);
}

// ── Minimal type aliases ──────────────────────────────────────────────────────
interface Param {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}
interface Endpoint {
  id: string;
  method: string;
  path: string;
  pathParams?: Param[];
  queryParams?: Param[];
  bodyParams?: Param[];
  response?: Record<string, unknown>;
}
interface Resource {
  id: string;
  name: string;
  endpoints: Endpoint[];
}

// ── Import resource definitions ───────────────────────────────────────────────
const { resources } = (await import("../src/data/resources.js")) as {
  resources: Resource[];
};

// ── Resource ID → source file map ─────────────────────────────────────────────
const RESOURCE_FILE: Record<string, string> = {
  customers:           "customers.ts",
  "customer-groups":   "customers.ts",
  orders:              "orders.ts",
  payments:            "payments.ts",
  "payment-links":     "payments.ts",
  discounts:           "payments.ts",
  subscriptions:       "payments.ts",
  payouts:             "payments.ts",
  "payment-account":   "payments.ts",
  "payment-settings":  "payments.ts",
  inventory:           "operations.ts",
  employees:           "operations.ts",
  locations:           "operations.ts",
  sections:            "operations.ts",
  "terminal-readers":  "operations.ts",
  "shipping-rates":    "operations.ts",
  "addon-groups":      "operations.ts",
  attachments:         "operations.ts",
  products:            "products.ts",
  categories:          "products.ts",
  roles:               "team.ts",
  "business-settings": "settings.ts",
  domains:             "settings.ts",
  webhooks:            "developer.ts",
  "api-keys":          "developer.ts",
};

// ── Endpoints to skip entirely ────────────────────────────────────────────────
const SKIP_ENDPOINT_IDS = new Set([
  "upload-attachment", // multipart/form-data
  "export-orders",     // triggers email job
  "export-payments",   // triggers email job
]);

// ─────────────────────────────────────────────────────────────────────────────
// Live context  —  populated by list endpoints, consumed by single-resource ones
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Flat map of context keys to real IDs / slugs extracted from successful
 * list endpoint responses.  Keys are resource-prefixed, e.g. "customers_id".
 */
const ctx: Record<string, string | number> = {};

/**
 * Recursively find the first plain-object item inside the first array anywhere
 * in `data`.  Used to pull the `id` / `slug` of a real record out of a list
 * response regardless of how deeply it is nested.
 */
function findFirstItem(data: unknown): Record<string, unknown> | null {
  if (Array.isArray(data)) {
    const item = data.find((x) => x !== null && typeof x === "object");
    return (item as Record<string, unknown>) ?? null;
  }
  if (data !== null && typeof data === "object") {
    for (const v of Object.values(data as Record<string, unknown>)) {
      const found = findFirstItem(v);
      if (found) return found;
    }
  }
  return null;
}

/**
 * After a successful response, extract real IDs and store them in `ctx` under
 * resource-scoped keys so later endpoints can reference them.
 */
function seedContext(resourceId: string, data: unknown): void {
  const item = findFirstItem(data);
  if (!item) return;

  if (item.id   != null) ctx[`${resourceId}_id`]   = item.id   as number;
  if (item.slug != null) ctx[`${resourceId}_slug`]  = item.slug as string;

  // Products: also grab the default_variant id for variant-level endpoints
  if ((item as any).default_variant?.id != null) {
    ctx[`${resourceId}_variant_id`] = (item as any).default_variant.id;
  }
  // Webhooks: also stash the first event id if present
  if (item.event_id != null) ctx["webhooks_event_id"] = item.event_id as number;
}

/**
 * Map of path-param names (other than the generic "id") to the ctx key that
 * holds the right value.  Covers cross-resource references.
 */
const PARAM_CTX: Record<string, string> = {
  customerId:       "customers_id",
  groupId:          "customer-groups_id",
  locationId:       "locations_id",
  sectionId:        "sections_id",
  endpointId:       "webhooks_id",
  eventId:          "webhooks_event_id",
  productId:        "products_id",
  variantId:        "products_variant_id",
  slug:             "products_slug",
  shippingRateId:   "shipping-rates_id",
  addonGroupId:     "addon-groups_id",
  attachmentId:     "attachments_id",
  paymentLinkId:    "payment-links_id",
  subscriptionId:   "subscriptions_id",
  inventoryId:      "inventory_id",
  terminalId:       "terminal-readers_id",
  discountId:       "discounts_id",
  roleId:           "roles_id",
  apiKeyId:         "api-keys_id",
  domainId:         "domains_id",
  webhookId:        "webhooks_id",
  categoryId:       "categories_id",
};

// ─────────────────────────────────────────────────────────────────────────────
// Request helpers
// ─────────────────────────────────────────────────────────────────────────────

function resolveParam(paramName: string, resourceId: string, fallback?: string): string {
  // Named params have explicit mappings
  if (paramName !== "id" && PARAM_CTX[paramName]) {
    const v = ctx[PARAM_CTX[paramName]];
    if (v != null) return String(v);
  }
  // Generic "id" resolves to the current resource's own seeded id
  if (paramName === "id") {
    const v = ctx[`${resourceId}_id`];
    if (v != null) return String(v);
  }
  return fallback ?? "1";
}

function buildUrl(template: string, pathParams: Param[] | undefined, resourceId: string): string {
  let url = template;
  for (const p of pathParams ?? []) {
    url = url.replace(`{${p.name}}`, resolveParam(p.name, resourceId, p.example));
  }
  // Any remaining un-resolved placeholders fall back to "1"
  url = url.replace(/\{[^}]+\}/g, "1");
  return `${BASE_URL}${url}`;
}

// Fields that must be unique across calls — append a timestamp so repeated
// runs don't get 422 "already taken" errors.
const UNIQUE_FIELDS = new Set(["email", "code", "registration_code"]);

function buildBody(bodyParams?: Param[]): Record<string, unknown> {
  if (!bodyParams) return {};
  const body: Record<string, unknown> = {};
  const uid = Date.now();
  for (const p of bodyParams) {
    if (!p.example || p.name.includes(".") || p.name.includes("[")) continue;
    let value: unknown = coerceExample(p.example, p.type);
    // Make unique-constraint string fields distinct on every run
    if (UNIQUE_FIELDS.has(p.name) && typeof value === "string") {
      value = p.name === "email"
        ? value.replace("@", `_${uid}@`)
        : `${value}_${uid}`;
    }
    body[p.name] = value;
  }
  return body;
}

function coerceExample(raw: string, type: string): unknown {
  if (raw === "true")  return true;
  if (raw === "false") return false;
  if (raw === "null")  return null;
  if (type === "integer" || type === "number") {
    const n = Number(raw);
    return Number.isNaN(n) ? raw : n;
  }
  if (type === "boolean") return raw === "true";
  if (type === "integer[]" || type === "string[]" || type === "object[]") {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return raw;
}

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder sanitiser
// ─────────────────────────────────────────────────────────────────────────────

function sanitize(value: unknown, key = ""): unknown {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value;

  const k = key.toLowerCase();

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      if (k === "id" || k.endsWith("_id")) return value > 100 ? 1 : value;
    }
    return value;
  }

  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) return "2024-01-10T09:00:00.000000Z";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return "2024-01-10";

    if (k.includes("email"))                        return "john@example.com";
    if (k === "phone" || k.endsWith("_phone"))      return "+44 7700 900001";
    if (k === "first_name")                         return "John";
    if (k === "last_name")                          return "Doe";
    if (k === "full_name" || k === "customer_name") return "John Doe";
    if (k === "name" && /^[A-Z][a-z]+ [A-Z]/.test(value)) return "John Doe";
    if (k === "business_name")                      return "My Café";
    if (k === "business_email")                     return "hello@mycafe.com";
    if (k === "address" || k === "address_line_1")  return "12 High Street";
    if (k === "city")                               return "London";
    if (k === "post_code" || k === "postcode")      return "W1A 1AA";
    if (k === "transaction_reference")              return "txn_a1b2c3d4e5f6";
    if (k === "stripe_id" && value.startsWith("acct_")) return "acct_a1b2c3d4e5f6";
    if (k === "stripe_id" && value.startsWith("tmr_"))  return "tmr_a1b2c3d4e5f6";
    if (k === "secret"    || k.includes("secret"))  return "whsec_a1b2c3d4e5f6";
    if (k === "token"     || k === "access_token")  return "tok_live_a1b2c3d4e5f6";
    if (k === "client_secret")                      return "acas_a1b2c3d4e5f6";
    if (k === "event_id")                           return "evt_a1b2c3d4";
    if (k === "uid")                                return "att_a1b2c3d4";
    if (k === "registration_code")                  return "simul-putjlt-stkng";
    if (k === "ip_address")                         return "192.168.1.101";
    if (k === "verification_token")                 return "verify_a1b2c3d4";
    if (k === "id" && value.startsWith("po_"))      return "po_a1b2c3d4e5f6";
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return [];
    return [sanitize(value[0], key)];
  }

  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k2, v] of Object.entries(value as Record<string, unknown>)) {
      out[k2] = sanitize(v, k2);
    }
    return out;
  }

  return value;
}

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript object-literal formatter
// ─────────────────────────────────────────────────────────────────────────────

function formatAsTS(value: unknown, closingIndent: number): string {
  if (value === null)             return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number")  return String(value);
  if (typeof value === "string")  return JSON.stringify(value);

  const childPad = " ".repeat(closingIndent + 2);
  const basePad  = " ".repeat(closingIndent);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((item) => `${childPad}${formatAsTS(item, closingIndent + 2)}`);
    return `[\n${items.join(",\n")},\n${basePad}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0) return "{}";

  const lines = entries.map(([k, v]) => {
    const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
    return `${childPad}${keyStr}: ${formatAsTS(v, closingIndent + 2)}`;
  });
  return `{\n${lines.join(",\n")},\n${basePad}}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// In-place file patching
// ─────────────────────────────────────────────────────────────────────────────

function findValueEnd(content: string, start: number): number {
  const open  = content[start];
  const close = open === "{" ? "}" : "]";
  let depth   = 1;
  let i       = start + 1;
  let inStr   = false;
  let esc     = false;

  while (i < content.length && depth > 0) {
    const ch = content[i];
    if (esc)                        { esc = false; }
    else if (ch === "\\" && inStr)  { esc = true; }
    else if (ch === '"')            { inStr = !inStr; }
    else if (!inStr) {
      if (ch === "{" || ch === "[") depth++;
      else if (ch === "}" || ch === "]") { if (--depth === 0) return i + 1; }
    }
    i++;
  }
  return -1;
}

function patchFile(filePath: string, endpointId: string, newResponse: unknown): boolean {
  const content = fs.readFileSync(filePath, "utf-8");

  const idMarker = `id: "${endpointId}"`;
  const idPos    = content.indexOf(idMarker);
  if (idPos === -1) {
    console.warn(`  [warn] endpoint "${endpointId}" not found in ${path.basename(filePath)}`);
    return false;
  }

  const nextIdRe    = /\n\s+id:\s*"/g;
  nextIdRe.lastIndex = idPos + idMarker.length;
  const nextIdMatch = nextIdRe.exec(content);
  const searchBound = nextIdMatch ? nextIdMatch.index : content.length;

  const segment   = content.slice(idPos + idMarker.length, searchBound);
  const respMatch = /\bresponse\s*:/.exec(segment);
  if (!respMatch) {
    console.warn(`  [warn] no response field for "${endpointId}"`);
    return false;
  }

  const responseKeyPos = idPos + idMarker.length + respMatch.index;
  const lineStart      = content.lastIndexOf("\n", responseKeyPos) + 1;
  const closingIndent  = responseKeyPos - lineStart;

  let valueStart = responseKeyPos + respMatch[0].length;
  while (valueStart < content.length && content[valueStart] === " ") valueStart++;

  if (content[valueStart] !== "{" && content[valueStart] !== "[") {
    console.warn(`  [warn] unexpected char after 'response:' for "${endpointId}"`);
    return false;
  }

  const valueEnd = findValueEnd(content, valueStart);
  if (valueEnd === -1) {
    console.warn(`  [warn] could not find end of response value for "${endpointId}"`);
    return false;
  }

  const formatted  = formatAsTS(newResponse, closingIndent);
  const newContent = content.slice(0, valueStart) + formatted + content.slice(valueEnd);
  fs.writeFileSync(filePath, newContent, "utf-8");
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  console.log("\nFlowPOS Sample Response Sync");
  console.log(`BASE_URL : ${BASE_URL}`);
  console.log("─".repeat(64));

  let synced  = 0;
  let skipped = 0;
  let failed  = 0;

  for (const resource of resources) {
    const fileName = RESOURCE_FILE[resource.id];
    if (!fileName) {
      console.warn(`\n[warn] no file mapping for resource "${resource.id}" — skipping`);
      skipped += resource.endpoints.length;
      continue;
    }

    const filePath = path.join(ROOT, "src", "data", "resources", fileName);
    console.log(`\n▸ ${resource.name}`);

    for (const endpoint of resource.endpoints) {
      const { id, method, path: pathTemplate, pathParams, bodyParams } = endpoint;

      const label = `  ${method.padEnd(7)} ${pathTemplate}`;
      process.stdout.write(label.padEnd(62));

      if (SKIP_ENDPOINT_IDS.has(id)) {
        console.log("→ skipped (excluded)");
        skipped++;
        continue;
      }
      if (method === "DELETE") {
        console.log("→ skipped (DELETE)");
        skipped++;
        continue;
      }

      try {
        const url  = buildUrl(pathTemplate, pathParams, resource.id);
        const body = method !== "GET" ? buildBody(bodyParams) : undefined;

        const cfg: AxiosRequestConfig = {
          method: method as AxiosRequestConfig["method"],
          url,
          headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
          ...(body && Object.keys(body).length > 0 ? { data: body } : {}),
          validateStatus: (s) => s < 500,
          timeout: 20_000,
        };

        const { data, status } = await axios(cfg);

        if (status >= 400) {
          console.log(`→ HTTP ${status} (kept existing)`);
          skipped++;
          continue;
        }

        // Seed context with real IDs from this response
        seedContext(resource.id, data);

        const sanitized = sanitize(data);
        const ok        = patchFile(filePath, id, sanitized);

        if (ok) {
          console.log(`→ ${status} ✓`);
          synced++;
        } else {
          skipped++;
        }
      } catch (err: unknown) {
        const msg =
          axios.isAxiosError(err) && err.response
            ? `HTTP ${err.response.status}`
            : err instanceof Error ? err.message : "unknown error";
        console.log(`→ error: ${msg} (kept existing)`);
        failed++;
      }

      await new Promise((r) => setTimeout(r, 200));
    }
  }

  console.log("\n" + "─".repeat(64));
  console.log(`Synced: ${synced}  |  Skipped: ${skipped}  |  Failed: ${failed}`);
  console.log("");
}

run().catch((err) => {
  console.error("\nFatal error:", err);
  process.exit(1);
});
