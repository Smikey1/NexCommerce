import { BadRequestError } from "../../../shared/error/bad-request.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";

export class InvalidEmailVerifiedTokenError extends BadRequestError {
    constructor(message = AUTH_ERROR.INVALID_EMAIL_VERIFICATION_TOKEN,
        data = {},
    ){
        super(message, data);
    }
}