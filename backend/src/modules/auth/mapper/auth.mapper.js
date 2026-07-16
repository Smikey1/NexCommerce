import { LoginResponse } from "../dto/response/login.response.js"
import { RegisterResponse } from "../dto/response/register.response.js"

export const toLoginResponse = (data) => {
    return LoginResponse(data);
}

export const toRegisterResponse = (data) => {
    return RegisterResponse(data);
}