import { NOTIFICATION_CHANNEL, NOTIFICATION_STATUS } from "../constant/notification.constant.js";
import { notificationRepository } from "../repository/notification.repository.js";
import { emailService } from "../channel/email/email.service.js";
import { smsService } from "../channel/sms/sms.service.js";
import { pushService } from "../channel/push/push.service.js";
import { inAppService } from "../channel/in_app/in-app.service.js"
import { HTML_TEMPLATE } from "../templates/html.template.js"
import { UserNotFoundError } from "../../auth/error/user-not-found.error.js";
import { templateService } from "../templates/template.service.js";

class NotificationService {
    /**
  * Sends a notification to a user through one or more channels.
  *
  * Supported channels:
  * - EMAIL
  * - SMS
  * - PUSH
  * - IN_APP
  *
  * @async
  * @param {NotificationPayload} notificationPayload - Notification request payload.
  *
  * @typedef {Object} NotificationPayload
  * @property {UserNotificationPayload} user - Recipient information.
  * @property {NotificationContent} notification - Notification content and delivery configuration.
  * @property {string} [htmlTemplate] - Rendered HTML content used for email notifications.
  *
  * @typedef {Object} UserNotificationPayload
  * @property {string} firstName - Recipient's first name.
  * @property {string} email - Recipient's email address.
  * @property {string} [phone] - Recipient's phone number.
  * @property {string} [pushNotificationToken] - Push notification device token.
  *
  * @typedef {Object} NotificationContent
  * @property {string} title - Notification title.
  * @property {string} message - Notification message.
  * @property {string[]} channels - Delivery channels (e.g. EMAIL, SMS, PUSH, IN_APP).
  * @property {Object<string, any>} [metadata] - Additional metadata for push and in-app notifications.
  *
  * @returns {Promise<void>} Resolves when all notification tasks have completed.
  */
    async notify(notificationPayload) {
        const { firstName, email, phone, pushNotificationToken } = notificationPayload.user
        const { title, message, channels, metadata } = notificationPayload.notification
        const htmlTemplate = notificationPayload.htmlTemplate

        const tasks = []
        if (channels.includes(NOTIFICATION_CHANNEL.EMAIL) && email) {
            tasks.push(
                emailService.sendEmail({
                    to: email,
                    subject: title,
                    html: htmlTemplate
                })
            )
        }

        if (channels.includes(NOTIFICATION_CHANNEL.SMS) && phone) {
            tasks.push(
                smsService.sendSms(
                    {
                        to: phone,
                        message: `\n\nDear ${firstName},\n${title}.\n${message}\n\nThank You.\n@NexCommerce`
                    }
                )
            )
        }

        if (channels.includes(NOTIFICATION_CHANNEL.PUSH) && pushNotificationToken) {
            tasks.push(
                pushService.sendPush({
                    token: pushNotificationToken,
                    title: title,
                    body: message,
                    data: metadata || {}
                })
            )
        }

        if (channels.includes(NOTIFICATION_CHANNEL.IN_APP)) {
            tasks.push(
                inAppService.create({
                    user: userId,
                    title,
                    message,
                    channels,
                    metadata
                })
            )
        }

        await Promise.all(tasks);;
    }
}

export const notificationService = new NotificationService();