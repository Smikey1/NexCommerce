import { Permission } from "../modules/rbac/model/permission.model.js";
import { Env } from "../shared/env/env.js";
import mongoose from "mongoose";

export const seedPermissions = async () => {
    const permissions = [
        {
            name: "Create New User",
            resource: "user",
            action: "create",
            description: "Allows creating users"
        },

        {
            name: "Create Product",
            resource: "product",
            action: "create",
            description: "Allows creating products"
        },
        {
            name: "Create Category",
            resource: "category",
            action: "create",
            description: "Allows creating categories"
        },
        {
            name: "Update Category",
            resource: "category",
            action: "update",
            description: "Allows updating categories"
        },
        {
            name: "Read Product",
            resource: "product",
            action: "read",
            description: "Allows viewing products"
        },
        {
            name: "Update Product",
            resource: "product",
            action: "update",
            description: "Allows updating products"
        },
        {
            name: "Delete Product",
            resource: "product",
            action: "delete",
            description: "Allows deleting products"
        },
        {
            name: "Permission Create",
            resource: "permission",
            action: "create",
            description: "Allows creating new permission"
        },
         {
            name: "Permission Update",
            resource: "permission",
            action: "update",
            description: "Allows updating existing permission"
        },
        {
            name: "Permission View",
            resource: "permission",
            action: "read",
            description: "Allows viewing permission"
        },
    ];

    for (const permission of permissions) {
        await Permission.findOneAndUpdate(
            {
                resource: permission.resource,
                action: permission.action
            },
            {
                ...permission,
                permissionKey: `${permission.resource}:${permission.action}`
            },
            {
                upsert: true
            }
        );
    }
};

const run = async () => {
    try {
        await mongoose.connect(Env.MONGO_URI);

        await seedPermissions();

        console.log("Permission seeding completed");
    } catch (error) {
        console.error("Permission seeding failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

run();