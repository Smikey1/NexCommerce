import twilioProvider from "./twilio.provider.js";

class SmsService {
    async sendSms({ to, message }) {
        return twilioProvider.send({
            to,
            message,
        });
    }
}

export const smsService = new SmsService();