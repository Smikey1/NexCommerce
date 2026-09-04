import { Router } from "express";
import { rbacController } from "../rbac.api.js";
import {authenticate} from "../../../shared/middlewares/auth.middleware.js";
import {requirePermission} from "../../../shared/middlewares/permission.middleware.js";
import {PERMISSIONS} from "../../../shared/security/roles.js";

const router = Router();
router.post("/permissions", authenticate, requirePermission(PERMISSIONS.PERMISSION_CREATE), rbacController.createPermission);
router.get("/permissions", authenticate, requirePermission(PERMISSIONS.PERMISSION_READ), rbacController.getAllPermissions);
router.get("/permissions/key", authenticate, requirePermission(PERMISSIONS.PERMISSION_READ), rbacController.getPermissionByKey);
router.get("/permissions/:resource", authenticate, requirePermission(PERMISSIONS.PERMISSION_READ), rbacController.getAllPermissions);


router.get("/roles", rbacController.getAllRoles);
router.get("/roles/active", rbacController.getAllActiveRoles);
router.get("/roles/inactive", rbacController.getAllInactiveRoles);
router.get("/roles/name", rbacController.getRoleByName);
// router.get("/roles/:roleId", rbacController.getRoleById);
router.post("/roles", authenticate, requirePermission(PERMISSIONS.ROLE_CREATE), rbacController.createRole);
router.patch("/roles", authenticate, requirePermission(PERMISSIONS.ROLE_UPDATE), rbacController.updateRole);
router.patch("/roles/:roleId/activate", authenticate, requirePermission(PERMISSIONS.ROLE_UPDATE),  rbacController.activateRole);
router.patch("/roles/:roleId/deactivate", authenticate, requirePermission(PERMISSIONS.ROLE_UPDATE), rbacController.deactivateRole);
router.patch("/roles/:roleId/assign-permissions", authenticate, requirePermission(PERMISSIONS.ROLE_UPDATE), rbacController.assignPermissionToRole);

export default router; 