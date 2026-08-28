import mongoose from "mongoose";
import { User } from "../modules/user/model/user.model.js"
import { Role } from "../modules/rbac/model/role.model.js"
import { ROLES } from "../shared/security/roles.js";
import { NotFoundError } from "../shared/error/not-found.error.js";
import { ERROR_MESSAGE } from "../shared/constant/error-message.js";
import { Env } from "../shared/env/env.js";
import { ConflictError } from "../shared/error/conflict.error.js";
import { BadRequestError } from "../shared/error/bad-request.error.js";
import { hash } from "../shared/security/password.js";
import { userEventPublisher } from "../messaging/events/user.event.js"
import { closeRabbitMQ, connectRabbitMQ } from "../messaging/rabbitmq/connection.js"

const createSuperAdmin = async () => {
    try {
        await connectRabbitMQ()
        await mongoose.connect(Env.MONGO_URI);

        const email = Env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
        const password = Env.SUPER_ADMIN_PASSWORD;
        const phone = Env.SUPER_ADMIN_PHONE;

        if (!email || !password) {
            throw new BadRequestError(
                ERROR_MESSAGE.SUPER_ADMIN_EMAIL_PASSWORD_REQUIRED
            );
        }

        const role = await Role.findOne({
            name: ROLES.SUPER_ADMIN,
            isActive: true
        });

        if (!role) {
            throw new NotFoundError(
                ERROR_MESSAGE.SUPER_ADMIN_ROLE_NOT_FOUND
            );
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ConflictError(
                ERROR_MESSAGE.SUPER_ADMIN_ALREADY_EXIST
            );
        }

        const hashedPassword = await hash(password);

        const user = await User.create({
            firstName: "System",
            lastName: "Administrator",
            email,
            phone,
            password: hashedPassword,
            role: role._id,
            isEmailVerified: false,
            isPhoneNumberVerified: false
        });

        
        userEventPublisher.created({
            userId: user._id,
            firstName: user.firstName,
            email: user.email,
            phone: user.phone
        });

        console.log(
            `Super admin created successfully: ${email}`
        );

        console.log(
            "Verification email has been requested."
        );
    } catch (error) {
        console.error(
            "Failed to create super admin:",
            error
        );
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        await closeRabbitMQ()
    }
};

createSuperAdmin();