import { Role } from "../model/role.model.js";
import { Permission } from "../model/permission.model.js";
import { RBAC_CONSTANT } from "../constants/rbac.constants.js";

export class RbacRepository {
    getAllPermission = async () => {
        const permissions = await Permission.find();
        return permissions;
    }

    getPermissionByKey = async (permissionKey) => {
        const permission = await Permission.findOne({permissionKey});
        return permission;
    }

    createPermission = async (permissionData) => {
        const permission = await Permission.create(permissionData);
        return permission;
    }

    getAllPermissionByResource = async (resource) => {
        const permissions = await Permission.find({resource});
        return permissions;
    }

    deletePermission = async (permissionKey) => {
        const permission = await Permission.deleteOne({permissionKey});
        return permission;
    }

      getAuthorizationContext = async (roleId) => {
        const role = await Role
            .findById(roleId)
            .populate({
                path: RBAC_CONSTANT.PERMISSION_MODEL.toLowerCase(),
                select: "permissionKey"
            })
            .lean()

        if (!role || !role.isActive) {
            return [];
        }

        return {
            roleId: role._id,
            roleName: role.name,
            permissions: role.permissions.map( permission => permission.permissionKey )
        };
    };

    getAllRoles = async () => {
        const roles = await Role.find();
        return roles;
    }

    getAllActiveRoles = async () => {
        const roles = await Role.find({isActive:true});
        return roles;
    }

    getAllInactiveRoles = async () => {
        const roles = await Role.find({isActive:false}, {new:true});
        return roles; 
    }

    getRoleByName = async (roleName) => {
        const role = await Role.findOne({name: roleName}).populate("permissions");
        return role;
    }

    getRoleById = async (roleId) => {
        const role = await Role.findById(roleId);
        return role;
    }

     createRole = async (roleData) => {
        const role = await Role.create(roleData);
        return role; 
    }

    updateRole = async (roleId, updateData) => {
        const role = await Role.findByIdAndUpdate(roleId, {updateData}, {new:true, runValidators:true});
        return role; 

    }

    assignPermissionToRole = async (roleId, permissions, lastUpdatedBy) => {
        const role = await Role.findById(roleId);
        
        if (!role) return;

        for (const permission of permissions) {
            if (!role.permissions.includes(permission)) {
                role.permissions.push(permission);
            }
        }

        role.lastUpdatedBy = lastUpdatedBy; 

        await role.save();

        return role;
    }

    activateRole = async (roleId, lastUpdatedBy) => {
        const role = await Role.findByIdAndUpdate(roleId, {isActive: true, lastUpdatedBy}, {new:true});
        return role; 
    }

    deactivateRole = async (roleId, lastUpdatedBy) => {
        const role = await Role.findByIdAndUpdate(roleId, {isActive: false, lastUpdatedBy}, {new:true});
        return role; 
    }
    
};