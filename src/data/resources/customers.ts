import type { Resource } from "../../types";

export const customerResources: Resource[] = [
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
];
