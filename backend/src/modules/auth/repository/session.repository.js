import { Session } from "../model/session.model.js";

class SessionRepository {
    create(data) {
        return Session.create(data);
    }

    findActiveBySessionId(sessionId) {
       return Session.findOne({
        sessionId,
        revokedAt: null,
        expiresAt: {
            $gt: new Date(),
        },
       });
    }

    updateRefreshToken(
    sessionId,
    refreshTokenHash,
    expiresAt
) {
    return Session.findOneAndUpdate(
        {
            sessionId,
            revokedAt: null,
            expiresAt: {
                $gt: new Date()
            }
        },
        {
            refreshTokenHash,
            expiresAt,
        },
        {
            new: true,
        }
    );
}

    revokeBySessionId(sessionId) {
        return Session.findOneAndUpdate(
            {
                sessionId,
                revokedAt: null,
            },
            {
                revokedAt: new Date(),
            },
            {
                new: true,
            }
        );
    }

    revokeAllByUserId(userId) {
    return Session.updateMany(
        {
            userId,
            revokedAt: null,
        },
        {
            revokedAt: new Date(),
        }
    );
}
}

export const sessionRepository = new SessionRepository(); 