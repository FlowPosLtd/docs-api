import type { Resource } from "../../types";

export const settingsResources: Resource[] = [
  {
    id: "domains",
    name: "Domains",
    description:
      "Custom domains let you serve your online store from your own domain (e.g. shop.yourbusiness.com). FlowPOS handles TLS/SSL automatically via Cloudflare.",
    objectName: "domain",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the domain." },
      { name: "name", type: "string", required: false, description: "The domain name (e.g. `shop.yourbusiness.com`)." },
      { name: "status", type: "string", required: false, description: "Current state of the domain.", enum: ["pending", "active", "suspended", "deleted"] },
      { name: "is_default", type: "boolean", required: false, description: "Whether this is the default storefront domain." },
      { name: "verification_token", type: "string", required: false, description: "Token used to verify DNS ownership. Configure as a TXT record." },
      { name: "tenant_id", type: "integer", required: false, description: "ID of the tenant this domain belongs to." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the domain was added." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the domain record was last modified." },
      { name: "last_verified_at", type: "timestamp", required: false, nullable: true, description: "When the DNS was last checked successfully." },
    ],
    endpoints: [
      {
        id: "list-domains",
        method: "GET",
        path: "/domains",
        title: "List all domains",
        description: "Returns all domains configured for your tenant.",
        queryParams: [
          {
            name: "search",
            type: "string",
            required: false,
            description: "Filter by domain name.",
            example: "shop",
          },
        ],
        response: {
          data: {
            domains: [
              {
                id: 13,
                name: "shop.yourbusiness.com",
                verification_token: "verify_a1b2c3d4",
                tenant_id: 2,
                created_at: "2024-01-10T09:00:00.000000Z",
                updated_at: "2024-01-10T09:00:00.000000Z",
                status: "active",
                last_verified_at: null,
                is_default: true,
              },
            ],
          },
          status: true,
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
        ],
        response: {
          data: {
            domain: {
              tenant_id: 2,
              name: "shop.yourbusiness.com",
              status: "pending",
              is_default: false,
              verification_token: "verify_a1b2c3d4",
              updated_at: "2024-01-10T09:00:00.000000Z",
              created_at: "2024-01-10T09:00:00.000000Z",
              id: 62,
            },
            dns_record: {
              type: "TXT",
              name: "_flowpos-verify.shop.yourbusiness.com",
              value: "18e66365-31a3-4697-b879-826b1b8f5092",
            },
          },
          status: true,
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
            example: "1",
          },
        ],
        response: {
          data: {
            domain: {
              id: 13,
              name: "shop.yourbusiness.com",
              verification_token: "291bc044-e394-441f-84fe-e65411bf19eb",
              tenant_id: 1,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              status: "pending",
              last_verified_at: "2024-01-10T09:00:00.000000Z",
              is_default: false,
            },
            dns_record: {
              type: "TXT",
              name: "_flowpos-verify.shop.yourbusiness.com",
              value: "291bc044-e394-441f-84fe-e65411bf19eb",
            },
          },
          status: true,
        },
        responseDescription: "Returns the domain with its current status and DNS record to configure.",
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
            example: "1",
          },
        ],
        response: { data: null, status: true },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "update-domain",
        method: "PUT",
        path: "/domains/{id}",
        title: "Set domain as default",
        description: "Sets an active domain as the default storefront domain. The domain must have an `active` status.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the domain.",
            example: "13",
          },
        ],
        bodyParams: [
          {
            name: "is_default",
            type: "boolean",
            required: true,
            description: "Set to `true` to make this the default domain. Domain must be active.",
            example: "true",
          },
        ],
        response: {
          data: {
            domain: {
              id: 13,
              name: "shop.yourbusiness.com",
              verification_token: "291bc044-e394-441f-84fe-e65411bf19eb",
              tenant_id: 1,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:01.000000Z",
              status: "active",
              last_verified_at: null,
              is_default: true,
            },
          },
          status: true,
        },
        responseDescription: "Returns the updated domain.",
      },
    ],
  },
];
