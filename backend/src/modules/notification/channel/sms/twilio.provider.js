import twilio from "twilio";
import { Env } from "../../../../shared/env/env.js";

class TwilioProvider {
    constructor() {
        this.client = twilio(
            Env.TWILIO_ACCOUNT_SID,
            Env.TWILIO_AUTH_TOKEN
        );
    }

    async send({ to, message }) {
        try {
            const response = await this.client.messages.create({
                body: message,
                from: Env.TWILIO_PHONE_NUMBER,
                to,
            });

            return response;
        } catch (error) {
            throw new Error(
                `Twilio SMS failed: ${error.message}`
            );
        }
    }
}

export default new TwilioProvider();