import jwt from "jsonwebtoken";
import { Env } from "../env/env.js";

export const generateAccessToken = (payload) => {
    return jwt.sign(
        {...payload, type:"access token"},
     Env.AccessTokenSecretKey,
{
    expiresIn: Env.AccessTokenExpirationTime || "15m",
}
);
};

export const generateRefreshToken = (payload) => {
    return jwt.sign(
        { ...payload, type: "refresh token" },
        Env.RefreshTokenSecretKey,
        {
            expiresIn: Env.RefreshTokenExpirationTime || "7d",
        }
    );
};