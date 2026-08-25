import mongoose from "mongoose";
import { USER_CONSTANT } from "../../user/constant/user.constant.js";
import { NOTIFICATION_CHANNEL, NOTIFICATION_CONSTANT, NOTIFICATION_STATUS } from "../constant/notification.constant.js";

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_CONSTANT.USER_MODEL,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    channels: [{
        type: String,
        enum: [
            NOTIFICATION_CHANNEL.IN_APP,
            NOTIFICATION_CHANNEL.EMAIL,
            NOTIFICATION_CHANNEL.SMS,
            NOTIFICATION_CHANNEL.PUSH
            ]
        }],

    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },

    isRead: {
        type: Boolean,
        default: false,
        index: true,
    },

    readAt: {
        type: Date,
        default: null,
    },

    status: {
        type: String,
        enum: [
            NOTIFICATION_STATUS.PENDING,
            NOTIFICATION_STATUS.SENT,
            NOTIFICATION_STATUS.FAILED
        ],
        default: NOTIFICATION_STATUS.PENDING
    },

    sentAt: {
        type: Date,
        default: null
    },

    error: {
        type: String,
        default: null
    }
}, { timestamps: true });

notificationSchema.index({ user: 1, createdAt: -1 });
notificationSchema.index({ user: 1, isRead: 1 });

export const Notification = mongoose.model(NOTIFICATION_CONSTANT.NOTIFICATION_MODEL, notificationSchema);