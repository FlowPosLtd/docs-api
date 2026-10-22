import type { ConstantGroup } from "../types";

export const constantGroups: ConstantGroup[] = [
  {
    id: "order-status",
    name: "Order Status",
    description:
      "The `status_label` field on an Order object reflects the current lifecycle state. Use the numeric status ID when calling the Update Order Status endpoint.",
    constants: [
      {
        value: "Pending",
        description:
          "`1`. The order has been created and is not yet complete. The default state for new orders.",
      },
      {
        value: "Completed",
        description:
          "`5`. The order has been fulfilled.",
      },
      {
        value: "Cancelled",
        description:
          "`6`. The order has been cancelled. Refunds are processed separately.",
      },
    ],
  },
  {
    id: "order-mode",
    name: "Order Mode",
    description:
      "The `order_mode` field indicates how the order is intended to be fulfilled.",
    constants: [
      {
        value: "EatIn",
        description:
          "`1`. The customer is dining in at the premises.",
      },
      {
        value: "Takeaway",
        description:
          "`2`. The order is prepared for the customer to take away.",
      },
      {
        value: "Collection",
        description:
          "`3`. The customer will collect the order (click and collect).",
      },
      {
        value: "Drive Thru",
        description:
          "`4`. The order is handed over at a drive-through.",
      },
      {
        value: "Delivery",
        description:
          "`5`. The order is delivered to the customer's address.",
      },
      {
        value: "InStore",
        description:
          "`6`. A walk-in sale at the till.",
      },
    ],
  },
  {
    id: "order-source",
    name: "Order Source",
    description:
      "The `source` field indicates the channel through which the order was placed.",
    constants: [
      {
        value: "epos",
        description:
          "Created on the FlowPOS EPOS till.",
      },
      {
        value: "online",
        description:
          "Placed through the online store.",
      },
      {
        value: "manual",
        description:
          "Created from the dashboard or through the API.",
      },
    ],
  },
  {
    id: "payment-status",
    name: "Payment Status",
    description:
      "The `status` field on a Payment object reflects the current state of that transaction.",
    constants: [
      {
        value: "pending",
        description:
          "Payment has been created but not yet authorised or captured.",
      },
      {
        value: "authorised",
        description:
          "Funds have been reserved on the customer's card but not yet captured.",
      },
      {
        value: "paid",
        description:
          "Payment has been successfully captured and funds are on their way.",
      },
      {
        value: "partially_refunded",
        description: "A partial refund has been issued for this payment.",
      },
      {
        value: "refunded",
        description:
          "The full payment amount has been refunded to the customer.",
      },
      {
        value: "released",
        description: "An authorised payment has been released (not captured).",
      },
      {
        value: "failed",
        description: "The payment attempt failed.",
      },
    ],
  },
  {
    id: "refund-reason",
    name: "Refund Reason",
    description:
      "When issuing a refund, pass one of these values as the `reason` field.",
    constants: [
      {
        value: "customer_request",
        description: "The customer requested the refund.",
      },
      {
        value: "duplicate_payment",
        description:
          "The customer was charged more than once for the same transaction.",
      },
      {
        value: "fraud_suspected",
        description: "The transaction is suspected to be fraudulent.",
      },
      {
        value: "payment_error",
        description: "A processing error occurred during payment.",
      },
      {
        value: "order_cancelled",
        description:
          "The order was cancelled and the payment needs to be reversed.",
      },
    ],
  },
  {
    id: "payment-type",
    name: "Payment Type",
    description:
      "The `type` field on a Payment describes how the funds are taken.",
    constants: [
      {
        value: "regular",
        description:
          "Charged immediately.",
      },
      {
        value: "pre_auth",
        description:
          "Funds are authorised and held, then captured or released later. Formerly called `deposit`, which is still accepted when creating a payment.",
      },
      {
        value: "transfer",
        description:
          "A payment made by transfer. Transfer payments cannot be refunded.",
      },
    ],
  },
  {
    id: "discount-type",
    name: "Discount Type",
    description:
      "The `type` field on a Discount defines how the reduction is calculated.",
    constants: [
      {
        value: "amount_off_order",
        description:
          "Applies a percentage or fixed amount reduction to the order total.",
      },
      {
        value: "free_shipping",
        description:
          "Waives the shipping charge when the discount code is applied.",
      },
    ],
  },
  {
    id: "subscription-frequency",
    name: "Subscription Frequency",
    description:
      "The `frequency` field on a Subscription plan defines the billing cycle.",
    constants: [
      { value: "weekly", description: "Customers are billed every 7 days." },
      {
        value: "monthly",
        description: "Customers are billed every calendar month.",
      },
      { value: "yearly", description: "Customers are billed once per year." },
    ],
  },
  {
    id: "subscription-customer-status",
    name: "Subscription Customer Status",
    description:
      "The `status` on a customer's subscription describes its current state.",
    constants: [
      {
        value: "pending",
        description: "Customer has subscribed but billing has not yet started.",
      },
      {
        value: "processing",
        description:
          "The first payment is with the payment provider and not settled yet: seconds for a card, days for a bank debit such as SEPA.",
      },
      {
        value: "active",
        description: "Subscription is active and payments are being collected.",
      },
      {
        value: "past_due",
        description:
          "A payment attempt failed; the subscription is in a grace period.",
      },
      {
        value: "cancelled",
        description: "The subscription has been cancelled.",
      },
    ],
  },
  {
    id: "payment-link-type",
    name: "Payment Link Type",
    description:
      "The `type` field on a Payment Link determines what the customer pays for.",
    constants: [
      {
        value: "fixed_amount",
        description:
          "The payment amount is set by you. Customers cannot change it.",
      },
      {
        value: "open_amount",
        description:
          "Customers enter their own amount, constrained by `minimum_amount` and `maximum_amount`.",
      },
      {
        value: "product",
        description:
          "Customers buy up to five of your products, with optional shipping and discount codes.",
      },
    ],
  },
  {
    id: "domain-status",
    name: "Domain Status",
    description:
      "The `status` field on a Domain reflects its state.",
    constants: [
      {
        value: "pending",
        description:
          "The domain has been added but its DNS is not yet verified.",
      },
      {
        value: "active",
        description:
          "DNS is verified and the domain is serving traffic.",
      },
      {
        value: "suspended",
        description:
          "The domain has been suspended and is not serving traffic.",
      },
      {
        value: "deleted",
        description:
          "The domain has been removed.",
      },
    ],
  },
  {
    id: "order-number-format",
    name: "Order Number Format",
    description:
      "The `epos` field in Order Number Settings controls how EPOS order numbers are generated.",
    constants: [
      {
        value: "sequence",
        description:
          "Incrementing sequence number with optional prefix and zero-padding (e.g. ORD-0042).",
      },
      {
        value: "sequence_plus_day",
        description:
          "Sequence that resets each day, combined with the day's number (e.g. ORD-001-15).",
      },
    ],
  },
];
