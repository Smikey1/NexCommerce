import { ROUTING_KEYS } from "../constant/routing-keys.js"
import { EXCHANGES } from "../constant/exchange.constant.js";
import { publishEvent } from "../rabbitmq/publisher.js"

class UserEventPublisher {
    created = (payload) => {
        publishEvent({
            exchange: EXCHANGES.NOTIFICATION_EVENTS,
            routingKey: ROUTING_KEYS.USER_REGISTERED,
            payload
        })
    }

    accountStatusUpdated = (payload) => {
        publishEvent({
            exchange: EXCHANGES.NOTIFICATION_EVENTS,
            routingKey: ROUTING_KEYS.USER_UPDATED,
            payload
        })
    }

}

export const userEventPublisher = new UserEventPublisher()