import rbacRoutes from "../rbac/routes/rbac.routes.js"

export const rbacModule = (app) => {
    app.use("/api/v1/rbac", rbacRoutes);
}