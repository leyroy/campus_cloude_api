"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const SignUpSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1, "First Name is required"),
    lastName: zod_1.z.string().min(1, "Last Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 characters long"),
    isActive: zod_1.z.boolean().default(false),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: zod_1.z
        .string()
        .min(6, "Confirm Password must be at least 6 characters long"),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
