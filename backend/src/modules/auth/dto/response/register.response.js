export const RegisterResponse = (responseData) => {
return {
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    email: responseData.email,
}
}