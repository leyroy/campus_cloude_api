"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassSchema = void 0;
const zod_1 = require("zod");
exports.CreateClassSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, { message: 'Name is required' })
        .max(100, { message: 'Name must be less than 100 characters' }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Description is required' })
        .max(500, { message: 'Description must be less than 500 characters' })
        .nullable(),
    gradeLevel: zod_1.z
        .number()
        .int()
        .min(1, { message: 'Grade level must be at least 1' })
        .max(12, { message: 'Grade level must be at most 12' }),
    courseId: zod_1.z
        .string()
        .uuid({ message: 'Course ID must be a valid UUID' })
        .min(1, { message: 'Course ID is required' }),
});
