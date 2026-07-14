export const success = (message, data = {}) => {
    return { success: true, message, data };
}