"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
// utils/prismaErrorHandler.ts
const library_1 = require("@prisma/client/runtime/library");
const errorHandler_1 = require("../middlewares/errorHandler");
const handlePrismaError = (error) => {
    var _a;
    if (error instanceof library_1.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002': // Unique constraint
                const field = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                throw errorHandler_1.ErrorHandler.conflict(`${field ? field.join(', ') : 'Field'} already exists`);
            case 'P2025': // Record not found
                throw errorHandler_1.ErrorHandler.notFound('Record not found');
            case 'P2003': // Foreign key constraint
                throw errorHandler_1.ErrorHandler.badRequest('Invalid reference to related record');
            case 'P2014': // Required relation missing
                throw errorHandler_1.ErrorHandler.badRequest('Required relationship is missing');
            default:
                console.error('Prisma known error:', error);
                throw errorHandler_1.ErrorHandler.internal('Database operation failed');
        }
    }
    if (error instanceof library_1.PrismaClientValidationError) {
        console.error('Prisma validation error:', error.message);
        throw errorHandler_1.ErrorHandler.badRequest('Invalid data format');
    }
    if (error instanceof library_1.PrismaClientInitializationError) {
        console.error('Prisma initialization error:', error);
        throw errorHandler_1.ErrorHandler.internal('Database connection failed');
    }
    if (error instanceof library_1.PrismaClientUnknownRequestError) {
        console.error('Prisma unknown error:', error);
        throw errorHandler_1.ErrorHandler.internal('Unexpected database error');
    }
    // If it's not a Prisma error, re-throw it
    throw error;
};
exports.handlePrismaError = handlePrismaError;
