export const errorHandler = (error, req, res, next) => {
    console.error("ERROR:", err);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    const data = error.data || {}

    res.status(statusCode).json({
        success: false,
        message,
        data,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};