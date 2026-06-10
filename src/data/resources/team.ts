import type { Resource } from "../../types";

export const teamResources: Resource[] = [
  {
    id: "team",
    name: "Team & Invitations",
    description:
      "Manage your team members, send invitations, and control access to your FlowPOS account.",
    endpoints: [
      {
        id: "list-team-members",
        method: "GET",
        path: "/users",
        title: "List team members",
        description: "Returns all team members for your tenant.",
        response: {
          users: [
            {
              id: 1,
              name: "Ahmad Hamid",
              email: "ahmad@flowpos.com",
              role: { id: 1, name: "Owner" },
              is_active: true,
            },
          ],
        },
        responseDescription: "Returns an array of team member objects.",
      },
      {
        id: "update-team-member",
        method: "PUT",
        path: "/users/{id}",
        title: "Update team member",
        description: "Updates the role or active status of a team member.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the user.",
            example: "2",
          },
        ],
        bodyParams: [
          {
            name: "role_id",
            type: "integer",
            required: false,
            description: "New role ID to assign.",
            example: "2",
          },
          {
            name: "is_active",
            type: "boolean",
            required: false,
            description: "Whether the team member is active.",
            example: "true",
          },
        ],
        response: {
          user: {
            id: 2,
            name: "Jane Smith",
            email: "jane@flowpos.com",
            role: { id: 2, name: "Manager" },
            is_active: true,
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated team member.",
      },
      {
        id: "remove-team-member",
        method: "DELETE",
        path: "/users/{id}",
        title: "Remove team member",
        description: "Removes a team member from your account.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the user.",
            example: "2",
          },
        ],
        response: { message: "Team member removed." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "list-invitations",
        method: "GET",
        path: "/invitations",
        title: "List invitations",
        description: "Returns all pending and accepted invitations.",
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
          invitations: [
            {
              id: 1,
              email: "newuser@example.com",
              role: { id: 2, name: "Manager" },
              status: "pending",
              invited_at: "2024-06-10T10:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of invitation objects.",
      },
      {
        id: "send-invitation",
        method: "POST",
        path: "/invitations",
        title: "Send an invitation",
        description: "Sends an email invitation to a new team member.",
        bodyParams: [
          {
            name: "email",
            type: "string",
            required: true,
            description: "Email address of the person to invite.",
            example: "newuser@example.com",
          },
          {
            name: "role_id",
            type: "integer",
            required: true,
            description: "Role ID to assign on acceptance.",
            example: "2",
          },
        ],
        response: {
          invitation: {
            id: 2,
            email: "newuser@example.com",
            role: { id: 2, name: "Manager" },
            status: "pending",
            invited_at: "2024-06-10T12:00:00Z",
          },
        },
        responseDescription: "Returns the created invitation.",
      },
      {
        id: "revoke-invitation",
        method: "DELETE",
        path: "/invitations/{id}",
        title: "Revoke an invitation",
        description: "Cancels a pending invitation.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the invitation.",
            example: "1",
          },
        ],
        response: { message: "Invitation revoked." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "resend-invitation",
        method: "POST",
        path: "/invitations/{token}/resend",
        title: "Resend an invitation",
        description: "Resends the invitation email to the recipient.",
        pathParams: [
          {
            name: "token",
            type: "string",
            required: true,
            description: "The invitation token.",
            example: "inv_abc123",
          },
        ],
        response: { message: "Invitation resent." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },

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
  },
  {
    id: "profile",
    name: "Profile & Sessions",
    description:
      "Manage the authenticated user's profile, password, and active sessions.",
    endpoints: [
      {
        id: "auth-profile",
        method: "GET",
        path: "/auth/profile",
        title: "Get profile",
        description: "Returns the profile details of the authenticated user.",
        response: {
          profile: {
            id: 1,
            name: "Ahmad Hamid",
            email: "ahmad@flowpos.com",
            phone: "+44 7700 900001",
          },
        },
        responseDescription: "Returns the user profile object.",
      },
      {
        id: "auth-update-profile",
        method: "PUT",
        path: "/auth/profile",
        title: "Update profile",
        description: "Updates the profile of the authenticated user.",
        bodyParams: [
          {
            name: "name",
            type: "string",
            required: false,
            description: "Full name.",
            example: "Ahmad Hamid",
          },
          {
            name: "email",
            type: "string",
            required: false,
            description: "Email address.",
            example: "ahmad@flowpos.com",
          },
          {
            name: "phone",
            type: "string",
            required: false,
            description: "Phone number in international format.",
            example: "+44 7700 900001",
          },
        ],
        response: {
          profile: {
            id: 1,
            name: "Ahmad Hamid",
            email: "ahmad@flowpos.com",
            phone: "+44 7700 900001",
            updated_at: "2024-06-10T13:00:00Z",
          },
        },
        responseDescription: "Returns the updated profile.",
      },
      {
        id: "auth-change-password",
        method: "POST",
        path: "/auth/change-password",
        title: "Change password",
        description: "Changes the password for the authenticated user.",
        bodyParams: [
          {
            name: "current_password",
            type: "string",
            required: true,
            description: "The user's current password.",
            example: "old_password_123",
          },
          {
            name: "new_password",
            type: "string",
            required: true,
            description: "The new password (minimum 8 characters).",
            example: "new_secure_password",
          },
          {
            name: "new_password_confirmation",
            type: "string",
            required: true,
            description: "Must match `new_password`.",
            example: "new_secure_password",
          },
        ],
        response: { message: "Password changed successfully." },
        responseDescription: "Returns a confirmation message.",
      },
      {
        id: "auth-list-tokens",
        method: "GET",
        path: "/auth/tokens",
        title: "List active sessions",
        description:
          "Returns all active session tokens for the authenticated user.",
        response: {
          tokens: [
            {
              id: 1,
              name: "Chrome on Mac",
              last_used_at: "2024-06-10T12:00:00Z",
            },
          ],
        },
        responseDescription: "Returns an array of active session token objects.",
      },
      {
        id: "auth-revoke-token",
        method: "DELETE",
        path: "/auth/tokens/{id}",
        title: "Revoke a session",
        description:
          "Revokes a specific session token, logging out that device.",
        pathParams: [
          {
            name: "id",
            type: "integer",
            required: true,
            description: "The numeric ID of the session token.",
            example: "1",
          },
        ],
        response: { message: "Session revoked." },
        responseDescription: "Returns a confirmation message.",
      },
    ],
  },
];
