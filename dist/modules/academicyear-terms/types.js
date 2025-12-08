"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTermSchema = void 0;
const zod_1 = require("zod");
exports.CreateTermSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Term name is required' }),
    startDate: zod_1.z.date(),
    endDate: zod_1.z.date(),
    isCurrent: zod_1.z.boolean().default(false),
    academicYearId: zod_1.z.string().min(1, { message: 'Academic year ID is required' }),
    number: zod_1.z.number().int().min(1, { message: 'Term number must be a positive integer' }),
});
