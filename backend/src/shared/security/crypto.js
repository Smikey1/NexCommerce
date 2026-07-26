import crypto from "crypto";

export const generateHashToken = () => {
    const token = crypto.randomBytes(32).toString("hex");
    return crypto.createHash("sha256").update(token).digest("hex");
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