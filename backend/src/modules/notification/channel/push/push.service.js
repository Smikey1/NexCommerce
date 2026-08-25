// import firebaseProvider from "./firebase.provider.js";

class PushService {
    async sendPush({
        token,
        title,
        body,
        data,
    }) {
        // return firebaseProvider.send({
        //     token,
        //     title,
        //     body,
        //     data,
        // });
    }
}

export const pushService = new PushService();