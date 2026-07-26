import amqp from "amqplib";
import { Env } from "../../shared/env/env.js";
import { logger } from "../../config/logger.js";

let connection = null;
let channel = null;

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(Env.RABBITMQ_URL);

        connection.on("error", (error) => {
            logger.error("RabbitMQ connection error", error);
        });

        connection.on("close", () => {
            logger.warn("RabbitMQ connection closed");

            connection = null;
            channel = null;
        });

        channel = await connection.createChannel();

        await channel.prefetch(10);

        logger.info("RabbitMQ connected");

        return channel;
    } catch (error) {
        logger.error("RabbitMQ connection failed", error);

        throw error;
    }
};

export const getRabbitChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel not initialized");
    }

    return channel;
};

export const closeRabbitMQ = async () => {
    if (channel) {
        await channel.close();
    }

    if (connection) {
        await connection.close();
    }
};