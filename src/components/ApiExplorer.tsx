import { useState, useRef, memo } from "react";

const inputCls =
  "w-full px-3 py-1.5 rounded bg-code-head border border-code text-code text-sm font-mono placeholder:text-code-dim focus:outline-none focus:border-blue-500 transition-colors";
const labelCls = "block text-xs text-code-muted mb-1";
const sectionLabelCls = "text-[11px] font-semibold uppercase tracking-wider text-code-dim mb-2";

import axios from "axios";
import { apiClient, getStoredApiKey, getStoredBaseUrl } from "../utils/api-client";
import { stripStatus } from "../utils/strip-status";
import type { Endpoint } from "../types";

interface ApiExplorerProps {
  endpoint: Endpoint;
  apiKey: string;
  baseUrl: string;
  pathValues: Record<string, string>;
  queryValues: Record<string, string>;
  bodyValues: Record<string, string>;
  onPathChange: (key: string, val: string) => void;
  onQueryChange: (key: string, val: string) => void;
  onBodyChange: (key: string, val: string) => void;
}

interface ApiResult {
  status: number;
  statusText: string;
  data: unknown;
  time: number;
}

export const ApiExplorer = memo(function ApiExplorer({
  endpoint,
  apiKey,
  baseUrl,
  pathValues,
  queryValues,
  bodyValues,
  onPathChange,
  onQueryChange,
  onBodyChange,
}: ApiExplorerProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileValues, setFileValues] = useState<Record<string, FileList | null>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const effectiveKey = apiKey || getStoredApiKey();
  const effectiveBase = (baseUrl || getStoredBaseUrl()).replace(/\/$/, "");

  const execute = async () => {
    if (!effectiveKey) {
      setError("No API key set. Click the key icon at the bottom-right to add one.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    let resolvedPath = endpoint.path;
    for (const [k, v] of Object.entries(pathValues)) {
      resolvedPath = resolvedPath.replace(`{${k}}`, v || `{${k}}`);
    }

    const queryPairs = Object.entries(queryValues).filter(([, v]) => v !== "");
    const params = queryPairs.length ? Object.fromEntries(queryPairs) : undefined;

    const hasBody = ["POST", "PUT", "PATCH"].includes(endpoint.method);
    const bodyPairs = Object.entries(bodyValues).filter(([, v]) => v !== "");

    const bodyParamTypeMap: Record<string, string> = {};
    const bodyParamEnumFields = new Set<string>();
    const hasFileParam = (endpoint.bodyParams ?? []).some((p) => p.type === "file");
    for (const p of endpoint.bodyParams ?? []) {
      bodyParamTypeMap[p.name] = p.type;
      if (p.enum) bodyParamEnumFields.add(p.name);
    }

    let data: Record<string, unknown> | FormData | undefined;
    if (hasBody) {
      if (hasFileParam) {
        const fd = new FormData();
        for (const [k, files] of Object.entries(fileValues)) {
          if (!files) continue;
          const isMultiple = k.endsWith("[]");
          Array.from(files).forEach((f) => fd.append(k, f));
          void isMultiple;
        }
        for (const [k, v] of bodyPairs) {
          if (bodyParamTypeMap[k] !== "file") fd.append(k, v);
        }
        data = fd;
      } else if (bodyPairs.length) {
        const assembled: Record<string, unknown> = {};
        const arrayFields: Record<string, Record<string, string>> = {};
        const nestedFields: Record<string, Record<string, unknown>> = {};

        for (const [k, v] of bodyPairs) {
          const arrayMatch = k.match(/^([^[]+)\[\]\.(.+)$/);
          if (arrayMatch) {
            const [, parent, field] = arrayMatch;
            if (!arrayFields[parent]) arrayFields[parent] = {};
            arrayFields[parent][field] = v;
          } else if (k.includes(".")) {
            const dotIdx = k.indexOf(".");
            const parent = k.substring(0, dotIdx);
            const child = k.substring(dotIdx + 1);
            if (!nestedFields[parent]) nestedFields[parent] = {};
            const t = bodyParamTypeMap[k] ?? "";
            if (t === "integer" || t === "number") {
              const n = Number(v);
              nestedFields[parent][child] = isNaN(n) ? v : n;
            } else if (t === "boolean") {
              nestedFields[parent][child] = v === "true" ? true : v === "false" ? false : v;
            } else {
              nestedFields[parent][child] = v;
            }
          } else {
            const t = bodyParamTypeMap[k] ?? "";
            if (t.endsWith("[]") || t === "array") {
              try { assembled[k] = JSON.parse(v); } catch {
                assembled[k] = v.split(",").map((s) => s.trim()).filter(Boolean);
              }
            } else if (t === "integer" || t === "number") {
              const n = Number(v);
              assembled[k] = isNaN(n) ? v : n;
            } else if (t === "boolean") {
              assembled[k] = v === "true" ? true : v === "false" ? false : v;
            } else {
              assembled[k] = bodyParamEnumFields.has(k) ? v.toLowerCase() : v;
            }
          }
        }

        for (const [parent, fields] of Object.entries(arrayFields)) {
          assembled[parent] = [
            Object.fromEntries(
              Object.entries(fields).map(([k, v]) => {
                const fullKey = `${parent}[].${k}`;
                const t = bodyParamTypeMap[fullKey] ?? "";
                if (v === "null") return [k, null];
                if (t === "boolean") return [k, v === "true" ? true : v === "false" ? false : v];
                if (t === "integer" || t === "number") {
                  const n = Number(v);
                  return [k, isNaN(n) ? v : n];
                }
                const n = Number(v);
                if (v !== "" && !isNaN(n)) return [k, n];
                if (v.trim().startsWith("[") || v.trim().startsWith("{")) {
                  try { return [k, JSON.parse(v)]; } catch { /* fall through */ }
                }
                return [k, v];
              }),
            ),
          ];
        }

        for (const [parent, fields] of Object.entries(nestedFields)) {
          assembled[parent] = fields;
        }

        data = Object.keys(assembled).length ? assembled : undefined;
      }
    }

    const start = Date.now();
    try {
      const response = await apiClient.request({
        method: endpoint.method.toLowerCase() as any,
        url: resolvedPath,
        baseURL: effectiveBase,
        params,
        data,
        headers: {
          "x-api-key": effectiveKey,
          ...(data instanceof FormData ? { "Content-Type": undefined } : {}),
        },
        validateStatus: () => true,
      });

      setResult({
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        time: Date.now() - start,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.message || "Network error. Check CORS and that the API is reachable.");
      } else {
        setError("Unexpected error. Check the browser console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Base URL / key indicator */}
      <div className="flex items-center gap-2 px-3 py-2 rounded bg-code-head border border-code text-xs">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${effectiveKey ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`} />
        <span className="text-code-muted truncate font-mono">
          {effectiveKey ? effectiveBase : "No API key — click the key icon to set one"}
        </span>
      </div>

      {/* Path params */}
      {(endpoint.pathParams?.length ?? 0) > 0 && (
        <div>
          <p className={sectionLabelCls}>Path Parameters</p>
          <div className="space-y-2">
            {endpoint.pathParams!.map((p) => (
              <div key={p.name}>
                <label className={labelCls}>
                  <span className="font-mono">{p.name}</span>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder={p.example || p.name}
                  value={pathValues[p.name] || ""}
                  onChange={(e) => onPathChange(p.name, e.target.value)}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Query params */}
      {(endpoint.queryParams?.length ?? 0) > 0 && (
        <div>
          <p className={sectionLabelCls}>Query Parameters</p>
          <div className="space-y-2">
            {endpoint.queryParams!.map((p) => (
              <div key={p.name}>
                <label className={labelCls}>
                  <span className="font-mono">{p.name}</span>
                  {p.required && <span className="ml-1 text-danger">*</span>}
                  {p.default && <span className="ml-1 text-code-dim">default: {p.default}</span>}
                </label>
                {p.enum ? (
                  <select
                    value={queryValues[p.name] || ""}
                    onChange={(e) => onQueryChange(p.name, e.target.value)}
                    className={inputCls + " appearance-none"}
                  >
                    <option value="">— optional —</option>
                    {p.enum.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder={p.example || p.default || ""}
                    value={queryValues[p.name] || ""}
                    onChange={(e) => onQueryChange(p.name, e.target.value)}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body params */}
      {(endpoint.bodyParams?.length ?? 0) > 0 && (
        <div>
          <p className={sectionLabelCls}>Request Body</p>
          <div className="space-y-2">
            {endpoint.bodyParams!.map((p) => {
              if (p.type === "object[]") {
                return (
                  <div key={p.name} className="pt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-code-dim flex items-center gap-1.5">
                      <span className="font-mono text-code-muted">{p.name}</span>
                      <span className="text-code-dim opacity-60">· array of objects</span>
                      {p.required && <span className="text-danger">*</span>}
                    </p>
                  </div>
                );
              }

              const isArrayChild = /\[\]\./.test(p.name);

              return (
                <div key={p.name} className={isArrayChild ? "pl-3 border-l border-code" : ""}>
                  <label className={labelCls}>
                    <span className="font-mono">
                      {isArrayChild ? p.name.replace(/^[^[]+\[\]\./, "") : p.name}
                    </span>
                    {p.required && <span className="ml-1 text-danger">*</span>}
                  </label>
                  {p.enum ? (
                    <select
                      value={bodyValues[p.name] || ""}
                      onChange={(e) => onBodyChange(p.name, e.target.value)}
                      className={inputCls + " appearance-none"}
                    >
                      <option value="">— select —</option>
                      {p.enum.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                  ) : p.type === "boolean" ? (
                    <select
                      value={bodyValues[p.name] ?? ""}
                      onChange={(e) => onBodyChange(p.name, e.target.value)}
                      className={inputCls + " appearance-none"}
                    >
                      <option value="">— select —</option>
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : p.type === "file" ? (
                    <input
                      type="file"
                      multiple
                      ref={(el) => { fileInputRefs.current[p.name] = el; }}
                      onChange={(e) => setFileValues((prev) => ({ ...prev, [p.name]: e.target.files }))}
                      className={inputCls + " cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-600 file:text-white"}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder={p.example || (p.type === "integer" && !p.required ? "integer or null" : "")}
                      value={bodyValues[p.name] || ""}
                      onChange={(e) => onBodyChange(p.name, e.target.value)}
                      className={inputCls}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={execute}
        disabled={loading}
        className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          `Send ${endpoint.method} Request`
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="px-3 py-2.5 rounded bg-danger-faint border border-danger-muted text-danger-ink text-xs leading-relaxed">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                result.status >= 200 && result.status < 300
                  ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                  : "bg-danger-faint text-danger-ink"
              }`}
            >
              {result.status} {result.statusText}
            </span>
            <span className="text-xs text-code-dim">{result.time}ms</span>
          </div>
          <pre className="p-3 pb-6 rounded bg-code-head text-xs font-mono text-code overflow-x-auto max-h-150 border border-code leading-5 whitespace-pre-wrap wrap-break-word">
            {JSON.stringify(stripStatus(result.data), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
});
