"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// Education Level Enum
// Base Class Creation Schema
exports.createClassSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, 'Class name is required').max(100, 'Class name is too long'),
    description: zod_1.z.string().max(500, 'Description is too long').optional(),
    capacity: zod_1.z
        .number()
        .int('Capacity must be an integer')
        .min(1, 'Capacity must be at least 1')
        .max(500, 'Capacity cannot exceed 500'),
    level: zod_1.z.nativeEnum(client_1.EducationLevel),
    departmentId: zod_1.z.string().cuid('Invalid department ID format').optional().nullable(),
})
    .refine((data) => {
    // SHS classes MUST have a department
    if (data.level === 'SHS') {
        return data.departmentId !== null && data.departmentId !== undefined;
    }
    return true;
}, {
    message: 'SHS classes must have a department',
    path: ['departmentId'],
})
    .refine((data) => {
    // Non-SHS classes should NOT have a department
    if (data.level !== 'SHS' && data.departmentId) {
        return false;
    }
    return true;
}, {
    message: 'Only SHS classes can have a department',
    path: ['departmentId'],
});
// export type CreateClassGroupsInput = z.infer<typeof createClassGroupsSchema>;
