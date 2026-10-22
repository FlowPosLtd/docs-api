import type { Endpoint } from "../types";
import { PRODUCTION_BASE_URL } from "./api-client";
import { buildJsonBody, encodePathValue } from "./request-body";

export type Language = "curl" | "javascript" | "python" | "axios";

/** JSON rendered as a Python literal: `true`/`false`/`null` become `True`/`False`/`None`. */
function toPython(value: unknown): string {
  return JSON.stringify(value, null, 4).replace(
    /("(?:[^"\\]|\\.)*")|\b(true|false|null)\b/g,
    (_match, str: string | undefined, literal: string | undefined) =>
      str ?? ({ true: "True", false: "False", null: "None" } as Record<string, string>)[literal!],
  );
}

export function generateCode(
  endpoint: Endpoint,
  lang: Language,
  apiKey: string,
  pathValues: Record<string, string> = {},
  queryValues: Record<string, string> = {},
  bodyValues: Record<string, string> = {},
): string {
  const key = apiKey || "your_api_key_here";
  const hasBody = ["POST", "PUT", "PATCH"].includes(endpoint.method);

  let resolvedPath = endpoint.path;
  for (const p of endpoint.pathParams ?? []) {
    const v = pathValues[p.name] || p.example;
    if (v) resolvedPath = resolvedPath.replace(`{${p.name}}`, encodePathValue(v));
  }

  const queryPairs = Object.entries(queryValues).filter(([, v]) => v !== "");
  const qs = queryPairs.length
    ? "?" + queryPairs.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&")
    : "";

  const filledBody: Record<string, string> = {};
  for (const p of endpoint.bodyParams ?? []) {
    const v = bodyValues[p.name] || p.example;
    if (v) filledBody[p.name] = v;
  }
  const bodyObj = buildJsonBody(endpoint.bodyParams, filledBody);

  const BASE = PRODUCTION_BASE_URL;

  if (lang === "curl") {
    const lines: string[] = [];
    const url = `${BASE}${resolvedPath}${qs}`;
    lines.push(`curl -X ${endpoint.method} '${url}' \\`);
    if (hasBody && Object.keys(bodyObj).length) {
      lines.push(`  -H 'x-api-key: ${key}' \\`);
      lines.push(`  -H 'Content-Type: application/json' \\`);
      lines.push(`  -d '${JSON.stringify(bodyObj, null, 2).replace(/'/g, "'\\''")}'`);
    } else {
      lines.push(`  -H 'x-api-key: ${key}'`);
    }
    return lines.join("\n");
  }

  if (lang === "javascript") {
    const lines = [
      `const BASE_URL = '${BASE}';`,
      ``,
      `const response = await fetch(\`\${BASE_URL}${resolvedPath}${qs}\`, {`,
      `  method: '${endpoint.method}',`,
      `  headers: {`,
      `    'x-api-key': '${key}',`,
      ...(hasBody ? [`    'Content-Type': 'application/json',`] : []),
      `  },`,
      ...(hasBody && Object.keys(bodyObj).length
        ? [
            `  body: JSON.stringify(${JSON.stringify(bodyObj, null, 2)
              .split("\n")
              .map((l, i) => (i === 0 ? l : "  " + l))
              .join("\n")}),`,
          ]
        : []),
      `});`,
      ``,
      `const data = await response.json();`,
    ];
    return lines.join("\n");
  }

  if (lang === "python") {
    const lines = [
      `import requests`,
      ``,
      `BASE_URL = '${BASE}'`,
      ``,
      `response = requests.${endpoint.method.toLowerCase()}(`,
      `    f'{BASE_URL}${resolvedPath}',`,
      `    headers={'x-api-key': '${key}'},`,
      ...(queryPairs.length
        ? [
            `    params={${queryPairs.map(([k, v]) => `'${k}': '${v}'`).join(", ")}},`,
          ]
        : []),
      ...(hasBody && Object.keys(bodyObj).length
        ? [
            `    json=${toPython(bodyObj)
              .split("\n")
              .map((l, i) => (i === 0 ? l : "    " + l))
              .join("\n")},`,
          ]
        : []),
      `)`,
      ``,
      `data = response.json()`,
    ];
    return lines.join("\n");
  }

  if (lang === "axios") {
    const lines = [
      `import axios from 'axios';`,
      ``,
      `const BASE_URL = '${BASE}';`,
      ``,
      `const { data } = await axios.${endpoint.method.toLowerCase()}(`,
      `  \`\${BASE_URL}${resolvedPath}\`,`,
      ...(hasBody && Object.keys(bodyObj).length
        ? [
            `  ${JSON.stringify(bodyObj, null, 2)
              .split("\n")
              .map((l, i) => (i === 0 ? l : "  " + l))
              .join("\n")},`,
          ]
        : hasBody
          ? [`  {},`]
          : []),
      `  {`,
      `    headers: { 'x-api-key': '${key}' },`,
      ...(queryPairs.length
        ? [
            `    params: {${queryPairs.map(([k, v]) => ` ${k}: '${v}'`).join(",")} },`,
          ]
        : []),
      `  }`,
      `);`,
    ];
    return lines.join("\n");
  }

  return "";
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  curl: "cURL",
  javascript: "JavaScript",
  python: "Python",
  axios: "Axios",
};
