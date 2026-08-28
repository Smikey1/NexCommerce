import { ERROR_MESSAGE } from "../constant/error-message.js";
import { Env } from "../env/env.js";

export const errorHandler = (error, _, res, __) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    const data = error.data || {}

    res.status(statusCode).json({
        success: false,
        message,
        data,
        stack:Env.NODE_ENV === "dev" ? error.stack : undefined
    });
};