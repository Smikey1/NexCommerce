import { userRepository } from "../../user/repository/user.repository.js";
import { generateAccessToken, generateRefreshToken } from "../../../shared/security/jwt.js";
import { UserUnauthorizedError } from "../error/user-unauthorized.error.js";
import { UserAccountNotActiveError } from "../error/user-not-active.error.js";
import { LoginRequest } from "../dto/request/login.request.js";
import { RegisterRequest } from "../dto/request/register.request.js";
import { UserAlreadyExistError } from "../error/user-already-exist.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";
import { compare, hash } from "../../../shared/security/password.js";
import { userEventPublisher } from "../../../messaging/events/user.event.js";
import { NOTIFICATION_CHANNEL } from "../../notification/constant/notification.constant.js";
import { HTML_TEMPLATE } from "../../notification/templates/html.template.js";

class AuthService {
    async login(data) {
        const {email,password,phoneNumber} = LoginRequest(data); 
        const normalizedEmail = email.toLowerCase().trim();

        const user = await userRepository.findByEmailOrPhoneWithPassword(normalizedEmail, phoneNumber);

        if (!user) {
            throw new UserUnauthorizedError();
        }

        if (!user.isActive) {
            throw new UserAccountNotActiveError(); 
        }

        const isPasswordCorrect = compare(password, user.password);

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

    register = async (data) => {
        const {firstName, lastName, email, phoneNumber, password} = RegisterRequest(data)
        
        const trimmedEmail = email.trim();
        const userWithEmailExist = await userRepository.findByEmail(email);
        if(userWithEmailExist){
            throw new UserAlreadyExistError();
        }

        const userWithPhoneNumberExist = await userRepository.findByPhone(phoneNumber.trim())
        if(userWithPhoneNumberExist){
            throw new UserAlreadyExistError(AUTH_ERROR.USER_PHONE_NUMBER_ALREADY_EXIST);
        }

        const hashPassword = await hash(password)
        
        const result = await userRepository.create({ firstName, lastName, email, phone:phoneNumber, password:hashPassword }) 
        
        // send verify email
        const userDataPayload = {
            userId: result._id,
            firstName: result.firstName,
            email: result.email,
            phone: result.phone
        }
        userEventPublisher.created(userDataPayload)
        
        return result ;
            
    }
}



export const authService = new AuthService();