import mongoose from "mongoose";
import { USER_CONSTANT } from "../../user/constant/user.constant.js";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
        trim: true,
    },

    slug: {
        type: String,
        required: [true, "Category slug is required."],
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },

    description: {
        type: String,
        trim: true,
        maxLength: [
            500,
            "Category description cannot exceed 500 characters"
        ],
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: USER_CONSTANT.USER_MODEL,
        required: true
    },
}, {
    timestamps: true
});

categorySchema.index(
    {name: 1},
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2
        }
    }
);

export const Category = mongoose.model("Category", categorySchema);