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
import { InvalidEmailVerifiedTokenError } from "../error/invalid-email-verification-token.error.js";
import {emailVerificationRepository} from "../repository/email-verification.repository.js";
import {hashToken} from "../../../shared/security/crypto.js";

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
        const {firstName, lastName, email, phoneNumber, password} = RegisterRequest(data);
        
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPhoneNumber = phoneNumber.trim();

        const userWithEmailExist = await userRepository.findByEmail(trimmedEmail);
        const userWithPhoneNumberExist = await userRepository.findByPhone(trimmedPhoneNumber);


        if(userWithEmailExist){

            if (userWithEmailExist.isEmailVerified){
                 throw new UserAlreadyExistError();
            }

               // User exists but is NOT verified
            const userDataPayload = {
                userId: userWithEmailExist._id,
                firstName: userWithEmailExist.firstName,
                email: userWithEmailExist.email,
                phone: userWithEmailExist.phone
             };

            await userEventPublisher.created(userDataPayload);

        return userWithEmailExist;
        }

        if(userWithPhoneNumberExist){

            if (userWithPhoneNumberExist.isPhoneNumberVerified){
                 throw new UserAlreadyExistError(AUTH_ERROR.USER_PHONE_NUMBER_ALREADY_EXIST);
            };

            // User exists but is NOT verified
            const userDataPayload = {
                userId: userWithPhoneNumberExist._id,
                firstName: userWithPhoneNumberExist.firstName,
                email: userWithPhoneNumberExist.email,
                phone: userWithPhoneNumberExist.phone
            };

            await userEventPublisher.created(userDataPayload);

        return userWithPhoneNumberExist;
        }

        const hashPassword = await hash(password);
        
        const result = await userRepository.create({ 
            firstName, 
            lastName, 
            email: trimmedEmail, 
            phone: trimmedPhoneNumber, 
            password:hashPassword }); 
        
        // http://localhost:5000/verify-email?token=1234
        // send verify email
        const userDataPayload = {
            userId: result._id,
            firstName: result.firstName,
            email: result.email,
            phone: result.phone
        }
        userEventPublisher.created(userDataPayload);
        
        return result ;
            
    }
    

    verifyEmail = async(rawToken) => {
        
        if (!rawToken) {
            throw new InvalidEmailVerifiedTokenError();
        }

        const generatedHashToken = hashToken(rawToken);

        const verificationToken = await emailVerificationRepository.findValidByTokenHash(generatedHashToken);

    
        if (!verificationToken) {
            throw new InvalidEmailVerifiedTokenError();
        }

        if (verificationToken.expiresAt < new Date()) {
            throw new EmailVerificationTokenExpiredError();
        }

        const user = await userRepository.findById(
            verificationToken.user
        );

        if (!user) {
            throw new UserAccountNotActiveError();
        }

        if (user.isEmailVerified) {
            return {message: "Email is already verified."} // 
        };

        await userRepository.markEmailAsVerified(user._id);

        await emailVerificationRepository.invalidateAllByUserId(
            user._id
        );

        return {message: "Email verified successfully."} // 
    };

}



export const authService = new AuthService();