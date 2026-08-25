import mongoose from "mongoose";
import { USER_CONSTANT } from "../constant/user.constant.js";

const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,
    trim: true
  },
  lastName:{
    type: String, 
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true, 
    trim: true
  }, 
  password: {
    type: String,
    required: true, 
    select: false 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  pushNotificationToken: String,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  isActive: {
    type: Boolean, 
    default: true,
  },
}, {timestamps: true});

export const User = mongoose.model(USER_CONSTANT.USER_MODEL, userSchema);