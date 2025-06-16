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
  yearsInEducation: z.number().min(0).optional(),
});
