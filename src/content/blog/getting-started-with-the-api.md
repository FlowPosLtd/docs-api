---
title: Getting started with the FlowPOS API
description: API keys, your first request, response and error shapes, and pagination, in ten minutes.
date: 2026-10-26
audience: developers
tags: [api, getting-started]
---

The FlowPOS API gives your code the same access to orders, products, customers and payments that your team has in the dashboard. This guide takes you from no key to a working integration.

## The basics

- **Base URL:** `https://api.flowpos.co.uk/v1`
- **Authentication:** an API key in the `x-api-key` header
- **Format:** JSON in, JSON out

## 1. Create an API key

In the FlowPOS dashboard, go to **Settings → API keys** and create a key.

- **Name it after what will use it**, e.g. "Shopify sync" or "Accounting export".
- **Give it only the permissions it needs.** Permissions look like `orders.view`, `payments.create` or `webhookEndpoints.create`. A key that only reads orders can't refund a payment.
- **Optionally set an expiry date.** An expired key stops working on that date.

Keys start with `flpos_`. Treat them like passwords: keep them on your server, never in a browser or mobile app, and never in a git repository.

You can also manage keys through the API itself: see [API keys](/api/api-keys).

## 2. Make your first request

Send the key in the `x-api-key` header on every request. There's no login call or token exchange.

```curl {% label="List your customers" %}
curl https://api.flowpos.co.uk/v1/customers \
  -H 'x-api-key: flpos_your_key_here'
```

{% callout type="info" title="No tenant header needed" %}
An API key belongs to one FlowPOS account, so the API knows which business you mean from the key alone. You don't need to send anything else.
{% /callout %}

## 3. Reading responses

Successful responses wrap the result in `data`, with `"status": true`:

```json {% label="200 OK" %}
{
  "data": {
    "customer": { "id": 42, "name": "Jane Smith", "email": "jane@example.com" }
  },
  "status": true
}
```

## 4. Handling errors

Errors return `"status": false`, a `message`, and, for invalid input, `errors` keyed by field:

```json {% label="422 Unprocessable Entity" %}
{
  "status": false,
  "message": "The email field is required.",
  "errors": {
    "email": "The email field is required."
  }
}
```

The status codes you'll see most:

| Code | Meaning | What to do |
|---|---|---|
| 401 | Missing, unknown or expired key | Check the `x-api-key` header |
| 403 | The key lacks a permission | Add the permission to the key |
| 404 | Not found | Check the ID and that it belongs to your account |
| 422 | Invalid input | Show `errors` to the user, or fix the request |
| 429 | Too many requests | Wait and try again |
| 500 | Something broke on our side | Retry later; contact support if it continues |

Most endpoints have no request limit. A few heavy ones, like exports, are limited, e.g. 3 exports a minute. See [Errors](/api/errors) for the full list.

## 5. Paging through lists

List endpoints return one page at a time. Use `page` and `limit` (most lists default to 15 per page):

```curl {% label="Page 2, 50 per page" %}
curl 'https://api.flowpos.co.uk/v1/orders?page=2&limit=50' \
  -H 'x-api-key: flpos_your_key_here'
```

Each page includes `current_page`, `last_page`, `per_page`, `total` and `next_page_url`. To fetch everything, keep requesting until `next_page_url` is `null`.

## Where next

- [Take online payments with return_url](/blogs/online-payments-with-return-url)
- [Get notified with webhooks](/blogs/webhooks-guide)
- Browse the full [API reference](/api)
