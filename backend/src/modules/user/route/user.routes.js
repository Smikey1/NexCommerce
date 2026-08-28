import { Router } from "express";
import { authenticate } from "../../../shared/middlewares/auth.middleware.js";
import { userController } from "../user.api.js";

const router = Router();

router.get("/", authenticate, userController.test);

export default router; 