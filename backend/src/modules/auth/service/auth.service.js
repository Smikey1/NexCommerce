import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../shared/security/jwt.js";
import { UserUnauthorizedError } from "../error/user-unauthorized.error.js";
import { UserAccountNotActiveError } from "../error/user-not-active.error.js";
import { LoginRequest } from "../dto/request/login.request.js";
import { RegisterRequest } from "../dto/request/register.request.js";
import { UserAlreadyExistError } from "../error/user-already-exist.error.js";
import { AUTH_ERROR } from "../constant/auth.error.js";
import { compare, hash } from "../../../shared/security/password.js";
import { userEventPublisher } from "../../../messaging/events/user.event.js";
import { InvalidEmailVerifiedTokenError } from "../error/invalid-email-verification-token.error.js";
import { hashToken } from "../../../shared/security/crypto.js";
import { randomUUID } from "crypto";
import { sessionRepository } from "../repository/session.repository.js";
import { Env } from "../../../shared/env/env.js";
import { TokenType } from "../../../shared/constant/constant.js";
import { EmailNotVerifiedError } from "../error/user-email-not-verified.error.js";
import { EmailVerificationTokenExpiredError } from "../error/email-verification-token-expired.error.js"
import {ROLES} from "../../../shared/security/roles.js";

export class AuthService {
    /**
     * @param {import("../../user/service/user.service.js").UserService} userService
     * @param {import("../service/email-verification.service.js").EmailVerificationService} emailVerificationService
     * @param {import("../../rbac/service/rbac.service.js").RbacService} rbacService 
     */
    constructor(userService, emailVerificationService, rbacService) {
        this.userService = userService;
        this.emailVerificationService = emailVerificationService;
        this.rbacService = rbacService; 
    }

    async login(data, requestMetadata= {}) {
        const {email,password,phoneNumber} = LoginRequest(data); 
        const normalizedEmail = email.toLowerCase().trim();

        const user = await this.userService.findByEmailOrPhoneWithPassword(normalizedEmail, phoneNumber);

        if (!user) {
            throw new UserUnauthorizedError();
        }

        
        if (!user.isEmailVerified) {
            throw new EmailNotVerifiedError();
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect){
            throw new UserUnauthorizedError();
        };

        const sessionId = randomUUID();
        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id, sessionId);

        const refreshTokenExpiresAt = new Date(
            Date.now() + Env.REFRESH_TOKEN_EXPIRATION_MS
        );

        await sessionRepository.create({
            sessionId, 
            user: user._id,
            refreshTokenHash: hashToken(refreshToken),
            expiresAt: refreshTokenExpiresAt,
            userAgent: requestMetadata.userAgent,
            ipAddress: requestMetadata.ipAddress,
        }); 

        const safeUser = {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
           role: user.role,
        };

        return {
            user:safeUser,
            accessToken,
            refreshToken,
        };
    }

    register = async (data) => {
        const {firstName, lastName, email, phoneNumber, password} = RegisterRequest(data);
        
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPhoneNumber = phoneNumber.trim();

        const userWithEmailExist = await this.userService.findByEmail(trimmedEmail);
        const userWithPhoneNumberExist = await this.userService.findByPhone(trimmedPhoneNumber);


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

            userEventPublisher.created(userDataPayload);

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

            userEventPublisher.created(userDataPayload);

        return userWithPhoneNumberExist;
        }

        const role = await this.rbacService.getRoleByName(ROLES.USER);

        const hashPassword = await hash(password);
        
        const result = await this.userService.create({ 
            firstName, 
            lastName, 
            email: trimmedEmail, 
            phone: trimmedPhoneNumber, 
            password:hashPassword, 
            role: role._id
        }); 
        
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

        const verificationToken = await this.emailVerificationService.findValidTokenByHash(generatedHashToken);

    
        if (!verificationToken) {
            throw new InvalidEmailVerifiedTokenError();
        }

        if (verificationToken.expiresAt < new Date()) {
            throw new EmailVerificationTokenExpiredError();
        }

        const user = await this.userService.findById(
            verificationToken.user
        );

        if (!user) {
            throw new UserAccountNotActiveError();
        }

        if (user.isEmailVerified) {
            return {message: "Email is already verified."} // 
        };

        await this.userService.markEmailAsVerified(user._id);

        await this.emailVerificationService.invalidateAllByUserId(
            user._id
        );

        return {message: "Email verified successfully."} // 
    };

    refreshToken = async (refreshToken) => {
            if (!refreshToken) {
                throw new UserUnauthorizedError();
            }

            const payload = verifyRefreshToken(refreshToken);

            if (!payload ) {
                throw new UserUnauthorizedError(AUTH_ERROR.INVALID_REFRESH_TOKEN);
            }

            if (payload.type !== TokenType.REFRESH ){
                throw new UserUnauthorizedError();
            }

            const session = await sessionRepository.findActiveBySessionId(payload.sessionId);

            if (!session){
                throw new UserUnauthorizedError();
            }

            if (session.user.toString() !== payload.userId){
                 await sessionRepository.revokeBySessionId(payload.sessionId);
                throw new UserUnauthorizedError();
            }

            const incomingRefreshTokenHash = hashToken(refreshToken);

            if (incomingRefreshTokenHash !== session.refreshTokenHash) {
                /*
                    After token refresh, Your server creates new Refresh Token B and replaces the stored hash: hash(A) → hash(B)
                    in database. 

                    Now Refresh Token A is supposed to be dead. But imagine a hacker previously stole Token A and tries to use it again.
                    The JWT itself might still technically be valid because its exp hasn't passed yet.

                    But your database says:

                    Stored: hash(Token B)
                    Incoming: hash(Token A)

                    They don't match.

                    That suggests an old or potentially stolen refresh token is being reused.
                    Therefore you revoke the whole session:
                */
                await sessionRepository.revokeBySessionId(payload.sessionId);
                throw new UserUnauthorizedError();
            }

            const user = await this.userService.findById(payload.userId);

            if (!user) {
                await sessionRepository.revokeBySessionId(payload.sessionId);
                throw new UserUnauthorizedError();
            }

            if (!user.isActive) {
                await sessionRepository.revokeBySessionId(payload.sessionId);
                throw new UserAccountNotActiveError();
            }

            const newAccessToken = generateAccessToken (user._id, user.role);
             const newRefreshToken = generateRefreshToken(user._id, payload.sessionId);

            const refreshTokenExpiresAt = new Date (
                Date.now() + Env.REFRESH_TOKEN_EXPIRATION_MS
            );

            const updatedSession = await sessionRepository.updateRefreshToken(
                payload.sessionId,
                hashToken(newRefreshToken),
                refreshTokenExpiresAt
            );

            // Defensive check in case the session became
            // revoked/expired between the previous query and update
            if (!updatedSession) {
                throw new UserUnauthorizedError();
            }

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
            
        };

}