import { ERROR_MESSAGE } from "../constant/error-message.js";
import { HTTP_STATUS_CODE } from "../constant/httpStatusCode.js";
import { AppError } from "../utils/appError.js";

export class ForbiddenError extends AppError{
    constructor(message=ERROR_MESSAGE.FORBIDDEN, data={}){
        super(HTTP_STATUS_CODE.FORBIDDEN, message, data); 
    }
}