import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { RbacService } from "../../rbac/service/rbac.service.js";
import { USER_ERROR } from "../constant/user.error.js";
export class UserService {
    /**
     * @param {import("../repository/user.repository.js").UserRepository} userRepository
     * @param {import("../../rbac/service/rbac.service.js").RbacService} rbacService
     */
    constructor(userRepository, rbacService) {
        this.userRepository = userRepository;
        this.rbacService = rbacService; 
    }

    findById = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError(USER_ERROR.USER_NOT_FOUND);
        }
        return user; 
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

    assignRoleToUser = async (roleId, userId) => {
        const role = await this.rbacService.getRoleById(roleId);
        if (!role) return; 
        const user = await this.findById(userId); 
        if (!user) return; 
        return await this.userRepository.assignRoleToUser(roleId, userId);
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
