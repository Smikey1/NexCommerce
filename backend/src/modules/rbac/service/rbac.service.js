import { BadRequestError } from "../../../shared/error/bad-request.error.js";
import { ConflictError } from "../../../shared/error/conflict.error.js";
import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { RBAC_ERROR } from "../constants/rbac.error.js";
import { CreatePermissionRequest } from "../dto/requests/permission.requests.js";
import { CreateRoleRequest, UpdateRoleRequest } from "../dto/requests/role.requests.js";
import { PermissionAlreadyExistsError } from "../error/permission-already-exists.error.js";
import { PermissionNotFoundError } from "../error/permission-not-found.error.js";

export class RbacService {
    /**
     * @param {import("../repository/rbac.repository.js").RbacRepository} rbacRepository
     */
    constructor(rbacRepository){
        this.rbacRepository = rbacRepository
    }
    getAllPermissions = async () => {
        const permissions = await this.rbacRepository.getAllPermission();
        return permissions;
    }

    getPermissionByKey = async (permissionKey) => {
        const permission = await this.rbacRepository.getPermissionByKey(permissionKey);

        if (!permission) {
            throw new PermissionNotFoundError();
        }

        return permission; 
    }

    createPermission = async (permissionData, createdBy) => {
        const requestPermission = CreatePermissionRequest(permissionData, createdBy);

        const permission = await this.rbacRepository.getPermissionByKey(requestPermission.permissionKey);
          if (permission) {
            throw new PermissionAlreadyExistsError();
        }

        const createdPermission = await this.rbacRepository.createPermission(requestPermission);
        return createdPermission;     
    }

    getAllPermissionByResource = async (resource) => {
        const permissions = await this.rbacRepository.getAllPermissionByResource(resource);
        return permissions;
    }

    deletePermission = async (permissionKey) => {
        const permission = await this.rbacRepository.deletePermission(permissionKey);
        return permission;
    }

    getAllRoles = async () => {
        const roles = await this.rbacRepository.getAllRoles();
        return roles;
    }

    getAllActiveRoles = async () => {
        const roles = await this.rbacRepository.getAllActiveRoles();
        return roles;
    }

    getAllInactiveRoles = async () => {
        const roles = await this.rbacRepository.getAllInactiveRoles();
        return roles;
    }

    getRoleByName = async (roleName) => {
        const role = await this.rbacRepository.getRoleByName(roleName);
        if (!role) {
            throw new NotFoundError(RBAC_ERROR.ROLE_NOT_FOUND, roleName);
        }
        return role; 
    }

      getRoleById = async (roleId) => {
        const role = await this.rbacRepository.getRoleById(roleId);
        if (!role) {
            throw new NotFoundError(RBAC_ERROR.ROLE_NOT_FOUND);
        }
        return role; 
    }

    createRole = async (roleData, createdBy) => {
        const createRoleRequest = CreateRoleRequest(roleData, createdBy); 
        const roleAlreadyExists = await this.rbacRepository.getRoleByName(createRoleRequest.name); 
        if (roleAlreadyExists) {
            throw new ConflictError(RBAC_ERROR.ROLE_ALREADY_EXISTS);
        }
        const role = await this.rbacRepository.createRole(createRoleRequest);
        return role; 
    }

    updateRole = async (roleId, updateData, lastUpdatedBy) => {
        const updateRequest = UpdateRoleRequest(updateData, lastUpdatedBy)
        const role = await this.rbacRepository.updateRole(roleId, updateRequest);
        if (!role) {
            throw new BadRequestError(RBAC_ERROR.ROLE_UPDATE_FAILED);
        }
        return role; 
    }

    assignPermissionToRole = async (roleId, permissions, lastUpdatedBy) => {

        const permissionIds = [];

        for (const permissionKey of permissions) {
            const permission = await this.getPermissionByKey(permissionKey);
            permissionIds.push(permission._id);
        }

        const role = await this.rbacRepository.assignPermissionToRole(
            roleId,
            permissionIds,
            lastUpdatedBy
        );

        if (!role) {
            throw new NotFoundError(RBAC_ERROR.ROLE_NOT_FOUND);
        }

        return role;
    };

    activateRole = async (roleId, lastUpdatedBy) => {
        const role = await this.rbacRepository.activateRole(roleId, lastUpdatedBy);
         if (!role) {
            throw new NotFoundError(RBAC_ERROR.ROLE_NOT_FOUND);
        }
        return role; 
    }

     deactivateRole = async (roleId, lastUpdatedBy) => {
        const role = await this.rbacRepository.deactivateRole(roleId, lastUpdatedBy);
         if (!role) {
            throw new NotFoundError(RBAC_ERROR.ROLE_NOT_FOUND);
        }
        return role; 
    }

    getAuthorizationContext = async (roleId) => {
        return this.rbacRepository.getAuthorizationContext(roleId);
    }
}