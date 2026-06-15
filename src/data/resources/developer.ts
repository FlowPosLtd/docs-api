import type { Resource } from "../../types";

export const developerResources: Resource[] = [
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
                  token: "flpos_••••••••••••••••••••••••••••••••••••••••",
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
              token: "flpos_••••••••••••••••••••••••••••••••••••••••",
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
    ],
  }
];
