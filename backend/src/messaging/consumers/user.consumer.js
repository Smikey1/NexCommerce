import { logger } from "../../config/logger.js"
import { emailVerificationService } from "../../modules/auth/service/email-verification.service.js"
import { NOTIFICATION_CHANNEL } from "../../modules/notification/constant/notification.constant.js"
import { notificationService } from "../../modules/notification/service/notification.service.js"
import { getHTMLTemplate, HTML_TEMPLATE } from "../../modules/notification/templates/html.template.js"
import { QUEUE_TYPES } from "../constant/event-types.js"
import { EXCHANGES } from "../constant/exchange.constant.js"
import { ROUTING_KEYS } from "../constant/routing-keys.js"
import { subscribe } from "../rabbitmq/subscriber.js"

class UserEventConsumer {
    created = async () => {
        await subscribe({
            exchange: EXCHANGES.NOTIFICATION_EVENTS,
            queue: QUEUE_TYPES.USER_QUEUE,
            routingKeys: [ROUTING_KEYS.USER_REGISTERED],
            handler: async (event) => {
                const user = event.data
                const {verificationUrl,expiresAt} = await emailVerificationService.create(user.userId)
                const welcomeNotificationPayload = {
                    user,
                    notification: {
                        title: "Welcome to NexCommerce",
                        message: "Thank you for registering with us.",
                        channels: [NOTIFICATION_CHANNEL.EMAIL]
                    },
                    htmlTemplate: await getHTMLTemplate(HTML_TEMPLATE.WELCOME, {
                        name: event.data.firstName,
                        message: "Thank you for registering with us."
                    })
                }

                const emailVerificationNotificationPayload = {
                    user,
                    notification: {
                        title: "Verify your Email Address",
                        message: "Follow below link to verify your email address.",
                        channels: [NOTIFICATION_CHANNEL.EMAIL]
                    },
                    htmlTemplate: await getHTMLTemplate(HTML_TEMPLATE.EMAIL_VERIFICATION, {
                        firstName: user.firstName,
                        verificationUrl:verificationUrl,
                        expiryTime:`${expiresAt}`
                    })
                }
                await notificationService.notify(welcomeNotificationPayload)
                await notificationService.notify(emailVerificationNotificationPayload)
            }
        })
    }
}

export const userEventConsumer = new UserEventConsumer()