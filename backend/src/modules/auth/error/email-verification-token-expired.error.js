import { BadRequestError } from "../../../shared/error/bad-request.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class EmailVerificationTokenExpiredError extends BadRequestError {
    constructor(message= AUTH_ERROR.EMAIL_VERIFICATION_TOKEN_EXPIRED, data= {}) {
        super(message, data);
    }
}