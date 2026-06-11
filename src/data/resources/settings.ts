import type { Resource } from "../../types";

export const settingsResources: Resource[] = [
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
          data: {
            domains: [
              {
                id: 13,
                name: "abubakr.flowpos.me",
                verification_token: "verify_a1b2c3d4",
                tenant_id: 2,
                created_at: "2024-01-10T09:00:00.000000Z",
                updated_at: "2024-01-10T09:00:00.000000Z",
                status: "active",
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
          {
            name: "is_default",
            type: "boolean",
            required: true,
            description: "Set as the default domain for the store.",
            example: "false",
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
          },
        ],
        response: {
          data: {
            domain: {
              id: 13,
              name: "abubakr.flowpos.me",
              verification_token: "verify_a1b2c3d4",
              tenant_id: 2,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              status: "active",
              is_default: true,
            },
          },
          status: true,
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
];
