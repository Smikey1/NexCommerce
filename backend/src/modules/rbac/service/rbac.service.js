import { RBAC_CONSTANT } from "../constants/rbac.constants.js";
import { Role } from "../model/role.model.js";
import { Permission } from "../model/permission.model.js";

class RbacService {
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
}

export const rbacService = new RbacService()