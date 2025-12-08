"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTermSchema = exports.updateAcademicYearSchema = exports.academicYearSchema = exports.termSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// Term Schema
exports.termSchema = zod_1.z
    .object({
    number: zod_1.z.number().int().min(1).max(3),
    name: zod_1.z.enum(['First Term', 'Second Term', 'Third Term']),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    isCurrent: zod_1.z.boolean().default(false),
})
    .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
});
// Academic Year Schema
exports.academicYearSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(1, 'Academic year name is required')
        .regex(/^\d{4}\/\d{4}$/, 'Format must be YYYY/YYYY (e.g., 2024/2025)'),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
    status: zod_1.z.nativeEnum(client_1.AcademicYearStatus).default(client_1.AcademicYearStatus.INACTIVE),
    terms: zod_1.z.array(exports.termSchema).max(3),
})
    .refine((data) => data.endDate > data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
})
    .refine((data) => {
    const [startYear, endYear] = data.name.split('/').map(Number);
    return endYear === startYear + 1;
}, {
    message: 'Academic year must span consecutive years (e.g., 2024/2025)',
    path: ['name'],
});
// Update Academic Year Schema
exports.updateAcademicYearSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(1, 'Academic year name is required')
        .regex(/^\d{4}\/\d{4}$/, 'Format must be YYYY/YYYY (e.g., 2024/2025)')
        .optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
    status: zod_1.z.nativeEnum(client_1.AcademicYearStatus).optional(),
})
    .refine((data) => {
    if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
    }
    return true;
}, {
    message: 'End date must be after start date',
    path: ['endDate'],
});
// Update Term Schema
exports.updateTermSchema = zod_1.z
    .object({
    name: zod_1.z.enum(['First Term', 'Second Term', 'Third Term']).optional(),
    isCurrent: zod_1.z.boolean().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
})
    .refine((data) => {
    if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
    }
    return true;
}, {
    message: 'End date must be after start date',
    path: ['endDate'],
});
