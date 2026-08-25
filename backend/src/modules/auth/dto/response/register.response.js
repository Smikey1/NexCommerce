export const RegisterResponse = (responseData) => {    
return {
    id:responseData.id,
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    email: responseData.email,
}
}