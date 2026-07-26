import { userEventConsumer } from "./user.consumer.js";

export const startConsumers = async () => {

    await userEventConsumer.created();

    
    console.log(
        "RabbitMQ consumers started"
    );

};