import type { Resource } from "../../types";

export const developerResources: Resource[] = [
  {
    id: "webhooks",
    name: "Webhooks",
    description:
      "Webhooks deliver real-time event notifications to your servers via HTTP POST. You configure endpoint URLs and the events they subscribe to.",
    objectName: "webhook endpoint",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the webhook endpoint." },
      { name: "url", type: "string", required: false, description: "HTTPS URL that receives event payloads." },
      { name: "secret", type: "string", required: false, description: "HMAC signing secret used to verify the authenticity of incoming webhooks. Keep this private." },
      { name: "events", type: "string[]", required: false, description: "List of event type strings this endpoint is subscribed to." },
      { name: "is_active", type: "boolean", required: false, description: "Whether this endpoint is enabled and receiving events." },
      { name: "description", type: "string", required: false, nullable: true, description: "Optional label describing the purpose of this endpoint." },
      { name: "tenant_id", type: "integer", required: false, description: "ID of the tenant this endpoint belongs to." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the webhook endpoint was created." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the webhook endpoint was last modified." },
    ],
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
          data: {
            webhook_endpoints: {
              current_page: 1,
              data: [
                {
                  id: 14,
                  url: "https://yourdomain.com/webhooks",
                  secret: "D6FnqjsubEMiaPFKbt8quRmKRU1Hct9vCfgY3UJd",
                  events: [
                    "order.placed",
                    "order.status_changed",
                    "product.updated",
                    "product.created",
                  ],
                  is_active: true,
                  description: "Production webhook",
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                  tenant_id: 1,
                },
              ],
              first_page_url: "http://api.flowpos.me/v1/webhook-endpoints?page=1",
              from: 1,
              last_page: 1,
              last_page_url: "http://api.flowpos.me/v1/webhook-endpoints?page=1",
              links: [
                { url: null, label: "&laquo; Previous", page: null, active: false },
                { url: "http://api.flowpos.me/v1/webhook-endpoints?page=1", label: "1", page: 1, active: true },
                { url: null, label: "Next &raquo;", page: null, active: false },
              ],
              next_page_url: null,
              path: "http://api.flowpos.me/v1/webhook-endpoints",
              per_page: 15,
              prev_page_url: null,
              to: 1,
              total: 1,
            },
          },
          status: true,
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
          data: {
            webhook_endpoint: {
              tenant_id: 1,
              url: "https://yourdomain.com/webhooks",
              secret: "QRRrp7ALemUxWFot0KiiJzOxQkwgJ7ZGMAL2dF1u",
              events: ["order.placed", "order.status_changed"],
              description: "Production webhook",
              is_active: true,
              updated_at: "2024-01-10T09:27:01.000000Z",
              created_at: "2024-01-10T09:27:01.000000Z",
              id: 21,
            },
          },
          status: true,
        },
        responseDescription:
          "Returns the created endpoint including the signing secret.",
        notes: [
          "Store the `secret` securely — it is used to verify incoming webhook signatures via HMAC.",
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
        response: {
          data: {
            webhook_event_id: 1242,
            event_id: "35d6dc69-1770-4d9e-b2f5-59311acfae63",
          },
          status: true,
        },
        responseDescription: "Returns the event IDs for the queued retry.",
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
          data: {
            webhook_endpoint: {
              id: 14,
              url: "https://yourdomain.com/webhooks",
              secret: "D6FnqjsubEMiaPFKbt8quRmKRU1Hct9vCfgY3UJd",
              events: ["order.placed", "order.status_changed", "product.updated", "product.created"],
              is_active: true,
              description: "Production webhook",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              tenant_id: 1,
            },
          },
          status: true,
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
          data: {
            webhook_endpoint: {
              id: 14,
              url: "https://yourdomain.com/webhooks/v2",
              secret: "D6FnqjsubEMiaPFKbt8quRmKRU1Hct9vCfgY3UJd",
              events: ["order.placed"],
              is_active: true,
              description: "Production webhook",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:01.000000Z",
              tenant_id: 1,
            },
          },
          status: true,
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
          data: {
            webhook_endpoint: {
              id: 14,
              url: "https://yourdomain.com/webhooks",
              secret: "W12SgHSwPsEwQT3jCnTdZuHBxxPGgyM1DQvszy0g",
              events: ["order.placed", "order.status_changed"],
              is_active: true,
              description: "Production webhook",
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:01.000000Z",
              tenant_id: 1,
            },
          },
          status: true,
        },
        responseDescription:
          "Returns the full endpoint object with the new signing secret.",
        notes: [
          "The new secret immediately replaces the old one. Update your webhook handler to use the new secret.",
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
          data: {
            webhook_events: {
              current_page: 1,
              data: [
                {
                  id: 1242,
                  webhook_endpoint_id: 14,
                  event_id: "35d6dc69-1770-4d9e-b2f5-59311acfae63",
                  event: "product.created",
                  payload: {
                    sku: null,
                    name: "Classic Burger",
                    price: 1200,
                    product_id: 42635,
                  },
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                },
                {
                  id: 1202,
                  webhook_endpoint_id: 14,
                  event_id: "48228a93-5ea6-4b40-baf9-0eca52cc1348",
                  event: "order.status_changed",
                  payload: {
                    order_id: 10496,
                    new_status: 2,
                    old_status: 1,
                    order_number: "AB23",
                  },
                  created_at: "2024-01-10T08:00:00.000000Z",
                  updated_at: "2024-01-10T08:00:00.000000Z",
                },
              ],
              first_page_url: "http://api.flowpos.me/v1/webhook-endpoints/14/events?page=1",
              from: 1,
              last_page: 15,
              last_page_url: "http://api.flowpos.me/v1/webhook-endpoints/14/events?page=15",
              links: [
                { url: null, label: "&laquo; Previous", page: null, active: false },
                { url: "http://api.flowpos.me/v1/webhook-endpoints/14/events?page=1", label: "1", page: 1, active: true },
                { url: "http://api.flowpos.me/v1/webhook-endpoints/14/events?page=2", label: "Next &raquo;", page: 2, active: false },
              ],
              next_page_url: "http://api.flowpos.me/v1/webhook-endpoints/14/events?page=2",
              path: "http://api.flowpos.me/v1/webhook-endpoints/14/events",
              per_page: 15,
              prev_page_url: null,
              to: 15,
              total: 215,
            },
          },
          status: true,
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
          data: {
            webhook_event: {
              id: 1242,
              webhook_endpoint_id: 14,
              event_id: "35d6dc69-1770-4d9e-b2f5-59311acfae63",
              event: "product.created",
              payload: {
                sku: null,
                name: "Classic Burger",
                price: 1200,
                product_id: 42635,
              },
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              logs: [
                {
                  id: 1281,
                  attempt: 1,
                  webhook_event_id: 1242,
                  url: "https://yourdomain.com/webhooks",
                  response_status: 200,
                  response_body: "OK",
                  response_headers: {
                    "Content-Type": ["application/json"],
                    "Connection": ["keep-alive"],
                  },
                  duration_ms: 252,
                  success: true,
                  error_message: null,
                  attempted_at: "2024-01-10T09:00:00.000000Z",
                  created_at: "2024-01-10T09:00:00.000000Z",
                  updated_at: "2024-01-10T09:00:00.000000Z",
                },
              ],
            },
          },
          status: true,
        },
        responseDescription:
          "Returns the full webhook event delivery record including payload and delivery logs.",
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
        response: {
          data: { dispatched: 7 },
          status: true,
        },
        responseDescription:
          "Returns a confirmation with the number of failed events dispatched for retry.",
      },
    ],
  },

  {
    id: "api-keys",
    name: "API Keys",
    description:
      "API Keys are credentials used to authenticate requests to the FlowPOS API. Each key has a name, optional expiry, and a set of permissions scoping what it can access.",
    objectName: "API key",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the API key." },
      { name: "name", type: "string", required: false, description: "Friendly label for this key." },
      { name: "token", type: "string", required: false, description: "The API key token used in the `x-api-key` header." },
      { name: "last_used_at", type: "timestamp", required: false, nullable: true, description: "Time this key was last used to authenticate a request." },
      { name: "expires_at", type: "timestamp", required: false, nullable: true, description: "Expiry time for this key. Null means no expiry." },
      { name: "tenant_id", type: "integer", required: false, description: "ID of the tenant this key belongs to." },
      { name: "created_by", type: "integer", required: false, description: "ID of the user who created this key." },
      { name: "permissions", type: "object[]", required: false, description: "Array of permission objects granted to this key." },
      { name: "permissions[].name", type: "string", required: false, description: "Permission identifier (e.g. `orders.view`, `products.create`)." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the API key was created." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the API key was last modified." },
    ],
    endpoints: [
      {
        id: "list-api-keys",
        method: "GET",
        path: "/api-keys",
        title: "List all API keys",
        description: "Returns a paginated list of API keys.",
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
                  token: "flpos_R8SZQnxo7vtwjTyEREJ1A4nUTtrCvEnbQgzWecwx",
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
        responseDescription: "Returns a paginated list of API key objects.",
      },
      {
        id: "create-api-key",
        method: "POST",
        path: "/api-keys",
        title: "Create an API key",
        description: "Creates a new API key.",
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
            description: "Expiry date in `YYYY-MM-DD` format. Leave blank for no expiry.",
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
          data: {
            apiKey: {
              id: 17,
              tenant_id: 1,
              created_by: 1,
              name: "Production Key",
              token: "flpos_a2g5hfBAmorj3x6Q3HWteUAnX0MNzjcfM0Iqb7st",
              last_used_at: null,
              expires_at: null,
              created_at: "2024-01-10T09:27:05.000000Z",
              updated_at: "2024-01-10T09:27:05.000000Z",
              permissions: [
                { name: "products.view" },
                { name: "orders.view" },
              ],
            },
          },
          status: true,
        },
        responseDescription: "Returns the created API key with its token.",
        notes: [
          "The `token` field is always visible via the API. Store it securely to authenticate API requests.",
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
        description: "Returns details of a single API key.",
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
              token: "flpos_R8SZQnxo7vtwjTyEREJ1A4nUTtrCvEnbQgzWecwx",
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
        responseDescription: "Returns the API key object.",
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
              "Expiry date in `YYYY-MM-DD` format. Set to `null` to remove expiry.",
            example: "2025-12-31",
          },
        ],
        response: {
          data: {
            apiKey: {
              id: 17,
              tenant_id: 1,
              created_by: 1,
              name: "Production Key",
              token: "flpos_a2g5hfBAmorj3x6Q3HWteUAnX0MNzjcfM0Iqb7st",
              last_used_at: null,
              expires_at: null,
              created_at: "2024-01-10T09:27:05.000000Z",
              updated_at: "2024-01-10T09:27:21.000000Z",
              permissions: [
                { name: "products.view" },
                { name: "orders.view" },
                { name: "customers.view" },
              ],
            },
          },
          status: true,
        },
        responseDescription: "Returns the updated API key.",
      },
    ],
  }
];
