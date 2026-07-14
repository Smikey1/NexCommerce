import { ERROR_MESSAGE } from "../constant/error-message.js";
import { HTTP_STATUS_CODE } from "../constant/httpStatusCode.js";
import { AppError } from "../utils/appError.js";

export class UnauthorizedError extends AppError{
    constructor(message=ERROR_MESSAGE.UNAUTHORIZED, data={}){
        super(HTTP_STATUS_CODE.UNAUTHORIZED,message, data);
    }
}