---
title: "Webhooks: get told when orders and payments change"
description: Create a webhook endpoint, choose events, verify the signature, and handle deliveries reliably.
date: 2026-10-26
audience: developers
tags: [api, webhooks]
---

Instead of asking the API "has anything changed?" every few minutes, let FlowPOS tell you. A webhook is a URL on your server that FlowPOS calls the moment something happens, like a new order or a successful payment.

## Events you can subscribe to

| Area | Events |
|---|---|
| Orders | `order.created`, `order.updated`, `order.placed`, `order.status_changed` |
| Products | `product.created`, `product.updated` |
| Payments | `payment.paid`, `payment.failed`, `payment.refunded`, `payment.authorised`, `payment.captured`, `payment.released` |
| Subscriptions | `subscription.created`, `subscription.charged`, `subscription.payment_failed`, `subscription.cancelled` |

`GET /v1/webhook-event-types` returns the current list.

## 1. Create an endpoint

Your API key needs the `webhookEndpoints.create` permission.

```curl {% label="POST /v1/webhook-endpoints" %}
curl -X POST https://api.flowpos.co.uk/v1/webhook-endpoints \
  -H 'x-api-key: flpos_your_key_here' \
  -H 'Content-Type: application/json' \
  -d '{
  "url": "https://yourshop.com/webhooks/flowpos",
  "events": ["order.placed", "payment.paid"],
  "description": "Order sync"
 }'
```

The response includes the endpoint's **signing `secret`**. Store it with your other secrets. If it leaks, rotate it with `POST /v1/webhook-endpoints/{id}/secret`.

To pause deliveries without deleting the endpoint, update it with `"is_active": false`.

## 2. What you receive

FlowPOS sends a `POST` with a JSON body:

```json {% label="Request body" %}
{
  "event_id": "5f0c7a8e-2b1d-4c3e-9a6f-1d2e3f4a5b6c",
  "event": "payment.paid",
  "timestamp": 1704877200,
  "data": {
    "payment": { "id": 11571, "status": "paid", "amount": 42.5 }
  }
}
```

- `data` holds the `order`, `payment` or `subscription` the event is about.
- The `X-Webhook-Event-Id` header carries the same `event_id`.
- The `X-Webhook-Signature` header carries the signature (see below).

## 3. Verify the signature

The signature is an **HMAC-SHA256** of the raw request body, using your endpoint's secret, written as hex. Calculate it yourself and compare it to `X-Webhook-Signature`. If they don't match, reject the request.

```javascript {% label="Node.js (Express)" %}
const crypto = require("crypto");

app.post("/webhooks/flowpos", express.raw({ type: "application/json" }), (req, res) => {
  const expected = crypto
    .createHmac("sha256", process.env.FLOWPOS_WEBHOOK_SECRET)
    .update(req.body) // the raw body, before JSON parsing
    .digest("hex");
  const received = req.get("X-Webhook-Signature") || "";

  const valid =
    received.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
  if (!valid) return res.sendStatus(401);

  const event = JSON.parse(req.body);
  // queue the work, then answer straight away
  res.sendStatus(200);
});
```

```php {% label="PHP" %}
$payload = file_get_contents('php://input');
$expected = hash_hmac('sha256', $payload, getenv('FLOWPOS_WEBHOOK_SECRET'));

if (! hash_equals($expected, $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? '')) {
    http_response_code(401);
    exit;
}
```

{% callout type="info" title="Use the raw body" %}
Calculate the signature on the body exactly as it arrived. If your framework parses the JSON and you re-encode it, spacing or key order can change and the signature won't match.
{% /callout %}

## 4. Handle deliveries well

- **Answer fast.** FlowPOS waits up to 15 seconds for a response. Reply with a `2xx` as soon as you've stored the event, and do the slow work in the background.
- **Expect duplicates.** Use `event_id` to skip events you've already handled.
- **Don't rely on order.** Events can arrive out of sequence. When it matters, fetch the latest state from the API.

## 5. When a delivery fails

Every attempt is logged, with the response status, body and timing. If your server was down, you can find the missed events and send them again:

- `GET /v1/webhook-endpoints/{id}/events` lists recent events.
- `GET /v1/webhook-endpoints/{id}/events/{eventId}` shows each delivery attempt.
- `POST /v1/webhook-endpoints/{id}/events/{eventId}/retry` sends it again.

See [Webhooks](/api/webhooks) in the API reference for every field.
