import { EducationLevel } from '@prisma/client';
import { z } from 'zod';

// Education Level Enum

// Base Class Creation Schema
export const createClassSchema = z
  .object({
    name: z.string().min(1, 'Class name is required').max(100, 'Class name is too long'),

    description: z.string().max(500, 'Description is too long').optional(),
    capacity: z
      .number()
      .int('Capacity must be an integer')
      .min(1, 'Capacity must be at least 1')
      .max(500, 'Capacity cannot exceed 500'),

    level: z.nativeEnum(EducationLevel),
    departmentId: z.string().cuid('Invalid department ID format').optional().nullable(),
  })
  .refine(
    (data) => {
      // SHS classes MUST have a department
      if (data.level === 'SHS') {
        return data.departmentId !== null && data.departmentId !== undefined;
      }
      return true;
    },
    {
      message: 'SHS classes must have a department',
      path: ['departmentId'],
    }
  )
  .refine(
    (data) => {
      // Non-SHS classes should NOT have a department
      if (data.level !== 'SHS' && data.departmentId) {
        return false;
      }
      return true;
    },
    {
      message: 'Only SHS classes can have a department',
      path: ['departmentId'],
    }
  );

// Schema for creating multiple class groups (A, B, C, etc.)
// export const createClassGroupsSchema = z
//   .object({
//     baseName: z.string().min(1, 'Base name is required').max(50, 'Base name is too long'),

//     description: z.string().max(500, 'Description is too long').optional(),

//     gradeLevel: z
//       .number()
//       .int('Grade level must be an integer')
//       .min(1, 'Grade level must be at least 1')
//       .max(20, 'Grade level cannot exceed 20'),

//     capacity: z
//       .number()
//       .int('Capacity must be an integer')
//       .min(1, 'Capacity must be at least 1')
//       .max(500, 'Capacity cannot exceed 500'),

//     level: z.nativeEnum(EducationLevel),

//     departmentId: z.string().cuid('Invalid department ID format').optional().nullable(),

//     groupCount: z
//       .number()
//       .int('Group count must be an integer')
//       .min(2, 'Must create at least 2 groups')
//       .max(26, 'Cannot create more than 26 groups (A-Z)'),

//     schoolId: z.string().cuid('Invalid school ID'),

//     createdById: z.string().cuid('Invalid user ID'),

//     cloneSubjects: z.boolean().default(false),

//     subjectTemplateIds: z.array(z.string().cuid()).optional(),
//   })
//   .refine(
//     (data) => {
//       if (data.level === 'SHS') {
//         return data.departmentId !== null && data.departmentId !== undefined;
//       }
//       return true;
//     },
//     {
//       message: 'SHS class groups must have a department',
//       path: ['departmentId'],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.level !== 'SHS' && data.departmentId) {
//         return false;
//       }
//       return true;
//     },
//     {
//       message: 'Only SHS class groups can have a department',
//       path: ['departmentId'],
//     }
//   );

// Type exports for TypeScript
export type CreateClassInput = z.infer<typeof createClassSchema>;
// export type CreateClassGroupsInput = z.infer<typeof createClassGroupsSchema>;
