import { AccountStatus, EducationLevel, Gender, RelationshipType } from '@prisma/client';
import { z } from 'zod';

export const studentSchema = z.object({
  status: z.nativeEnum(AccountStatus).default('PENDING'),
  schoolId: z.string(),
  studentPhone: z.string().optional(),
  studentEmail: z.string().email().optional(),
  level: z.nativeEnum(EducationLevel),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  gender: z.nativeEnum(Gender),
  religion: z.string().optional(),
  classId: z.string().optional(),
  departmentId: z.string().optional(),
  dateOfBirth: z.coerce.date(), // coerce handles string -> Date
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
  indexNumber: z.string().min(1, 'Index number is required'),
});

export const guardianSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  relationship: z.nativeEnum(RelationshipType),
  email: z.string().email(),
  occupation: z.string(),
  phone: z.string().min(1, { message: 'Guardian phone number is required' }),
  address: z.string().min(1, 'Address is required'),
});

export const combindedStudentGuardianSchema = z.object({
  studentInformation: studentSchema,
  guardianInformation: z.array(guardianSchema),
});

export type StudentDto = z.infer<typeof studentSchema>;
export type CombindedStudent = z.infer<typeof combindedStudentGuardianSchema>;
export type StudentUpdateDto = Partial<StudentDto>;
export type GauidainUpdateDto = Partial<z.infer<typeof guardianSchema>>;
