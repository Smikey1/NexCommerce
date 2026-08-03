import crypto from "crypto";

export const generateRawAndHashToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    return {rawToken,hashToken}
}

export const generateApiKey = () => {


    const random =
        crypto.randomBytes(32)
            .toString("hex");


    return `ck_live_${random}`;

};



export const hashApiKey = (key) => {


    return crypto
        .createHash("sha256")
        .update(key)
        .digest("hex");


};