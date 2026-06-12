export function stripStatus(data: unknown): unknown {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const { status: _omit, ...rest } = data as Record<string, unknown>;
    void _omit;
    return rest;
  }
  return data;
}
