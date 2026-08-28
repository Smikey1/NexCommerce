import crypto from "crypto";


const hashApiKey = (key) => {

    return crypto
        .createHash("sha256")
        .update(key)
        .digest("hex");

};



export const apiKeyAuth = async (
    req,
    res,
    next
) => {


    try {


        const key =
            req.headers["x-api-key"];



        if (!key) {

            return res.status(401).json({
                message: "API key required"
            });

        }



        const hashed =
            hashApiKey(key);



        const apiKey =
            await ApiKey.findOne({
                keyHash: hashed,
                active: true
            });



        if (!apiKey) {

            return res.status(401).json({
                message: "Invalid API key"
            });

        }



        req.apiClient = {

            id: apiKey._id,

            name: apiKey.name,


            permissions:
                apiKey.permissions

        };



        next();



    } catch (error) {

        return res.status(401).json({
            message: "Invalid API key",
            error
        });

    }


};