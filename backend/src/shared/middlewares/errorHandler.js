import { Env } from "../env/env.js";

export const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const data = error.data || {}

    res.status(statusCode).json({
        success: false,
        message,
        data,
        stack:Env.NODE_ENV === "dev" ? error.stack : undefined
    });
};