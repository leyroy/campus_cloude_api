import { z } from 'zod';

export const CreateTermSchema = z.object({
  name: z.string().min(1, { message: 'Term name is required' }),
  startDate: z.date(),
  endDate: z.date(),
  isCurrent: z.boolean().default(false),
  academicYearId: z.string().min(1, { message: 'Academic year ID is required' }),
  number: z.number().int().min(1, { message: 'Term number must be a positive integer' }),
});

export type CreateTermType = z.infer<typeof CreateTermSchema>;
