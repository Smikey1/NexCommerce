export const RegisterRequest = (data) => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password
    }
    
}