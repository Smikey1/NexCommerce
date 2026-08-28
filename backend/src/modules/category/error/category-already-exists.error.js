import { ConflictError } from "../../../shared/error/conflict.error.js";
import { CATEGORY_ERROR } from "../constant/category.error.js";

export class CategoryAlreadyExistsError extends ConflictError {
    constructor(data={}) {
        super(CATEGORY_ERROR.CATEGORY_ALREADY_EXIST, data);
    }
}