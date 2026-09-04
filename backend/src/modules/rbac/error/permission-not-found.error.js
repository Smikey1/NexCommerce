import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { RBAC_ERROR } from "../constants/rbac.error.js";

export class PermissionNotFoundError extends NotFoundError {
    constructor(data= {}) {
        super(RBAC_ERROR.PERMISSION_ALREADY_EXIST, data);
    }
}