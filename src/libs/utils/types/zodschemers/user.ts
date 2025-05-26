import z from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters long'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).refine((data)=> data.password === data.confirmPassword,{
  message: 'Passwords do not match',
})

export type UserDto = z.infer<typeof UserSchema>;
