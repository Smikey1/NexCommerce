import { NOTIFICATION_CHANNEL, NOTIFICATION_STATUS } from "../../constant/notification.constant.js";
import { notificationRepository } from "../../repository/notification.repository.js";

class InAppService {
    async create(data) {
        const notification = await notificationRepository.create({
            ...data,
            user: data.user,
            title: data.title,
            message: data.message,
            metadata: data.metadata,
            channels: [NOTIFICATION_CHANNEL.IN_APP],
            status: NOTIFICATION_STATUS.SENT,
            sentAt: new Date(),
        });
        return notification;
    }

    async getNotifications(userId, options) {
        return await notificationRepository.findByUser(userId, options);
    }

    async getNotification(id) {
        return await notificationRepository.findById(id);
    }

    async markAsRead(id, userId) {
        return await notificationRepository.markRead(id, userId);
    }

    async markAllAsRead(userId) {
        return await notificationRepository.markAllRead(userId);
    }

    async deleteNotification(id, userId) {
        return await notificationRepository.delete(id, userId);
    }

    async getUnreadCount(userId) {
        return await notificationRepository.unreadCount(userId);
    }
}

export const inAppService = new InAppService();