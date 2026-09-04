import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { success } from "../../../shared/utils/appResponse.js";
import { USER_SUCCESS } from "../constant/user.success.js";

export class UserController {
    /**
     * @param {import("../service/user.service.js").UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    assignRoleToUser = async (req,res) => {
        const {roleId, userId} = req.body;  
        const user = await this.userService.assignRoleToUser(roleId, userId);
        return res.status(HTTP_STATUS_CODE.NO_CONTENT).json(success(USER_SUCCESS.USER_ROLE_UPDATED))
    }
}