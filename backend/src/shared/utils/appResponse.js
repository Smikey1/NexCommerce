export const failure = (statusCode, message, data = {}) => {
    throw new ApiError(statusCode, message, data);
}

export const success = (message, data = {}) => {
    return { success: true, message, data };
}