import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { success } from "../../../shared/utils/appResponse.js";
import { toLoginResponse, toRegisterResponse } from "../mapper/auth.mapper.js";
import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { AUTH_SUCCESS } from "../constant/auth.success.js";
import { Env } from "../../../shared/env/env.js";

export class AuthController {
    /**
     * @param {import("../service/auth.service.js").AuthService} authService
     */
    constructor(authService) {
        this.authService = authService;
    }
    login = asyncHandler(async(req, res)=>{
        const requestMetadata = {
            ipAddress: req.ip,
            userAgent: req.get("user-agent"),
        }

        const result = await this.authService.login(
            req.body, 
            requestMetadata
        );

        // Refresh token goes into HttpOnly cookie
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,

            // Only send through HTTPS in production
            secure: Env.NODE_ENV === "production",

            // Helps protect against CSRF
            sameSite: "lax",

            // 7 days 
            maxAge: Env.REFRESH_TOKEN_EXPIRATION_MS, 

            // Cookie is available for auth routes
            path: "/api/v1/auth",
        });

        // Refresh token is NOT returned in JSON
        const responseData = {
            user : result.user,
            accessToken: result.accessToken,
        }

        return res.status(HTTP_STATUS_CODE.OK).json(success(AUTH_SUCCESS.LOGIN, toLoginResponse(responseData)));
    });

    refreshAccessToken = asyncHandler(
        async(req, res) => {
            const refreshToken = req.cookies?.refreshToken;
            const result = await this.authService.refreshToken(refreshToken);

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: Env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: Env.REFRESH_TOKEN_EXPIRATION_MS,
                path: "/api/v1/auth",
            });

            return res.status(HTTP_STATUS_CODE.OK).json({...success(AUTH_SUCCESS.TOKEN_REFRESH_SUCCESSFUL), accessToken: result.accessToken})
        }
    )

    register = asyncHandler(async (req, res) => {
        const result = await this.authService.register(req.body);
        
        return res.status(HTTP_STATUS_CODE.CREATED).json(success(AUTH_SUCCESS.REGISTER, toRegisterResponse(result)));
    });

    verifyEmail = asyncHandler(async (req, res) => {
        const { token } = req.query;
        await this.authService.verifyEmail(token);
        return res.status(HTTP_STATUS_CODE.OK).json(success(AUTH_SUCCESS.EMAIL_VERIFIED));
    });
}