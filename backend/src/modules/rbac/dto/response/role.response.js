export const RoleResponse = (data) => {
    if (data === null || data === undefined) {
        return {}
    } 
    const {_id, name, createdBy, description, isActive, lastUpdatedBy, permissions} = data;
    return {id: _id, name, createdBy, description, isActive, lastUpdatedBy, 
        permissions: permissions.map(p => p.permissionKey)
    }; 
} 