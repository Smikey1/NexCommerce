import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const loginSchema = z.object({
    body: z.object({
        email: z
            .string()
            .trim()
            .email("Please enter a valid email address"),

        password: z
            .string()
            .min(1, "Password is required"),
    }),
});

export const registerSchema = z.object({
    body: z.object({
        firstName: z
        .string()
        .min(2, "First Name must be at least 2 characters")
        .max(30, "First Name cannot exceed 30 characters"),
        lastName: z
        .string()
        .min(2, "Last Name must be at least 2 characters")
        .max(30, "Last Name cannot exceed 30 characters"),
        
        email: z
            .string()
            .trim()
            .email("Please enter a valid email address"),
        
        phoneNumber: z
        .string()
        .refine(isValidPhoneNumber, {
        message: "Invalid phone number"
        }),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        

    })
})