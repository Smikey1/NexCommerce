import { Resend } from "resend";
import { Env } from "../../../../shared/env/env.js";

class ResendProvider {

    constructor() {
        this.client = new Resend(
            Env.RESEND_API_KEY
        );
    }


    async send({
        to,
        subject,
        html,
    }) {

        try {

            const response =
                await this.client.emails.send({
                    from: Env.EMAIL_FROM,
                    to,
                    subject,
                    html,
                });


            return response;

        } catch (error) {

            throw new Error(
                `Resend email failed: ${error.message}`
            );

        }

    }

}


export default new ResendProvider();