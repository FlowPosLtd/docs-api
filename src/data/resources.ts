import type { Resource } from "../types";

export const resources: Resource[] = [
  {
    id: "customers",
    name: "Customers",
    description:
      "The Customer object represents a customer who has interacted with your business. Customers can have associated orders, addresses, notes, and group memberships.",
    endpoints: [
      {
        id: "list-customers",
        method: "GET",
        path: "/customers",
        title: "List all customers",
        description:
          "Returns a paginated list of customers for your tenant. Use the `search` parameter to filter by name, email, or phone. Results are ordered by creation date, newest first.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number for pagination.",
            default: "1",
            example: "1",
          },
          {
            name: "search",
            type: "string",
            required: false,
            description: "Filter customers by name, email, or phone number.",
            example: "john",
          },
          {
            name: "limit",
            type: "integer",
            required: false,
            description: "Number of results per page.",
            default: "15",
            example: "15",
          },
        ],
        response: {
          customers: {
            current_page: 1,
            data: [
              {
                id: 1,
                name: "Jane Smith",
                email: "jane@example.com",
                phone: "+44 7700 900001",
                has_online_account: true,
                orders_count: 5,
                created_at: "2024-03-10T09:15:00Z",
                updated_at: "2024-06-01T14:22:00Z",
              },
            ],
            last_page: 4,
            total: 52,
            per_page: 15,
          },
        },
        responseDescription:
          "Returns a paginated list wrapped in a `customers` object.",
      },
      {
        id: "create-customer",
        method: "POST",
        path: "/customers",
        title: "Create a customer",
        description:
          "Creates a new customer record. Email must be unique per tenant.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Full name of the customer.",
            example: "Jane Smith",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Customer email address. Must be unique.",
            example: "jane@example.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Customer phone number in international format.",
            example: "+44 7700 900001",
          },
        ],
        response: {
          customer: {
            id: 1,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+44 7700 900001",
            has_online_account: false,
            orders_count: 0,
            created_at: "2024-06-10T12:00:00Z",
            updated_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the newly created customer object.",
      },
      {
        id: "get-customer",
        method: "GET",
        path: "/customers/{id}",
        title: "Retrieve a customer",
        description:
          "Retrieves the full details of a customer, including their orders, notes, addresses, and group memberships.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the customer.",
          },
        ],
        response: {
          customer: {
            id: 1,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+44 7700 900001",
            has_online_account: true,
            orders_count: 5,
            otp: null,
            otp_expires_at: null,
            orders: [
              {
                id: 12,
                order_number: "ORD-0012",
                total: 4250,
                status_label: "Completed",
                created_at: "2024-05-20T10:00:00Z",
              },
            ],
            notes: [
              {
                id: 1,
                note: "VIP customer – priority support",
                user: { id: 2, name: "Admin User" },
                created_at: "2024-04-01T09:00:00Z",
              },
            ],
            addresses: [
              {
                address_line_1: "12 High Street",
                city: "London",
                post_code: "W1A 1AA",
                country: { shortcode: "GB", name: "United Kingdom" },
              },
            ],
            groups: [{ id: 2, name: "VIP", colour: "#FFD700" }],
            created_at: "2024-03-10T09:15:00Z",
            updated_at: "2024-06-01T14:22:00Z",
          },
        },
        responseDescription:
          "Returns the full customer object with nested orders, notes, addresses, and groups.",
      },
      {
        id: "update-customer",
        method: "PUT",
        path: "/customers/{id}",
        title: "Update a customer",
        description: "Updates the name and/or phone of an existing customer.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the customer.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Updated full name.",
            example: "Jane A. Smith",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Updated phone number.",
            example: "+44 7700 900002",
          },
        ],
        response: {
          customer: {
            id: 1,
            name: "Jane A. Smith",
            email: "jane@example.com",
            phone: "+44 7700 900002",
            has_online_account: true,
            orders_count: 5,
            created_at: "2024-03-10T09:15:00Z",
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated customer object.",
      },
      {
        id: "create-customer-note",
        method: "POST",
        path: "/customers/{customerId}/notes",
        title: "Add a customer note",
        description:
          "Adds an internal note to a customer record. Notes are visible only to your team.",
        pathParams: [
          {
            name: "customerId",
            type: "integer",
            required: true,
            description: "The numeric ID of the customer.",
          },
        ],
        bodyParams: [
          {
            name: "note",
            type: "string",
            required: true,
            description: "The note text to attach to the customer.",
            example: "Prefers email contact only.",
          },
        ],
        response: {
          note: {
            id: 3,
            customer_id: 1,
            note: "Prefers email contact only.",
            user_id: 2,
            user: { id: 2, name: "Admin User", full_name: "Admin User" },
            created_at: "2024-06-10T14:00:00Z",
            updated_at: "2024-06-10T14:00:00Z",
          },
        },
        responseDescription: "Returns the newly created note object.",
      },
    ],
  },

  {
    id: "customer-groups",
    name: "Customer Groups",
    description:
      'Customer Groups let you segment your customers into labelled collections (e.g. "VIP", "Wholesale"). You can assign multiple customers to a group and use groups for targeted discounts.',
    endpoints: [
      {
        id: "list-customer-groups",
        method: "GET",
        path: "/customer-groups",
        title: "List all customer groups",
        description: "Returns all customer groups for your tenant.",
        response: {
          groups: [
            {
              id: 1,
              name: "VIP",
              colour: "#FFD700",
              customers_count: 12,
              created_at: "2024-01-15T10:00:00Z",
              updated_at: "2024-05-20T08:30:00Z",
            },
          ],
        },
        responseDescription:
          "Returns an array of group objects in a `groups` key.",
      },
      {
        id: "create-customer-group",
        method: "POST",
        path: "/customer-groups",
        title: "Create a customer group",
        description: "Creates a new customer group.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Group name. Must be unique per tenant.",
            example: "VIP",
          },
          {
            name: "colour",
            type: "string",
            required: false,
            description: "Hex colour code for the group label.",
            example: "#FFD700",
          },
        ],
        response: {
          group: {
            id: 1,
            name: "VIP",
            colour: "#FFD700",
            customers_count: 0,
            created_at: "2024-06-10T12:00:00Z",
            updated_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created group.",
      },
      {
        id: "get-customer-group",
        method: "GET",
        path: "/customer-groups/{id}",
        title: "Retrieve a customer group",
        description: "Returns a customer group with the list of members.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the group.",
          },
        ],
        response: {
          group: {
            id: 1,
            name: "VIP",
            colour: "#FFD700",
            customers: [
              {
                id: 1,
                name: "Jane Smith",
                email: "jane@example.com",
                phone: "+44 7700 900001",
              },
            ],
          },
        },
        responseDescription: "Returns the group with its `customers` array.",
      },
      {
        id: "update-customer-group",
        method: "PUT",
        path: "/customer-groups/{id}",
        title: "Update a customer group",
        description: "Updates the name or colour of a customer group.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the group.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "New group name.",
            example: "Premium",
          },
          {
            name: "colour",
            type: "string",
            required: false,
            description: "New hex colour.",
            example: "#C0C0C0",
          },
        ],
        response: {
          group: {
            id: 1,
            name: "Premium",
            colour: "#C0C0C0",
            customers_count: 12,
            created_at: "2024-01-15T10:00:00Z",
            updated_at: "2024-06-10T14:00:00Z",
          },
        },
        responseDescription: "Returns the updated group.",
      },
      {
        id: "delete-customer-group",
        method: "DELETE",
        path: "/customer-groups/{id}",
        title: "Delete a customer group",
        description:
          "Permanently deletes a customer group. Customers in the group are not deleted.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the group.",
          },
        ],
        response: { message: "Customer group deleted successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "assign-customers-to-group",
        method: "PUT",
        path: "/customer-groups/{groupId}/customers",
        title: "Assign customers to group",
        description:
          "Replaces the full membership list for a group with the provided customer IDs.",
        pathParams: [
          {
            name: "groupId",
            type: "integer",
            required: true,
            description: "The numeric ID of the group.",
          },
        ],
        bodyParams: [
          {
            name: "customer_ids",
            type: "integer[]",
            required: true,
            description: "Array of customer IDs to assign to this group.",
            example: "[1, 2, 3]",
          },
        ],
        response: { message: "Customers assigned successfully." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

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

  {
    id: "products",
    name: "Products",
    description:
      "Products are the items you sell. Each product can have multiple variants (e.g. sizes, colours), attachments (images), and optional inventory tracking.",
    endpoints: [
      {
        id: "list-products",
        method: "GET",
        path: "/products",
        title: "List all products",
        description:
          "Returns a paginated list of products with optional filters.",
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
            name: "limit",
            type: "integer",
            required: false,
            description: "Number of results per page.",
            default: "15",
            example: "15",
          },
          {
            name: "search",
            type: "string",
            required: false,
            description: "Search by product name.",
            example: "burger",
          },
          {
            name: "is_active",
            type: "string",
            required: false,
            description: "Filter by active status (`1` or `0`).",
            enum: ["1", "0"],
            example: "1",
          },
          {
            name: "categories",
            type: "string",
            required: false,
            description: "Comma-separated category IDs to filter by.",
            example: "1,3",
          },
          {
            name: "availability",
            type: "string",
            required: false,
            description: "Filter by availability.",
            enum: ["in_stock", "out_of_stock", "low_stock"],
            example: "in_stock",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              slug: "classic-burger",
              name: "Classic Burger",
              description: "A juicy beef patty in a brioche bun.",
              price: 1200,
              currency: "GBP",
              is_active: true,
              is_published_online: true,
              compare_price: 1500,
              stock_control: 1,
              has_variants: false,
              sku: "BURG-001",
              barcode: "5901234123457",
              created_at: "2024-01-10T09:00:00Z",
              updated_at: "2024-06-01T11:00:00Z",
            },
          ],
          current_page: 1,
          last_page: 3,
          total: 38,
          per_page: 15,
        },
        responseDescription: "Returns a paginated product list.",
      },
      {
        id: "get-product",
        method: "GET",
        path: "/products/{slug}",
        title: "Retrieve a product",
        description:
          "Retrieves a single product by its URL slug, including all variants and attachments.",
        pathParams: [
          {
            name: "slug",
            type: "string",
            required: true,
            description: "The URL-safe slug of the product.",
            example: "classic-burger",
          },
        ],
        response: {
          id: 1,
          slug: "classic-burger",
          name: "Classic Burger",
          price: 1200,
          currency: "GBP",
          is_active: true,
          has_variants: true,
          attachments: [
            {
              id: 1,
              type: "image",
              uid: "att_a1b2c3d4",
              file_name: "burger.jpg",
              url: "https://cdn.example.com/burger.jpg",
            },
          ],
          default_variant: {
            id: 3,
            price: 1200,
            is_available: true,
            sku: "BURG-001-REG",
            barcode: null,
            weight: null,
            unit: null,
            is_default_variant: true,
          },
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-06-01T11:00:00Z",
        },
        responseDescription:
          "Returns the full product with variants and attachments.",
      },
      {
        id: "create-product",
        method: "POST",
        path: "/products",
        title: "Create a product",
        description: "Creates a new product.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Product name.",
            example: "Classic Burger",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Product description (HTML supported).",
            example: "A juicy beef patty in a brioche bun.",
          },
          {
            name: "price",
            type: "integer",
            required: true,
            description: "Price in smallest currency unit (pence/cents).",
            example: "1200",
          },
          {
            name: "currency",
            type: "string",
            required: false,
            description: "ISO 4217 currency code.",
            default: "GBP",
            example: "GBP",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the product is visible.",
            default: "true",
            example: "true",
          },
          {
            name: "category_id",
            type: "integer",
            required: false,
            description: "Assign to a category.",
            example: "2",
          },
        ],
        response: {
          id: 5,
          slug: "classic-burger-v2",
          name: "Classic Burger",
          price: 1200,
          currency: "GBP",
          is_active: true,
          has_variants: false,
          created_at: "2024-06-10T12:00:00Z",
          updated_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created product.",
      },
      {
        id: "update-product",
        method: "PUT",
        path: "/products/{id}",
        title: "Update a product",
        description: "Updates an existing product.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the product.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Updated product name.",
            example: "Classic Burger (Updated)",
          },
          {
            name: "price",
            type: "integer",
            required: false,
            description: "Updated price in smallest currency unit.",
            example: "1350",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Toggle product visibility.",
            example: "true",
          },
        ],
        response: {
          id: 1,
          slug: "classic-burger",
          name: "Classic Burger (Updated)",
          price: 1350,
          currency: "GBP",
          is_active: true,
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-06-10T13:00:00Z",
        },
        responseDescription: "Returns the updated product.",
      },
      {
        id: "delete-product",
        method: "DELETE",
        path: "/products/{id}",
        title: "Delete a product",
        description: "Permanently deletes a product and all its variants.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the product.",
          },
        ],
        response: { message: "Product deleted successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "create-product-variants",
        method: "POST",
        path: "/products/{id}/variants",
        title: "Create product variants",
        description:
          "Defines variant choices for a product (e.g. Size: Small, Medium, Large). This generates all variant combinations.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the product.",
          },
        ],
        bodyParams: [
          {
            name: "choices",
            type: "object[]",
            required: true,
            description:
              'Array of choice objects. Each object has a `label` (e.g. "Size") and an `items` array.',
          },
          {
            name: "choices[].label",
            type: "string",
            required: true,
            description: "The variant dimension label.",
            example: "Size",
          },
          {
            name: "choices[].items",
            type: "object[]",
            required: true,
            description:
              "Array of option objects with `name` and optional `price`.",
            example:
              '[{"name":"Regular","price":1200},{"name":"Large","price":1400}]',
          },
        ],
        response: {
          message: "Variants created successfully.",
          variants_count: 2,
        },
        responseDescription:
          "Returns a confirmation message with the number of generated variants.",
      },
      {
        id: "update-product-variant",
        method: "PUT",
        path: "/products/{productId}/variants/{variantId}",
        title: "Update a product variant",
        description:
          "Updates pricing, inventory, or SKU for a specific variant.",
        pathParams: [
          {
            name: "productId",
            type: "integer",
            required: true,
            description: "The numeric ID of the product.",
          },
          {
            name: "variantId",
            type: "integer",
            required: true,
            description: "The numeric ID of the variant.",
          },
        ],
        bodyParams: [
          {
            name: "price",
            type: "integer",
            required: false,
            description: "Updated price in smallest currency unit.",
            example: "1400",
          },
          {
            name: "cost_price",
            type: "integer",
            required: false,
            description: "Cost price (for margin reporting).",
            example: "600",
          },
          {
            name: "stock",
            type: "integer",
            required: false,
            description: "Stock count to set.",
            example: "50",
          },
          {
            name: "sku",
            type: "string",
            required: false,
            description: "Stock Keeping Unit code.",
            example: "BURG-001-LG",
          },
        ],
        response: { message: "Variant updated successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "bulk-upload-products",
        method: "POST",
        path: "/products/bulk-upload",
        title: "Bulk upload products",
        description:
          "Imports products in bulk from a CSV file. The CSV must include columns: name, price, sku, category.",
        bodyParams: [
          {
            name: "file",
            type: "file",
            required: true,
            description: "CSV file with product data (multipart/form-data).",
            example: "products.csv",
          },
        ],
        response: {
          message: "Bulk upload queued.",
          total_rows: 45,
          import_id: "imp_a1b2c3d4",
        },
        responseDescription:
          "Returns a confirmation with the number of rows queued for import.",
        notes: ["Upload must be multipart/form-data. Max file size is 10 MB."],
      },
      {
        id: "list-product-variants",
        method: "GET",
        path: "/product-variants",
        title: "List all product variants",
        description:
          "Returns a paginated list of all product variants across all products.",
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
            description: "Search by variant name or SKU.",
            example: "BURG-001",
          },
        ],
        response: {
          data: [
            {
              id: 3,
              price: 1200,
              sku: "BURG-001-REG",
              is_available: true,
              is_default_variant: true,
              product: {
                id: 1,
                name: "Classic Burger",
                slug: "classic-burger",
              },
            },
          ],
          current_page: 1,
          last_page: 3,
          total: 42,
          per_page: 15,
        },
        responseDescription:
          "Returns a paginated list of product variant objects.",
      },
    ],
  },

  {
    id: "categories",
    name: "Categories",
    description:
      "Categories organise your products into a hierarchical tree. Categories support nesting (parent/child), featured flags, and optional thumbnail images.",
    endpoints: [
      {
        id: "list-categories",
        method: "GET",
        path: "/categories",
        title: "List all categories",
        description: "Returns a flat list of all categories for your tenant.",
        response: {
          data: [
            {
              id: 1,
              name: "Burgers",
              slug: "burgers",
              description: "All burger products",
              parent_id: null,
              is_active: true,
              is_featured: true,
              attach_id: null,
              thumbnail: { url: "https://cdn.example.com/burgers.jpg" },
            },
          ],
        },
        responseDescription: "Returns an array of category objects.",
      },
      {
        id: "create-category",
        method: "POST",
        path: "/categories",
        title: "Create a category",
        description:
          "Creates a new category. Use `parent_id` to nest it under an existing category.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Category name.",
            example: "Burgers",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Short description.",
            example: "All burger products.",
          },
          {
            name: "parent_id",
            type: "integer",
            required: false,
            description: "ID of the parent category for nesting.",
            example: "null",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the category is visible.",
            default: "true",
            example: "true",
          },
          {
            name: "is_featured",
            type: "boolean",
            required: false,
            description: "Whether to feature this category.",
            default: "false",
            example: "false",
          },
          {
            name: "attach_id",
            type: "integer",
            required: false,
            description: "ID of an uploaded attachment for the thumbnail.",
            example: "5",
          },
        ],
        response: {
          id: 3,
          name: "Burgers",
          slug: "burgers",
          parent_id: null,
          is_active: true,
          is_featured: true,
          thumbnail: null,
          created_at: "2024-06-10T12:00:00Z",
          updated_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created category.",
      },
      {
        id: "get-category",
        method: "GET",
        path: "/categories/{id}",
        title: "Retrieve a category",
        description: "Returns a single category by its numeric ID.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the category.",
          },
        ],
        response: {
          id: 1,
          name: "Burgers",
          slug: "burgers",
          description: "All burger products.",
          parent_id: null,
          is_active: true,
          is_featured: true,
          thumbnail: { url: "https://cdn.example.com/burgers.jpg" },
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-06-01T11:00:00Z",
        },
        responseDescription: "Returns the category object.",
      },
      {
        id: "update-category",
        method: "PUT",
        path: "/categories/{id}",
        title: "Update a category",
        description: "Updates an existing category.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the category.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Updated category name.",
            example: "Gourmet Burgers",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Toggle category visibility.",
            example: "true",
          },
          {
            name: "is_featured",
            type: "boolean",
            required: false,
            description: "Toggle featured status.",
            example: "true",
          },
        ],
        response: {
          id: 1,
          name: "Gourmet Burgers",
          slug: "burgers",
          is_active: true,
          is_featured: true,
          thumbnail: null,
          created_at: "2024-01-10T09:00:00Z",
          updated_at: "2024-06-10T14:00:00Z",
        },
        responseDescription: "Returns the updated category.",
      },
      {
        id: "delete-category",
        method: "DELETE",
        path: "/categories/{id}",
        title: "Delete a category",
        description:
          "Permanently deletes a category. Products assigned to this category are not deleted.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the category.",
          },
        ],
        response: { message: "Category deleted successfully." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "payments",
    name: "Payments",
    description:
      "Payment objects represent money collected from customers. Each payment is linked to a transaction and can have a status of pending, authorised, paid, partially_refunded, refunded, or released.",
    endpoints: [
      {
        id: "list-payments",
        method: "GET",
        path: "/payments",
        title: "List all payments",
        description:
          "Returns a paginated list of payments. Filter by status, date range, type, or customer email.",
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
            name: "status",
            type: "string",
            required: false,
            description: "Filter by payment status.",
            enum: [
              "pending",
              "authorised",
              "paid",
              "partially_refunded",
              "refunded",
              "released",
            ],
            example: "paid",
          },
          {
            name: "type",
            type: "string",
            required: false,
            description: "Filter by payment type.",
            enum: ["card", "cash", "terminal"],
            example: "card",
          },
          {
            name: "customer_email",
            type: "string",
            required: false,
            description: "Filter by customer email address.",
            example: "jane@example.com",
          },
          {
            name: "gte",
            type: "string",
            required: false,
            description: "Start of date range (ISO 8601).",
            example: "2024-01-01T00:00:00Z",
          },
          {
            name: "lte",
            type: "string",
            required: false,
            description: "End of date range (ISO 8601).",
            example: "2024-06-30T23:59:59Z",
          },
        ],
        response: {
          data: [
            {
              id: 5,
              order_id: 42,
              amount: 4250,
              status: "paid",
              customer_name: "Jane Smith",
              customer_email: "jane@example.com",
              card_brand: "visa",
              last_4: "4242",
              currency: "GBP",
              transaction_reference: "txn_3OkT2r2eZvKYlo2C0P",
              type: "card",
              is_cash: false,
              is_refundable: true,
              amount_refunded: 0,
              paid_at: "2024-05-20T10:05:00Z",
              created_at: "2024-05-20T10:00:00Z",
            },
          ],
          current_page: 1,
          last_page: 3,
          total: 42,
          per_page: 15,
        },
        responseDescription: "Returns a paginated list of payment objects.",
      },
      {
        id: "get-payment",
        method: "GET",
        path: "/payments/{id}",
        title: "Retrieve a payment",
        description:
          "Returns full details of a single payment, including refunds and linked payment link.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
          },
        ],
        response: {
          payment: {
            id: 5,
            order_id: 42,
            amount: 4250,
            status: "paid",
            customer_name: "Jane Smith",
            customer_email: "jane@example.com",
            card_brand: "visa",
            last_4: "4242",
            currency: "GBP",
            transaction_reference: "txn_3OkT2r2eZvKYlo2C0P",
            type: "card",
            is_cash: false,
            is_refundable: true,
            amount_refunded: 0,
            paid_at: "2024-05-20T10:05:00Z",
            refunds: [],
            payment_link: null,
            created_at: "2024-05-20T10:00:00Z",
            updated_at: "2024-05-20T10:05:00Z",
          },
        },
        responseDescription:
          "Returns the full payment object with refund history.",
      },
      {
        id: "create-payment",
        method: "POST",
        path: "/payments",
        title: "Create a payment",
        description: "Creates a new payment intent.",
        bodyParams: [
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Amount in smallest currency unit (pence/cents).",
            example: "4250",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Optional description for the payment.",
            example: "Order #ORD-0042",
          },
          {
            name: "type",
            type: "string",
            required: false,
            description: "Payment type.",
            enum: ["card", "cash"],
            default: "card",
            example: "card",
          },
          {
            name: "customer_email",
            type: "string",
            required: false,
            description: "Customer email for the receipt.",
            example: "jane@example.com",
          },
        ],
        response: {
          id: 6,
          amount: 4250,
          status: "pending",
          currency: "GBP",
          type: "card",
          created_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created payment object.",
      },
      {
        id: "refund-payment",
        method: "POST",
        path: "/payments/{id}/refund",
        title: "Refund a payment",
        description:
          "Issues a refund for a payment. Partial refunds are supported by specifying an amount less than the original.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
          },
        ],
        bodyParams: [
          {
            name: "amount",
            type: "integer",
            required: false,
            description:
              "Amount to refund in smallest currency unit. Defaults to the full refundable amount.",
            example: "2000",
          },
          {
            name: "reason",
            type: "string",
            required: false,
            description: "Reason for the refund.",
            enum: [
              "customer_request",
              "duplicate_payment",
              "fraud_suspected",
              "payment_error",
              "order_cancelled",
            ],
            example: "customer_request",
          },
        ],
        response: { message: "Refund issued successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-balance",
        method: "GET",
        path: "/balance",
        title: "Retrieve account balance",
        description:
          "Returns the current available and pending balance for your Stripe-connected account.",
        response: {
          balance: { available: 124500, incoming: 35000, currency: "GBP" },
        },
        responseDescription:
          "Returns a `balance` object with amounts in the smallest currency unit.",
      },
      {
        id: "get-payment-analytics",
        method: "GET",
        path: "/analytics/payments",
        title: "Payment analytics",
        description: "Returns aggregated payment analytics for your tenant.",
        response: {
          total_revenue: 1245000,
          total_transactions: 312,
          average_order_value: 3990,
          refund_rate: 2.4,
        },
        responseDescription: "Returns analytics summary.",
      },
      {
        id: "delete-payment",
        method: "DELETE",
        path: "/payments/{id}",
        title: "Delete a payment",
        description: "Permanently deletes a payment record.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
            example: "5",
          },
        ],
        response: { message: "Payment deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "mail-payment",
        method: "POST",
        path: "/payments/{id}/mail",
        title: "Send payment receipt",
        description: "Sends a payment receipt to the specified email address.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
            example: "5",
          },
        ],
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address to send the receipt to.",
            example: "customer@example.com",
          },
        ],
        response: { message: "Receipt sent successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "capture-payment",
        method: "POST",
        path: "/payments/{id}/capture",
        title: "Capture a payment",
        description:
          "Captures a previously authorised payment. Use this to finalise an authorised hold.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
            example: "5",
          },
        ],
        response: {
          payment: {
            id: 5,
            status: "paid",
            amount: 4250,
            captured_at: "2024-06-10T12:05:00Z",
          },
        },
        responseDescription: "Returns the updated payment with `paid` status.",
      },
      {
        id: "release-payment",
        method: "POST",
        path: "/payments/{id}/release",
        title: "Release a payment",
        description:
          "Releases (cancels) an authorised payment hold without capturing funds.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment.",
            example: "5",
          },
        ],
        response: {
          payment: {
            id: 5,
            status: "released",
            amount: 4250,
            released_at: "2024-06-10T12:05:00Z",
          },
        },
        responseDescription:
          "Returns the updated payment with `released` status.",
      },
      {
        id: "export-payments",
        method: "POST",
        path: "/payments/export",
        title: "Export payments to CSV",
        description:
          "Exports payment records to a CSV file. Optionally filter by date range and status.",
        bodyParams: [
          {
            name: "start_date",
            type: "string",
            required: false,
            description: "Start of date range (ISO 8601).",
            example: "2024-01-01",
          },
          {
            name: "end_date",
            type: "string",
            required: false,
            description: "End of date range (ISO 8601).",
            example: "2024-06-30",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Filter by payment status.",
            enum: [
              "pending",
              "authorised",
              "paid",
              "partially_refunded",
              "refunded",
              "released",
            ],
            example: "paid",
          },
        ],
        response: {
          message: "Export queued. You will receive an email when ready.",
          export_id: "exp_a1b2c3d4",
        },
        responseDescription: "Returns a confirmation with an export ID.",
      },
    ],
  },

  {
    id: "payment-links",
    name: "Payment Links",
    description:
      "Payment Links are shareable URLs that let customers pay you without writing any code. Links can have a fixed amount or accept any amount within a min/max range.",
    endpoints: [
      {
        id: "list-payment-links",
        method: "GET",
        path: "/payment-links",
        title: "List all payment links",
        description: "Returns a paginated list of payment links.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number.",
            default: "1",
            example: "1",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              name: "Event Ticket",
              type: "fixed_amount",
              button_label: "Buy Now",
              amount: 2500,
              currency: "GBP",
              active: true,
              payments_count: 14,
              url: "https://pay.flowpos.io/pl_a1b2c3d4",
              created_at: "2024-03-01T09:00:00Z",
            },
          ],
          current_page: 1,
          total: 5,
        },
        responseDescription:
          "Returns a paginated list of payment link objects.",
      },
      {
        id: "create-payment-link",
        method: "POST",
        path: "/payment-links",
        title: "Create a payment link",
        description:
          "Creates a new payment link. The `type` field determines whether this is a fixed amount or open amount link.",
        bodyParams: [
          {
            name: "type",
            type: "string",
            required: true,
            description: "The type of payment link.",
            enum: ["fixed_amount", "open_amount"],
            example: "fixed_amount",
          },
          {
            name: "name",
            type: "string",
            required: true,
            description: "Internal name for the link.",
            example: "Event Ticket",
          },
          {
            name: "button_label",
            type: "string",
            required: true,
            description: "Text displayed on the pay button.",
            example: "Buy Now",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Description shown to the customer.",
            example: "Annual gala dinner ticket.",
          },
          {
            name: "amount",
            type: "integer",
            required: false,
            description:
              "For `fixed_amount` links: price in smallest currency unit.",
            example: "2500",
          },
          {
            name: "minimum_amount",
            type: "integer",
            required: false,
            description: "For `open_amount` links: minimum allowed amount.",
            example: "500",
          },
          {
            name: "maximum_amount",
            type: "integer",
            required: false,
            description: "For `open_amount` links: maximum allowed amount.",
            example: "100000",
          },
          {
            name: "preset_amount",
            type: "integer",
            required: false,
            description:
              "For `open_amount` links: pre-filled suggested amount.",
            example: "5000",
          },
          {
            name: "active",
            type: "boolean",
            required: false,
            description: "Whether the link is active.",
            default: "true",
            example: "true",
          },
        ],
        response: {
          id: 2,
          name: "Event Ticket",
          type: "fixed_amount",
          button_label: "Buy Now",
          amount: 2500,
          currency: "GBP",
          active: true,
          url: "https://pay.flowpos.io/pl_b5c6d7e8",
          payments_count: 0,
          created_at: "2024-06-10T12:00:00Z",
          updated_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created payment link.",
      },
      {
        id: "get-payment-link",
        method: "GET",
        path: "/payment-links/{id}",
        title: "Retrieve a payment link",
        description: "Returns a single payment link.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment link.",
          },
        ],
        response: {
          id: 1,
          name: "Event Ticket",
          type: "fixed_amount",
          button_label: "Buy Now",
          amount: 2500,
          currency: "GBP",
          active: true,
          url: "https://pay.flowpos.io/pl_a1b2c3d4",
          payments_count: 14,
          created_at: "2024-03-01T09:00:00Z",
          updated_at: "2024-05-01T10:00:00Z",
        },
        responseDescription: "Returns the payment link object.",
      },
      {
        id: "delete-payment-link",
        method: "DELETE",
        path: "/payment-links/{id}",
        title: "Delete a payment link",
        description:
          "Permanently deletes a payment link. The link URL will stop working immediately.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment link.",
          },
        ],
        response: { message: "Payment link deleted successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-payment-link",
        method: "PUT",
        path: "/payment-links/{id}",
        title: "Update a payment link",
        description: "Updates an existing payment link.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the payment link.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "type",
            type: "string",
            required: false,
            description: "The type of payment link.",
            enum: ["fixed_amount", "open_amount"],
            example: "fixed_amount",
          },
          {
            name: "name",
            type: "string",
            required: false,
            description: "Internal name for the link.",
            example: "Event Ticket",
          },
          {
            name: "button_label",
            type: "string",
            required: false,
            description: "Text displayed on the pay button.",
            example: "Buy Now",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Description shown to the customer.",
            example: "Annual gala dinner ticket.",
          },
          {
            name: "amount",
            type: "integer",
            required: false,
            description:
              "For `fixed_amount` links: price in smallest currency unit.",
            example: "2500",
          },
          {
            name: "minimum_amount",
            type: "integer",
            required: false,
            description: "For `open_amount` links: minimum allowed amount.",
            example: "500",
          },
          {
            name: "maximum_amount",
            type: "integer",
            required: false,
            description: "For `open_amount` links: maximum allowed amount.",
            example: "100000",
          },
          {
            name: "preset_amount",
            type: "integer",
            required: false,
            description:
              "For `open_amount` links: pre-filled suggested amount.",
            example: "5000",
          },
          {
            name: "active",
            type: "boolean",
            required: false,
            description: "Whether the link is active.",
            example: "true",
          },
        ],
        response: {
          id: 1,
          name: "Event Ticket",
          type: "fixed_amount",
          button_label: "Buy Now",
          amount: 2500,
          currency: "GBP",
          active: true,
          url: "https://pay.flowpos.io/pl_a1b2c3d4",
          updated_at: "2024-06-10T13:00:00Z",
        },
        responseDescription: "Returns the updated payment link.",
      },
      {
        id: "get-payment-link-analytics",
        method: "GET",
        path: "/payment-links/analytics",
        title: "Payment link analytics",
        description: "Returns aggregated analytics across all payment links.",
        response: {
          total_links: 5,
          active_links: 3,
          total_payments: 86,
          total_revenue: 215000,
        },
        responseDescription: "Returns analytics summary.",
      },
    ],
  },

  {
    id: "discounts",
    name: "Discounts",
    description:
      "Discounts apply reductions to orders. They can be percentage-based, fixed-amount, or free shipping. Discounts can be automatic or require a code at checkout.",
    endpoints: [
      {
        id: "list-discounts",
        method: "GET",
        path: "/discounts",
        title: "List all discounts",
        description: "Returns all active and inactive discounts.",
        response: {
          discounts: [
            {
              id: 1,
              name: "Summer Sale",
              code: "SUMMER20",
              discount_type: "amount_off_order",
              discount_type_data: {
                minimum_order: 2000,
                percentage_off: 20,
                fixed_amount_off: null,
              },
              active: true,
              is_online: true,
              start_at: "2024-06-01T00:00:00Z",
              end_at: "2024-08-31T23:59:59Z",
              usage_limit: 100,
              created_at: "2024-05-25T10:00:00Z",
              updated_at: "2024-05-25T10:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of discount objects.",
      },
      {
        id: "create-discount",
        method: "POST",
        path: "/discounts",
        title: "Create a discount",
        description:
          "Creates a new discount. Use `type` to define whether it is `amount_off_order` (percentage or fixed) or `free_shipping`.",
        bodyParams: [
          {
            name: "type",
            type: "string",
            required: true,
            description: "Discount type.",
            enum: ["amount_off_order", "free_shipping"],
            example: "amount_off_order",
          },
          {
            name: "name",
            type: "string",
            required: true,
            description: "Internal name for this discount.",
            example: "Summer Sale",
          },
          {
            name: "code",
            type: "string",
            required: false,
            description:
              "Discount code customers enter. Omit for automatic discounts.",
            example: "SUMMER20",
          },
          {
            name: "start_at",
            type: "string",
            required: true,
            description: "When the discount becomes valid (ISO 8601).",
            example: "2024-06-01T00:00:00Z",
          },
          {
            name: "end_at",
            type: "string",
            required: false,
            description: "When the discount expires (ISO 8601).",
            example: "2024-08-31T23:59:59Z",
          },
          {
            name: "is_online",
            type: "integer",
            required: true,
            description:
              "Whether this discount applies to online orders (`1`) or in-store (`0`).",
            example: "1",
          },
          {
            name: "usage_limit",
            type: "integer",
            required: false,
            description: "Max number of times this discount can be used.",
            example: "100",
          },
          {
            name: "discountTypeData.minimum_order",
            type: "integer",
            required: false,
            description:
              "Minimum order value (in smallest unit) required for the discount.",
            example: "2000",
          },
          {
            name: "discountTypeData.percentage_off",
            type: "number",
            required: false,
            description: "Percentage discount (use for `amount_off_order`).",
            example: "20",
          },
          {
            name: "discountTypeData.fixed_amount_off",
            type: "integer",
            required: false,
            description:
              "Fixed amount off in smallest currency unit (use for `amount_off_order`).",
            example: "500",
          },
        ],
        response: {
          id: 2,
          name: "Summer Sale",
          code: "SUMMER20",
          discount_type: "amount_off_order",
          active: true,
          is_online: true,
          start_at: "2024-06-01T00:00:00Z",
          end_at: "2024-08-31T23:59:59Z",
          created_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created discount.",
      },
      {
        id: "update-discount",
        method: "PUT",
        path: "/discounts/{id}",
        title: "Update a discount",
        description: "Updates an existing discount.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the discount.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Updated name.",
            example: "Summer Sale Extended",
          },
          {
            name: "active",
            type: "boolean",
            required: false,
            description: "Toggle active status.",
            example: "true",
          },
          {
            name: "end_at",
            type: "string",
            required: false,
            description: "Updated expiry date.",
            example: "2024-09-30T23:59:59Z",
          },
        ],
        response: {
          id: 1,
          name: "Summer Sale Extended",
          active: true,
          end_at: "2024-09-30T23:59:59Z",
          updated_at: "2024-06-10T14:00:00Z",
        },
        responseDescription: "Returns the updated discount.",
      },
      {
        id: "delete-discount",
        method: "DELETE",
        path: "/discounts/{id}",
        title: "Delete a discount",
        description:
          "Soft-deletes a discount (sets `deleted_at`). The code can no longer be used.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the discount.",
          },
        ],
        response: { message: "Discount deleted successfully." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "subscriptions",
    name: "Subscriptions",
    description:
      "Subscriptions are recurring billing plans. Customers subscribe to a plan and are billed automatically at the specified frequency (weekly, monthly, or yearly).",
    endpoints: [
      {
        id: "list-subscriptions",
        method: "GET",
        path: "/subscriptions",
        title: "List all subscriptions",
        description: "Returns a paginated list of subscription plans.",
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
            description: "Filter by plan name.",
            example: "premium",
          },
          {
            name: "status",
            type: "string",
            required: false,
            description: "Filter by status.",
            enum: ["active", "inactive"],
            example: "active",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              name: "Premium Monthly",
              description: "Access to all premium features.",
              frequency: "monthly",
              bill_upfront: true,
              start_date: "2024-01-01",
              price: 999,
              currency: "GBP",
              is_active: true,
              url: "https://pay.flowpos.io/sub_a1b2c3d4",
              customers_count: 28,
              created_at: "2024-01-01T09:00:00Z",
            },
          ],
          current_page: 1,
          total: 3,
        },
        responseDescription: "Returns a paginated list of subscription plans.",
      },
      {
        id: "create-subscription",
        method: "POST",
        path: "/subscriptions",
        title: "Create a subscription plan",
        description: "Creates a new recurring subscription plan.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Plan name.",
            example: "Premium Monthly",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Plan description shown to customers.",
            example: "Access to all premium features.",
          },
          {
            name: "frequency",
            type: "string",
            required: true,
            description: "Billing frequency.",
            enum: ["weekly", "monthly", "yearly"],
            example: "monthly",
          },
          {
            name: "price",
            type: "integer",
            required: true,
            description: "Subscription price in smallest currency unit.",
            example: "999",
          },
          {
            name: "start_date",
            type: "string",
            required: true,
            description: "When billing starts (YYYY-MM-DD).",
            example: "2024-07-01",
          },
          {
            name: "bill_upfront",
            type: "boolean",
            required: false,
            description: "Whether to charge the first period immediately.",
            default: "false",
            example: "true",
          },
          {
            name: "term_months",
            type: "integer",
            required: false,
            description: "Minimum term in months. Null for open-ended.",
            example: "12",
          },
        ],
        response: {
          id: 2,
          name: "Premium Monthly",
          frequency: "monthly",
          price: 999,
          currency: "GBP",
          is_active: true,
          url: "https://pay.flowpos.io/sub_b5c6d7e8",
          customers_count: 0,
          created_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created subscription plan.",
      },
      {
        id: "get-subscription",
        method: "GET",
        path: "/subscriptions/{id}",
        title: "Retrieve a subscription",
        description:
          "Returns full details of a subscription plan including its subscribers.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the subscription.",
          },
        ],
        response: {
          id: 1,
          name: "Premium Monthly",
          frequency: "monthly",
          price: 999,
          currency: "GBP",
          is_active: true,
          customers: [
            {
              id: 1,
              name: "Jane Smith",
              email: "jane@example.com",
              pivot: {
                subscribed_at: "2024-02-01T10:00:00Z",
                status: "active",
                next_billing_at: "2024-07-01T10:00:00Z",
              },
            },
          ],
        },
        responseDescription: "Returns the subscription with subscriber list.",
      },
      {
        id: "delete-subscription",
        method: "DELETE",
        path: "/subscriptions/{id}",
        title: "Delete a subscription plan",
        description:
          "Deletes a subscription plan. Active subscribers are not immediately affected.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the subscription.",
          },
        ],
        response: { message: "Subscription deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-subscription",
        method: "PUT",
        path: "/subscriptions/{id}",
        title: "Update a subscription plan",
        description: "Updates an existing subscription plan.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the subscription.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Plan name.",
            example: "Premium Monthly",
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Plan description shown to customers.",
            example: "Access to all premium features.",
          },
          {
            name: "frequency",
            type: "string",
            required: false,
            description: "Billing frequency.",
            enum: ["weekly", "monthly", "yearly"],
            example: "monthly",
          },
          {
            name: "price",
            type: "integer",
            required: false,
            description: "Subscription price in smallest currency unit.",
            example: "999",
          },
          {
            name: "bill_upfront",
            type: "boolean",
            required: false,
            description: "Whether to charge the first period immediately.",
            example: "true",
          },
          {
            name: "term_months",
            type: "integer",
            required: false,
            description: "Minimum term in months. Null for open-ended.",
            example: "12",
          },
        ],
        response: {
          id: 1,
          name: "Premium Monthly",
          frequency: "monthly",
          price: 999,
          currency: "GBP",
          is_active: true,
          updated_at: "2024-06-10T13:00:00Z",
        },
        responseDescription: "Returns the updated subscription plan.",
      },
      {
        id: "subscription-analytics",
        method: "GET",
        path: "/subscriptions/analytics",
        title: "Subscription analytics",
        description: "Returns aggregated analytics for all subscription plans.",
        response: {
          analytics: {
            total_plans: 3,
            total_active_subscribers: 72,
            monthly_recurring_revenue: 71928,
            churn_rate: 3.2,
          },
        },
        responseDescription: "Returns subscription analytics summary.",
      },
      {
        id: "customer-subscription-payments",
        method: "GET",
        path: "/subscriptions/{customerId}/payments",
        title: "List customer subscription payments",
        description:
          "Returns all subscription payments made by a specific customer.",
        pathParams: [
          {
            name: "customerId",
            type: "integer",
            required: true,
            description: "The numeric ID of the customer.",
            example: "1",
          },
        ],
        response: {
          payments: [
            {
              id: 10,
              amount: 999,
              currency: "GBP",
              status: "paid",
              subscription: { id: 1, name: "Premium Monthly" },
              paid_at: "2024-05-01T10:00:00Z",
            },
          ],
        },
        responseDescription:
          "Returns an array of subscription payment objects for the customer.",
      },
    ],
  },

  {
    id: "inventory",
    name: "Inventory",
    description:
      "Inventory tracks stock levels for product variants across locations. You can adjust stock counts, view history, and configure low-stock notifications.",
    endpoints: [
      {
        id: "list-inventory",
        method: "GET",
        path: "/inventory",
        title: "List inventory",
        description: "Returns a paginated list of inventory records.",
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
            description: "Search by product or variant name.",
            example: "burger",
          },
          {
            name: "location_id",
            type: "integer",
            required: false,
            description: "Filter by location ID.",
            example: "1",
          },
        ],
        response: {
          inventory: {
            current_page: 1,
            last_page: 2,
            total: 20,
            per_page: 15,
            data: [
              {
                id: 1,
                variant_id: 3,
                location_id: 1,
                stock_count: 45,
                stock_reserved: "0",
                variant: {
                  id: 3,
                  price: 1200,
                  sku: "BURG-001",
                  is_available: true,
                  product: {
                    id: 1,
                    name: "Classic Burger",
                    slug: "classic-burger",
                  },
                },
                location: { id: 1, name: "Main Store" },
                created_at: "2024-01-15T09:00:00Z",
                updated_at: "2024-06-01T08:00:00Z",
              },
            ],
          },
        },
        responseDescription: "Returns a paginated list of inventory records.",
      },
      {
        id: "adjust-inventory",
        method: "POST",
        path: "/inventory/{id}/adjust",
        title: "Adjust inventory",
        description:
          "Applies a signed adjustment to a stock count (+/-). Use positive values to add stock, negative to remove.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the inventory record.",
          },
        ],
        bodyParams: [
          {
            name: "adjustment",
            type: "integer",
            required: true,
            description:
              "Signed adjustment (+/-). Positive adds stock, negative removes stock.",
            example: "-5",
          },
          {
            name: "reason",
            type: "string",
            required: false,
            description: "Reason for the adjustment (logged in history).",
            example: "Damaged goods written off.",
          },
        ],
        response: {
          message: "Inventory adjusted successfully.",
          stock_count: 40,
        },
        responseDescription:
          "Returns a confirmation message with the new stock count.",
      },
      {
        id: "get-inventory-history",
        method: "GET",
        path: "/inventory/{id}/history",
        title: "Inventory history",
        description:
          "Returns the full adjustment history for an inventory record.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the inventory record.",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              inventory_id: 1,
              adjustment: -5,
              stock_before: 45,
              stock_after: 40,
              reason: "Damaged goods written off.",
              type: "manual",
              user: { id: 2, name: "Admin User", email: "admin@example.com" },
              created_at: "2024-06-05T11:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of adjustment history records.",
      },
      {
        id: "get-inventory-item",
        method: "GET",
        path: "/inventory/{id}",
        title: "Retrieve an inventory item",
        description: "Returns full details of a single inventory record.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the inventory record.",
            example: "1",
          },
        ],
        response: {
          inventory: {
            id: 1,
            variant_id: 3,
            location_id: 1,
            stock_count: 45,
            stock_reserved: "0",
            variant: {
              id: 3,
              price: 1200,
              sku: "BURG-001",
              is_available: true,
              product: {
                id: 1,
                name: "Classic Burger",
                slug: "classic-burger",
              },
            },
            location: { id: 1, name: "Main Store" },
            created_at: "2024-01-15T09:00:00Z",
            updated_at: "2024-06-01T08:00:00Z",
          },
        },
        responseDescription:
          "Returns the inventory record with variant and location details.",
      },
      {
        id: "create-inventory",
        method: "POST",
        path: "/inventory",
        title: "Create an inventory item",
        description:
          "Creates a new inventory record for a variant at a location.",
        bodyParams: [
          {
            name: "variant_id",
            type: "integer",
            required: true,
            description: "The numeric ID of the product variant.",
            example: "3",
          },
          {
            name: "location_id",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
          {
            name: "stock_count",
            type: "integer",
            required: false,
            description: "Initial stock count.",
            default: "0",
            example: "50",
          },
        ],
        response: {
          inventory: {
            id: 5,
            variant_id: 3,
            location_id: 1,
            stock_count: 50,
            stock_reserved: "0",
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created inventory record.",
      },
      {
        id: "delete-inventory-item",
        method: "DELETE",
        path: "/inventory/{id}",
        title: "Delete an inventory item",
        description: "Permanently deletes an inventory record.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the inventory record.",
            example: "1",
          },
        ],
        response: { message: "Inventory item deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-inventory-settings",
        method: "GET",
        path: "/inventory/settings",
        title: "Get inventory settings",
        description: "Returns the global inventory settings for your tenant.",
        response: {
          settings: {
            low_stock_threshold: 10,
            track_inventory: true,
          },
        },
        responseDescription: "Returns the inventory settings object.",
      },
      {
        id: "update-inventory-settings",
        method: "PUT",
        path: "/inventory/settings",
        title: "Update inventory settings",
        description: "Updates the global inventory settings.",
        bodyParams: [
          {
            name: "low_stock_threshold",
            type: "integer",
            required: false,
            description: "Stock count at which low-stock alerts are triggered.",
            example: "10",
          },
          {
            name: "track_inventory",
            type: "boolean",
            required: false,
            description: "Whether to enable inventory tracking globally.",
            example: "true",
          },
        ],
        response: {
          settings: {
            low_stock_threshold: 10,
            track_inventory: true,
          },
        },
        responseDescription: "Returns the updated inventory settings.",
      },
    ],
  },

  {
    id: "employees",
    name: "Employees",
    description:
      "Employees are staff members who operate the EPOS. Each employee has a PIN code for sign-in, configurable manager permissions, and refund capabilities.",
    endpoints: [
      {
        id: "list-employees",
        method: "GET",
        path: "/employees",
        title: "List all employees",
        description: "Returns a paginated list of employees.",
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
            description: "Filter by name or email.",
            example: "alice",
          },
        ],
        response: {
          employees: {
            current_page: 1,
            last_page: 1,
            total: 3,
            data: [
              {
                id: 1,
                first_name: "Alice",
                last_name: "Walters",
                email: "alice@yourbusiness.com",
                phone: "+44 7700 900010",
                pin_code: 1234,
                is_active: true,
                is_manager: false,
                can_do_refund: true,
                created_at: "2024-02-01T10:00:00Z",
                updated_at: "2024-06-01T09:00:00Z",
              },
            ],
          },
        },
        responseDescription: "Returns a paginated list of employees.",
      },
      {
        id: "create-employee",
        method: "POST",
        path: "/employees",
        title: "Create an employee",
        description: "Creates a new employee.",
        bodyParams: [
          {
            name: "first_name",
            type: "string",
            required: true,
            description: "First name.",
            example: "Alice",
          },
          {
            name: "last_name",
            type: "string",
            required: true,
            description: "Last name.",
            example: "Walters",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Work email address.",
            example: "alice@yourbusiness.com",
          },
          {
            name: "phone",
            type: "string",
            required: true,
            description: "Phone number.",
            example: "+44 7700 900010",
          },
          {
            name: "pin_code",
            type: "string",
            required: true,
            description: "4-digit EPOS PIN code.",
            example: "1234",
          },
          {
            name: "is_active",
            type: "integer",
            required: true,
            description: "Active status (`1` = active, `0` = inactive).",
            enum: ["0", "1"],
            example: "1",
          },
          {
            name: "is_manager",
            type: "integer",
            required: true,
            description: "Manager flag.",
            enum: ["0", "1"],
            example: "0",
          },
          {
            name: "can_do_refund",
            type: "integer",
            required: true,
            description: "Whether this employee can issue refunds.",
            enum: ["0", "1"],
            example: "1",
          },
        ],
        response: {
          employee: {
            id: 2,
            first_name: "Alice",
            last_name: "Walters",
            email: "alice@yourbusiness.com",
            pin_code: 1234,
            is_active: true,
            is_manager: false,
            can_do_refund: true,
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created employee.",
      },
      {
        id: "delete-employee",
        method: "DELETE",
        path: "/employees/{id}",
        title: "Delete an employee",
        description:
          "Soft-deletes an employee (sets `deleted_at`). They can no longer log in to EPOS.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the employee.",
          },
        ],
        response: { message: "Employee deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-employee",
        method: "PUT",
        path: "/employees/{id}",
        title: "Update an employee",
        description: "Updates an existing employee's details.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the employee.",
            example: "2",
          },
        ],
        bodyParams: [
          {
            name: "first_name",
            type: "string",
            required: false,
            description: "First name.",
            example: "Alice",
          },
          {
            name: "last_name",
            type: "string",
            required: false,
            description: "Last name.",
            example: "Walters",
          },
          {
            name: "email",
            type: "string",
            required: false,
            description: "Work email address.",
            example: "alice@yourbusiness.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Phone number.",
            example: "+44 7700 900010",
          },
          {
            name: "pin_code",
            type: "string",
            required: false,
            description: "4-digit EPOS PIN code.",
            example: "5678",
          },
          {
            name: "is_active",
            type: "integer",
            required: false,
            description: "Active status (`1` = active, `0` = inactive).",
            enum: ["0", "1"],
            example: "1",
          },
          {
            name: "is_manager",
            type: "integer",
            required: false,
            description: "Manager flag.",
            enum: ["0", "1"],
            example: "0",
          },
          {
            name: "can_do_refund",
            type: "integer",
            required: false,
            description: "Whether this employee can issue refunds.",
            enum: ["0", "1"],
            example: "1",
          },
        ],
        response: {
          employee: {
            id: 2,
            first_name: "Alice",
            last_name: "Walters",
            email: "alice@yourbusiness.com",
            pin_code: 5678,
            is_active: true,
            is_manager: false,
            can_do_refund: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated employee.",
      },
      {
        id: "rotate-employee-pin",
        method: "POST",
        path: "/employees/{id}/rotate-pin",
        title: "Rotate employee PIN",
        description:
          "Generates a new random PIN for the employee. Use this if a PIN has been compromised.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the employee.",
            example: "2",
          },
        ],
        response: { employee: { id: 2, pin_rotated: true } },
        responseDescription: "Returns a confirmation that the PIN was rotated.",
      },
    ],
  },

  {
    id: "locations",
    name: "Locations",
    description:
      "Locations represent physical stores or sites. Inventory, terminals, and sections are all scoped to a location.",
    endpoints: [
      {
        id: "list-locations",
        method: "GET",
        path: "/locations",
        title: "List all locations",
        description: "Returns all locations for your tenant.",
        queryParams: [
          {
            name: "search",
            type: "string",
            required: false,
            description: "Filter by location name.",
            example: "main",
          },
        ],
        response: {
          locations: [
            {
              id: 1,
              name: "Main Store",
              type: "retail",
              address: {
                address_line_1: "10 Market Street",
                city: "Manchester",
                state: "Greater Manchester",
                post_code: "M1 1AA",
                country: { shortcode: "GB", name: "United Kingdom" },
              },
              created_at: "2024-01-01T09:00:00Z",
              updated_at: "2024-01-01T09:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of location objects.",
      },
      {
        id: "create-location",
        method: "POST",
        path: "/locations",
        title: "Create a location",
        description: "Creates a new location.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Location name.",
            example: "Branch 2",
          },
          {
            name: "type",
            type: "string",
            required: false,
            description: "Location type.",
            example: "retail",
          },
          {
            name: "address",
            type: "object",
            required: false,
            description:
              "Address object with `address_line_1`, `city`, `state`, `post_code`, `country`.",
            example:
              '{"address_line_1":"20 Park Lane","city":"London","post_code":"W1K 1BE","country":"GB"}',
          },
        ],
        response: {
          location: {
            id: 2,
            name: "Branch 2",
            type: "retail",
            address: {
              address_line_1: "20 Park Lane",
              city: "London",
              post_code: "W1K 1BE",
            },
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created location.",
      },
      {
        id: "delete-location",
        method: "DELETE",
        path: "/locations/{id}",
        title: "Delete a location",
        description: "Permanently deletes a location.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
          },
        ],
        response: { message: "Location deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-location",
        method: "PUT",
        path: "/locations/{id}",
        title: "Update a location",
        description: "Updates an existing location's details.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Location name.",
            example: "Main Store",
          },
          {
            name: "type",
            type: "string",
            required: false,
            description: "Location type.",
            example: "retail",
          },
          {
            name: "address",
            type: "object",
            required: false,
            description:
              "Address object with `address_line_1`, `city`, `state`, `post_code`, `country`.",
            example:
              '{"address_line_1":"10 Market Street","city":"Manchester","post_code":"M1 1AA","country":"GB"}',
          },
        ],
        response: {
          location: {
            id: 1,
            name: "Main Store",
            type: "retail",
            address: {
              address_line_1: "10 Market Street",
              city: "Manchester",
              post_code: "M1 1AA",
            },
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated location.",
      },
    ],
  },

  {
    id: "terminal-readers",
    name: "Terminals",
    description:
      "Terminal readers are physical card readers registered with Stripe. Each reader is linked to a location and uses an app PIN code for secure authentication.",
    endpoints: [
      {
        id: "list-terminals",
        method: "GET",
        path: "/terminal-readers",
        title: "List all terminals",
        description: "Returns all terminal readers for your tenant.",
        response: {
          terminals: [
            {
              id: 1,
              stripe_id: "tmr_FDTsF9F8h1A0rM",
              registration_code: "simul-putjlt-stkng",
              label: "Counter 1",
              ip_address: "192.168.1.101",
              app_logged_in: true,
              location: { id: 1, name: "Main Store" },
              created_at: "2024-02-01T10:00:00Z",
              updated_at: "2024-06-01T09:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of terminal reader objects.",
      },
      {
        id: "create-terminal",
        method: "POST",
        path: "/terminal-readers",
        title: "Register a terminal",
        description:
          "Registers a new terminal reader using the Stripe registration code displayed on the device.",
        bodyParams: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "Friendly name for the terminal.",
            example: "Counter 1",
          },
          {
            name: "registration_code",
            type: "string",
            required: true,
            description: "The registration code shown on the physical device.",
            example: "simul-putjlt-stkng",
          },
          {
            name: "location",
            type: "integer",
            required: false,
            description: "Location ID to assign this terminal to.",
            example: "1",
          },
        ],
        response: {
          terminalReader: {
            id: 2,
            label: "Counter 1",
            stripe_id: "tmr_FDTsF9F8h1A0rM",
            registration_code: "simul-putjlt-stkng",
            app_logged_in: false,
            location: { id: 1, name: "Main Store" },
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created terminal reader.",
      },
      {
        id: "delete-terminal",
        method: "DELETE",
        path: "/terminal-readers/{id}",
        title: "Delete a terminal",
        description: "Removes a terminal reader from your account.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the terminal reader.",
          },
        ],
        response: { message: "Terminal deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-terminal",
        method: "PUT",
        path: "/terminal-readers/{id}",
        title: "Update a terminal",
        description:
          "Updates the label or location assignment of a terminal reader.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the terminal reader.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "label",
            type: "string",
            required: false,
            description: "Friendly name for the terminal.",
            example: "Counter 2",
          },
          {
            name: "location",
            type: "integer",
            required: false,
            description: "Location ID to reassign this terminal to.",
            example: "2",
          },
        ],
        response: {
          terminalReader: {
            id: 1,
            label: "Counter 2",
            stripe_id: "tmr_FDTsF9F8h1A0rM",
            app_logged_in: true,
            location: { id: 2, name: "Branch 2" },
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated terminal reader.",
      },
      {
        id: "revoke-terminal",
        method: "POST",
        path: "/terminal-readers/{id}/revoke",
        title: "Revoke terminal access",
        description:
          "Logs out the terminal from the FlowPOS app and revokes its session. The device must re-authenticate before accepting payments.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the terminal reader.",
            example: "1",
          },
        ],
        response: { message: "Terminal access revoked." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "shipping-rates",
    name: "Shipping Rates",
    description:
      "Shipping rates are the delivery charges available at checkout. Each rate has a name and a fixed amount.",
    endpoints: [
      {
        id: "list-shipping-rates",
        method: "GET",
        path: "/shipping-rates",
        title: "List all shipping rates",
        description: "Returns all shipping rates.",
        response: {
          shippingRates: [
            {
              id: 1,
              name: "Standard Delivery",
              amount: 350,
              currency: "GBP",
              created_at: "2024-01-10T09:00:00Z",
              updated_at: "2024-01-10T09:00:00Z",
            },
          ],
        },
        responseDescription: "Returns a `shippingRates` array.",
      },
      {
        id: "create-shipping-rate",
        method: "POST",
        path: "/shipping-rates",
        title: "Create a shipping rate",
        description: "Creates a new shipping rate.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Shipping rate label.",
            example: "Express Delivery",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Delivery charge in smallest currency unit.",
            example: "699",
          },
        ],
        response: {
          id: 2,
          name: "Express Delivery",
          amount: 699,
          created_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created shipping rate.",
      },
      {
        id: "update-shipping-rate",
        method: "PUT",
        path: "/shipping-rates/{id}",
        title: "Update a shipping rate",
        description: "Updates an existing shipping rate.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the shipping rate.",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Updated label.",
            example: "Express Delivery (Next Day)",
          },
          {
            name: "amount",
            type: "integer",
            required: true,
            description: "Updated charge.",
            example: "799",
          },
        ],
        response: {
          id: 2,
          name: "Express Delivery (Next Day)",
          amount: 799,
          updated_at: "2024-06-10T14:00:00Z",
        },
        responseDescription: "Returns the updated shipping rate.",
      },
      {
        id: "delete-shipping-rate",
        method: "DELETE",
        path: "/shipping-rates/{id}",
        title: "Delete a shipping rate",
        description: "Permanently deletes a shipping rate.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the shipping rate.",
          },
        ],
        response: { message: "Shipping rate deleted." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "webhooks",
    name: "Webhooks",
    description:
      "Webhooks deliver real-time event notifications to your servers via HTTP POST. You configure endpoint URLs and the events they subscribe to.",
    endpoints: [
      {
        id: "list-webhook-endpoints",
        method: "GET",
        path: "/webhook-endpoints",
        title: "List webhook endpoints",
        description: "Returns a paginated list of webhook endpoints.",
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
            name: "limit",
            type: "integer",
            required: false,
            description: "Results per page.",
            default: "15",
            example: "15",
          },
        ],
        response: {
          webhook_endpoints: {
            data: [
              {
                id: 1,
                url: "https://yourdomain.com/webhooks",
                events: ["order.created", "payment.paid"],
                description: "Production webhook",
                is_active: true,
                created_at: "2024-03-01T10:00:00Z",
              },
            ],
            current_page: 1,
            total: 1,
          },
        },
        responseDescription: "Returns paginated list of webhook endpoints.",
      },
      {
        id: "create-webhook-endpoint",
        method: "POST",
        path: "/webhook-endpoints",
        title: "Create a webhook endpoint",
        description: "Registers a new webhook endpoint.",
        bodyParams: [
          {
            name: "url",
            type: "string",
            required: true,
            description: "HTTPS URL to receive webhook events.",
            example: "https://yourdomain.com/webhooks",
          },
          {
            name: "events",
            type: "string[]",
            required: true,
            description: "Array of event type strings to subscribe to.",
            example: '["order.created","payment.paid"]',
          },
          {
            name: "description",
            type: "string",
            required: false,
            description: "Optional description.",
            example: "Production webhook",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the endpoint is enabled.",
            default: "true",
            example: "true",
          },
        ],
        response: {
          webhook_endpoint: {
            id: 2,
            url: "https://yourdomain.com/webhooks",
            events: ["order.created"],
            description: "Production webhook",
            is_active: true,
            secret: "whsec_a1b2c3d4e5f6g7h8",
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription:
          "Returns the created endpoint. The `secret` is shown only once.",
        notes: [
          "The webhook `secret` is only returned once on creation. Store it securely to verify incoming webhook signatures.",
        ],
      },
      {
        id: "delete-webhook-endpoint",
        method: "DELETE",
        path: "/webhook-endpoints/{id}",
        title: "Delete a webhook endpoint",
        description: "Permanently deletes a webhook endpoint.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
          },
        ],
        response: { message: "Webhook endpoint deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-webhook-event-types",
        method: "GET",
        path: "/webhook-event-types",
        title: "List webhook event types",
        description: "Returns all available event types you can subscribe to.",
        response: {
          events: [
            { value: "order.created", label: "Order Created" },
            { value: "order.status_changed", label: "Order Status Changed" },
            { value: "payment.paid", label: "Payment Paid" },
            { value: "payment.refunded", label: "Payment Refunded" },
          ],
        },
        responseDescription: "Returns an array of event type objects.",
      },
      {
        id: "retry-webhook-event",
        method: "POST",
        path: "/webhook-endpoints/{endpointId}/events/{eventId}/retry",
        title: "Retry a webhook event",
        description: "Re-dispatches a specific webhook event to the endpoint.",
        pathParams: [
          {
            name: "endpointId",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
          },
          {
            name: "eventId",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook event.",
          },
        ],
        response: { webhook_event_id: 15, event_id: "evt_a1b2c3d4" },
        responseDescription: "Returns the event IDs for the retry.",
      },
      {
        id: "get-webhook-endpoint",
        method: "GET",
        path: "/webhook-endpoints/{id}",
        title: "Retrieve a webhook endpoint",
        description: "Returns full details of a single webhook endpoint.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
        ],
        response: {
          webhook_endpoint: {
            id: 1,
            url: "https://yourdomain.com/webhooks",
            events: ["order.created", "payment.paid"],
            description: "Production webhook",
            is_active: true,
            created_at: "2024-03-01T10:00:00Z",
            updated_at: "2024-06-01T09:00:00Z",
          },
        },
        responseDescription: "Returns the webhook endpoint object.",
      },
      {
        id: "update-webhook-endpoint",
        method: "PUT",
        path: "/webhook-endpoints/{id}",
        title: "Update a webhook endpoint",
        description:
          "Updates the URL, events, or active status of a webhook endpoint.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "url",
            type: "string",
            required: false,
            description: "HTTPS URL to receive webhook events.",
            example: "https://yourdomain.com/webhooks/v2",
          },
          {
            name: "events",
            type: "string[]",
            required: false,
            description: "Array of event type strings to subscribe to.",
            example: '["order.created"]',
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the endpoint is enabled.",
            example: "true",
          },
        ],
        response: {
          webhook_endpoint: {
            id: 1,
            url: "https://yourdomain.com/webhooks/v2",
            events: ["order.created"],
            is_active: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated webhook endpoint.",
      },
      {
        id: "regenerate-webhook-secret",
        method: "POST",
        path: "/webhook-endpoints/{id}/secret",
        title: "Regenerate webhook secret",
        description:
          "Generates a new signing secret for the webhook endpoint. The old secret is immediately invalidated.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
        ],
        response: {
          webhook_endpoint: {
            id: 1,
            secret: "whsec_z9y8x7w6v5u4t3s2r1q0",
          },
        },
        responseDescription:
          "Returns the new secret. Store it immediately — it cannot be retrieved again.",
        notes: [
          "The new webhook secret is shown only once. Copy it immediately; it cannot be retrieved again.",
        ],
      },
      {
        id: "list-webhook-endpoint-events",
        method: "GET",
        path: "/webhook-endpoints/{id}/events",
        title: "List webhook events for endpoint",
        description:
          "Returns a paginated list of webhook event deliveries for a specific endpoint.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
        ],
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
            name: "per_page",
            type: "integer",
            required: false,
            description: "Results per page.",
            default: "15",
            example: "15",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              event_id: "evt_a1b2c3d4",
              event_type: "order.created",
              status: "delivered",
              attempts: 1,
              response_code: 200,
              delivered_at: "2024-06-10T12:01:00Z",
              created_at: "2024-06-10T12:00:00Z",
            },
          ],
          current_page: 1,
          total: 28,
        },
        responseDescription:
          "Returns a paginated list of webhook event delivery records.",
      },
      {
        id: "get-webhook-endpoint-event",
        method: "GET",
        path: "/webhook-endpoints/{id}/events/{eventId}",
        title: "Retrieve a webhook event",
        description: "Returns details of a single webhook event delivery.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
          {
            name: "eventId",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook event.",
            example: "15",
          },
        ],
        response: {
          event: {
            id: 15,
            event_id: "evt_a1b2c3d4",
            event_type: "order.created",
            status: "delivered",
            attempts: 1,
            response_code: 200,
            payload: { order_id: 42, total: 4250, status: "pending" },
            delivered_at: "2024-06-10T12:01:00Z",
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription:
          "Returns the full webhook event delivery record including payload.",
      },
      {
        id: "bulk-retry-webhook-events",
        method: "POST",
        path: "/webhook-endpoints/{id}/bulk-retry",
        title: "Bulk retry webhook events",
        description:
          "Re-dispatches all failed webhook events for a specific endpoint.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the webhook endpoint.",
            example: "1",
          },
        ],
        response: { message: "Bulk retry queued.", retried_count: 7 },
        responseDescription:
          "Returns a confirmation with the number of events queued for retry.",
      },
    ],
  },

  {
    id: "api-keys",
    name: "API Keys",
    description:
      "API Keys are credentials used to authenticate requests to the FlowPOS API. Each key has a name, optional expiry, and a set of permissions scoping what it can access.",
    endpoints: [
      {
        id: "list-api-keys",
        method: "GET",
        path: "/api-keys",
        title: "List all API keys",
        description:
          "Returns a paginated list of API keys. Key tokens are masked after creation.",
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
            name: "limit",
            type: "integer",
            required: false,
            description: "Results per page.",
            default: "15",
            example: "15",
          },
        ],
        response: {
          apiKeys: {
            data: [
              {
                id: 1,
                name: "Production Key",
                token: null,
                expires_at: null,
                last_used_at: "2024-06-09T08:30:00Z",
                created_at: "2024-01-15T10:00:00Z",
                permissions: [
                  { name: "orders:read" },
                  { name: "customers:read" },
                ],
              },
            ],
            current_page: 1,
            total: 2,
          },
        },
        responseDescription:
          "Returns a paginated list of API key objects. The `token` is `null` after creation.",
      },
      {
        id: "create-api-key",
        method: "POST",
        path: "/api-keys",
        title: "Create an API key",
        description:
          "Creates a new API key. The full token is returned only at creation time.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Friendly name for this key.",
            example: "Production Key",
          },
          {
            name: "expiry",
            type: "string",
            required: false,
            description: "Expiry date (ISO 8601). Pass `null` for no expiry.",
            example: "2025-12-31T23:59:59Z",
          },
          {
            name: "permissions",
            type: "string[]",
            required: true,
            description: "Array of permission strings granted to this key.",
            example: '["orders:read","customers:read"]',
          },
        ],
        response: {
          apiKey: {
            id: 3,
            name: "Production Key",
            token: "tok_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
            expires_at: null,
            last_used_at: null,
            created_at: "2024-06-10T12:00:00Z",
            permissions: [{ name: "orders:read" }],
          },
        },
        responseDescription:
          "Returns the created key. The `token` value is shown only once — store it securely.",
        notes: [
          "The API key token is shown only once in the response. Copy it immediately; it cannot be retrieved again.",
        ],
      },
      {
        id: "delete-api-key",
        method: "DELETE",
        path: "/api-keys/{id}",
        title: "Delete an API key",
        description:
          "Permanently revokes and deletes an API key. Any applications using this key will immediately lose access.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the API key.",
          },
        ],
        response: { message: "API key deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-api-key",
        method: "GET",
        path: "/api-keys/{id}",
        title: "Retrieve an API key",
        description:
          "Returns details of a single API key. The token is masked.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the API key.",
            example: "1",
          },
        ],
        response: {
          apiKey: {
            id: 1,
            name: "Production Key",
            token: null,
            expires_at: null,
            last_used_at: "2024-06-09T08:30:00Z",
            created_at: "2024-01-15T10:00:00Z",
            permissions: [{ name: "orders:read" }, { name: "customers:read" }],
          },
        },
        responseDescription:
          "Returns the API key object. The `token` is always `null` after creation.",
      },
      {
        id: "update-api-key",
        method: "PUT",
        path: "/api-keys/{id}",
        title: "Update an API key",
        description:
          "Updates the name, permissions, or expiry of an existing API key.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the API key.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Friendly name for this key.",
            example: "Production Key",
          },
          {
            name: "permissions",
            type: "string[]",
            required: false,
            description: "Array of permission strings granted to this key.",
            example: '["orders:read","customers:read"]',
          },
          {
            name: "expires_at",
            type: "string",
            required: false,
            description:
              "Expiry date (ISO 8601). Pass `null` to remove expiry.",
            example: "2025-12-31",
          },
        ],
        response: {
          apiKey: {
            id: 1,
            name: "Production Key",
            token: null,
            expires_at: "2025-12-31T23:59:59Z",
            last_used_at: "2024-06-09T08:30:00Z",
            updated_at: "2024-06-10T13:00:00Z",
            permissions: [{ name: "orders:read" }, { name: "customers:read" }],
          },
        },
        responseDescription: "Returns the updated API key.",
      },
      {
        id: "regenerate-api-key",
        method: "POST",
        path: "/api-keys/{id}/regenerate",
        title: "Regenerate API key secret",
        description:
          "Generates a new secret token for an existing API key. The old token is immediately invalidated.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the API key.",
            example: "1",
          },
        ],
        response: {
          apiKey: {
            id: 1,
            name: "Production Key",
            token: "tok_live_z9y8x7w6v5u4t3s2r1q0p",
            expires_at: null,
          },
        },
        responseDescription:
          "Returns the API key with the new token. Store it immediately — it cannot be retrieved again.",
        notes: [
          "The new token is shown only once. Copy it immediately; it cannot be retrieved again.",
        ],
      },
    ],
  },

  {
    id: "addon-groups",
    name: "Addon Groups",
    description:
      "Addon Groups (also called modifier groups) define optional add-ons for products — such as toppings, sauces, or extras. Each group has min/max selection constraints.",
    endpoints: [
      {
        id: "list-addon-groups",
        method: "GET",
        path: "/addon-groups",
        title: "List all addon groups",
        description: "Returns a paginated list of addon groups.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number.",
            default: "1",
            example: "1",
          },
        ],
        response: {
          addOnGroups: {
            data: [
              {
                id: 1,
                name: "Extras",
                is_active: true,
                min_selection: 0,
                max_selection: 3,
                addons_count: 4,
                created_at: "2024-02-01T09:00:00Z",
              },
            ],
            total: 5,
            current_page: 1,
          },
        },
        responseDescription: "Returns a paginated list of addon group objects.",
      },
      {
        id: "create-addon-group",
        method: "POST",
        path: "/addon-groups",
        title: "Create an addon group",
        description: "Creates a new addon group with its add-ons.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Group name.",
            example: "Extras",
          },
          {
            name: "is_active",
            type: "boolean",
            required: true,
            description: "Whether the group is active.",
            example: "true",
          },
          {
            name: "min_selection",
            type: "integer",
            required: true,
            description: "Minimum number of add-ons the customer must select.",
            example: "0",
          },
          {
            name: "max_selection",
            type: "integer",
            required: true,
            description: "Maximum number of add-ons the customer can select.",
            example: "3",
          },
          {
            name: "addons",
            type: "object[]",
            required: true,
            description: "Array of addon objects.",
          },
          {
            name: "addons[].name",
            type: "string",
            required: true,
            description: "Addon name.",
            example: "Extra Cheese",
          },
          {
            name: "addons[].price",
            type: "integer",
            required: true,
            description: "Addon price in smallest currency unit.",
            example: "100",
          },
          {
            name: "addons[].is_active",
            type: "boolean",
            required: true,
            description: "Whether this addon is available.",
            example: "true",
          },
          {
            name: "addons[].max_quantity",
            type: "integer",
            required: false,
            description: "Max quantity per addon. Null for unlimited.",
            example: "null",
          },
        ],
        response: {
          addOnGroup: {
            id: 2,
            name: "Extras",
            is_active: true,
            min_selection: 0,
            max_selection: 3,
            addons: [
              { id: 3, name: "Extra Cheese", price: 100, is_active: true },
            ],
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created addon group.",
      },
      {
        id: "delete-addon-group",
        method: "DELETE",
        path: "/addon-groups/{id}",
        title: "Delete an addon group",
        description: "Permanently deletes an addon group.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the addon group.",
          },
        ],
        response: { message: "Addon group deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-addon-group",
        method: "GET",
        path: "/addon-groups/{id}",
        title: "Retrieve an addon group",
        description:
          "Returns full details of a single addon group including its addons.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the addon group.",
            example: "1",
          },
        ],
        response: {
          addOnGroup: {
            id: 1,
            name: "Extras",
            is_active: true,
            min_selection: 0,
            max_selection: 3,
            addons: [
              {
                id: 3,
                name: "Extra Cheese",
                price: 100,
                is_active: true,
                max_quantity: null,
              },
              {
                id: 4,
                name: "Bacon",
                price: 150,
                is_active: true,
                max_quantity: 2,
              },
            ],
            created_at: "2024-02-01T09:00:00Z",
            updated_at: "2024-06-01T10:00:00Z",
          },
        },
        responseDescription: "Returns the addon group with its addons.",
      },
      {
        id: "update-addon-group",
        method: "PUT",
        path: "/addon-groups/{id}",
        title: "Update an addon group",
        description: "Updates an existing addon group and its addons.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the addon group.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Group name.",
            example: "Extras",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the group is active.",
            example: "true",
          },
          {
            name: "min_selection",
            type: "integer",
            required: false,
            description: "Minimum number of add-ons the customer must select.",
            example: "0",
          },
          {
            name: "max_selection",
            type: "integer",
            required: false,
            description: "Maximum number of add-ons the customer can select.",
            example: "3",
          },
          {
            name: "addons",
            type: "object[]",
            required: false,
            description: "Array of addon objects to replace the current set.",
          },
          {
            name: "addons[].name",
            type: "string",
            required: true,
            description: "Addon name.",
            example: "Extra Cheese",
          },
          {
            name: "addons[].price",
            type: "integer",
            required: true,
            description: "Addon price in smallest currency unit.",
            example: "100",
          },
          {
            name: "addons[].is_active",
            type: "boolean",
            required: true,
            description: "Whether this addon is available.",
            example: "true",
          },
          {
            name: "addons[].max_quantity",
            type: "integer",
            required: false,
            description: "Max quantity per addon. Null for unlimited.",
            example: "null",
          },
        ],
        response: {
          addOnGroup: {
            id: 1,
            name: "Extras",
            is_active: true,
            min_selection: 0,
            max_selection: 3,
            addons: [
              { id: 3, name: "Extra Cheese", price: 100, is_active: true },
            ],
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated addon group.",
      },
      {
        id: "assign-addon-group",
        method: "POST",
        path: "/addon-groups/{id}/assign",
        title: "Assign addon group to product variants",
        description:
          "Assigns this addon group to one or more product variants.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the addon group.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "variants",
            type: "string[]",
            required: true,
            description: "Array of variant IDs to assign this addon group to.",
            example: "[1,2,3]",
          },
        ],
        response: {
          message: "Addon group assigned successfully.",
          assigned_count: 3,
        },
        responseDescription:
          "Returns a confirmation message with the number of variants assigned.",
      },
    ],
  },

  {
    id: "affiliates",
    name: "Affiliates",
    description:
      "The Affiliates module lets you manage a referral programme. Affiliates earn commission (percentage) on orders they refer, and can be nested in a hierarchy.",
    endpoints: [
      {
        id: "list-affiliates",
        method: "GET",
        path: "/m/affiliates",
        title: "List all affiliates",
        description: "Returns a paginated list of affiliates.",
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
            description: "Filter by name or email.",
            example: "bob",
          },
        ],
        response: {
          data: [
            {
              id: 1,
              name: "Bob Referrer",
              email: "bob@example.com",
              phone: "+44 7700 900020",
              commission_percentage: 10,
              is_active: true,
            },
          ],
          current_page: 1,
          total: 8,
        },
        responseDescription: "Returns a paginated list of affiliates.",
      },
      {
        id: "create-affiliate",
        method: "POST",
        path: "/m/affiliates",
        title: "Create an affiliate",
        description: "Creates a new affiliate.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Affiliate full name.",
            example: "Bob Referrer",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Affiliate email.",
            example: "bob@example.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Phone number.",
            example: "+44 7700 900020",
          },
          {
            name: "commission_percentage",
            type: "number",
            required: true,
            description: "Commission percentage (0–100).",
            example: "10",
          },
          {
            name: "parent",
            type: "integer",
            required: false,
            description:
              "ID of the parent affiliate for hierarchical programmes.",
            example: "null",
          },
        ],
        response: {
          id: 2,
          name: "Bob Referrer",
          email: "bob@example.com",
          commission_percentage: 10,
          is_active: true,
          created_at: "2024-06-10T12:00:00Z",
        },
        responseDescription: "Returns the created affiliate.",
      },
      {
        id: "get-affiliate",
        method: "GET",
        path: "/m/affiliates/{id}",
        title: "Retrieve an affiliate",
        description: "Returns full details of a single affiliate.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the affiliate.",
            example: "1",
          },
        ],
        response: {
          affiliate: {
            id: 1,
            name: "Bob Referrer",
            email: "bob@example.com",
            phone: "+44 7700 900020",
            commission_percentage: 10,
            is_active: true,
            referral_code: "BOB10",
            total_referred_orders: 12,
            total_commission_earned: 4500,
            created_at: "2024-02-01T09:00:00Z",
            updated_at: "2024-06-01T10:00:00Z",
          },
        },
        responseDescription: "Returns the affiliate object.",
      },
      {
        id: "update-affiliate",
        method: "PUT",
        path: "/m/affiliates/{id}",
        title: "Update an affiliate",
        description: "Updates an existing affiliate's details.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the affiliate.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Affiliate full name.",
            example: "Bob Referrer",
          },
          {
            name: "email",
            type: "string",
            required: false,
            description: "Affiliate email.",
            example: "bob@example.com",
          },
          {
            name: "commission_rate",
            type: "number",
            required: false,
            description: "Commission percentage (0–100).",
            example: "12",
          },
        ],
        response: {
          affiliate: {
            id: 1,
            name: "Bob Referrer",
            email: "bob@example.com",
            commission_percentage: 12,
            is_active: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated affiliate.",
      },
      {
        id: "get-affiliate-settings",
        method: "GET",
        path: "/m/affiliates-settings",
        title: "Get affiliate settings",
        description: "Returns the global affiliate programme settings.",
        response: {
          settings: {
            is_active: true,
            commission_rate: 10,
            cookie_days: 30,
          },
        },
        responseDescription: "Returns the affiliate settings object.",
      },
      {
        id: "update-affiliate-settings",
        method: "PUT",
        path: "/m/affiliates-settings",
        title: "Update affiliate settings",
        description: "Updates the global affiliate programme settings.",
        bodyParams: [
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the affiliate programme is enabled.",
            example: "true",
          },
          {
            name: "commission_rate",
            type: "number",
            required: false,
            description: "Default commission percentage for new affiliates.",
            example: "10",
          },
          {
            name: "cookie_days",
            type: "integer",
            required: false,
            description: "Number of days the referral cookie is valid.",
            example: "30",
          },
        ],
        response: {
          settings: {
            is_active: true,
            commission_rate: 10,
            cookie_days: 30,
          },
        },
        responseDescription: "Returns the updated affiliate settings.",
      },
    ],
  },

  {
    id: "online-store",
    name: "Online Store",
    description:
      "The Online Store settings control the public-facing storefront configuration, including business name, contact info, order rules, and maintenance mode.",
    endpoints: [
      {
        id: "get-online-store",
        method: "GET",
        path: "/online-store",
        title: "Get online store settings",
        description: "Returns the current online store settings.",
        response: {
          onlineStore: {
            name: "My Store",
            email: "hello@mystore.com",
            phone: "+44 7700 900000",
            primary_colour: "#3B82F6",
            minimum_order: 1000,
            collection_available: true,
            maintenance_mode: false,
            maintenance_message: null,
          },
        },
        responseDescription: "Returns the store settings object.",
      },
      {
        id: "update-online-store",
        method: "PUT",
        path: "/online-store",
        title: "Update online store settings",
        description: "Updates the online store configuration.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Store display name.",
            example: "My Store",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Store contact email.",
            example: "hello@mystore.com",
          },
          {
            name: "phone",
            type: "string",
            required: true,
            description: "Store phone number.",
            example: "+44 7700 900000",
          },
          {
            name: "minimum_order",
            type: "integer",
            required: true,
            description: "Minimum order value in smallest currency unit.",
            example: "1000",
          },
          {
            name: "collection_available",
            type: "boolean",
            required: true,
            description: "Whether click-and-collect is available.",
            example: "true",
          },
          {
            name: "maintenance_mode",
            type: "boolean",
            required: true,
            description: "Put the store in maintenance mode.",
            example: "false",
          },
        ],
        response: {
          onlineStore: {
            name: "My Store",
            email: "hello@mystore.com",
            phone: "+44 7700 900000",
            minimum_order: 1000,
            collection_available: true,
            maintenance_mode: false,
          },
        },
        responseDescription: "Returns the updated settings.",
      },
    ],
  },

  {
    id: "domains",
    name: "Domains",
    description:
      "Custom domains let you serve your online store from your own domain (e.g. shop.yourbusiness.com). FlowPOS handles TLS/SSL automatically via Cloudflare.",
    endpoints: [
      {
        id: "list-domains",
        method: "GET",
        path: "/domains",
        title: "List all domains",
        description: "Returns all domains configured for your tenant.",
        response: {
          domains: [
            {
              id: 1,
              name: "shop.yourbusiness.com",
              status: "active",
              is_default: true,
              is_active: true,
              created_at: "2024-03-01T10:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of domain objects.",
      },
      {
        id: "create-domain",
        method: "POST",
        path: "/domains",
        title: "Add a domain",
        description:
          "Registers a new custom domain. After creation, configure your DNS CNAME as instructed.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "The domain name (e.g. shop.yourbusiness.com).",
            example: "shop.yourbusiness.com",
          },
          {
            name: "is_default",
            type: "boolean",
            required: true,
            description: "Set as the default domain for the store.",
            example: "false",
          },
        ],
        response: {
          domain: {
            id: 2,
            name: "shop.yourbusiness.com",
            status: "pending_verification",
            is_default: false,
            verification_token: "verify_a1b2c3d4",
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription:
          "Returns the domain. Use `verification_token` to configure DNS.",
      },
      {
        id: "check-domain-dns",
        method: "GET",
        path: "/domains/{id}/dns-check",
        title: "Check domain DNS",
        description:
          "Checks whether the domain's DNS is correctly configured and triggers certificate provisioning.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the domain.",
          },
        ],
        response: {
          domain: {
            id: 2,
            name: "shop.yourbusiness.com",
            status: "active",
            is_active: true,
          },
        },
        responseDescription: "Returns the updated domain with its new status.",
      },
      {
        id: "delete-domain",
        method: "DELETE",
        path: "/domains/{id}",
        title: "Delete a domain",
        description: "Removes a domain from your account.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the domain.",
          },
        ],
        response: { message: "Domain deleted." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-domain",
        method: "PUT",
        path: "/domains/{id}",
        title: "Update a domain",
        description: "Updates the domain name.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the domain.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "domain",
            type: "string",
            required: true,
            description: "The new domain name.",
            example: "store.yourbusiness.com",
          },
        ],
        response: {
          domain: {
            id: 1,
            name: "store.yourbusiness.com",
            status: "pending_verification",
            is_default: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated domain.",
      },
    ],
  },

  {
    id: "auth-endpoints",
    name: "Authentication",
    description:
      "Authentication endpoints for login, registration, profile management, and session handling.",
    endpoints: [
      {
        id: "auth-login",
        method: "POST",
        path: "/auth/login",
        title: "Login",
        description: "Authenticates a user and returns a bearer token.",
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "User email address.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "password",
            type: "string",
            required: true,
            description: "User password.",
            example: "super_secret_password",
          },
        ],
        response: {
          token: "tok_a1b2c3d4e5f6g7h8i9j0",
          user: { id: 1, name: "Ahmad Hamid", email: "ahmad@flowpos.com" },
        },
        responseDescription:
          "Returns a bearer token and the authenticated user.",
      },
      {
        id: "auth-mfa-step1",
        method: "POST",
        path: "/auth/mfa/step1",
        title: "MFA Step 1 — Verify Credentials",
        description:
          "First step of MFA login. Validates credentials and sends an MFA code to the user.",
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "User email address.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "password",
            type: "string",
            required: true,
            description: "User password.",
            example: "super_secret_password",
          },
        ],
        response: {
          mfa_token: "mfa_x9y8z7w6v5",
          message: "MFA code sent",
        },
        responseDescription:
          "Returns a temporary MFA token. Pass it to step 2.",
      },
      {
        id: "auth-mfa-step2",
        method: "POST",
        path: "/auth/mfa/step2",
        title: "MFA Step 2 — Verify Code",
        description:
          "Second step of MFA login. Verifies the OTP code and returns a session token.",
        bodyParams: [
          {
            name: "mfa_token",
            type: "string",
            required: true,
            description: "The MFA token returned from step 1.",
            example: "mfa_x9y8z7w6v5",
          },
          {
            name: "code",
            type: "string",
            required: true,
            description: "The OTP code sent to the user.",
            example: "482910",
          },
        ],
        response: {
          token: "tok_a1b2c3d4e5f6g7h8i9j0",
          user: { id: 1 },
        },
        responseDescription:
          "Returns a bearer token on successful MFA verification.",
      },
      {
        id: "auth-register",
        method: "POST",
        path: "/auth/register",
        title: "Register",
        description: "Creates a new user account and tenant.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Full name of the user.",
            example: "Ahmad Hamid",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "User email address.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "password",
            type: "string",
            required: true,
            description: "Account password (minimum 8 characters).",
            example: "super_secret_password",
          },
          {
            name: "business_name",
            type: "string",
            required: true,
            description: "Name of the business.",
            example: "My Café",
          },
        ],
        response: {
          user: { id: 1 },
          token: "tok_a1b2c3d4e5f6g7h8i9j0",
        },
        responseDescription: "Returns the new user and a bearer token.",
      },
      {
        id: "auth-me",
        method: "GET",
        path: "/auth/me",
        title: "Get current user",
        description: "Returns the currently authenticated user.",
        response: {
          user: {
            id: 1,
            name: "Ahmad Hamid",
            email: "ahmad@flowpos.com",
            role: "owner",
          },
        },
        responseDescription: "Returns the authenticated user object.",
      },
      {
        id: "auth-profile",
        method: "GET",
        path: "/auth/profile",
        title: "Get profile",
        description: "Returns the profile details of the authenticated user.",
        response: {
          profile: {
            id: 1,
            name: "Ahmad Hamid",
            email: "ahmad@flowpos.com",
            phone: "+44 7700 900001",
          },
        },
        responseDescription: "Returns the user profile object.",
      },
      {
        id: "auth-update-profile",
        method: "PUT",
        path: "/auth/profile",
        title: "Update profile",
        description: "Updates the profile of the authenticated user.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Full name.",
            example: "Ahmad Hamid",
          },
          {
            name: "email",
            type: "string",
            required: false,
            description: "Email address.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Phone number in international format.",
            example: "+44 7700 900001",
          },
        ],
        response: {
          profile: {
            id: 1,
            name: "Ahmad Hamid",
            email: "ahmad@flowpos.com",
            phone: "+44 7700 900001",
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated profile.",
      },
      {
        id: "auth-change-password",
        method: "POST",
        path: "/auth/change-password",
        title: "Change password",
        description: "Changes the password for the authenticated user.",
        bodyParams: [
          {
            name: "current_password",
            type: "string",
            required: true,
            description: "The user's current password.",
            example: "old_password_123",
          },
          {
            name: "new_password",
            type: "string",
            required: true,
            description: "The new password (minimum 8 characters).",
            example: "new_secure_password",
          },
          {
            name: "new_password_confirmation",
            type: "string",
            required: true,
            description: "Must match `new_password`.",
            example: "new_secure_password",
          },
        ],
        response: { message: "Password changed successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "auth-forgot-password",
        method: "POST",
        path: "/auth/forgot-password",
        title: "Forgot password",
        description:
          "Sends a password reset link to the specified email address.",
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address associated with the account.",
            example: "ahmad@flowpos.com",
          },
        ],
        response: { message: "Password reset link sent." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "auth-reset-password",
        method: "POST",
        path: "/auth/reset-password",
        title: "Reset password",
        description:
          "Resets the user's password using a token from the reset email.",
        bodyParams: [
          {
            name: "token",
            type: "string",
            required: true,
            description: "The password reset token from the email.",
            example: "rst_a1b2c3d4e5f6",
          },
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address associated with the account.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "password",
            type: "string",
            required: true,
            description: "New password.",
            example: "new_secure_password",
          },
          {
            name: "password_confirmation",
            type: "string",
            required: true,
            description: "Must match `password`.",
            example: "new_secure_password",
          },
        ],
        response: { message: "Password reset successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "auth-logout",
        method: "POST",
        path: "/auth/logout",
        title: "Logout",
        description: "Revokes the current session token.",
        response: { message: "Logged out successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "auth-list-tokens",
        method: "GET",
        path: "/auth/tokens",
        title: "List active sessions",
        description:
          "Returns all active session tokens for the authenticated user.",
        response: {
          tokens: [
            {
              id: 1,
              name: "Chrome on Mac",
              last_used_at: "2024-06-10T12:00:00Z",
            },
          ],
        },
        responseDescription:
          "Returns an array of active session token objects.",
      },
      {
        id: "auth-revoke-token",
        method: "DELETE",
        path: "/auth/tokens/{id}",
        title: "Revoke a session",
        description:
          "Revokes a specific session token, logging out that device.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the session token.",
            example: "1",
          },
        ],
        response: { message: "Session revoked." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "analytics",
    name: "Analytics",
    description:
      "Analytics endpoints for dashboard stats, order trends, product performance, and customer insights.",
    endpoints: [
      {
        id: "analytics-overview",
        method: "GET",
        path: "/analytics/v2",
        title: "Dashboard overview",
        description: "Returns high-level analytics for the dashboard.",
        response: {
          analytics: {
            total_revenue: 125000,
            total_orders: 842,
            total_customers: 310,
            avg_order_value: 4250,
          },
        },
        responseDescription: "Returns the dashboard analytics summary.",
      },
      {
        id: "analytics-orders",
        method: "GET",
        path: "/analytics/orders",
        title: "Order analytics",
        description: "Returns order trend data including daily breakdown.",
        response: {
          analytics: {
            daily: [],
            weekly_total: 4250,
            monthly_total: 18500,
          },
        },
        responseDescription:
          "Returns order analytics with daily, weekly, and monthly totals.",
      },
      {
        id: "analytics-products",
        method: "GET",
        path: "/analytics/products",
        title: "Product analytics",
        description: "Returns performance data for all products.",
        response: {
          analytics: [
            {
              product_id: 1,
              name: "Classic Burger",
              total_sold: 142,
              revenue: 59640,
            },
          ],
        },
        responseDescription: "Returns an array of product analytics objects.",
      },
      {
        id: "analytics-customers",
        method: "GET",
        path: "/analytics/customers",
        title: "Customer analytics",
        description: "Returns customer behaviour and lifetime value data.",
        response: {
          analytics: [
            {
              customer_id: 1,
              name: "Jane Smith",
              total_orders: 5,
              lifetime_value: 18500,
            },
          ],
        },
        responseDescription: "Returns an array of customer analytics objects.",
      },
    ],
  },

  {
    id: "roles",
    name: "Roles",
    description:
      "Manage roles and permissions for your team members. Each role defines what actions a user can perform.",
    endpoints: [
      {
        id: "list-roles",
        method: "GET",
        path: "/auth/roles",
        title: "List all roles",
        description: "Returns all roles configured for your tenant.",
        response: {
          roles: [
            {
              id: 1,
              name: "Manager",
              permissions: ["orders:read", "orders:write"],
            },
          ],
        },
        responseDescription: "Returns an array of role objects.",
      },
      {
        id: "get-role",
        method: "GET",
        path: "/auth/roles/{id}",
        title: "Retrieve a role",
        description:
          "Returns full details of a single role including its permissions.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        response: {
          role: {
            id: 1,
            name: "Manager",
            permissions: ["orders:read", "orders:write", "customers:read"],
          },
        },
        responseDescription: "Returns the role object.",
      },
      {
        id: "create-role",
        method: "POST",
        path: "/auth/roles",
        title: "Create a role",
        description: "Creates a new role with specified permissions.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Role name.",
            example: "Manager",
          },
          {
            name: "permissions",
            type: "string[]",
            required: true,
            description: "Array of permission strings granted to this role.",
            example: '["orders:read","customers:read"]',
          },
        ],
        response: {
          role: {
            id: 3,
            name: "Manager",
            permissions: ["orders:read", "customers:read"],
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created role.",
      },
      {
        id: "update-role",
        method: "PUT",
        path: "/auth/roles/{id}",
        title: "Update a role",
        description: "Updates the name and/or permissions of an existing role.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Role name.",
            example: "Senior Manager",
          },
          {
            name: "permissions",
            type: "string[]",
            required: false,
            description: "Array of permission strings.",
            example: '["orders:read","orders:write","customers:read"]',
          },
        ],
        response: {
          role: {
            id: 1,
            name: "Senior Manager",
            permissions: ["orders:read", "orders:write", "customers:read"],
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated role.",
      },
      {
        id: "delete-role",
        method: "DELETE",
        path: "/auth/roles/{id}",
        title: "Delete a role",
        description: "Permanently deletes a role.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        response: { message: "Role deleted." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "team",
    name: "Team & Invitations",
    description:
      "Manage your team members, send invitations, and control access to your FlowPOS account.",
    endpoints: [
      {
        id: "list-team-members",
        method: "GET",
        path: "/users",
        title: "List team members",
        description: "Returns all team members for your tenant.",
        response: {
          users: [
            {
              id: 1,
              name: "Ahmad Hamid",
              email: "ahmad@flowpos.com",
              role: { id: 1, name: "Owner" },
              is_active: true,
            },
          ],
        },
        responseDescription: "Returns an array of team member objects.",
      },
      {
        id: "update-team-member",
        method: "PUT",
        path: "/users/{id}",
        title: "Update team member",
        description: "Updates the role or active status of a team member.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the user.",
            example: "2",
          },
        ],
        bodyParams: [
          {
            name: "role_id",
            type: "integer",
            required: false,
            description: "New role ID to assign.",
            example: "2",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the team member is active.",
            example: "true",
          },
        ],
        response: {
          user: {
            id: 2,
            name: "Jane Smith",
            email: "jane@flowpos.com",
            role: { id: 2, name: "Manager" },
            is_active: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated team member.",
      },
      {
        id: "remove-team-member",
        method: "DELETE",
        path: "/users/{id}",
        title: "Remove team member",
        description: "Removes a team member from your account.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the user.",
            example: "2",
          },
        ],
        response: { message: "Team member removed." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "list-invitations",
        method: "GET",
        path: "/invitations",
        title: "List invitations",
        description: "Returns all pending and accepted invitations.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number.",
            default: "1",
            example: "1",
          },
        ],
        response: {
          invitations: [
            {
              id: 1,
              email: "newuser@example.com",
              role: { id: 2, name: "Manager" },
              status: "pending",
              invited_at: "2024-06-10T10:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of invitation objects.",
      },
      {
        id: "send-invitation",
        method: "POST",
        path: "/invitations",
        title: "Send an invitation",
        description: "Sends an email invitation to a new team member.",
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address of the person to invite.",
            example: "newuser@example.com",
          },
          {
            name: "role_id",
            type: "integer",
            required: true,
            description: "Role ID to assign on acceptance.",
            example: "2",
          },
        ],
        response: {
          invitation: {
            id: 2,
            email: "newuser@example.com",
            role: { id: 2, name: "Manager" },
            status: "pending",
            invited_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created invitation.",
      },
      {
        id: "revoke-invitation",
        method: "DELETE",
        path: "/invitations/{id}",
        title: "Revoke an invitation",
        description: "Cancels a pending invitation.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the invitation.",
            example: "1",
          },
        ],
        response: { message: "Invitation revoked." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "resend-invitation",
        method: "POST",
        path: "/invitations/{token}/resend",
        title: "Resend an invitation",
        description: "Resends the invitation email to the recipient.",
        pathParams: [
          {
            name: "token",
            type: "string",
            required: true,
            description: "The invitation token.",
            example: "inv_abc123",
          },
        ],
        response: { message: "Invitation resent." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "business-settings",
    name: "Business Settings",
    description:
      "Manage your business profile, branding, and configuration. Update your business name, contact info, logo, and other tenant-level settings.",
    endpoints: [
      {
        id: "get-business-settings",
        method: "GET",
        path: "/tenants/{id}",
        title: "Retrieve business settings",
        description:
          "Returns the business profile and configuration for your tenant.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the tenant.",
            example: "1",
          },
        ],
        response: {
          tenant: {
            id: 1,
            business_name: "My Café",
            business_email: "hello@mycafe.com",
            phone: "+44 7700 900000",
            address: "123 High St",
            logo_url: "https://cdn.example.com/logo.png",
          },
        },
        responseDescription: "Returns the tenant business settings object.",
      },
      {
        id: "update-business-settings",
        method: "PUT",
        path: "/tenants/{id}",
        title: "Update business settings",
        description: "Updates your business profile.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the tenant.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "business_name",
            type: "string",
            required: false,
            description: "Business display name.",
            example: "My Café",
          },
          {
            name: "business_email",
            type: "string",
            required: false,
            description: "Primary business email.",
            example: "hello@mycafe.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Business phone number.",
            example: "+44 7700 900000",
          },
          {
            name: "address",
            type: "string",
            required: false,
            description: "Business address.",
            example: "123 High St, London",
          },
        ],
        response: {
          tenant: {
            id: 1,
            business_name: "My Café",
            business_email: "hello@mycafe.com",
            phone: "+44 7700 900000",
            address: "123 High St, London",
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated tenant settings.",
      },
    ],
  },

  {
    id: "payment-settings",
    name: "Payment Settings",
    description:
      "Configure your payment processing settings including accepted methods, currencies, and tip options.",
    endpoints: [
      {
        id: "get-payment-settings",
        method: "GET",
        path: "/payment-settings",
        title: "Get payment settings",
        description: "Returns the current payment processing configuration.",
        response: {
          paymentSettings: {
            currency: "GBP",
            accept_cash: true,
            accept_card: true,
            tips_enabled: false,
          },
        },
        responseDescription: "Returns the payment settings object.",
      },
      {
        id: "update-payment-settings",
        method: "PUT",
        path: "/payment-settings",
        title: "Update payment settings",
        description: "Updates the payment processing configuration.",
        bodyParams: [
          {
            name: "currency",
            type: "string",
            required: false,
            description: "ISO 4217 currency code.",
            example: "GBP",
          },
          {
            name: "accept_cash",
            type: "boolean",
            required: false,
            description: "Whether to accept cash payments.",
            example: "true",
          },
          {
            name: "accept_card",
            type: "boolean",
            required: false,
            description: "Whether to accept card payments.",
            example: "true",
          },
          {
            name: "tips_enabled",
            type: "boolean",
            required: false,
            description: "Whether to enable tipping at checkout.",
            example: "false",
          },
        ],
        response: {
          paymentSettings: {
            currency: "GBP",
            accept_cash: true,
            accept_card: true,
            tips_enabled: false,
          },
        },
        responseDescription: "Returns the updated payment settings.",
      },
    ],
  },

  {
    id: "payment-account",
    name: "Payment Account",
    description:
      "Manage your Stripe Connect payment account. Used to configure payouts and card processing.",
    endpoints: [
      {
        id: "get-payment-account",
        method: "GET",
        path: "/payment-account",
        title: "Get payment account",
        description: "Returns the connected Stripe account details.",
        response: {
          account: {
            id: "acct_1OkT2r2eZvKYlo2C",
            charges_enabled: true,
            payouts_enabled: true,
            country: "GB",
          },
        },
        responseDescription: "Returns the Stripe Connect account object.",
      },
      {
        id: "create-payment-account",
        method: "POST",
        path: "/payment-account",
        title: "Create payment account",
        description:
          "Creates a new Stripe Connect account and returns an onboarding URL.",
        response: {
          account: {
            id: "acct_1OkT2r2eZvKYlo2C",
            onboarding_url: "https://connect.stripe.com/setup/s/abc123",
          },
        },
        responseDescription:
          "Returns the Stripe account ID and onboarding URL. Redirect the user to complete setup.",
      },
      {
        id: "get-payment-account-session",
        method: "GET",
        path: "/payment-account-session",
        title: "Get account session",
        description:
          "Returns a short-lived client secret for embedded Stripe Connect components.",
        response: {
          client_secret: "acas_a1b2c3d4e5f6g7h8",
        },
        responseDescription:
          "Returns a client secret for use with Stripe's embedded UI.",
      },
    ],
  },

  {
    id: "payouts",
    name: "Payouts",
    description:
      "View your payout history and balance transfers to your bank account.",
    endpoints: [
      {
        id: "list-payouts",
        method: "GET",
        path: "/payouts",
        title: "List payouts",
        description: "Returns a list of payouts to your bank account.",
        response: {
          payouts: [
            {
              id: "po_1OkT2r2eZvKYlo2C",
              amount: 50000,
              currency: "gbp",
              arrival_date: "2024-06-10",
              status: "paid",
            },
          ],
        },
        responseDescription: "Returns an array of payout objects.",
      },
    ],
  },

  {
    id: "attachments",
    name: "Attachments",
    description:
      "Manage file attachments for products. Upload images and digital files, then link them to product variants.",
    endpoints: [
      {
        id: "list-attachments",
        method: "GET",
        path: "/attachments",
        title: "List attachments",
        description: "Returns a paginated list of uploaded attachments.",
        queryParams: [
          {
            name: "page",
            type: "integer",
            required: false,
            description: "Page number.",
            default: "1",
            example: "1",
          },
        ],
        response: {
          attachments: {
            data: [
              {
                id: 1,
                uid: "att_a1b2c3",
                original_name: "burger.jpg",
                url: "https://cdn.example.com/burger.jpg",
                type: "image",
              },
            ],
            total: 12,
          },
        },
        responseDescription: "Returns a paginated list of attachment objects.",
      },
      {
        id: "upload-attachment",
        method: "POST",
        path: "/attachments",
        title: "Upload attachment",
        description: "Uploads an image or digital file.",
        bodyParams: [
          {
            name: "file",
            type: "file",
            required: true,
            description:
              "Image or digital file to upload (multipart/form-data).",
            example: "burger.jpg",
          },
        ],
        response: {
          attachment: {
            id: 2,
            uid: "att_d4e5f6",
            original_name: "burger.jpg",
            url: "https://cdn.example.com/burger.jpg",
            type: "image",
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the uploaded attachment object.",
        notes: ["Upload must be multipart/form-data."],
      },
      {
        id: "delete-attachment",
        method: "DELETE",
        path: "/attachments/{id}",
        title: "Delete attachment",
        description:
          "Permanently deletes an attachment and its associated file.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the attachment.",
            example: "1",
          },
        ],
        response: { message: "Attachment deleted." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

  {
    id: "sections",
    name: "Sections",
    description:
      "Sections are named areas within a location (e.g. 'Main Floor', 'Bar', 'Patio'). Used to organise tables and seating in EPOS mode.",
    endpoints: [
      {
        id: "list-sections",
        method: "GET",
        path: "/locations/{locationId}/sections",
        title: "List sections for a location",
        description: "Returns all sections for a specific location.",
        pathParams: [
          {
            name: "locationId",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
        ],
        response: {
          sections: [
            {
              id: 1,
              name: "Main Floor",
              location_id: 1,
              tables_count: 8,
            },
          ],
        },
        responseDescription: "Returns an array of section objects.",
      },
      {
        id: "create-section",
        method: "POST",
        path: "/locations/{locationId}/sections",
        title: "Create a section",
        description: "Creates a new section within a location.",
        pathParams: [
          {
            name: "locationId",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Section name.",
            example: "Bar Area",
          },
          {
            name: "tables_count",
            type: "integer",
            required: false,
            description: "Number of tables in this section.",
            example: "6",
          },
        ],
        response: {
          section: {
            id: 2,
            name: "Bar Area",
            location_id: 1,
            tables_count: 6,
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created section.",
      },
      {
        id: "update-section",
        method: "PUT",
        path: "/locations/{locationId}/sections/{sectionId}",
        title: "Update a section",
        description: "Updates an existing section.",
        pathParams: [
          {
            name: "locationId",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
          {
            name: "sectionId",
            type: "integer",
            required: true,
            description: "The numeric ID of the section.",
            example: "2",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Updated section name.",
            example: "Bar & Lounge",
          },
          {
            name: "tables_count",
            type: "integer",
            required: false,
            description: "Updated number of tables.",
            example: "8",
          },
        ],
        response: {
          section: {
            id: 2,
            name: "Bar & Lounge",
            location_id: 1,
            tables_count: 8,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated section.",
      },
      {
        id: "delete-section",
        method: "DELETE",
        path: "/locations/{locationId}/sections/{sectionId}",
        title: "Delete a section",
        description: "Permanently deletes a section from a location.",
        pathParams: [
          {
            name: "locationId",
            type: "integer",
            required: true,
            description: "The numeric ID of the location.",
            example: "1",
          },
          {
            name: "sectionId",
            type: "integer",
            required: true,
            description: "The numeric ID of the section.",
            example: "2",
          },
        ],
        response: { message: "Section deleted." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },
];

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getAllEndpoints() {
  return resources.flatMap((r) =>
    r.endpoints.map((e) => ({ ...e, resourceId: r.id, resourceName: r.name })),
  );
}
