const SENSITIVE_KEYS = new Set([
  "token",
  "secret",
  "api_key",
  "signing_secret",
  "access_token",
  "refresh_token",
  "private_key",
  "client_secret",
]);

function maskValue(value: string): string {
  const idx = value.indexOf("_");
  const prefix = idx > -1 ? value.substring(0, idx + 1) : "";
  return `${prefix}${"•".repeat(24)}`;
}

export function maskSensitive(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;
  if (Array.isArray(data)) return data.map(maskSensitive);

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key) && typeof value === "string" && value.length > 10) {
      result[key] = maskValue(value);
    } else {
      result[key] = maskSensitive(value);
    }
  }
  return result;
}
