export const UserResponse = (data) => {
    const {firstName, lastName, email, phone, isEmailVerified, role, _id} = data; 
    return {
        id: _id, 
        firstName,
        lastName,
        email, 
        phone, 
        isEmailVerified,
        role: {
            id: role._id,
            name: role.name
        }
    }
}