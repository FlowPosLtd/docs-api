import {
  httpErrors,
  errorResponseShape,
  notFoundShape,
  unauthorizedShape,
} from "../data/errors-data";
import { CodeBlock } from "../components/CodeBlock";

export function ErrorsPage() {
  return (
    <div>
      <h1 className="t-title mb-1">Errors</h1>
      <p className="t-body-sm mb-8">How the FlowPOS API communicates errors</p>

      <section className="mb-10">
        <h2 className="t-heading mb-3">Error response format</h2>
        <p className="t-body mb-4">
          The FlowPOS API uses conventional HTTP response codes to indicate
          success or failure. Error responses are JSON objects with a{" "}
          <code className="t-code">message</code> field and an optional{" "}
          <code className="t-code">errors</code> map for validation failures.
        </p>

        {[
          {
            label: "Validation error (422)",
            dot: "bg-put",
            header: "422 Unprocessable Entity",
            code: errorResponseShape,
          },
          {
            label: "Not found (404)",
            dot: "bg-destroy",
            header: "404 Not Found",
            code: notFoundShape,
          },
          {
            label: "Unauthorized (401)",
            dot: "bg-destroy",
            header: "401 Unauthorized",
            code: unauthorizedShape,
          },
        ].map((item) => (
          <div key={item.label} className="mb-4">
            <p className="t-caption mb-2">{item.label}</p>
            <div className="bg-pitch-900 rounded-lg border border-pitch-600 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
                <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                <span className="text-xs font-mono text-pitch-300">
                  {item.header}
                </span>
              </div>
              <CodeBlock
                language="json"
                code={JSON.stringify(item.code, null, 2)}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="t-heading mb-3">HTTP status codes</h2>
        <p className="t-body mb-4">
          Codes in the <code className="t-code">2xx</code> range indicate
          success. Codes in the <code className="t-code">4xx</code> range
          indicate a client error (check your request). Codes in the{" "}
          <code className="t-code">5xx</code> range indicate a server error.
        </p>
        <div className="border border-line rounded-lg overflow-hidden">
          <div className="grid grid-cols-[80px_140px_1fr] t-caption px-4 py-2 bg-canvas-subtle border-b border-line">
            <span>Status</span>
            <span>Code</span>
            <span>Description</span>
          </div>
          {httpErrors.map((err, i) => (
            <div
              key={err.status}
              className={`grid grid-cols-[80px_140px_1fr] items-start px-4 py-3 bg-canvas ${
                i > 0 ? "border-t border-line-subtle" : ""
              }`}
            >
              <span
                className={`font-mono font-semibold text-sm ${
                  err.status >= 500
                    ? "text-destroy"
                    : err.status >= 400
                      ? "text-put"
                      : "text-get"
                }`}
              >
                {err.status}
              </span>
              <code className="font-mono text-xs text-ink-secondary mt-0.5">
                {err.code}
              </code>
              <span className="t-body-sm">{err.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="t-heading mb-3">Handling errors in code</h2>
        <p className="t-body mb-4">
          Always check the HTTP status code before parsing the response body.
          For validation errors, iterate the{" "}
          <code className="t-code">errors</code> object to display field-level
          feedback to users.
        </p>
        <div className="bg-pitch-900 rounded-lg border border-pitch-600 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
            <span className="text-xs text-pitch-400 font-mono">JavaScript</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`const response = await fetch('https://api.flowpos.co.uk/v1/customers', {
  method: 'POST',
  headers: {
    'x-api-key': 'your_api_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Jane', email: 'jane@example.com' }),
});

if (!response.ok) {
  const error = await response.json();

  if (response.status === 422) {
    Object.entries(error.errors || {}).forEach(([field, msg]) => {
      console.error(\`\${field}: \${msg}\`);
    });
  } else if (response.status === 401) {
    // Redirect to sign-in
  } else {
    console.error(error.message);
  }
  return;
}

const data = await response.json();`}
          />
        </div>
      </section>
    </div>
  );
}
