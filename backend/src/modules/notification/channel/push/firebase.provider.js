import admin from "firebase-admin";
import { Env } from "../../../../shared/env/env.js";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: Env.FIREBASE_PROJECT_ID,
            clientEmail: Env.FIREBASE_CLIENT_EMAIL,
            privateKey: Env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

class FirebaseProvider {
    async send({
        token,
        title,
        body,
        data = {},
    }) {
        try {
            return await admin.messaging().send({
                token,
                notification: {
                    title,
                    body,
                },
                data,
            });
        } catch (error) {
            throw new Error(`Firebase push failed: ${error.message}`, {
                cause: error,
            });
        }
    }
}

export default new FirebaseProvider();