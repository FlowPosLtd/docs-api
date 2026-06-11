import { useState, memo } from "react";

const inputCls =
  "w-full px-3 py-1.5 rounded bg-gray-800 border border-gray-700 text-gray-200 text-sm font-mono placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors";
const labelCls = "block text-xs text-gray-400 mb-1";
import axios from "axios";
import {
  apiClient,
  getStoredApiKey,
  getStoredBaseUrl,
} from "../utils/api-client";
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

  const effectiveKey = apiKey || getStoredApiKey();
  const effectiveBase = (baseUrl || getStoredBaseUrl()).replace(/\/$/, "");

  const execute = async () => {
    if (!effectiveKey) {
      setError(
        "No API key set. Click the key icon at the bottom-right to add one.",
      );
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
    const params = queryPairs.length
      ? Object.fromEntries(queryPairs)
      : undefined;

    const hasBody = ["POST", "PUT", "PATCH"].includes(endpoint.method);
    const bodyPairs = Object.entries(bodyValues).filter(([, v]) => v !== "");

    const bodyParamTypeMap: Record<string, string> = {};
    for (const p of endpoint.bodyParams ?? []) {
      bodyParamTypeMap[p.name] = p.type;
    }

    let data: Record<string, unknown> | undefined;
    if (hasBody && bodyPairs.length) {
      const assembled: Record<string, unknown> = {};
      const arrayFields: Record<string, Record<string, string>> = {};

      for (const [k, v] of bodyPairs) {
        const m = k.match(/^([^[]+)\[\]\.(.+)$/);
        if (m) {
          const [, parent, field] = m;
          if (!arrayFields[parent]) arrayFields[parent] = {};
          arrayFields[parent][field] = v;
        } else {
          const t = bodyParamTypeMap[k] ?? "";
          if (t.endsWith("[]") || t === "array") {
            try { assembled[k] = JSON.parse(v); } catch { assembled[k] = v; }
          } else if (t === "integer" || t === "number") {
            const n = Number(v);
            assembled[k] = isNaN(n) ? v : n;
          } else if (t === "boolean") {
            assembled[k] = v === "true" ? true : v === "false" ? false : v;
          } else {
            assembled[k] = v;
          }
        }
      }

      for (const [parent, fields] of Object.entries(arrayFields)) {
        assembled[parent] = [
          Object.fromEntries(
            Object.entries(fields).map(([k, v]) => {
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

      data = Object.keys(assembled).length ? assembled : undefined;
    }

    const start = Date.now();
    try {
      const response = await apiClient.request({
        method: endpoint.method.toLowerCase() as any,
        url: resolvedPath,
        baseURL: effectiveBase,
        params,
        data,
        headers: { "x-api-key": effectiveKey },
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
        setError(
          err.message ||
            "Network error. Check CORS and that the API is reachable.",
        );
      } else {
        setError("Unexpected error. Check the browser console for details.");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 px-3 py-2 rounded bg-gray-800/60 border border-gray-700 text-xs">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${effectiveKey ? "bg-emerald-400" : "bg-amber-400 animate-pulse"}`}
        />
        <span className="text-gray-400 truncate font-mono">
          {effectiveKey
            ? effectiveBase
            : "No API key click the key icon to set one"}
        </span>
      </div>

      {(endpoint.pathParams?.length ?? 0) > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Path Parameters
          </p>
          <div className="space-y-2">
            {endpoint.pathParams!.map((p) => (
              <div key={p.name}>
                <label className={labelCls}>
                  <span className="font-mono">{p.name}</span>{" "}
                  <span className="text-red-400">*</span>
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

      {(endpoint.queryParams?.length ?? 0) > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Query Parameters
          </p>
          <div className="space-y-2">
            {endpoint.queryParams!.map((p) => (
              <div key={p.name}>
                <label className={labelCls}>
                  <span className="font-mono">{p.name}</span>
                  {p.required && <span className="ml-1 text-red-400">*</span>}
                  {p.default && (
                    <span className="ml-1 text-gray-500">
                      default: {p.default}
                    </span>
                  )}
                </label>
                {p.enum ? (
                  <select
                    value={queryValues[p.name] || ""}
                    onChange={(e) => onQueryChange(p.name, e.target.value)}
                    className={inputCls + " appearance-none"}
                  >
                    <option value="">— optional —</option>
                    {p.enum.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
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

      {(endpoint.bodyParams?.length ?? 0) > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Request Body
          </p>
          <div className="space-y-2">
            {endpoint.bodyParams!.map((p) => {
              if (p.type === "object[]") {
                return (
                  <div key={p.name} className="pt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <span className="font-mono text-gray-400">{p.name}</span>
                      <span className="text-gray-600">· array of objects</span>
                      {p.required && <span className="text-red-400">*</span>}
                    </p>
                  </div>
                );
              }

              const isArrayChild = /\[\]\./.test(p.name);

              return (
                <div
                  key={p.name}
                  className={
                    isArrayChild ? "pl-3 border-l border-gray-700" : ""
                  }
                >
                  <label className={labelCls}>
                    <span className="font-mono">
                      {isArrayChild
                        ? p.name.replace(/^[^[]+\[\]\./, "")
                        : p.name}
                    </span>
                    {p.required && <span className="ml-1 text-red-400">*</span>}
                  </label>
                  {p.enum ? (
                    <select
                      value={bodyValues[p.name] || ""}
                      onChange={(e) => onBodyChange(p.name, e.target.value)}
                      className={inputCls + " appearance-none"}
                    >
                      <option value="">— select —</option>
                      {p.enum.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={p.example || ""}
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

      <button
        onClick={execute}
        disabled={loading}
        className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          `Send ${endpoint.method} Request`
        )}
      </button>

      {error && (
        <div className="px-3 py-2.5 rounded bg-red-900/30 border border-red-700/50 text-red-300 text-xs leading-relaxed">
          {error}
        </div>
      )}

      {result && (
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${result.status >= 200 && result.status < 300 ? "bg-emerald-900/40 text-emerald-400" : "bg-red-900/40 text-red-400"}`}
            >
              {result.status} {result.statusText}
            </span>
            <span className="text-xs text-gray-500">{result.time}ms</span>
          </div>
          <pre className="p-3 rounded bg-gray-900 text-xs font-mono text-gray-300 overflow-x-auto max-h-72 border border-gray-800 leading-5 whitespace-pre-wrap break-words">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
});
