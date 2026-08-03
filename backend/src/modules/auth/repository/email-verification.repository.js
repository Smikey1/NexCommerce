import { EmailVerificationToken } from "../model/email-verification-token.model.js";

class EmailVerificationRepository {
    async create(data) {
        return EmailVerificationToken.create(data);
    }

    async findValidByTokenHash(tokenHash) {
        return EmailVerificationToken.findOne({
            tokenHash,
            usedAt: null,
            expiresAt: {
                $gt: new Date(),
            },
        });
    }

    async findLatestByUserId(userId) {
        return EmailVerificationToken.findOne({
            userId,
            usedAt: null,
            expiresAt: {
                $gt: new Date(),
            },
        }).sort({
            createdAt: -1
        });
    }

    async invalidateAllByUserId(userId) {
        return EmailVerificationToken.updateMany(
            {
                userId, 
                usedAt: null,
            },
            {
                $set: {
                    usedAt: new Date(),
                },
            }
        );
    }

    async markAsUsed(tokenId) {
        return EmailVerificationToken.findOneAndUpdate(
            {
                _id: tokenId,
                usedAt: null,
            },
            {
                $set: {
                    usedAt: new Date(),               
            },
            },
        {
            new: true,
        }
        );
    }

    async deleteByUserId(userId) {
        return EmailVerificationToken.deleteMany({
            userId,
        });
    }
}

export const emailVerificationRepository = new EmailVerificationRepository();