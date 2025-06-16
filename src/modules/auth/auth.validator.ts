import { z } from 'zod';

export const emailSchema = z.string().trim().email().min(1).max(255);
export const passwordSchema = z.string().trim().min(6).max(255);
export const verificationCodeSchema = z.string().trim().min(1).max(25);

export const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'First name is required' }).max(255),
    lastName: z.string().trim().min(1, { message: 'Last name is required' }).max(255),
    email: emailSchema,
    phone: z.string().trim().min(1, { message: 'Phone number is required' }).max(15),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z
  .object({
    email: z.string().trim().email().max(255).optional(),
    password: passwordSchema,
    phone: z.string().trim().max(15).optional(),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Use either your email or phone to log in',
  });

export const verificationEmailSchema = z.object({
  code: verificationCodeSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

export type CreateUserDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type VerificationEmailDto = z.infer<typeof verificationEmailSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
