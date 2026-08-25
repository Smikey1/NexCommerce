export const ROLES = {
    USER: "USER",
    SELLER: "SELLER",
    ADMIN: "ADMIN",
};


export const PERMISSIONS = {
    PRODUCT_READ: "product:read",
    PRODUCT_CREATE: "product:create",
    PRODUCT_UPDATE: "product:update",
    PRODUCT_DELETE: "product:delete",

    CATEGORY_READ: "category:read",
    CATEGORY_CREATE: "category:create",
    CATEGORY_UPDATE: "category:update",
    CATEGORY_DELETE: "category:delete",

    ORDER_READ: "order:read",
    ORDER_CREATE: "order:create",
    ORDER_UPDATE: "order:update",
    ORDER_DELETE: "order:delete",

    USER_READ: "user:read",
    USER_CREATE: "user:create",
    USER_UPDATE: "user:update",
    USER_DELETE: "user:delete",

    REVIEW_READ: "review:read",
    REVIEW_CREATE: "review:create",
    REVIEW_UPDATE: "review:update",
    REVIEW_DELETE: "review:delete",

    COUPON_READ: "coupon:read",
    COUPON_CREATE: "coupon:create",
    COUPON_UPDATE: "coupon:update",
    COUPON_DELETE: "coupon:delete",
};


export const ROLE_PERMISSIONS = {
    [ROLES.USER]: [
        PERMISSIONS.PRODUCT_READ,
        PERMISSIONS.CATEGORY_READ,
        PERMISSIONS.ORDER_CREATE,
        PERMISSIONS.ORDER_READ,
        PERMISSIONS.REVIEW_CREATE,
        PERMISSIONS.REVIEW_READ,
    ],

    [ROLES.SELLER]: [
        PERMISSIONS.PRODUCT_READ,
        PERMISSIONS.PRODUCT_CREATE,
        PERMISSIONS.PRODUCT_UPDATE,

        PERMISSIONS.CATEGORY_READ,

        PERMISSIONS.ORDER_READ,

        PERMISSIONS.REVIEW_READ,
    ],

    [ROLES.ADMIN]: Object.values(PERMISSIONS),
};