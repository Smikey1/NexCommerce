import { ConflictError } from "../../../shared/error/conflict.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class UserAlreadyExistError extends ConflictError{
    constructor(message = AUTH_ERROR.USER_EMAIL_ALREADY_EXIST, data={}){
        super(message, data)

    }
}