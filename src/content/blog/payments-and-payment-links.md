---
title: "Getting paid with FlowPOS: payments, payment links, refunds and payouts"
description: Connect your payment account, take payments, send payment links, handle refunds and see when money reaches your bank.
date: 2026-10-26
audience: businesses
tags: [payments, payment-links, payouts]
---

This guide covers how money moves through FlowPOS: from the moment a customer pays to the moment it reaches your bank account.

## 1. Connect your payment account

Before you can take card payments, connect a payment account under **Settings → Payment accounts**. It's a short form from our payment partner, and you can also complete it during sign-up. If you choose **Skip for now** then, you can come back to it later.

Your account shows one of these statuses:

| Status | What it means |
|---|---|
| Submitted | Your details are in. |
| Under review | They're being checked. |
| Verified | You're ready to take payments. |
| Needs info | A few more details are needed. Open the form to see what. |
| Rejected | Contact FlowPOS support. |

## 2. Take payments

- **On your tills**: cash or card (see our ePOS and terminal reader guides).
- **In your online store**: customers pay at checkout.
- **For orders you create in the dashboard**: open the order and use **Take payment**. Choose:
  - **Cash**: you've taken cash, so FlowPOS marks the order paid.
  - **Online**: FlowPOS creates a link for the customer to pay by card. You can copy it, open it, or create a new one.

Every payment appears under **Sales → Payments**. From there you can create a payment, export your payments, copy a payment's link, or email it to the customer.

### Holding money first

Some payments are **pre-authorised**: the money is held on the customer's card but not taken yet. A hotel deposit is a good example. For these, you can:

- **Capture** the payment to take the money,
- **Release** it to give the hold back,
- or **increase** the amount held.

## 3. Payment links

Payment links are reusable web links that anyone can pay. They work well for invoices, deposits, donations or selling something without a store.

Create one under **Money → Payment links → New payment link**:

- **Fixed amount**, e.g. "Cake order deposit – £20" (at least £0.50), or
- **Open amount**: the customer chooses how much, between a minimum and maximum you set. You can also suggest an amount.
- Pick the button text: **Pay**, **Donate**, **Book**, **Contribute** or **Support**.
- Add a description, then copy the link and share it by email, text or social media.

Payment pages can be shown on your own verified domain. Choose it under **Settings → Payment settings → Serve payment pages from**. Links you've already shared keep working.

## 4. Receipts

Switch on **Email receipts** under **Settings → Payment settings** to send customers a receipt automatically after every successful payment.

## 5. Refunds

To refund a payment, open it under **Sales → Payments** and choose **Refund**:

- Choose **Full amount** or **Partial amount**. The smallest refund is £0.10.
- Pick a reason: customer request, duplicate payment, suspected fraud, payment error or order cancelled.
- The customer gets an email when the refund is made.

Only team members whose role allows refunds can do this. On the tills, staff need the **Refunds** permission (see **Point of sale → Employees**).

{% callout type="info" title="Card refunds can take a moment" %}
A card refund can show as **pending** until our payment partner confirms it. That's normal. It then updates by itself.
{% /callout %}

## 6. Payouts: getting money to your bank

Your takings are paid out to your bank account. To set this up:

1. Add a bank account under **Settings → Payment accounts** with **Add payout method**. UK sort codes, IBAN and other formats are supported, in GBP, EUR, USD, AUD and CAD.
2. Each payout then appears under **Money → Payouts**.

Account owners also get an email when a payout is on its way.

If a customer disputes a card payment with their bank, the account owner is emailed straight away, so you can respond in time.
