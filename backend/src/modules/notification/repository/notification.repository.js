import {Notification} from "../model/notification.model.js";

class NotificationRepository {
    async create(data) {
        return await Notification.create(data);
    }

    async findById(id) {
        return await Notification.findById(id).populate("user", "name email");
    }

    async findByUser(userId, options = {}) {
        const { page = 1, limit = 20, isRead } = options;

        const query = {
            user: userId,
        };

        if (isRead !== undefined) {
            query.isRead = isRead;
        }

        const skip = (page - 1) * limit;

        const [notifications, total] = await Promise.all([
            Notification.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Notification.countDocuments(query),
        ]);

        return {
            notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async markRead(id, userId) {
        return await Notification.findOneAndUpdate(
            {
                _id: id,
                user: userId,
            },
            {
                isRead: true,
                readAt: new Date(),
            },
            {
                new: true,
            }
        );
    }

    async markAllRead(userId) {
        return await Notification.updateMany(
            {
                user: userId,
                isRead: false,
            },
            {
                isRead: true,
                readAt: new Date(),
            }
        );
    }

    async delete(id, userId) {
        return await Notification.findOneAndDelete({
            _id: id,
            user: userId,
        });
    }

    async unreadCount(userId) {
        return await Notification.countDocuments({
            user: userId,
            isRead: false,
        });
    }
}

export const notificationRepository =  new NotificationRepository();