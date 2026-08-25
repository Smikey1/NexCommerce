import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class UserNotFoundError extends NotFoundError{
    constructor(data={}){
        super(AUTH_ERROR.USER_NOT_FOUND, data);
    }
}