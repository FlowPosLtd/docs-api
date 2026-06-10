import type { Endpoint } from "../types";

export type Language = "curl" | "javascript" | "python" | "axios";

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
  for (const [k, v] of Object.entries(pathValues)) {
    resolvedPath = resolvedPath.replace(`{${k}}`, v || `{${k}}`);
  }

  const queryPairs = Object.entries(queryValues).filter(([, v]) => v !== "");
  const qs = queryPairs.length
    ? "?" + queryPairs.map(([k, v]) => `${k}=${v}`).join("&")
    : "";

  const bodyObj: Record<string, unknown> = {};
  const arrayFields: Record<string, Record<string, unknown>> = {};

  (endpoint.bodyParams || []).forEach((p) => {
    const raw =
      bodyValues[p.name] !== undefined && bodyValues[p.name] !== ""
        ? bodyValues[p.name]
        : p.example;
    if (!raw) return;

    const m = p.name.match(/^([^[]+)\[\]\.(.+)$/);
    if (m) {
      const [, parent, field] = m;
      if (!arrayFields[parent]) arrayFields[parent] = {};
      if (p.type === "object[]") {
        try {
          arrayFields[parent][field] = JSON.parse(raw);
        } catch {
          arrayFields[parent][field] = raw;
        }
      } else if (p.type === "integer" || p.type === "number") {
        const n = Number(raw);
        arrayFields[parent][field] = isNaN(n) ? raw : n;
      } else if (p.type === "boolean") {
        arrayFields[parent][field] =
          raw === "true" ? true : raw === "false" ? false : raw;
      } else if (raw === "null") {
        arrayFields[parent][field] = null;
      } else {
        arrayFields[parent][field] = raw;
      }
    } else if (p.type !== "object[]") {
      bodyObj[p.name] = raw;
    }
  });

  for (const [parent, fields] of Object.entries(arrayFields)) {
    bodyObj[parent] = [fields];
  }

  const BASE = "{BASE_URL}";

  if (lang === "curl") {
    const lines: string[] = [];
    const url = `${BASE}${resolvedPath}${qs}`;
    lines.push(`curl -X ${endpoint.method} '${url}' \\`);
    if (hasBody && Object.keys(bodyObj).length) {
      lines.push(`  -H 'x-api-key: ${key}' \\`);
      lines.push(`  -H 'Content-Type: application/json' \\`);
      lines.push(`  -d '${JSON.stringify(bodyObj, null, 2)}'`);
    } else {
      lines.push(`  -H 'x-api-key: ${key}'`);
    }
    return lines.join("\n");
  }

  if (lang === "javascript") {
    const lines = [
      `const BASE_URL = 'https://api.yourflowpos.com';`,
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
      `BASE_URL = 'https://api.yourflowpos.com'`,
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
            `    json=${JSON.stringify(bodyObj, null, 4)
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
      `const BASE_URL = 'https://api.yourflowpos.com';`,
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
