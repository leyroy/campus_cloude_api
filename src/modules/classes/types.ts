import { z } from 'zod';

export const CreateClassSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description must be less than 500 characters' })
    .nullable(),
  gradeLevel: z
    .number()
    .int()
    .min(1, { message: 'Grade level must be at least 1' })
    .max(12, { message: 'Grade level must be at most 12' }),
  courseId: z
    .string()
    .uuid({ message: 'Course ID must be a valid UUID' })
    .min(1, { message: 'Course ID is required' }),
});

export type CreateClassType = z.infer<typeof CreateClassSchema>;
export type CreateClassDto = CreateClassType & {
  updatedById: string;
  schoolId: string;
};
