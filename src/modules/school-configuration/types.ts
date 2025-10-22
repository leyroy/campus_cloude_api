import {
  EducationLevel,
  PreferredContactMethod,
  PreferredContactTime,
} from '@prisma/client';
import { z } from 'zod';

const schoolProfileSchema = z.object({
  slogan: z.string().max(255),
  level: z.array(z.nativeEnum(EducationLevel)),
  name: z
    .string()
    .min(1, { message: 'School name is required' })
    .max(255)
    .nullable()
    .transform((val) => val?.trim() || null),
  description: z.string().max(1000).min(1, { message: 'Description is required' }),
  founderBio: z.string().max(2000).min(1, { message: 'Founder bio is required' }),
  contactEmail: z.string().email().min(1, { message: 'Contact email is required' }),
  contactPhone: z.string().max(20).min(1, { message: 'Contact phone is required' }),
  motto: z.string().max(255).min(1, { message: 'Motto is required' }),
  founderName: z.string().max(255).min(1, { message: 'Founder name is required' }),
  licenseNumber: z.string().max(100).min(1, { message: 'License number is required' }),
  adminNote: z.string().max(1000).min(1, { message: 'Admin note is required' }),
});

export type schoolProfileData = {
  slogan: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  motto: string;
  founderName: string;
  licenseNumber: string;
  adminNote: string;
  level: EducationLevel[];
};

const ownerSchema = z.object({
  preferredContactMethod: z.array(z.nativeEnum(PreferredContactMethod)),
  preferredContactTime: z.array(z.nativeEnum(PreferredContactTime)),
  educationBackground: z.string(),
  isActive: z.boolean().default(false),
  professionalExperience: z.string(),
  currentPosition: z.string(),
  previousPositions: z.string(),
  yearsInEducation: z
    .number()
    .min(1, { message: 'Years in education must be at least 1' }),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  region: z.string().min(1, { message: 'Region is required' }),
  postalCode: z.string().regex(/^[A-Z]{2,3}-\d{3,4}-?\d{0,4}?$/, {
    message: 'Postal code must be in format GA-123-4567',
  }),
  country: z.string().default('Ghana'),
});

export const SchoolConfigurationSchema = z.object({
  schoolProfile: schoolProfileSchema,
  owner: ownerSchema,
  schoolAddress: addressSchema,
});

export type CreateOwnerDto = z.infer<typeof ownerSchema>;
export type CreateAddressDto = z.infer<typeof addressSchema>;
export type CreateSchoolProfileDto = z.infer<typeof schoolProfileSchema>;
export type CreateSchoolConfigurationDto = z.infer<typeof SchoolConfigurationSchema>;
