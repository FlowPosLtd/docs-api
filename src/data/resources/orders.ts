import type { Resource } from "../../types";

export const orderResources: Resource[] = [
  {
    id: "orders",
    name: "Orders",
    description:
      "Orders represent sales transactions. Each order has line items, optional customer details, payment records, and a status that tracks its lifecycle from Pending through to Completed or Cancelled.",
    endpoints: [
      {
        id: "list-orders",
        method: "GET",
        path: "/orders",
        title: "List all orders",
        description:
          "Returns a paginated list of orders. Filter by status or search by order number, customer name, or email.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number.",
            default: "1",
            example: "1",
          },
          {
            name: "search",
            type: "string",
            required: false,
            description: "Search by order number, customer name, or email.",
            example: "ORD-0042",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Filter by order status label.",
            enum: [
              "Pending",
              "Confirmed",
              "Processing",
              "On Hold",
              "Completed",
              "Cancelled",
            ],
            example: "Pending",
          },
        ],
        response: {
          orders: {
            current_page: 1,
            data: [
              {
                id: 42,
                order_number: "ORD-0042",
                is_online: false,
                customer_name: "Jane Smith",
                customer_email: "jane@example.com",
                customer_phone: "+44 7700 900001",
                order_mode: "Delivery",
                payment_status: "Paid",
                sub_total: 3800,
                total: 4250,
                total_discount: 0,
                shipping_charges: 450,
                status: "1",
                status_label: "Completed",
                source: "online",
                created_at: "2024-05-20T10:00:00Z",
                updated_at: "2024-05-21T09:30:00Z",
              },
            ],
            last_page: 5,
            total: 68,
            per_page: 15,
          },
        },
        responseDescription:
          "Returns a paginated list wrapped in an `orders` object.",
      },
      {
        id: "get-order",
        method: "GET",
        path: "/orders/{id}",
        title: "Retrieve an order",
        description:
          "Retrieves full details of a single order, including line items, payment records, and notes.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the order.",
          },
        ],
        response: {
          order: {
            id: 42,
            order_number: "ORD-0042",
            is_online: false,
            customer_id: 1,
            customer_name: "Jane Smith",
            customer_email: "jane@example.com",
            customer_phone: "+44 7700 900001",
            order_mode: "Delivery",
            payment_status: "Paid",
            sub_total: 3800,
            total: 4250,
            total_discount: 0,
            amount_refunded: 0,
            is_refundable: true,
            shipping_charges: 450,
            status_label: "Completed",
            source: "online",
            note: null,
            address: {
              address_line_1: "12 High Street",
              city: "London",
              post_code: "W1A 1AA",
              country: { shortcode: "GB", name: "United Kingdom" },
            },
            items: [
              {
                id: 1,
                product_name: "Classic Burger",
                variant_name: "Large",
                quantity: 2,
                price: 1200,
                total: 2400,
              },
            ],
            payments: [
              {
                id: 5,
                amount: 4250,
                status: "paid",
                card_brand: "visa",
                last_4: "4242",
                transaction_reference: "txn_3OkT2r2eZvKYlo2C0P",
                paid_at: "2024-05-20T10:05:00Z",
              },
            ],
            notes: [],
            created_at: "2024-05-20T10:00:00Z",
            updated_at: "2024-05-21T09:30:00Z",
          },
        },
        responseDescription:
          "Returns the full order object with items, payments, and notes.",
      },
      {
        id: "create-order",
        method: "POST",
        path: "/orders",
        title: "Create an order",
        description:
          "Creates a new order. You must supply at least one item. Customer details can be provided inline or via `customer_id` for existing customers.",
        bodyParams: [
          {
            name: "customer_id",
            type: "integer",
            required: false,
            description:
              "ID of an existing customer. If provided, `customer` inline object is still required for the order record.",
            example: "1",
          },
          {
            name: "customer.name",
            type: "string",
            required: true,
            description: "Customer full name.",
            example: "Jane Smith",
          },
          {
            name: "customer.email",
            type: "string",
            required: true,
            description: "Customer email address.",
            example: "jane@example.com",
          },
          {
            name: "customer.phone",
            type: "string",
            required: false,
            description: "Customer phone.",
            example: "+44 7700 900001",
          },
          {
            name: "items",
            type: "object[]",
            required: true,
            description:
              "Array of order line items. Each item requires `name`, `quantity`, and optionally `variant_id` and `price`.",
          },
          {
            name: "items[].variant_id",
            type: "integer",
            required: false,
            description: "Product variant ID (if selling a catalogue item).",
            example: "7",
          },
          {
            name: "items[].name",
            type: "string",
            required: true,
            description: "Product name for the line item.",
            example: "Classic Burger",
          },
          {
            name: "items[].price",
            type: "integer",
            required: false,
            description:
              "Unit price in the smallest currency unit (pence/cents).",
            example: "1200",
          },
          {
            name: "items[].quantity",
            type: "integer",
            required: true,
            description: "Quantity ordered.",
            example: "2",
          },
          {
            name: "note",
            type: "string",
            required: false,
            description: "Order-level note.",
            example: "Extra sauce please.",
          },
          {
            name: "discount",
            type: "number",
            required: false,
            description: "Discount amount in smallest currency unit.",
            example: "200",
          },
          {
            name: "shipping",
            type: "number",
            required: false,
            description: "Shipping charge in smallest currency unit.",
            example: "450",
          },
          {
            name: "payment_method",
            type: "string",
            required: false,
            description: "Payment method to use.",
            enum: ["online", "cash"],
            example: "online",
          },
          {
            name: "location_id",
            type: "integer",
            required: false,
            description: "Location ID for EPOS orders.",
            example: "1",
          },
        ],
        response: {
          order: {
            id: 43,
            order_number: "ORD-0043",
            status_label: "Pending",
            total: 4250,
            created_at: "2024-06-10T12:00:00Z",
            updated_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the newly created order.",
      },
      {
        id: "update-order-status",
        method: "POST",
        path: "/orders/{id}/status",
        title: "Update order status",
        description:
          "Updates the status of an order. See the Constants section for valid status IDs.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the order.",
          },
        ],
        bodyParams: [
          {
            name: "status",
            type: "integer",
            required: true,
            description: "The numeric status ID to transition to.",
            example: "2",
          },
        ],
        response: { message: "Order status updated successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "create-order-note",
        method: "POST",
        path: "/orders/{id}/notes",
        title: "Add an order note",
        description: "Adds an internal note to an order.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the order.",
          },
        ],
        bodyParams: [
          {
            name: "note",
            type: "string",
            required: true,
            description: "The note text.",
            example: "Customer called to confirm delivery address.",
          },
        ],
        response: {
          note: {
            id: 1,
            order_id: 42,
            note: "Customer called to confirm delivery address.",
            user_id: 2,
            user: { id: 2, name: "Admin User", full_name: "Admin User" },
            created_at: "2024-06-10T14:00:00Z",
            updated_at: "2024-06-10T14:00:00Z",
          },
        },
        responseDescription: "Returns the created note object.",
      },
      {
        id: "generate-payment-link",
        method: "POST",
        path: "/orders/{id}/pay",
        title: "Generate order payment link",
        description:
          "Generates a secure payment URL for a pending order. The link can be sent to the customer to complete payment online.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the order.",
          },
        ],
        bodyParams: [
          {
            name: "type",
            type: "string",
            required: false,
            description: "Payment type.",
            enum: ["card"],
            default: "card",
            example: "card",
          },
        ],
        response: {
          url: "https://pay.flowpos.io/checkout/ord_3OkT2r2eZvKYlo2C0P",
        },
        responseDescription: "Returns the payment URL.",
      },
      {
        id: "export-orders",
        method: "POST",
        path: "/orders/export.csv",
        title: "Export orders to CSV",
        description:
          "Queues a CSV export for the specified date range and emails it to the provided address.",
        bodyParams: [
          {
            name: "gte",
            type: "string",
            required: true,
            description: "Start of date range (ISO 8601).",
            example: "2024-01-01T00:00:00Z",
          },
          {
            name: "lte",
            type: "string",
            required: true,
            description: "End of date range (ISO 8601).",
            example: "2024-06-30T23:59:59Z",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address to send the CSV export to.",
            example: "reports@yourbusiness.com",
          },
        ],
        response: {
          message: "Export queued. You will receive an email shortly.",
        },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },
];
