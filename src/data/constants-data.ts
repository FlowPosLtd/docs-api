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
          "Order has been created but not yet confirmed. The default state for new orders.",
      },
      {
        value: "Confirmed",
        description: "Order has been accepted and is awaiting preparation.",
      },
      {
        value: "Processing",
        description: "Order is actively being prepared or fulfilled.",
      },
      {
        value: "On Hold",
        description: "Order is paused, awaiting customer or supplier action.",
      },
      {
        value: "Completed",
        description:
          "Order has been fully fulfilled and delivered to the customer.",
      },
      {
        value: "Cancelled",
        description:
          "Order has been cancelled. Refunds are processed separately.",
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
        value: "Eat-In",
        description: "Customer is dining in at the premises.",
      },
      {
        value: "Delivery",
        description: "Order is being delivered to a customer address.",
      },
      {
        value: "Collection",
        description: "Customer will collect (click-and-collect).",
      },
      {
        value: "Takeaway",
        description: "Order is prepared for customer to take away immediately.",
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
        description: "Created via the EPOS point-of-sale terminal.",
      },
      { value: "online", description: "Placed through the online storefront." },
      { value: "api", description: "Created via the REST API." },
      {
        value: "manual",
        description: "Manually entered by a team member via the dashboard.",
      },
      { value: "kiosk", description: "Placed via a self-service kiosk." },
      { value: "app", description: "Placed via a mobile application." },
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
      "The `type` field on a Payment describes the payment instrument used.",
    constants: [
      { value: "card", description: "Card payment." },
      { value: "cash", description: "Cash payment recorded in EPOS." },
      {
        value: "terminal",
        description: "Card-present payment via a Terminal reader.",
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
      "The `status` in a customer's subscription pivot describes their current subscription state.",
    constants: [
      {
        value: "pending",
        description: "Customer has subscribed but billing has not yet started.",
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
      "The `type` field on a Payment Link determines whether customers pay a fixed amount or choose their own.",
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
    ],
  },
  {
    id: "domain-status",
    name: "Domain Status",
    description:
      "The `status` field on a Domain reflects its DNS verification state.",
    constants: [
      {
        value: "pending_verification",
        description: "Domain has been added but DNS is not yet verified.",
      },
      {
        value: "active",
        description: "DNS is verified and the domain is serving traffic.",
      },
      {
        value: "error",
        description: "DNS check failed. Check your CNAME configuration.",
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
