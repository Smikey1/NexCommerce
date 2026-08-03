import { Env } from "../../../shared/env/env.js";
import {userRepository} from "../../user/repository/user.repository.js"
import { UserAccountNotActiveError } from "../error/user-not-active.error.js";
import {generateRawAndHashToken} from "../../../shared/security/crypto.js"

import {emailVerificationRepository} from "../repository/email-verification.repository.js"

class EmailVerificationService {
     async create(userId, requestMetadata = {}) {

        const user = userRepository.findById(userId) 
        if(!user) {
            throw new UserAccountNotActiveError()
        }

        if (user.isEmailVerified) {
            return;
        }

        const { rawToken, hashToken: generatedHashToken } =
            generateRawAndHashToken();

        const expiresAt = new Date(
            Date.now() +
                Env.EMAIL_VERIFICATION_EXPIRATION_MS
        );

        await emailVerificationRepository.invalidateAllByUserId(
            user._id
        );

        const tokenData = await emailVerificationRepository.create({
            user: userId,
            tokenHash: generatedHashToken,
            expiresAt,
            createdByIp:
                requestMetadata.ipAddress ?? null,
        });

        const verificationUrl =
            `${Env.API_BASE_URL}/api/v1/auth/verify-token` +
            `?token=${encodeURIComponent(rawToken)}`;

        return {
            verificationUrl,
            expiresAt
        }
}}

export const emailVerificationService = new EmailVerificationService()