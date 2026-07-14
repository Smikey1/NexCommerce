import authRoutes from "./routes/auth.routes.js"

export const authModule = (app) => {
    app.use("/api/v1/auth", authRoutes);
}