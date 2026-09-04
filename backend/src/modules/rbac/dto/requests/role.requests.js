export const CreateRoleRequest = (data, createdBy) => {
    const {name, description, permissions} = data;
    return {
        name, 
        description,
        permissions,
        isActive: true,
        createdBy,
        lastUpdatedBy: createdBy
    };
}

export const UpdateRoleRequest = (data, lastUpdatedBy) => {
    const {name, description} = data; 
    return {
        name,
        description,
        lastUpdatedBy
    }
}