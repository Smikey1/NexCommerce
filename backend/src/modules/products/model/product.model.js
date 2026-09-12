import mongoose from "mongoose";
import { USER_CONSTANT } from "../../user/constant/user.constant.js";
import { CATEGORY_CONSTANT } from "../../category/constant/category.constant.js";
import { PRODUCT_CONSTANT } from "../constants/product.constant.js";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required."],
            trim: true,
        },

        slug: {
            type: String,
            required: [true, "Product slug is required."],
            trim: true,
            lowercase: true,
            index: true,
        },

        description: {
            type: String,
            trim: true,
            maxLength: [
                4000,
                "Product description cannot exceed 4000 characters."
            ],
            default: ""
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: CATEGORY_CONSTANT.CATEGORY_MODEL,
            required: [true, "Product category is required."]
        },

        price: {
            type: Number,
            required: [true, "Product price is required."],
            min: [0, "Product price cannot be negative."]
        },

        compareAtPrice: {
            type: Number,
            min: [0, "Compare at price cannot be negative."],
            default: null
        },

        sku: {
            type: String,
            required: [true, "Product SKU is required."],
            trim: true,
            uppercase: true,
            unique: true,
            index: true,
        },

        stock: {
            type: Number,
            required: [true, "Product stock is required."],
            min: [0, "Product stock cannot be negative."],
            default: 0
        },

        images: {
            type: [String],
            default: []
        },

        isActive: {
            type: Boolean,
            default: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: USER_CONSTANT.USER_MODEL,
            required: true
        }
    },
    {
        timestamps: true
    }
);

productSchema.index(
    { name: 1 },
    {
        collation: {
            locale: "en",
            strength: 2
        }
    }
);

export const Product = mongoose.model(PRODUCT_CONSTANT.PRODUCT_MODEL, productSchema);