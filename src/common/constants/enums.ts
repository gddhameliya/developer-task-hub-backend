//* Add all the enums here
const enums = {
  //? HTTP Status Codes
  HTTP_CODES: {
    BAD_REQUEST: 400,
    DUPLICATE_VALUE: 409,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    METHOD_NOT_ALLOWED: 405,
    MOVED_PERMANENTLY: 301,
    NOT_ACCEPTABLE: 406,
    NOT_FOUND: 404,
    NO_CONTENT_FOUND: 204,
    OK: 200,
    PERMANENT_REDIRECT: 308,
    UNAUTHORIZED: 401,
    UPGRADE_REQUIRED: 426,
    VALIDATION_ERROR: 422,
  },

  //? User Roles
  USER_ROLES: {
    ADMIN: "admin",
    DEVELOPER: "developer",
  },

  //? Task Status
  TASK_STATUS: {
    PENDING: "pending",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
  },
};

export default enums;
