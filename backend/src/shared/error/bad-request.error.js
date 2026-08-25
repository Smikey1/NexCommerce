import { ERROR_MESSAGE } from "../constant/error-message.js";
import { HTTP_STATUS_CODE } from "../constant/httpStatusCode.js";
import { AppError } from "../utils/appError.js";

export class BadRequestError extends AppError{
    constructor(message = ERROR_MESSAGE.BAD_REQUEST, data={}){
        super(HTTP_STATUS_CODE.BAD_REQUEST, message, data )
    }
}