import { ForbiddenError } from "../../../shared/error/forbidden.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class UserAccountNotActiveError extends ForbiddenError{
    constructor(data={}){
        super(AUTH_ERROR.ACCOUNT_NOT_ACTIVE, data);
    }
}