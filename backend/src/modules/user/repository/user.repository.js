import { User } from "../model/user.model.js";

class UserRepository {
    async create(data) {
        return await User.create(data);
    }

    async findByEmail(email) {
        return await User.findOne({email}).select("+password");
    }

    async findByPhone(phone) {
        return await User.findOne({phone}).select("+password");
    }

    async findByEmailOrPhoneWithPassword(email, phone) {
        if (email !== null){
            return this.findByEmail(email);
        }else if (phone !== null){
            return this.findByPhone(phone);
        } else return null;
    }

    async findById(id) {
        return await User.findById(id);
    }

    async markEmailAsVerified(id) {
        return await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    isEmailVerified: true,
                    emailVerifiedAt: new Date(),
                },
            },
            {
                new: true,
            }
        );
    }
}

export const userRepository = new UserRepository();