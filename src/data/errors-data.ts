import type { ErrorCode } from "../types";

export const httpErrors: ErrorCode[] = [
  {
    status: 400,
    code: "BAD_REQUEST",
    description:
      "The request body or query parameters are malformed or contain invalid values.",
  },
  {
    status: 401,
    code: "UNAUTHORIZED",
    description: "No valid API key was supplied, or the key has expired.",
  },
  {
    status: 403,
    code: "FORBIDDEN",
    description:
      "Your API key does not have the required permissions to perform this action.",
  },
  {
    status: 404,
    code: "NOT_FOUND",
    description:
      "The requested resource does not exist, or does not belong to your tenant.",
  },
  {
    status: 409,
    code: "CONFLICT",
    description:
      "The request could not be completed due to a conflict (e.g. duplicate email, unique constraint).",
  },
  {
    status: 422,
    code: "UNPROCESSABLE_ENTITY",
    description:
      "The request is well-formed but contains semantic validation errors. The `errors` field lists each failing field.",
  },
  {
    status: 429,
    code: "TOO_MANY_REQUESTS",
    description:
      "You have exceeded the rate limit. Slow down and retry after the `Retry-After` header duration.",
  },
  {
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    description:
      "An unexpected server-side error occurred. If this persists, contact support.",
  },
  {
    status: 503,
    code: "SERVICE_UNAVAILABLE",
    description:
      "The API is temporarily unavailable due to maintenance. Check status.flowpos.io.",
  },
];

export const errorResponseShape = {
  message: "The email field is required.",
  errors: {
    email: "The email field is required.",
    phone: "The phone field must be a valid phone number.",
  },
};

export const notFoundShape = {
  message: "Resource not found.",
};

export const unauthorizedShape = {
  message: "Unauthenticated.",
};
