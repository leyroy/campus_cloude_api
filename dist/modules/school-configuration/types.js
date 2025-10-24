"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolConfigurationSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const schoolProfileSchema = zod_1.z.object({
    slogan: zod_1.z.string().max(255),
    level: zod_1.z.array(zod_1.z.nativeEnum(client_1.EducationLevel)),
    name: zod_1.z
        .string()
        .min(1, { message: 'School name is required' })
        .max(255)
        .nullable()
        .transform((val) => (val === null || val === void 0 ? void 0 : val.trim()) || null),
    description: zod_1.z.string().max(1000).min(1, { message: 'Description is required' }),
    founderBio: zod_1.z.string().max(2000).min(1, { message: 'Founder bio is required' }),
    contactEmail: zod_1.z.string().email().min(1, { message: 'Contact email is required' }),
    contactPhone: zod_1.z.string().max(20).min(1, { message: 'Contact phone is required' }),
    motto: zod_1.z.string().max(255).min(1, { message: 'Motto is required' }),
    founderName: zod_1.z.string().max(255).min(1, { message: 'Founder name is required' }),
    licenseNumber: zod_1.z.string().max(100).min(1, { message: 'License number is required' }),
    adminNote: zod_1.z.string().max(1000).min(1, { message: 'Admin note is required' }),
});
const ownerSchema = zod_1.z.object({
    preferredContactMethod: zod_1.z.array(zod_1.z.nativeEnum(client_1.PreferredContactMethod)),
    preferredContactTime: zod_1.z.array(zod_1.z.nativeEnum(client_1.PreferredContactTime)),
    educationBackground: zod_1.z.string(),
    isActive: zod_1.z.boolean().default(false),
    professionalExperience: zod_1.z.string(),
    currentPosition: zod_1.z.string(),
    previousPositions: zod_1.z.string(),
    yearsInEducation: zod_1.z
        .number()
        .min(1, { message: 'Years in education must be at least 1' }),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, { message: 'Street address is required' }),
    city: zod_1.z.string().min(1, { message: 'City is required' }),
    region: zod_1.z.string().min(1, { message: 'Region is required' }),
    postalCode: zod_1.z.string().regex(/^[A-Z]{2,3}-\d{3,4}-?\d{0,4}?$/, {
        message: 'Postal code must be in format GA-123-4567',
    }),
    country: zod_1.z.string().default('Ghana'),
});
exports.SchoolConfigurationSchema = zod_1.z.object({
    schoolProfile: schoolProfileSchema,
    owner: ownerSchema,
    schoolAddress: addressSchema,
});
