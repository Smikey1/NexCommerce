import express from "express";

import {
    getNotifications,
    getNotification,
    markRead,
    markAllRead,
    removeNotification,
    unreadCount,
    createNotification,
} from "../controller/notification.controller.js";

// import authMiddleware from "../../../shared/middleware/auth.middleware.js";

const router = express.Router();

// router.use(authMiddleware);

router.post("/", createNotification)

router.get("/", getNotifications);

router.get("/unread-count", unreadCount);

router.get("/:id", getNotification);

router.patch("/:id/read", markRead);

router.patch("/read-all", markAllRead);

router.delete("/:id", removeNotification);

export default router;