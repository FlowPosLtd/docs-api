---
title: "Taking card payments in person with terminal readers"
description: How card readers connect to your tills, how to link one with an App PIN, and what to do if something goes wrong.
date: 2026-10-26
audience: businesses
tags: [terminal-readers, payments, epos]
---

A terminal reader is the card machine your customers tap or insert their card into. With FlowPOS, the till sends the amount straight to the reader, so staff never type it in twice.

## Before you start

You need:

- **A connected payment account.** Readers work through the same payment partner as the rest of your card payments, so set this up first under **Settings → Payment accounts**.
- **A location.** Each reader belongs to one of your locations, and a till only sees the readers at its own location.

## Adding a reader

New readers are added for you by FlowPOS. Contact support with the reader's **registration code** and tell us which location it's for. We'll set up the reader and give it a name you'll recognise, such as "Counter 1".

You'll then see it under **Settings → Business → Terminal readers**, with its location and status.

## Linking the reader app with an App PIN

The reader runs a small FlowPOS app that needs linking to your account:

1. Under **Settings → Terminal readers**, choose the reader and generate an **App PIN**: 9 letters.
2. Type the PIN into the app on the reader. Do this soon after creating it, because the PIN expires after a few minutes.
3. The reader's status changes to **Signed in**.

The status column shows where each reader is:

| Status | Meaning |
|---|---|
| Signed in | Ready to take payments. |
| PIN ready | A PIN has been created and is waiting to be typed in. |
| Not signed in | The reader needs a new PIN. |

To disconnect a reader, for example before moving it, choose **Sign out this reader**. You'll need a new App PIN to use it again.

## Taking a payment

1. On the till, finish the order and choose to pay by **card**.
2. Pick the reader. Only readers at the till's location are listed.
3. The amount appears on the reader, and the customer taps or inserts their card.
4. The till is told the moment the payment succeeds or fails.

If the customer changes their mind while the reader is waiting, staff can **cancel** the payment from the till.

Payments can be split: for example, part on one card, part on another, and the rest in cash.

## Refunds

Card refunds go back to the customer's card through our payment partner. You can refund all or part of a payment, up to what's left of it. A refund may show as **pending** for a short while until it's confirmed.

{% callout type="warning" title="Reader not responding?" %}
If FlowPOS can't reach a reader, the till tells you to pair it again. Generate a new App PIN under **Settings → Terminal readers** and type it into the reader. If that doesn't work, contact FlowPOS support.
{% /callout %}
