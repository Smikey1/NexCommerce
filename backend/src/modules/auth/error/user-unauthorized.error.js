import { UnauthorizedError } from "../../../shared/error/unauthorized.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class UserUnauthorizedError extends UnauthorizedError{
    constructor(message = AUTH_ERROR.INVALID_EMAIL_OR_PASSWORD, data={}){
        super(message, data);
    }
}