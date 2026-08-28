import { userService } from "../user/user.api.js";
import { EmailVerificationService } from "./service/email-verification.service.js";
import { AuthService } from "./service/auth.service.js";
import { AuthController } from "./controller/auth.controller.js";
import { EmailVerificationRepository } from "./repository/email-verification.repository.js";

const emailVerificationRepository = new EmailVerificationRepository()
const emailVerificationService = new EmailVerificationService(
    userService, emailVerificationRepository
)
export const authService = new AuthService(
    userService,
    emailVerificationService
);
export const authController = new AuthController(authService);