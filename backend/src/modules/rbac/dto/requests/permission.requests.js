export const CreatePermissionRequest = (permissionData, createdBy) => {
    const {name, resource, description, action} = permissionData;
    return {
        name,
        resource,
        description,
        action,
        permissionKey: `${resource}:${action}`,
        createdBy
    };
}