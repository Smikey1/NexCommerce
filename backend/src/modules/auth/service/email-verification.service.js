import { Env } from "../../../shared/env/env.js";
import { UserAccountNotActiveError } from "../error/user-not-active.error.js";
import { generateRawAndHashToken} from "../../../shared/security/crypto.js"

export class EmailVerificationService {
    /**
     * @param {import("../../user/service/user.service.js").UserService} userService
     * @param {import("../repository/email-verification.repository.js").EmailVerificationRepository} emailVerificationRepository
     */
    constructor(userService, emailVerificationRepository) {
        this.userService = userService;
        this.emailVerificationRepository = emailVerificationRepository;
    }

    async create(userId, requestMetadata = {}) {
        const user = await this.userService.findById(userId) 
        if(!user) {
            throw new UserAccountNotActiveError()
        }

        if (user.isEmailVerified) {
            return;
        }

        const { rawToken, hashToken: generatedHashToken } = generateRawAndHashToken();

        const expiresAt = new Date(
            Date.now() + Env.EMAIL_VERIFICATION_EXPIRATION_MS
        );

        await this.emailVerificationRepository.invalidateAllByUserId( user._id);

            // save new verification token
        await this.emailVerificationRepository.create({
            user: user._id,
            tokenHash: generatedHashToken,
            expiresAt,
            createdByIp: requestMetadata.ipAddress ?? null
        });


        const verificationUrl =
            `${Env.API_BASE_URL}/api/v1/auth/verify-email` +
            `?token=${encodeURIComponent(rawToken)}`;

        return {
            verificationUrl,
            expiresAt
        }
    }

    invalidateAllByUserId = async (userId) => {
        return this.emailVerificationRepository.invalidateAllByUserId(userId)
    }
    findValidTokenByHash =async (tokenHash) => {
        return this.emailVerificationRepository.findValidTokenByHash(tokenHash)
    }

}