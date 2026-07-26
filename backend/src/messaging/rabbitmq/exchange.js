import { EXCHANGES } from "../constant/exchange.constant.js";
import { getRabbitChannel } from "./connection.js";

export const createExchanges = async () => {
    const channel = getRabbitChannel();

    await channel.assertExchange(
        EXCHANGES.NEX_COMMERCE_EVENTS,
        "topic",
        {
            durable: true,
        }
    );

    await channel.assertExchange(
        EXCHANGES.NOTIFICATION_EVENTS,
        "topic",
        {
            durable: true,
        }
    );

    await channel.assertExchange(
        EXCHANGES.DEAD_LETTER,
        "fanout",
        {
            durable: true,
        }
    );
};