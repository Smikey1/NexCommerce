import { authService } from "../service/auth.service.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { success } from "../../../shared/utils/appResponse.js";
import { toLoginResponse } from "../mapper/auth.mapper.js";

class AuthController {
    login = asyncHandler(async(req, res)=>{
        const result = await authService.login(req.body);
        return res.status(200).json(success("Login Successful.", toLoginResponse(result)));
    });
}

export const authController = new AuthController();    