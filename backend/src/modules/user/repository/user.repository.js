import { User } from "../model/user.model.js";

class UserRepository {
    async create(data) {
        return await User.create(data);
    }

    async findByEmail(email) {
        return await User.findOne({email});
    }

    async findByEmailWithPassword(email) {
        return await User.findOne({email}).select("+password");
    }

    async findById(id) {
        return await User.findById(id);
    }
}

export const userRepository = new UserRepository();