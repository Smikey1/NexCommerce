import { ERROR_MESSAGE } from "../constant/error-message.js";
import { HTTP_STATUS_CODE } from "../constant/httpStatusCode.js";
import {AppError} from "../utils/appError.js";

export class NotFoundError extends AppError{
  constructor(message=ERROR_MESSAGE.NOT_FOUND, data={}){
  super(HTTP_STATUS_CODE.NOT_FOUND, message, data); 
  }
}