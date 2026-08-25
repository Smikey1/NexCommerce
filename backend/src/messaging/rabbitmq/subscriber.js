import { getRabbitChannel } from "./connection.js";

export const subscribe = async ({
    exchange,
    queue,
    routingKeys,
    handler
}) => {
    const channel = getRabbitChannel();

    await channel.assertQueue(queue, {
        durable: true,
    });

    for (const key of routingKeys) {
        await channel.bindQueue(queue, exchange, key);
    }

    await channel.consume(queue, async (message) => {
        if (!message) return;

        try {
            const payload = JSON.parse(message.content.toString());

            await handler(payload);

            channel.ack(message);
        } catch (error) {
            console.error("RabbitMQ consumer error", error);

            channel.nack(message, false, false);
        }
    });
};