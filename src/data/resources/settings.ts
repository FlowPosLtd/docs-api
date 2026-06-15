import type { Resource } from "../../types";

export const settingsResources: Resource[] = [
  {
    id: "business-settings",
    name: "Organisation Settings",
    description:
      "Manage your business profile, branding, and configuration. Update your business name, contact info, logo, and other tenant-level settings.",
    objectName: "tenant",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the tenant." },
      { name: "slug", type: "string", required: false, description: "URL-safe identifier for the business." },
      { name: "business_name", type: "string", required: false, description: "Trading name of the business." },
      { name: "business_email", type: "string", required: false, description: "Primary contact email for the business." },
      { name: "business_type", type: "string", required: false, description: "Type of business entity.", enum: ["business", "individual"] },
      { name: "vat_number", type: "string", required: false, nullable: true, description: "VAT registration number (e.g. `GB123456789`)." },
      { name: "logo", type: "string", required: false, nullable: true, description: "Relative storage path to the business logo." },
      { name: "logo_url", type: "string", required: false, nullable: true, description: "Fully-qualified public URL to the business logo." },
      { name: "brand_colour", type: "string", required: false, description: "Primary brand hex colour (e.g. `#3B82F6`)." },
      { name: "accent_colour", type: "string", required: false, description: "Accent brand hex colour (e.g. `#8B5CF6`)." },
    ],
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
          data: {
            tenant: {
              id: 1,
              slug: "my-cafe",
              business_name: "My Cafe",
              business_email: "hello@mycafe.com",
              vat_number: "GB123456789",
              business_type: "business",
              logo: "tenants/1/logo/logo.png",
              brand_colour: "#3B82F6",
              accent_colour: "#8B5CF6",
              logo_url: "https://api.flowpos.me/storage/tenants/1/logo/logo.png",
            },
          },
          status: true,
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
            example: "My Cafe",
          },
          {
            name: "business_email",
            type: "string",
            required: false,
            description: "Primary business email.",
            example: "hello@mycafe.com",
          },
          {
            name: "brand_colour",
            type: "string",
            required: false,
            description: "Brand primary colour (hex).",
            example: "#3B82F6",
          },
          {
            name: "accent_colour",
            type: "string",
            required: false,
            description: "Brand accent colour (hex).",
            example: "#8B5CF6",
          },
          {
            name: "vat_number",
            type: "string",
            required: false,
            description: "VAT registration number.",
            example: "GB123456789",
          },
          {
            name: "logo",
            type: "file",
            required: false,
            description: "Logo image file (multipart/form-data).",
            example: "logo.png",
          },
        ],
        response: {
          data: {
            tenant: {
              id: 1,
              slug: "my-cafe",
              business_name: "My Cafe",
              business_email: "hello@mycafe.com",
              vat_number: "GB123456789",
              business_type: "business",
              logo: "tenants/1/logo/logo.png",
              brand_colour: "#3B82F6",
              accent_colour: "#8B5CF6",
              logo_url: "https://api.flowpos.me/storage/tenants/1/logo/logo.png",
            },
          },
          status: true,
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
    objectName: "domain",
    attributes: [
      { name: "id", type: "integer", required: false, description: "Unique numeric identifier for the domain." },
      { name: "name", type: "string", required: false, description: "The domain name (e.g. `shop.yourbusiness.com`)." },
      { name: "status", type: "string", required: false, description: "Current DNS verification state of the domain.", enum: ["pending_verification", "active", "error"] },
      { name: "is_default", type: "boolean", required: false, description: "Whether this is the default storefront domain." },
      { name: "verification_token", type: "string", required: false, description: "Token used to verify DNS ownership. Configure as a TXT record." },
      { name: "tenant_id", type: "integer", required: false, description: "ID of the tenant this domain belongs to." },
      { name: "created_at", type: "timestamp", required: false, description: "Time the domain was added." },
      { name: "updated_at", type: "timestamp", required: false, description: "Time the domain record was last modified." },
    ],
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
              name: "shop.yourbusiness.com",
              verification_token: "291bc044-e394-441f-84fe-e65411bf19eb",
              tenant_id: 1,
              created_at: "2024-01-10T09:00:00.000000Z",
              updated_at: "2024-01-10T09:00:00.000000Z",
              status: "pending",
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
