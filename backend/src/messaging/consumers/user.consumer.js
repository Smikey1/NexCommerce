import { logger } from "../../config/logger.js"
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
                const notificationPayload = {
                    user: { ...event.data },

                    notification: {
                        title: "Welcome to NexCommerce",
                        message: "Follow below link to verify your email address.",
                        channels: [NOTIFICATION_CHANNEL.EMAIL, NOTIFICATION_CHANNEL.SMS]
                    },
                    htmlTemplate: await getHTMLTemplate(HTML_TEMPLATE.WELCOME, {
                        name: event.data.firstName,
                        message: "Follow below link to verify your email address."
                    })
                }
                await notificationService.notify(notificationPayload)
            }
        })
    }
}

export const userEventConsumer = new UserEventConsumer()