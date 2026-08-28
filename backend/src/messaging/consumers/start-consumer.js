import { UserEventConsumer } from "./user.consumer.js";
import { emailVerificationService } from "../../modules/auth/email-verification.api.js";

const userEventConsumer = new UserEventConsumer(emailVerificationService)

export const startConsumers = async () => {
    await userEventConsumer.created();

    console.log("RabbitMQ consumers started");

};