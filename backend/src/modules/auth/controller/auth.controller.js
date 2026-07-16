import { authService } from "../service/auth.service.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { success } from "../../../shared/utils/appResponse.js";
import { toLoginResponse, toRegisterResponse } from "../mapper/auth.mapper.js";
import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { AUTH_SUCCESS } from "../constant/auth.success.js";

class AuthController {
    login = asyncHandler(async(req, res)=>{
        const result = await authService.login(req.body);
        return res.status(HTTP_STATUS_CODE.OK).json(success(AUTH_SUCCESS.LOGIN, toLoginResponse(result)));
    });

    register = asyncHandler(async (req, res) => {
        const result = await authService.register(req.body);
        return res.status(HTTP_STATUS_CODE.CREATED).json(success(AUTH_SUCCESS.REGISTER, toRegisterResponse(result)));
    });
}


export const authController = new AuthController();    