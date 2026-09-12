import { User } from "../model/user.model.js";

export class UserRepository {

    create = async (data) => {
        return await User.create(data);
    };

    findAll = async (filter = {}) => {
        return await User.find(filter);
    };

    findByEmail = async (email) => {
        return await User.findOne({ email }).select("+password");
    };

    findByPhone = async (phone) => {
        return await User.findOne({ phone }).select("+password");
    };

    findByEmailOrPhoneWithPassword = async (email, phone) => {
        if (email) {
            return await this.findByEmail(email);
        }

        if (phone) {
            return await this.findByPhone(phone);
        }

        return null;
    };

    findById = async (userId) => {
        return await User.findById(userId).populate("role");
    };

    markEmailAsVerified = async (userId) => {
        return await User.findByIdAndUpdate(
            userId,
            {
                isEmailVerified: true,
                emailVerifiedAt: new Date()
                
            },
            {
                new: true,
                runValidators: true
            }
        );
    };

    assignRoleToUser = async (roleId, userId) => {
        return await User.findByIdAndUpdate(
            userId,
            {
                role: roleId
            },
            {
                new: true,
                runValidators: true
            }
        );
    };

    updateProfile = async (userId, data) => {
        return await User.findByIdAndUpdate(
            userId,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    };

    updateUserStatus = async (userId, isActive) => {
    const user =  await User.findByIdAndUpdate(
        userId,
        {
            isActive:isActive
        },
        {
            new: true,
            runValidators: true
        }
    );
    return user;
};
} 