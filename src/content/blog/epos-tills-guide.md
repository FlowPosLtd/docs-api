---
title: "Running your shop floor with FlowPOS ePOS: tills, kitchen screens and kiosks"
description: How your tills, kitchen displays and kiosks work together, from opening the day to closing it.
date: 2026-10-26
audience: businesses
tags: [epos, tills, getting-started]
---

FlowPOS ePOS is the part of FlowPOS you use in person: at the counter, in the kitchen and on a self-service screen. This guide walks through how it fits together, using a café called "Joe's Coffee" as the example.

## Three kinds of device

Every device you run FlowPOS on is one of three types:

- **Till**: where your staff take orders and payments.
- **KDS** (kitchen display screen): shows the kitchen what to make as orders come in.
- **Kiosk**: a screen your customers use to order for themselves.

Each device belongs to one **location**. If Joe's Coffee has a shop on the high street and one at the station, each shop has its own tills and screens.

{% callout type="info" title="How many devices can I use?" %}
Your subscription sets how many devices each location can have. If a location is already at its limit, a new device can't sign in until another is removed. Speak to FlowPOS support if you need more.
{% /callout %}

## Your team and their PINs

Add your staff in the dashboard under **Point of sale → Employees**. Each employee gets their own **6-digit PIN** automatically, and that's all they need to sign in on a till. If a PIN is ever shared by mistake, you can generate a new one.

When you add or edit an employee you can switch on:

- **Manager**: for staff who open and close the day, apply discounts and void items.
- **Refunds**: allows them to refund a payment from the till.

Staff also **clock in and out** with their PIN, so **Point of sale → Hours worked** shows who worked when.

## Opening and closing the day

Most till actions need the day to be open first, so the first job each morning is to **start the day** on the till.

At closing time, **end the day**. FlowPOS then:

- clocks out anyone still clocked in,
- resets the day counter used in order numbers (more on that below),
- sends you a "Closed" notification with how long the location traded.

You'll find each location's sales, hours worked, tasks and activity under **Point of sale → Overview**, including a report for every past day.

## Taking an order

On the till, staff choose how the order will be served. FlowPOS has six **order modes**:

| Mode | Example |
|---|---|
| Eat in | A table of two having lunch |
| Takeaway | A coffee to go |
| Collection | Ordered ahead, picked up later |
| Drive-thru | Ordered from the car |
| Delivery | Sent to the customer's address |
| In store | A retail sale at the counter |

An order can also have:

- a **customer**: search for an existing one or add a new one
- a **note** of up to 1,024 characters (e.g. "oat milk, no sugar")
- a **delivery address**
- a **discount**
- a **table** and the **number of guests**

## Tables

If you serve at tables, set them up in **Settings → Point of sale → Table management**:

1. Choose the location.
2. Add a **section**, such as "Inside" or "Terrace".
3. Add tables to it, each with a name and a number of chairs.

On the till, staff can see each table's orders and free the table when the guests leave.

## Taking payment

Customers can pay by **cash** or by **card** on a connected card reader (see our guide to terminal readers).

Payments can be **split**. For example, two friends sharing a £24 bill can pay £12 each. The order shows as partly paid until the full amount is in. FlowPOS won't take more than the order total, and the smallest card payment is £0.35.

If something goes wrong, orders can be **completed**, **cancelled**, set back to **pending**, or **refunded**. A refund needs the PIN of an employee with refund rights, plus a reason: customer request, duplicate payment, suspected fraud, payment error or order cancelled.

## Online orders on your tills

Orders placed in your online store appear on your tills and kitchen screens straight away, together with any updates and payments.

If an online order isn't for a particular location, FlowPOS sends it to your **default order location**. Set this under **Settings → Point of sale → Configuration → Send online orders to**.

If a device has been offline for a while, it catches up on what it missed when it reconnects.

## Order numbers

Set the order number format under **Settings → Orders**. Tills can use:

- **Sequence + day counter**, e.g. `ORD0042-7`: the 7th order at that till today. This is handy for calling out orders on a busy shift.
- **Sequence only**, e.g. `ORD0042`, the same as online orders.

You can also change the prefix (`ORD` by default) and the minimum number of digits. Numbers are never reused, and changes only affect new orders.

## Staff tasks

You can create tasks in the dashboard, like "Clean the coffee machine". Staff see them on the till and can update their status and add notes as they go.

{% callout type="success" title="Next steps" %}
Add your employees, set up your tables, and pick where online orders should go. Then start the day on your first till and take a test order.
{% /callout %}
