import { getRabbitChannel } from "./connection.js";
import { EXCHANGES } from "../constant/exchange.constant.js";

/**
 * Publishes an event to a RabbitMQ exchange.
 *
 * The event is serialized as JSON and published with a persistent delivery mode.
 *
 * @async
 * @param {Object} params - Publish options.
 * @param {string} [params.exchange=EXCHANGES.COMMERCE_EVENTS] - The RabbitMQ exchange to publish to.
 * @param {string} params.routingKey - The routing key used to route the message.
 * @param {*} params.payload - The event payload.
 * @returns {Promise<void>} Resolves once the message has been published.
 */
export const publishEvent = async ({
    exchange = EXCHANGES.NEX_COMMERCE_EVENTS,
    routingKey,
    payload,
}) => {
    const channel = getRabbitChannel();

    const message = {
        event: routingKey,
        timestamp: new Date().toISOString(),
        data: payload,
    };

    channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(message)),
        {
            persistent: true,
            contentType: "application/json",
        }
    );
};