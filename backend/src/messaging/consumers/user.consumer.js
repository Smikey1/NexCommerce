import { NOTIFICATION_CHANNEL } from "../../modules/notification/constant/notification.constant.js"
import { notificationService } from "../../modules/notification/service/notification.service.js"
import { getHTMLTemplate, HTML_TEMPLATE } from "../../modules/notification/templates/html.template.js"
import { Env } from "../../shared/env/env.js"
import { QUEUE_TYPES } from "../constant/event-types.js"
import { EXCHANGES } from "../constant/exchange.constant.js"
import { MESSAGING } from "../constant/messaging.constant.js"
import { ROUTING_KEYS } from "../constant/routing-keys.js"
import { subscribe } from "../rabbitmq/subscriber.js"

export class UserEventConsumer {
    /**
     * @param {import("../../modules/auth/service/email-verification.service.js").EmailVerificationService} emailVerificationService
     */
    constructor(emailVerificationService) {
        this.emailVerificationService = emailVerificationService;
    }
    created = async () => {
        await subscribe({
            exchange: EXCHANGES.NOTIFICATION_EVENTS,
            queue: QUEUE_TYPES.USER_QUEUE,
            routingKeys: [ROUTING_KEYS.USER_REGISTERED],
            handler: async (event) => { 
                const user = event.data
                const {verificationUrl,expiresAt} = await this.emailVerificationService.create(user.userId)
                const emailVerificationNotificationPayload = {
                    user,
                    notification: {
                        title: MESSAGING.VERIFY_EMAIL_ADDRESS_TITLE,
                        message: MESSAGING.VERIFY_EMAIL_ADDRESS_DESCRIPTION,
                        channels: [NOTIFICATION_CHANNEL.EMAIL]
                    },
                    htmlTemplate: await getHTMLTemplate(HTML_TEMPLATE.EMAIL_VERIFICATION, {
                        firstName: user.firstName,
                        verificationUrl:verificationUrl,
                        expiryTime:`${expiresAt}`
                    })
                }
                await notificationService.notify(emailVerificationNotificationPayload)
            }
        })
    }

    accountStatusUpdated = async () => {
        console.log("EVENT RECEIVED");
        await subscribe({
            exchange: EXCHANGES.NOTIFICATION_EVENTS,
            queue: QUEUE_TYPES.USER_QUEUE,
            routingKeys: [ROUTING_KEYS.USER_UPDATED],
            handler: async (event) => {
                console.log("EVENT SUBSCRIBED");
                
                const user = event.data 
                const notificationTitle = user.isActive ? MESSAGING.USER_ACCOUNT_ACTIVATED_TITLE : MESSAGING.USER_ACCOUNT_DEACTIVATED_TITLE
                const notificationDescription = user.isActive ? MESSAGING.USER_ACCOUNT_ACTIVATED_DESC : MESSAGING.USER_ACCOUNT_DEACTIVATED_DESC
                const emailNotificationPayload = {
                    user,
                    notification: {
                        title: notificationTitle,
                        message: notificationDescription,
                        channels: [NOTIFICATION_CHANNEL.EMAIL]
                    },
                    htmlTemplate: user.isActive ? 
                    await getHTMLTemplate(HTML_TEMPLATE.USER_ACCOUNT_ACTIVATED, {
                        firstName: user.firstName,
                        loginUrl: `${Env.FRONTEND_URL}/login`,
                    })
                    : 
                    await getHTMLTemplate(HTML_TEMPLATE.USER_ACCOUNT_DEACTIVATED, {
                        firstName: user.firstName,
                    })
                }
                await notificationService.notify(emailNotificationPayload)
            }
        })
    }
}

export const userEventConsumer = new UserEventConsumer()