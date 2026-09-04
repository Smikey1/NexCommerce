import mongoose from "mongoose"; 
import { RBAC_CONSTANT } from "../constants/rbac.constants.js";
import { USER_CONSTANT } from "../../user/constant/user.constant.js";

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

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_CONSTANT.USER_MODEL
        },

        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_CONSTANT.USER_MODEL
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