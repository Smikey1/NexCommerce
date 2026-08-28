import { EmailVerificationToken } from "../model/email-verification-token.model.js";

export class EmailVerificationRepository {
    async create(data) {
        return await EmailVerificationToken.create(data);
    }

    async findValidTokenByHash(tokenHash) {
        return EmailVerificationToken.findOne({
            tokenHash,
            usedAt: null,
            expiresAt: {
                $gt: new Date(),
            },
        });
    }

    async findLatestByUserId(userId) {
        return await EmailVerificationToken.findOne({
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
        return await EmailVerificationToken.updateMany(
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
        return await EmailVerificationToken.findOneAndUpdate(
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
        return await EmailVerificationToken.deleteMany({
            userId,
        });
    }
}