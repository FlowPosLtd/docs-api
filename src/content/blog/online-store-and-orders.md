---
title: "Selling online with FlowPOS: your store, delivery and collection"
description: Set up your online store, choose how customers get their orders, and keep track of every order in one place.
date: 2026-10-26
audience: businesses
tags: [online-store, orders, delivery]
---

Your FlowPOS online store lets customers order from you at any time, and those orders land in the same place as your till orders. Here's how to set it up and what happens when an order comes in.

## Set up your store

Open **Online store → Store** in the dashboard. The store settings are:

- **Store name**: what customers see.
- **Minimum order (£)**: the lowest basket total you'll accept.
- **Collection available**: lets customers collect their order in person.
- **Pay later**: lets customers place an order now and pay later.
- **Guest checkout**: lets customers check out without creating an account.
- **Default shipping rate**: the delivery charge picked first at checkout.
- **Maintenance mode**: temporarily closes the store to shoppers, with a message you write ("Back on Monday!").

## Make it look like you

Go to **Online store → Themes** to choose how your store looks:

- Browse the **Theme marketplace**, then pick **Install & activate** to switch now, or **Install only** to try it later.
- Activating a theme takes effect straight away. Your previous theme stays in **My themes**, so you can switch back at any time.
- You can also import, download or delete themes. If you're comfortable with code, use **Online store → Editor** to change a theme's files.

## Use your own domain

Customers can shop at your own web address, such as `shop.joescoffee.co.uk`:

1. Go to **Settings → Domains** and choose **Add a domain**. A subdomain like `shop.` works best.
2. Add the **TXT record** FlowPOS shows you (named `_flowpos-verify`) at your domain provider.
3. Click **Check DNS**. DNS changes can take up to 24 hours to appear.
4. Once it's verified, choose **Make default**.

## Delivery and collection

At checkout, customers choose how to get their order:

- **Delivery**: sent to their address. Delivery charges are **flat rates** that you set under **Settings → Shipping**, such as "Local delivery £3.50" or "Free delivery £0". Changes apply to new checkouts.
- **Collect in store**: the customer picks a **collection location**. This only appears when **Collection available** is on and you have at least one location.

### Ordering for later

Customers can ask for a time that suits them:

- **Collection** orders can always have a preferred collection date and time.
- **Delivery** orders can be scheduled when the delivery rate has **Customer can schedule delivery** switched on.

If the customer doesn't pick a time, the order is treated as **as soon as possible**. Scheduled orders show "Scheduled …" at the top of the order page, so your team knows when it's due.

## When an order comes in

When a customer places an online order:

- **They get an email** confirming it, if they gave an email address. They're also emailed if the order is later **cancelled** or **refunded**.
- **Your team gets an email** saying "New online order #… – £…".
- **It appears on your tills and kitchen screens** at your default order location (**Settings → Point of sale → Configuration**).
- **It appears in Sales → Orders.**

## Keeping track of orders

**Sales → Orders** shows every order, whether it came from your online store, a till or the dashboard:

- Tabs for **All**, **Pending**, **Completed** and **Cancelled**.
- Filters for location, **source** (Online, ePOS or Manual), **mode** (Eat in, Takeaway, Collection, Drive-thru, Delivery, In store) and date.
- Select several orders to **mark them completed** or **cancel** them in one go, or **export** your orders.

{% callout type="info" title="One set of order numbers" %}
Online orders and till orders share one sequence of order numbers, so no two orders ever have the same number. Change the prefix and format under **Settings → Orders**.
{% /callout %}
