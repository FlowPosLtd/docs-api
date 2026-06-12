import type { Resource } from "../../types";

export const customerResources: Resource[] = [
  {
    id: "customers",
    name: "Customers",
    description:
      "The Customer object represents a customer who has interacted with your business. Customers can have associated orders, addresses, notes, and group memberships.",
    objectName: "customer",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the customer." },
      { name: "name", type: "string", required: false, description: "Full name of the customer." },
      { name: "email", type: "string", required: false, nullable: true, description: "Email address of the customer." },
      { name: "phone", type: "string", required: false, nullable: true, description: "Phone number of the customer." },
      { name: "address", type: "string", required: false, nullable: true, description: "Primary address of the customer." },
      { name: "notes", type: "string", required: false, nullable: true, description: "Internal notes about this customer." },
      { name: "total_spend", type: "number", required: false, description: "Lifetime total spend by this customer." },
      { name: "orders_count", type: "integer", required: false, description: "Total number of orders placed by this customer." },
      { name: "tenant_id", type: "integer", required: false, description: "ID of the tenant this customer belongs to." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the customer record was created." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the customer record was last modified." },
    ],
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
          data: {
            customers: {
              current_page: 1,
              data: [
                {
                  id: 1,
                  name: "John Doe",
                  otp: null,
                  otp_expires_at: null,
                  has_online_account: false,
                  phone: "+44 7700 900001",
                  email: "john@example.com",
                  stripe_customer_id: null,
                  dob: null,
                  gender: null,
                  registered_at: null,
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                  orders_count: 0,
                },
              ],
              first_page_url: "http://api.flowpos.me/v1/customers?page=1",
              from: 1,
              last_page: 19,
              last_page_url: "http://api.flowpos.me/v1/customers?page=19",
              links: [
                {
                  url: null,
                  label: "&laquo; Previous",
                  page: null,
                  active: false,
                },
              ],
              next_page_url: "http://api.flowpos.me/v1/customers?page=2",
              path: "http://api.flowpos.me/v1/customers",
              per_page: 15,
              prev_page_url: null,
              to: 15,
              total: 280,
            },
          },
          status: true,
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
          data: {
            customer: {
              name: "John Doe",
              email: "john@example.com",
              phone: "+44 7700 900001",
              updated_at: "2024-01-10T09:00:00.000000Z",
              created_at: "2024-01-10T09:00:00.000000Z",
              id: 1,
            },
          },
          status: true,
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
          data: {
            customer: {
              id: 1,
              name: "John Doe",
              otp: null,
              otp_expires_at: null,
              has_online_account: false,
              phone: "+44 7700 900001",
              email: "john@example.com",
              stripe_customer_id: null,
              dob: null,
              gender: null,
              registered_at: null,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              orders_count: 0,
              subscriptions: [],
              orders: [],
              notes: [],
              addresses: [],
              groups: [],
            },
          },
          status: true,
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
          data: {
            customer: {
              id: 1,
              name: "John Doe",
              otp: null,
              otp_expires_at: null,
              has_online_account: false,
              phone: "+44 7700 900001",
              email: "john@example.com",
              stripe_customer_id: null,
              dob: null,
              gender: null,
              registered_at: null,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
            },
          },
          status: true,
        },
        responseDescription: "Returns the updated customer object.",
      },
    ],
  },

  {
    id: "customer-groups",
    name: "Customer Groups",
    description:
      'Customer Groups let you segment your customers into labelled collections (e.g. "VIP", "Wholesale"). You can assign multiple customers to a group and use groups for targeted discounts.',
    objectName: "customer group",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the customer group." },
      { name: "name", type: "string", required: false, description: "Display name of the group." },
      { name: "colour", type: "string", required: false, description: "Hex colour code used to label the group in the dashboard (e.g. `#FFD700`)." },
      { name: "customers_count", type: "integer", required: false, description: "Number of customers currently in this group." },
      { name: "customers", type: "object[]", required: false, description: "Array of customer objects in this group. Only included on retrieve endpoints." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the group was created." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the group was last modified." },
    ],
    endpoints: [
      {
        id: "list-customer-groups",
        method: "GET",
        path: "/customer-groups",
        title: "List all customer groups",
        description: "Returns all customer groups for your tenant.",
        response: {
          data: {
            groups: [
              {
                id: 8,
                name: "VIP",
                colour: "#FFD700",
                created_at: "2024-01-10T09:00:00.000000Z",
                updated_at: "2024-01-10T09:00:00.000000Z",
                customers_count: 0,
              },
            ],
          },
          status: true,
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
          data: {
            group: {
              name: "VIP",
              colour: "#FFD700",
              updated_at: "2024-01-10T09:00:00.000000Z",
              created_at: "2024-01-10T09:00:00.000000Z",
              id: 9,
            },
          },
          status: true,
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
          data: {
            group: {
              id: 8,
              name: "VIP",
              colour: "#FFD700",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              customers: [],
            },
          },
          status: true,
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
          data: {
            group: {
              id: 8,
              name: "Premium",
              colour: "#C0C0C0",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
            },
          },
          status: true,
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
        response: { data: null, status: true },
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
        response: {
          data: {
            group: {
              id: 1,
              name: "VIP",
              colour: "#FFD700",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              customers: [
                {
                  id: 1,
                  name: "John Doe",
                  otp: null,
                  otp_expires_at: null,
                  has_online_account: false,
                  phone: "+44 7700 900001",
                  email: "john@example.com",
                  stripe_customer_id: null,
                  dob: null,
                  gender: null,
                  registered_at: null,
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                  pivot: {
                    customer_group_id: 1,
                    customer_id: 1,
                  },
                },
              ],
            },
          },
          status: true,
        },
        responseDescription: "Returns the updated group with its assigned customers.",
      },
    ],
  },
];
