import nodemailerProvider from "./nodemailer.provider.js";

class EmailService {
    constructor() {
        this.provider = nodemailerProvider;
    }

    async sendEmail({ to, subject, html }) {
        return this.provider.send({
            to,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();