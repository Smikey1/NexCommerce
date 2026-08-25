import {Router} from "express";

import { validate } from "../../../shared/middlewares/validate.middleware.js";
import { categoryController } from "../controller/category.controller.js";

const router = Router();

// router.post("/", validate(), categoryController.create);
router.post("/", categoryController.create);
router.get("/:name", categoryController.getByName);
router.get("/", categoryController.getAll);
router.patch("/:name", categoryController.updateByName);
router.delete("/:name", categoryController.deleteByName);
router.patch("/:name/activate", categoryController.markAsActive);
router.patch("/:name/deactivate", categoryController.markAsInActive);

export default router; 