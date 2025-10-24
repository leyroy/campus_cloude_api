"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combindedStudentGuardianSchema = exports.guardianSchema = exports.studentSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.studentSchema = zod_1.z.object({
    status: zod_1.z.nativeEnum(client_1.AccountStatus).default('PENDING'),
    schoolId: zod_1.z.string(),
    studentPhone: zod_1.z.string().optional(),
    studentEmail: zod_1.z.string().email().optional(),
    level: zod_1.z.nativeEnum(client_1.EducationLevel),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
    gender: zod_1.z.nativeEnum(client_1.Gender),
    religion: zod_1.z.string().optional(),
    classId: zod_1.z.string().optional(),
    departmentId: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date(), // coerce handles string -> Date
    createdAt: zod_1.z.coerce.date().default(() => new Date()),
    updatedAt: zod_1.z.coerce.date().default(() => new Date()),
    indexNumber: zod_1.z.string().min(1, 'Index number is required'),
});
exports.guardianSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    relationship: zod_1.z.nativeEnum(client_1.RelationshipType),
    email: zod_1.z.string().email(),
    occupation: zod_1.z.string(),
    phone: zod_1.z.string().min(1, { message: 'Guardian phone number is required' }),
    address: zod_1.z.string().min(1, 'Address is required'),
});
exports.combindedStudentGuardianSchema = zod_1.z.object({
    studentInformation: exports.studentSchema,
    guardianInformation: zod_1.z.array(exports.guardianSchema),
});
