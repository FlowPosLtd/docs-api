const BLOCKED_FIELDS = new Set([
  "total",
  "terminal_reader_id",
  "is_online",
  "otp",
  "otp_expires_at",
  "stripe_customer_id",
]);

export function filterResponse(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(filterResponse);
  }
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (!BLOCKED_FIELDS.has(k)) {
        result[k] = filterResponse(v);
      }
    }
    return result;
  }
  return value;
}
