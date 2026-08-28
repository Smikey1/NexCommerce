import { inAppService as notificationService } from "../channel/in_app/in-app.service.js";

export const createNotification = async (req, res) => {
    const ns = await notificationService.create(req.body)
    res.status(200).json({
        success: true,
        data: ns,
    });
}

export const getNotifications = async (req, res, next) => {
    try {
        const result = await notificationService.getNotifications(req.user.id, {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 20,
            isRead: req.query.isRead,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getNotification = async (req, res, next) => {
    try {
        const notification = await notificationService.getNotification(
            req.params.id
        );

        res.json({
            success: true,
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

export const markRead = async (req, res, next) => {
    try {
        const result = await notificationService.markAsRead(
            req.params.id,
            req.user.id
        );

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const markAllRead = async (req, res, next) => {
    try {
        await notificationService.markAllAsRead(req.user.id);

        res.json({
            success: true,
            message: "All notifications read",
        });
    } catch (error) {
        next(error);
    }
};

export const removeNotification = async (req, res, next) => {
    try {
        await notificationService.deleteNotification(
            req.params.id,
            req.user.id
        );

        res.json({
            success: true,
            message: "Notification deleted",
        });
    } catch (error) {
        next(error);
    }
};

export const unreadCount = async (req, res, next) => {
    try {
        const count = await notificationService.getUnreadCount(req.user.id);

        res.json({
            success: true,
            data: {
                unreadCount: count,
            },
        });
    } catch (error) {
        next(error);
    }
};