import { CodeBlock } from "../components/CodeBlock";

export function AuthPage() {
  return (
    <div>
      <h1 className="t-title mb-1">Authentication</h1>
      <p className="t-body-sm mb-8">How to authenticate your API requests</p>

      <div>
        <section className="mb-10">
          <h2 className="t-heading mb-3">API Keys</h2>
          <p className="t-body mb-4">
            The FlowPOS API uses API keys to authenticate requests. You can
            generate and manage your API keys from the FlowPOS Dashboard under{" "}
            <strong>Settings → API Keys</strong>.
          </p>
          <p className="t-body mb-4">
            Each API key can be scoped to specific permissions, allowing you to
            create least-privilege keys for each integration or service that
            connects to FlowPOS.
          </p>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-danger-faint border border-danger-muted mb-6">
            <svg
              className="w-5 h-5 text-danger shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm">
              <p className="font-semibold text-danger-ink mb-1">
                Keep your API key secure
              </p>
              <p className="t-body-sm">
                Your API key carries all the privileges you grant it. Never
                expose it in client-side JavaScript, public repositories, or any
                place where it could be read by unauthorized parties. If a key
                is compromised, revoke it immediately and generate a new one.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="t-heading mb-3">Sending the API key</h2>
          <p className="t-body mb-4">
            Include your API key in the{" "}
            <code className="t-code">x-api-key</code> header on{" "}
            <strong>every</strong> API request. There is no session or token
            exchange — each request is independently authenticated.
          </p>

          <div className="mb-4">
            <p className="t-caption mb-2">Header</p>
            <div className="border border-line rounded-lg overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-canvas">
                <code className="text-sm font-mono font-semibold text-ink-primary w-40">
                  x-api-key
                </code>
                <span className="text-xs text-ink-tertiary mr-3">
                  string · required
                </span>
                <span className="t-body-sm">
                  Your API key generated from the Dashboard.
                </span>
              </div>
            </div>
          </div>

          <p className="t-caption mb-2">Example</p>
          <div className="bg-pitch-900 rounded-lg overflow-hidden border border-pitch-600">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
              <span className="text-xs text-pitch-400 font-mono">cURL</span>
            </div>
            <CodeBlock
              language="curl"
              code={`curl -X GET 'https://api.flowpos.co.uk/v1/customers' \\
  -H 'x-api-key: your_api_key_here'`}
            />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="t-heading mb-3">Generating an API key</h2>
          <ol className="space-y-3">
            {[
              "Sign in to your FlowPOS Dashboard.",
              "Navigate to Settings → API Keys in the left sidebar.",
              "Click Create API Key.",
              'Give your key a name that describes its purpose (e.g. "Shopify integration").',
              "Select the permissions this key should have.",
              "Optionally set an expiry date.",
              "Click Create — copy the key token immediately. It will not be shown again.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 t-body-sm">
                <span className="w-5 h-5 rounded-full bg-accent-faint border border-accent-muted text-accent-ink text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="t-heading mb-3">Authentication errors</h2>
          <p className="t-body mb-4">
            If your API key is missing, invalid, or expired, the API returns a{" "}
            <code className="t-code">401 Unauthorized</code> response:
          </p>
          <div className="bg-pitch-900 rounded-lg border border-pitch-600 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-pitch-600">
              <span className="w-2 h-2 rounded-full bg-destroy"></span>
              <span className="text-xs font-mono text-pitch-300">
                401 Unauthorized
              </span>
            </div>
            <CodeBlock
              language="json"
              code={`{\n  "message": "Unauthenticated."\n}`}
            />
          </div>
        </section>

        <section>
          <h2 className="t-heading mb-3">Tenant scoping</h2>
          <p className="t-body">
            Every API key belongs to exactly one tenant account. All resources
            created or fetched via the API are automatically scoped to that
            tenant — you cannot access another tenant's data with your key. This
            isolation is enforced at the server level on every request.
          </p>
        </section>
      </div>
    </div>
  );
}
