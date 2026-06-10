import type { Resource } from "../../types";

export const teamResources: Resource[] = [
  {
    id: "roles",
    name: "Roles",
    description:
      "Manage roles and permissions for your team members. Each role defines what actions a user can perform.",
    endpoints: [
      {
        id: "list-roles",
        method: "GET",
        path: "/auth/roles",
        title: "List all roles",
        description: "Returns all roles configured for your tenant.",
        response: {
          roles: [
            {
              id: 1,
              name: "Manager",
              permissions: ["orders:read", "orders:write"],
            },
          ],
        },
        responseDescription: "Returns an array of role objects.",
      },
      {
        id: "get-role",
        method: "GET",
        path: "/auth/roles/{id}",
        title: "Retrieve a role",
        description:
          "Returns full details of a single role including its permissions.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        response: {
          role: {
            id: 1,
            name: "Manager",
            permissions: ["orders:read", "orders:write", "customers:read"],
          },
        },
        responseDescription: "Returns the role object.",
      },
      {
        id: "create-role",
        method: "POST",
        path: "/auth/roles",
        title: "Create a role",
        description: "Creates a new role with specified permissions.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: true,
            description: "Role name.",
            example: "Manager",
          },
          {
            name: "permissions",
            type: "string[]",
            required: true,
            description: "Array of permission strings granted to this role.",
            example: '["orders:read","customers:read"]',
          },
        ],
        response: {
          role: {
            id: 3,
            name: "Manager",
            permissions: ["orders:read", "customers:read"],
            created_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created role.",
      },
      {
        id: "update-role",
        method: "PUT",
        path: "/auth/roles/{id}",
        title: "Update a role",
        description: "Updates the name and/or permissions of an existing role.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Role name.",
            example: "Senior Manager",
          },
          {
            name: "permissions",
            type: "string[]",
            required: false,
            description: "Array of permission strings.",
            example: '["orders:read","orders:write","customers:read"]',
          },
        ],
        response: {
          role: {
            id: 1,
            name: "Senior Manager",
            permissions: ["orders:read", "orders:write", "customers:read"],
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated role.",
      },
      {
        id: "delete-role",
        method: "DELETE",
        path: "/auth/roles/{id}",
        title: "Delete a role",
        description: "Permanently deletes a role.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the role.",
            example: "1",
          },
        ],
        response: { message: "Role deleted." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  }
];
