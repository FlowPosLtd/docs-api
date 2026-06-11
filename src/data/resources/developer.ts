import type { Resource } from "../../types";

export const developerResources: Resource[] = [
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
        response: { data: null, status: true },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "get-webhook-event-types",
        method: "GET",
        path: "/webhook-event-types",
        title: "List webhook event types",
        description: "Returns all available event types you can subscribe to.",
        response: {
          data: {
            events: [
              {
                value: "order.placed",
                label: "Order Placed",
              },
            ],
          },
          status: true,
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
          "Returns the new secret. Store it immediately it cannot be retrieved again.",
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
          data: {
            apiKeys: {
              current_page: 1,
              data: [
                {
                  id: 16,
                  tenant_id: 2,
                  created_by: 2,
                  name: "create order key",
                  token: "tok_live_a1b2c3d4e5f6",
                  last_used_at: "2024-01-10T09:00:00.000000Z",
                  expires_at: null,
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                  permissions: [
                    {
                      name: "addonGroups.create",
                    },
                  ],
                },
              ],
              first_page_url: "http://api.flowpos.me/v1/api-keys?page=1",
              from: 1,
              last_page: 1,
              last_page_url: "http://api.flowpos.me/v1/api-keys?page=1",
              links: [
                {
                  url: null,
                  label: "&laquo; Previous",
                  page: null,
                  active: false,
                },
              ],
              next_page_url: null,
              path: "http://api.flowpos.me/v1/api-keys",
              per_page: 15,
              prev_page_url: null,
              to: 1,
              total: 1,
            },
          },
          status: true,
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
          "Returns the created key. The `token` value is shown only once store it securely.",
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
        response: { data: null, status: true },
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
          data: {
            apiKey: {
              id: 16,
              tenant_id: 2,
              created_by: 2,
              name: "create order key",
              token: "tok_live_a1b2c3d4e5f6",
              last_used_at: "2024-01-10T09:00:00.000000Z",
              expires_at: null,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              permissions: [
                {
                  name: "addonGroups.create",
                },
              ],
            },
          },
          status: true,
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
          data: {
            apiKey: {
              id: 16,
              tenant_id: 2,
              created_by: 2,
              name: "create order key",
              token: "tok_live_a1b2c3d4e5f6",
              last_used_at: "2024-01-10T09:00:00.000000Z",
              expires_at: null,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              permissions: [
                {
                  name: "addonGroups.create",
                },
              ],
            },
          },
          status: true,
        },
        responseDescription:
          "Returns the API key with the new token. Store it immediately it cannot be retrieved again.",
        notes: [
          "The new token is shown only once. Copy it immediately; it cannot be retrieved again.",
        ],
      },
    ],
  }
];
