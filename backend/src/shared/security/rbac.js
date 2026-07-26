import { ROLES } from "./roles.js";
import { failure } from "../utils/appResponse.js";

export const rbac = ({ roles = [], permissions = [] }) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            // const permissions =
            //     req.user?.permissions ??
            //     req.apiClient?.permissions ??
            //     [];

            if (!user) {
                return failure(401, "Unauthorized.");
            }

            // ROLE CHECK
            if (roles.length > 0 && !roles.includes(user.role)) {
                return failure(403, "Forbidden: Role denied");
            }

            // PERMISSION CHECK
            if (
                permissions.length > 0 &&
                !permissions.some((p) => user.permissions?.includes(p))
            ) {
                return failure(403, "Forbidden: Permission denied");
            }

            next();
        } catch (err) {
            return failure(500, "RBAC error");
        }
    };
};