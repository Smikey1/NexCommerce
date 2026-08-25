import { ForbiddenError } from "../../../shared/error/forbidden.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class EmailNotVerifiedError extends ForbiddenError {
    constructor(data ={}) {
        super(AUTH_ERROR.USER_EMAIL_NOT_VERIFIED, data)
    }
}
