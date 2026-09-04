import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { UnauthorizedError } from "../../../shared/error/unauthorized.error.js";
import { success } from "../../../shared/utils/appResponse.js";
import { RBAC_SUCCESS } from "../constants/rbac.success.js";
import { UpdateRoleRequest } from "../dto/requests/role.requests.js";
import {toPermissionResponse} from "../mapper/permission.mapper.js"
import { toRoleResponse } from "../mapper/role.mapper.js";
export class RbacController {
    /**
     * @param {import("../service/rbac.service.js").RbacService} rbacService
     */
    constructor(rbacService){
        this.rbacService = rbacService;
    }
    createPermission = async (req,res) => {
        const userId = req.user?.id
        if (!userId) {
            throw new UnauthorizedError();
        }
        const permission = await this.rbacService.createPermission(req.body, userId);
        return res.status(HTTP_STATUS_CODE.CREATED).json(success(RBAC_SUCCESS.PERMISSION_CREATED, toPermissionResponse(permission)))
    }

    getAllPermissions = async (req,res) => {
        const permissions = await this.rbacService.getAllPermissions();
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.PERMISSION_GET_ALL, permissions.map(p => toPermissionResponse(p))))
    }

    getAllPermissionByResource = async (req,res) => {
        const resource = req.params.resource;
        const permissions = await this.rbacService.getAllPermissionByResource(resource);
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.PERMISSION_GET_ALL, permissions.map(p => toPermissionResponse(p))))
    }

    getPermissionByKey = async (req,res) => {
        const {permissionKey} = req.body;
        const permission = await this.rbacService.getPermissionByKey(permissionKey)
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.PERMISSION_GET, toPermissionResponse(permission)))
    }

    getAllRoles = async (req, res) => {
        const roles = await this.rbacService.getAllRoles();
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.ROLE_GET_ALL, roles.map(role => toRoleResponse(role))))
    }

    getAllActiveRoles = async (req, res) => {
        const roles = await this.rbacService.getAllActiveRoles();
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.ROLE_GET_ALL_ACTIVE, roles.map(role => toRoleResponse(role))))
    }

     getAllInactiveRoles = async (req, res) => {
        const roles = await this.rbacService.getAllInactiveRoles();
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.ROLE_GET_ALL_INACTIVE, roles.map(role => toRoleResponse(role))))
    }

    getRoleByName = async (req, res) => {
        const {roleName} = req.query;
        const role = await this.rbacService.getRoleByName(roleName);
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.ROLE_GET, toRoleResponse(role)))
    }

      getRoleById = async (req, res) => {
        const {roleId} = req.params;
        const role = await this.rbacService.getRoleById(roleId);
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.ROLE_GET, toRoleResponse(role)))
    }

    createRole = async (req, res) => {
        const userId = req.user?.id;
        if (!userId) {
            throw new UnauthorizedError();
        } // if garna parxa ki nai you will search.
        const role = await this.rbacService.createRole(req.body, userId);
        return res.status(HTTP_STATUS_CODE.CREATED).json(success(RBAC_SUCCESS.ROLE_CREATED, toRoleResponse(role)))
    }

    updateRole = async (req,res) => {
       const roleId = req.params.roleId; 
       const updateRequest = UpdateRoleRequest(req.body, req.user.id)
        // if garna parxa ki nai you will search.
       const role = await this.rbacService.updateRole(roleId, updateRequest);
       return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(RBAC_SUCCESS.ROLE_UPDATED, toRoleResponse(role)))
    }

    assignPermissionToRole = async (req, res) => {
        const roleId = req.params.roleId;
        const permissions = req.body.permissions;
        const role = await this.rbacService.assignPermissionToRole(roleId, permissions, req.user.id);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(RBAC_SUCCESS.ASSIGN_PERMISSIONS_TO_ROLE, toRoleResponse(role)))
    }

    activateRole = async (req, res) => {
        const roleId = req.params.roleId;
        const role = await this.rbacService.activateRole(roleId, req.user.id);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(RBAC_SUCCESS.ACTIVATE_ROLE))
    }

     deactivateRole = async (req, res) => {
        const roleId = req.params.roleId;
        const role = await this.rbacService.deactivateRole(roleId, req.user.id);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(RBAC_SUCCESS.DEACTIVATE_ROLE))
    }

    getAuthorizationContext = async (req, res) => {
        const roleId = req.body;
        const role = this.rbacService.getAuthorizationContext(roleId);
        return res.status(HTTP_STATUS_CODE.OK).json(success(RBAC_SUCCESS.AUTH_CONTEXT));
    }
}