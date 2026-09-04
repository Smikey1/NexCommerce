import { ConflictError } from "../../../shared/error/conflict.error.js";
import { RBAC_ERROR } from "../constants/rbac.error.js";

export class PermissionAlreadyExistsError extends ConflictError {
    constructor(data= {}) {
        super(RBAC_ERROR.PERMISSION_ALREADY_EXIST, data);
    }
}