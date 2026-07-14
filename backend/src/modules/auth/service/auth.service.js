import bcrypt from "bcryptjs";
import { userRepository } from "../../user/repository/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../../../shared/utils/token.js";
import { UserUnauthorizedError } from "../error/user-unauthorized.error.js";
import { UserAccountNotActiveError } from "../error/user-not-active.error.js";
import { LoginRequest } from "../dto/request/login.request.js";

class AuthService {
    async login(data) {
        const {email,password,phoneNumber} = LoginRequest(data); 
        const normalizedEmail = email.toLowerCase().trim();

        const user = await userRepository.findByEmailWithPassword(normalizedEmail);

        if (!user) {
            throw new UserUnauthorizedError();
        }

        if (!user.isActive) {
            throw new UserAccountNotActiveError(); 
        }

        const isPasswordCorrect = await bcrypt.compare(
           password,
            user.password
        );

        if (!isPasswordCorrect){
            throw new UserUnauthorizedError();
        };

        const payload = {
            userId: user._id,
            role: user.role,
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}

export const authService = new AuthService();