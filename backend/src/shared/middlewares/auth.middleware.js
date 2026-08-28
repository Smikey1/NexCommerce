import { verifyAccessToken } from "../security/jwt.js";
import { ForbiddenError } from "../error/forbidden.error.js"
import { UnauthorizedError } from "../error/unauthorized.error.js"
import { ERROR_MESSAGE } from "../constant/error-message.js";
import { rbacService } from "../../modules/rbac/service/rbac.service.js";
import { userService } from "../../modules/user/user.api.js";

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError(
                ERROR_MESSAGE.ACCESS_TOKEN_REQUIRED
            );
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError(
                ERROR_MESSAGE.ACCESS_TOKEN_REQUIRED
            );
        }

        let decoded;

        decoded = verifyAccessToken(token);

        const user = await userService.findById(decoded.userId)
            
        if (!user) {
            throw new UnauthorizedError(
                ERROR_MESSAGE.USER_NOT_FOUND
            );
        }

        if (!user.role) {
            throw new ForbiddenError(
                ERROR_MESSAGE.USER_ROLE_REQUIRED
            );
        }
        const authorization = await rbacService.getAuthorizationContext(user.role) 
        req.user = {
            id: user._id,
            email: user.email,
            role: {
                id: authorization.roleId,
                name: authorization.roleName
            },
            permissions: authorization.permissions
        };
        next();
    } catch (error) {
        next(error);
    }
};