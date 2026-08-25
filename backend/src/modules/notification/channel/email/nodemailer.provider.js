import nodemailer from "nodemailer";
import { Env } from "../../../../shared/env/env.js";

class NodemailerProvider {
    constructor() {
        this.transporter =
            nodemailer.createTransport({
                host: Env.SMTP_HOST,
                port: Env.SMTP_PORT,
                secure: Env.SMTP_SECURE === "true",

                auth: {
                    user: Env.SMTP_USER,
                    pass: Env.SMTP_PASSWORD,
                },

            });

    }




    async send({
        to,
        subject,
        html,
    }) {


        try {


            const info =
                await this.transporter.sendMail({

                    from:
                        Env.EMAIL_FROM,

                    to,

                    subject,

                    html,

                });



            return info;


        } catch (error) {


            throw new Error(
                `SMTP email failed: ${error.message}`
            );


        }

    }


}



export default new NodemailerProvider();