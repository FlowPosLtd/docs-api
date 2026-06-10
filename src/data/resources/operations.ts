import type { Resource } from "../../types";

export const operationResources: Resource[] = [
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
];
