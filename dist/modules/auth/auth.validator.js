"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.verificationEmailSchema = exports.loginSchema = exports.RegisterSchema = exports.verificationCodeSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z.string().trim().email().min(1).max(255);
exports.passwordSchema = zod_1.z.string().trim().min(6).max(255);
exports.verificationCodeSchema = zod_1.z.string().trim().min(1).max(25);
exports.RegisterSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().trim().min(1, { message: 'First name is required' }).max(255),
    lastName: zod_1.z.string().trim().min(1, { message: 'Last name is required' }).max(255),
    email: exports.emailSchema,
    phone: zod_1.z.string().trim().min(1, { message: 'Phone number is required' }).max(15),
    password: exports.passwordSchema,
    confirmPassword: exports.passwordSchema,
})
    .refine((val) => val.password === val.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
});
exports.loginSchema = zod_1.z
    .object({
    email: zod_1.z.string().trim().email().max(255).optional(),
    password: exports.passwordSchema,
    phone: zod_1.z.string().trim().max(15).optional(),
})
    .refine((data) => data.email || data.phone, {
    message: 'Use either your email or phone to log in',
});
exports.verificationEmailSchema = zod_1.z.object({
    code: exports.verificationCodeSchema,
});
exports.resetPasswordSchema = zod_1.z.object({
    password: exports.passwordSchema,
    verificationCode: exports.verificationCodeSchema,
});
