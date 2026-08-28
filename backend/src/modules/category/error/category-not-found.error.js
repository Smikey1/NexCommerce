import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { CATEGORY_ERROR } from "../constant/category.error.js";

export class CategoryNotFoundError extends NotFoundError {
    constructor(data={}) {
        super(CATEGORY_ERROR.CATEGORY_NOT_FOUND, data);
    }
}