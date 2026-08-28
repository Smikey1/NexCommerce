
export class UserService {
    /**
     * @param {import("../repository/user.repository.js").UserRepository} userRepository
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findById(userId) {
        return this.userRepository.findById(userId);
    }

    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }

    async findByPhone(phoneNumber) {
        return this.userRepository.findByPhone(phoneNumber);
    }

    async findByEmailOrPhoneWithPassword(email, phoneNumber) {
        return this.userRepository.findByEmailOrPhoneWithPassword(
            email,
            phoneNumber
        );
    }

    async create(data) {
        return this.userRepository.create(data);
    }

    async markEmailAsVerified(userId) {
        return this.userRepository.markEmailAsVerified(userId);
    }

    async markPhoneNumberAsVerified(userId) {
        return this.userRepository.markPhoneNumberAsVerified(userId);
    }

    // async updateById(userId, data) {
    //     return this.userRepository.updateById(userId, data);
    // }

    // async deleteById(userId) {
    //     return this.userRepository.deleteById(userId);
    // }

    // async activateById(userId) {
    //     return this.userRepository.activateById(userId);
    // }

    // async deactivateById(userId) {
    //     return this.userRepository.deactivateById(userId);
    // }
}
