import jwt from "jsonwebtoken";
import { Env } from "../env/env.js";

export const generateAccessToken = (payload) => {
    return jwt.sign({ ...payload, type: "access token" },
        Env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: Env.ACCESS_TOKEN_EXPIRATION_TIME }
    );
};


export const generateRefreshToken = (payload) => {
    return jwt.sign({ ...payload, type: "refresh token" },
        Env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: Env.REFRESH_TOKEN_EXPIRATION_TIME }
    );
};


export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};


export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
};


export const decodeToken = (token) => {
    return jwt.decode(token);
};