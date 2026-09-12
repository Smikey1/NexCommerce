export const UpdateUserRequest = (data) => {
    const {firstName, lastName, phone} = data;
    const updateData = {};

    if (firstName !== undefined) {
        updateData.firstName = firstName;
    }

    if (lastName !== undefined) {
        updateData.lastName = lastName;
    }

    if (phone !== undefined) {
        updateData.phone = phone; 
    }

    return updateData; 
}; 