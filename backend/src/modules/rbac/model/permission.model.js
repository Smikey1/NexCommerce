import mongoose from "mongoose";
import { RBAC_CONSTANT } from "../constants/rbac.constants.js";

const permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        resource: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        action: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: [
                "create",
                "read",
                "update",
                "delete"
            ]
        },

        permissionKey: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Automatically generate permissionKey
permissionSchema.pre("validate", function (next) {
    if (this.resource && this.action) {
        this.permissionKey = `${this.resource}:${this.action}`;
    }

    next();
});

permissionSchema.index(
    { resource: 1, action: 1 },
    { unique: true }
);

export const Permission = mongoose.model(
    RBAC_CONSTANT.PERMISSION_MODEL,
    permissionSchema
);
