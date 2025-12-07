"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combindedStudentGuardianSchema = exports.guardianSchema = exports.studentSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.studentSchema = zod_1.z.object({
    studentPhone: zod_1.z.string().optional(),
    studentEmail: zod_1.z.string().email().optional(),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    gender: zod_1.z.nativeEnum(client_1.Gender),
    classId: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date(),
});
exports.guardianSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'Full name is required'),
    relationship: zod_1.z.nativeEnum(client_1.RelationshipType),
    email: zod_1.z.string().email(),
    occupation: zod_1.z.string().optional(),
    phone: zod_1.z.string().min(1, { message: 'Guardian phone number is required' }),
    address: zod_1.z.string().min(1, 'Address is required'),
});
exports.combindedStudentGuardianSchema = zod_1.z.object({
    studentInformation: exports.studentSchema,
    guardianInformation: zod_1.z.array(exports.guardianSchema),
});
