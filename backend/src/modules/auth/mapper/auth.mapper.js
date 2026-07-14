import { LoginResponse } from "../dto/response/login.response.js"

export const toLoginResponse = (data) => {
    return LoginResponse(data)
}