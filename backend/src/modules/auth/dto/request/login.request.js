export const LoginRequest = (loginData) =>{
return {
    email: loginData.email,
    password: loginData.password,
    phoneNumber: loginData.phoneNumber,
};
}