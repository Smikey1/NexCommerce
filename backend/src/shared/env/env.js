import dotenv from "dotenv";
dotenv.config();

export const Env = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    AccessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    RefreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    AccessTokenExpirationTime: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
    RefreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
}
