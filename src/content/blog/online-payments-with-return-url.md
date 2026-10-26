---
title: Taking online payments with return_url
description: Create a payment, send your customer to the hosted payment page, bring them back to your site, and confirm the payment safely.
date: 2026-10-26
audience: developers
tags: [api, payments, return-url]
---

FlowPOS hosts the card payment page for you, so card details never touch your servers. Your code creates the payment, sends the customer to pay, and gets them back afterwards. `return_url` controls where "back" is.

## The flow at a glance

1. Your server **creates a payment** and gets back a `url`.
2. You **redirect the customer** to that `url` to pay.
3. When they've paid, FlowPOS **sends them to your `return_url`**.
4. Your server **confirms the payment** with a webhook or an API call before fulfilling the order.

## 1. Create the payment

Your API key needs the `payments.create` permission.

```curl {% label="POST /v1/payments" %}
curl -X POST https://api.flowpos.co.uk/v1/payments \
  -H 'x-api-key: flpos_your_key_here' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount": "42.50",
  "description": "Order #1042",
  "customer_email": "jane@example.com",
  "return_url": "https://yourshop.com/checkout/complete"
 }'
```

| Field | Notes |
|---|---|
| `amount` | Required. Up to 2 decimal places, e.g. `42.50` for £42.50. |
| `description` | Optional, up to 255 characters. |
| `customer_email` | Optional. Where the receipt goes. |
| `type` | `regular` (the default) takes the money now; `pre_auth` holds it so you can capture or release it later. |
| `return_url` | Optional. Must start with `https://`, up to 2048 characters. |

The response contains the payment, including its `id` and the hosted page `url`:

```json {% label="200 OK" %}
{
  "data": {
    "payment": {
      "id": 11571,
      "status": "pending",
      "amount": 42.5,
      "source": "api",
      "url": "https://payment.flowpos.co.uk/6526fe79-47a1-4a0e-9244-dae24e26b43b",
      "return_url": "https://yourshop.com/checkout/complete"
    }
  },
  "status": true
}
```

Save the payment `id` against your order, because you'll need it in step 4.

## 2. Send the customer to pay

Redirect the customer's browser to `url`. They enter their card details on the FlowPOS payment page.

## 3. Back to your site

When the payment succeeds, FlowPOS redirects the customer to your `return_url`, with two query parameters added:

```text {% label="Where the customer lands" %}
https://yourshop.com/checkout/complete?paymentId=11571&status=paid
```

If your URL already has a query string, the parameters are added with `&`. If it has a `#fragment`, they go before it. For example, `https://yourshop.com/done?ref=abc#/thanks` becomes `https://yourshop.com/done?ref=abc&paymentId=11571&status=paid#/thanks`.

If you don't send a `return_url`, the customer sees the FlowPOS success page instead.

## 4. Confirm the payment on your server

{% callout type="warning" title="Don't trust the URL alone" %}
Anyone can type `?status=paid` into a browser. Use the redirect to show a "thanks, we're confirming your payment" page, and only fulfil the order once your server has confirmed it.
{% /callout %}

There are two ways to confirm:

- **Webhook (recommended):** subscribe to `payment.paid` and fulfil the order when it arrives. It can land a moment after the customer is redirected, so your thank-you page should handle "still confirming". See the [webhooks guide](/blogs/webhooks-guide).
- **API call:** fetch the payment and check its `status`:

```curl {% label="GET /v1/payments/{id}" %}
curl https://api.flowpos.co.uk/v1/payments/11571 \
  -H 'x-api-key: flpos_your_key_here'
```

## Moving from success_redirect_url

Older integrations used one account-wide **success redirect URL** in payment settings. That setting is **deprecated**: it can no longer be changed, and it's only used for payments created without a `return_url`.

Its parameters were also different: `status=success`, `payment_ref` and `redirect_status`. To move over:

1. Pass `return_url` on every payment you create.
2. Read `paymentId` and `status` on your return page instead of `payment_ref`.

The full parameter list is on [Create a payment](/api/payments).
