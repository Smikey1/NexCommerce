export const PermissionResponse = (data) => {
    if (data === null || data === undefined) {
        return {}
    } 
    const {_id, name, resource, action, permissionKey, createdBy, description} = data;
    return {id:_id, name, resource, action, permissionKey, createdBy, description};
}