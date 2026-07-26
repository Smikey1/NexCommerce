export const PERMISSIONS = {
    PRODUCT_READ: "product:read",
    PRODUCT_CREATE: "product:create",
    PRODUCT_UPDATE: "product:update",
    PRODUCT_DELETE: "product:delete",

    USER_READ: "user:read",
    USER_UPDATE: "user:update"
};

export const ROLE_PERMISSIONS = {
    [ROLES.USER]: [
        PERMISSIONS.PRODUCT_READ
    ],

    [ROLES.SELLER]: [
        PERMISSIONS.PRODUCT_READ,
        PERMISSIONS.PRODUCT_CREATE,
        PERMISSIONS.PRODUCT_UPDATE
    ],

    [ROLES.ADMIN]: Object.values(PERMISSIONS)
};