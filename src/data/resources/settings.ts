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
];
