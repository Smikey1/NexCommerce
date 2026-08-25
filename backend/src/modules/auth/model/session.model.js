import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        refreshTokenHash: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        revokedAt: {
            type: Date,
            default: null,
        },
        userAgent: {
            type: String,
            default: null,
        },
        ipAddress: {
            type: String,
            default: null,
        },
    }, {timestamps:true},
)

sessionSchema.index(
    {expiresAt: 1},
    {expireAfterSeconds:0}
);

export const Session = mongoose.model(
    "Session",
    sessionSchema
);