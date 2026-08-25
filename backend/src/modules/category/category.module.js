import categoryRoutes from "../category/route/category.routes.js"

export const categoryModule = (app) => {
    app.use("/api/v1/categories", categoryRoutes);
}