"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default
    .object({
    firstName: zod_1.default.string().min(1, "First Name is required"),
    lastName: zod_1.default.string().min(1, "Last Name is required"),
    email: zod_1.default.string().email("Invalid email address"),
    phone: zod_1.default
        .string()
        .min(10, "Phone number must be at least 10 characters long"),
    isActive: zod_1.default.boolean().default(false),
    password: zod_1.default.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: zod_1.default
        .string()
        .min(6, "Confirm Password must be at least 6 characters long"),
    createdAt: zod_1.default.date().optional(),
    updatedAt: zod_1.default.date().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
