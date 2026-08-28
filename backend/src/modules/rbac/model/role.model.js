import mongoose from "mongoose"; 
import { RBAC_CONSTANT } from "../constants/rbac.constants.js";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        
        isActive: {
            type: Boolean,
            default: true
        },

        description: {
            type: String,
            trim: true
        },

        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: RBAC_CONSTANT.PERMISSION_MODEL
            }
        ]
    }, { timestamps: true }
);

export const Role = mongoose.model(RBAC_CONSTANT.ROLE_MODEL, roleSchema);