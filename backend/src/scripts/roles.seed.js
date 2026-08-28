import { Role } from "../modules/rbac/model/role.model.js";
import { Permission } from "../modules/rbac/model/permission.model.js";
import { ROLES, ROLE_PERMISSIONS } from "../shared/security/roles.js";
import { NotFoundError } from "../shared/error/not-found.error.js";
import { ERROR_MESSAGE } from "../shared/constant/error-message.js";
import { Env } from "../shared/env/env.js";
import mongoose from "mongoose";

const seedRoles = async () => {
    const permissions = await Permission.find({}, "_id permissionKey");

    const permissionMap = new Map(
        permissions.map(permission => [
            permission.permissionKey,
            permission._id
        ])
    );

    const getPermissions = (permissionKeys) => {
        return permissionKeys.map(permissionKey => {
            const permission = permissionMap.get(permissionKey);

            if (!permission) {
                throw new NotFoundError(
                    ERROR_MESSAGE.PERMISSION_NOT_FOUND,
                    permissionKey
                );
            }

            return permission._id;
        });
    };


    await Role.findOneAndUpdate(
        { name: ROLES.SUPER_ADMIN },
        {
            name: ROLES.SUPER_ADMIN,
            description: "Full system access",
            permissions: permissions.map(permission => permission._id),
        },
        {
            upsert: true
        }
    );

    await Role.findOneAndUpdate(
        { name: ROLES.ADMIN },
        {
            name: ROLES.ADMIN,
            description: "System administrator",
            permissions: getPermissions(ROLE_PERMISSIONS[ROLES.SUPER_ADMIN]),
        },
        {
            upsert: true
        }
    );

    await Role.findOneAndUpdate(
        { name: ROLES.USER },
        {
            name: ROLES.USER,
            description: "Regular user",
            permissions: getPermissions(ROLE_PERMISSIONS[ROLES.USER]),
        },
        {
            upsert: true
        }
    );
};

const run = async () => {
    try {
        await mongoose.connect(Env.MONGO_URI);

        await seedRoles();

        console.log("Role seeding completed");
    } catch (error) {
        console.error("Role seeding failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

run();