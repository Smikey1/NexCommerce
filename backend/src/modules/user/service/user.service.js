import { userEventPublisher } from "../../../messaging/events/user.event.js";
import { ConflictError } from "../../../shared/error/conflict.error.js";
import { NotFoundError } from "../../../shared/error/not-found.error.js";
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

    findAll = async () => {
        return await this.userRepository.findAll();
    };

    findById = async (userId) => {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError(USER_ERROR.USER_NOT_FOUND);
        }

        return user;
    };

    findByEmail = async (email) => {
        return await this.userRepository.findByEmail(email);
    };

    findByPhone = async (phone) => {
        return await this.userRepository.findByPhone(phone);
    };

    findByEmailOrPhoneWithPassword = async (email, phone) => {
        return await this.userRepository.findByEmailOrPhoneWithPassword(
            email,
            phone
        );
    };

    create = async (data) => {
        return await this.userRepository.create(data);
    };

    markEmailAsVerified = async (userId) => {
        return await this.userRepository.markEmailAsVerified(userId);
    };

    assignRoleToUser = async (roleId, userId) => {
        const role = await this.rbacService.getRoleById(roleId);
        if (!role) return; 
        const user = await this.findById(userId); 
        if (!user) return; 
        if (user.role._id.toString() === roleId) {
            throw new ConflictError(USER_ERROR.USER_ROLE_ALREADY_ASSIGNED);
        } 
        return await this.userRepository.assignRoleToUser(roleId, userId);
    }

    updateUserProfile = async (userId, data) => {
        const user = await this.userRepository.updateProfile(userId, data);
        if (!user) {
            throw new NotFoundError(USER_ERROR.USER_NOT_FOUND);
        }
        return user; 
    }

    updateUserStatus = async (userId,isActive) => {
        const user = await this.userRepository.updateUserStatus(userId, isActive);
           if (!user) {
            throw new NotFoundError(USER_ERROR.USER_NOT_FOUND);
        }
        const payload = {
            userId: user._id,
            accountStatus: user.isActive,
            email: user.email,
            firstName: user.firstName 
        }
        userEventPublisher.accountStatusUpdated(payload);
        return user; 
    }
    
}
