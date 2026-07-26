export const ROUTING_KEYS = Object.freeze({
    // USER EVENTS
    USER_REGISTERED: "user.registered",
    USER_UPDATED: "user.updated",
    USER_DELETED: "user.deleted",

    // ORDER EVENTS
    ORDER_CREATED: "order.created",
    ORDER_UPDATED: "order.updated",
    ORDER_CANCELLED: "order.cancelled",

    // PAYMENT EVENTS
    PAYMENT_SUCCESS: "payment.success",
    PAYMENT_FAILED: "payment.failed",

    // PRODUCT EVENTS
    PRODUCT_CREATED: "product.created",
    PRODUCT_UPDATED: "product.updated",
    PRODUCT_DELETED: "product.deleted",
    PRODUCT_BACK_IN_STOCK: "product.back_in_stock",

    // INVENTORY EVENTS
    INVENTORY_UPDATED: "inventory.updated",
    LOW_STOCK: "inventory.low_stock",

    // NOTIFICATION EVENTS
    NOTIFICATION_CREATED: "notification.created",
    EMAIL_SEND: "notification.email.send",
    SMS_SEND: "notification.sms.send",
    PUSH_SEND: "notification.push.send",

    // ANALYTICS EVENTS
    ANALYTICS_TRACK: "analytics.track",
});