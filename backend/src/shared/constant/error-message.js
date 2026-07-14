export const ERROR_MESSAGE = Object.freeze({
  // 4xx Client Errors
  BAD_REQUEST: "Bad request.",
  UNAUTHORIZED: "Unauthorized access.",
  PAYMENT_REQUIRED: "Payment required.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "Resource not found.",
  METHOD_NOT_ALLOWED: "Method not allowed.",
  NOT_ACCEPTABLE: "Requested resource is not acceptable.",
  CONFLICT: "Resource already exists.",
  GONE: "Resource is no longer available.",
  UNSUPPORTED_MEDIA_TYPE: "Unsupported media type.",
  UNPROCESSABLE_ENTITY: "Unable to process the request.",
  TOO_MANY_REQUESTS: "Too many requests. Please try again later.",

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: "Internal server error.",
  NOT_IMPLEMENTED: "This feature is not implemented.",
  BAD_GATEWAY: "Bad gateway.",
  SERVICE_UNAVAILABLE: "Service is currently unavailable.",
  GATEWAY_TIMEOUT: "Gateway timeout.",
});