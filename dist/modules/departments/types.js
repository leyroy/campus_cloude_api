"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.CreateDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Department name is required' }),
    description: zod_1.z
        .string()
        .min(1, { message: 'Department description is required' })
        .transform((val) => (val === '' ? null : val)),
});
