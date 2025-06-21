import { z } from 'zod';

const schoolProfileSchema = z.object({
  schoolId: z.string().uuid(),
  slogan: z.string().max(255),
  about: z.string().max(1000),
  description: z.string().max(1000),
  contactEmail: z.string().email(),
  contactPhone: z.string().max(20),
  establishedAt: z.date().optional(),
  motto: z.string().max(255),
  colors: z.string().max(255).optional(),
  principalName: z.string().max(255),
  principalBio: z.string().max(1000),
  founderName: z.string().max(255),
  founderBio: z.string().max(1000).optional(),
  licenseNumber: z.string().max(100).optional(),
  adminNote: z.string().max(1000).optional(),
  updatedById: z.string().uuid(),
});

const ownerSchema = z.object({
  preferredContactMethod: z.string().default('EMAIL'),
  preferredContactTime: z.string().default('MORNING'),
  educationBackground: z.string(),
  schoolId: z.string().uuid(),
  isActive: z.boolean().default(false),
  professionalExperience: z.string(),
  currentPosition: z.string(),
  previousPositions: z.string(),
  yearsInEducation: z.number().min(1, { message: 'Years in education must be at least 1' }),
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
  address: addressSchema,
  schoolAddress: addressSchema,
});
export type CreateOwnerDto = z.infer<typeof ownerSchema>;
export type CreateAddressDto = z.infer<typeof addressSchema>;
export type CreateSchoolProfileDto = z.infer<typeof schoolProfileSchema>;
export type CreateSchoolConfigurationDto = z.infer<typeof SchoolConfigurationSchema>;
