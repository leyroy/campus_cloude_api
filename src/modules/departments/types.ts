import { z } from 'zod';
export const CreateDepartmentSchema = z.object({
  name: z.string().min(1, { message: 'Department name is required' }),
  description: z
    .string()
    .min(1, { message: 'Department description is required' })
    .transform((val) => (val === '' ? null : val)),
});

export type CreateDepartmentType = z.infer<typeof CreateDepartmentSchema>;
