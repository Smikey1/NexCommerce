export const ROLES = {
    USER: "USER",
    SELLER: "SELLER",
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN"
};

export const PERMISSIONS = {
    // USER_READ: "user:read",
    USER_CREATE: "user:create",
    // USER_UPDATE: "user:update",
    // USER_DELETE: "user:delete",

    PRODUCT_READ: "product:read",
    PRODUCT_CREATE: "product:create",
    PRODUCT_UPDATE: "product:update",
    PRODUCT_DELETE: "product:delete",

    // CATEGORY_READ: "category:read",
    CATEGORY_CREATE: "category:create",
    CATEGORY_UPDATE: "category:update",
    CATEGORY_DELETE: "category:delete",

    // ORDER_READ: "order:read",
    // ORDER_CREATE: "order:create",
    // ORDER_UPDATE: "order:update",
    // ORDER_DELETE: "order:delete",

    // REVIEW_READ: "review:read",
    // REVIEW_CREATE: "review:create",
    // REVIEW_UPDATE: "review:update",
    // REVIEW_DELETE: "review:delete",

    // COUPON_READ: "coupon:read",
    // COUPON_CREATE: "coupon:create",
    // COUPON_UPDATE: "coupon:update",
    // COUPON_DELETE: "coupon:delete",

    PERMISSION_READ: "permission:read",
    PERMISSION_CREATE: "permission:create",
    PERMISSION_UPDATE: "permission:update",
    PERMISSION_DELETE: "permission:delete",

    ROLE_READ: "role:read",
    ROLE_CREATE: "role:create",
    ROLE_UPDATE: "role:update",
    ROLE_DELETE: "role:delete",
};


export const ROLE_PERMISSIONS = {
    [ROLES.USER]: [
        PERMISSIONS.PRODUCT_READ,
        // PERMISSIONS.CATEGORY_READ,
        // PERMISSIONS.ORDER_CREATE,
        // PERMISSIONS.ORDER_READ,
        // PERMISSIONS.REVIEW_CREATE,
        // PERMISSIONS.REVIEW_READ,
    ],

    // [ROLES.SELLER]: [
    //     PERMISSIONS.PRODUCT_READ,
    //     PERMISSIONS.PRODUCT_CREATE,
    //     PERMISSIONS.PRODUCT_UPDATE,
    //     PERMISSIONS.CATEGORY_READ,
    //     PERMISSIONS.ORDER_READ,
    //     PERMISSIONS.REVIEW_READ,
    // ],

    [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
};