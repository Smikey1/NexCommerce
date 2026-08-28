import jwt from "jsonwebtoken";
import { Env } from "../env/env.js";
import { TokenType } from "../constant/constant.js";
import { UnauthorizedError } from "../error/unauthorized.error.js";
import { ERROR_MESSAGE } from "../constant/error-message.js";

export const generateAccessToken = (userId, role) => {
    return jwt.sign(
        {
            userId: userId.toString(),
            role,
            type: TokenType.ACCESS 
        },
        Env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: Env.ACCESS_TOKEN_EXPIRATION_MS || "15m",
        }
    );
};

export const generateRefreshToken = (userId, sessionId) => {
    return jwt.sign(
        { 
            userId: userId.toString(),
            sessionId,
            type: TokenType.REFRESH 
        },
        Env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: Env.REFRESH_TOKEN_EXPIRATION_MS || "7d",
        }
    );
};

export const verifyAccessToken = (token) => {
    return verifyToken(
        token,
        Env.ACCESS_TOKEN_SECRET_KEY
    );
};

export const verifyRefreshToken = (token) => {
    return verifyToken(
        token,
        Env.REFRESH_TOKEN_SECRET_KEY
    );
};

export const decodeToken = (token) => {
    return jwt.decode(token);
};

// Common verification function
const verifyToken = (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        if (
            error instanceof jwt.TokenExpiredError ||
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.NotBeforeError
        ) {
            throw new UnauthorizedError(
                ERROR_MESSAGE.ACCESS_TOKEN_INVALID_OR_EXPIRED
            );
        }
        throw error
    }
};