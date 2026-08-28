import { EmailVerificationRepository } from "./repository/email-verification.repository.js";
import { EmailVerificationService } from "./service/email-verification.service.js";
import { userService } from "../user/user.api.js";

const emailVerificationRepository = new EmailVerificationRepository()

export const emailVerificationService = new EmailVerificationService(userService, emailVerificationRepository);