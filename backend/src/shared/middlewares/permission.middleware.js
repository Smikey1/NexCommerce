import { PermissionError } from "../error/permission.error.js";
import { ERROR_MESSAGE } from "../constant/error-message.js";
import { UnauthorizedError } from "../error/unauthorized.error.js";


const getPermissions = (req, _) => {
    if (!req.user) {
        throw new UnauthorizedError(ERROR_MESSAGE.UNAUTHORIZED)
    }
    return new Set(req.user.permissions ?? []);
};

export const requirePermission = (permission) => {
    return (req, res, next) => {
        const permissions = getPermissions(req, res);

        if (!permissions) return;

        if (!permissions.has(permission)) {
            throw new PermissionError(
                ERROR_MESSAGE.FORBIDDEN,
                {
                    requiredPermissions: [permission],
                }
            );
        }

        next();
    };
};



export const requirePermissions = (...requiredPermissions) => {
    return (req, res, next) => {
        const permissions = getPermissions(req, res);

        if (!permissions) return;    

        const missingPermissions = requiredPermissions.filter(
            permission => !permissions.has(permission)
        );

        if (missingPermissions.length > 0) {
            throw new PermissionError(
                ERROR_MESSAGE.FORBIDDEN,
                {
                    requiredPermissions: missingPermissions,
                }
            );
        }

        next();
    };
};



export const requireAnyPermission = (...requiredPermissions) => {
    return (req, res, next) => {
        const permissions = getPermissions(req, res);

        if (!permissions) return;

        const hasPermission = requiredPermissions.some(
            permission => permissions.has(permission)
        );

        if (!hasPermission) {
            throw new PermissionError(
                ERROR_MESSAGE.FORBIDDEN,
                {
                    requiredAnyPermissions: requiredPermissions,
                }
            );
        }

        next();
    };
};
