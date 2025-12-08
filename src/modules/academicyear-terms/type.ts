import { AcademicYearStatus } from '@prisma/client';
import { z } from 'zod';

// Term Schema
export const termSchema = z
  .object({
    number: z.number().int().min(1).max(3),
    name: z.enum(['First Term', 'Second Term', 'Third Term']),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    isCurrent: z.boolean().default(false),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });

// Academic Year Schema
export const academicYearSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Academic year name is required')
      .regex(/^\d{4}\/\d{4}$/, 'Format must be YYYY/YYYY (e.g., 2024/2025)'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    status: z.nativeEnum(AcademicYearStatus).default(AcademicYearStatus.INACTIVE),
    terms: z.array(termSchema).max(3),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
  .refine(
    (data) => {
      const [startYear, endYear] = data.name.split('/').map(Number);
      return endYear === startYear + 1;
    },
    {
      message: 'Academic year must span consecutive years (e.g., 2024/2025)',
      path: ['name'],
    }
  );

// Update Academic Year Schema
export const updateAcademicYearSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Academic year name is required')
      .regex(/^\d{4}\/\d{4}$/, 'Format must be YYYY/YYYY (e.g., 2024/2025)')
      .optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.nativeEnum(AcademicYearStatus).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

// Update Term Schema
export const updateTermSchema = z
  .object({
    name: z.enum(['First Term', 'Second Term', 'Third Term']).optional(),
    isCurrent: z.boolean().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

// Types exported from schemas
export type Term = z.infer<typeof termSchema>;
export type AcademicYear = z.infer<typeof academicYearSchema>;
export type UpdateAcademicYearInput = z.infer<typeof updateAcademicYearSchema>;
export type UpdateTermInput = z.infer<typeof updateTermSchema>;
