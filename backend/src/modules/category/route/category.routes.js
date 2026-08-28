import { Router } from "express";
import { requirePermission } from "../../../shared/middlewares/permission.middleware.js";
import { PERMISSIONS } from "../../../shared/security/roles.js";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { categoryController } from "../category.api.js";

const router = Router();

// router.post("/", validate(), categoryController.create);
router.post("/", authenticate, requirePermission(PERMISSIONS.CATEGORY_CREATE), categoryController.create);
router.get("/:name", categoryController.getByName);
router.get("/", categoryController.getAll);
router.patch("/:name", authenticate, requirePermission(PERMISSIONS.CATEGORY_UPDATE), categoryController.updateByName);
router.delete("/:name", categoryController.deleteByName);
router.patch("/:name/activate", categoryController.markAsActive);
router.patch("/:name/deactivate", categoryController.markAsInActive);

export default router; 