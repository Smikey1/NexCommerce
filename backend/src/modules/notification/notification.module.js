import notificationRoutes from "./routes/notification.routes.js"

export const notificationModule = (app) => {
    app.use("/api/v1/notifications", notificationRoutes);
}