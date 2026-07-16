import {Router} from "express";
import { authController } from "../controller/auth.controller.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { validate } from "../../../shared/middlewares/validate.middleware.js";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);

//register
router.post("/register", validate(registerSchema), authController.register);

export default router; 