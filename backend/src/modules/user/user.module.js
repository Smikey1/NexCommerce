import userRoutes from "../user/route/user.routes.js"

export const userModule = (app) => {
    app.use("/api/v1/user", userRoutes);
}