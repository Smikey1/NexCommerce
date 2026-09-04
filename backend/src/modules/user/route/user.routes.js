import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { userController } from "../user.api.js";
import { PERMISSIONS } from "../../../shared/security/roles.js";
import { requirePermissions } from "../../../shared/middlewares/permission.middleware.js";

const router = Router();

router.patch("/assign-role", authenticate, requirePermissions(PERMISSIONS.USER_CREATE, PERMISSIONS.ROLE_UPDATE), userController.assignRoleToUser);

export default router; 