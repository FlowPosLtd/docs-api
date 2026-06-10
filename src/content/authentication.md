# Authentication

How to authenticate your API requests

## API Keys

The FlowPOS API uses API keys to authenticate requests. You can generate and manage your API keys from the FlowPOS Dashboard under **Settings → API Keys**.

Each API key can be scoped to specific permissions, allowing you to create least-privilege keys for each integration or service that connects to FlowPOS.

{% callout type="danger" title="Keep your API key secure" %}
Your API key carries all the privileges you grant it. Never expose it in client-side JavaScript, public repositories, or any place where it could be read by unauthorized parties. If a key is compromised, revoke it immediately and generate a new one.
{% /callout %}

## Sending the API key

Include your API key in the `x-api-key` header on **every** API request. There is no session or token exchange — each request is independently authenticated.

{% code-panel language="curl" label="Example request" %}
curl -X GET 'https://api.flowpos.co.uk/v1/customers' \
  -H 'x-api-key: your_api_key_here'
{% /code-panel %}

## Generating an API key

1. Sign in to your FlowPOS Dashboard.
2. Navigate to **Settings → API Keys** in the left sidebar.
3. Click **Create API Key**.
4. Give your key a name that describes its purpose (e.g. "Shopify integration").
5. Select the permissions this key should have.
6. Optionally set an expiry date.
7. Click **Create** — copy the key token immediately. It will not be shown again.

## Authentication errors

If your API key is missing, invalid, or expired, the API returns a `401 Unauthorized` response.

{% code-panel language="json" label="401 Unauthorized" %}
{
  "message": "Unauthenticated."
}
{% /code-panel %}

## Tenant scoping

Every API key belongs to exactly one tenant account. All resources created or fetched via the API are automatically scoped to that tenant — you cannot access another tenant's data with your key. This isolation is enforced at the server level on every request.
