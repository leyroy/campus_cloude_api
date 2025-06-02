// utils/prismaErrorHandler.ts
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { ErrorHandler } from "../middlewares/errorHandler";

export const handlePrismaError = (error: unknown): never => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint
        const field = error.meta?.target as string[];
        throw ErrorHandler.conflict(
          `${field ? field.join(', ') : 'Field'} already exists`
        );
      
      case 'P2025': // Record not found
        throw ErrorHandler.notFound('Record not found');
      
      case 'P2003': // Foreign key constraint
        throw ErrorHandler.badRequest('Invalid reference to related record');
      
      case 'P2014': // Required relation missing
        throw ErrorHandler.badRequest('Required relationship is missing');
      
      default:
        console.error('Prisma known error:', error);
        throw ErrorHandler.internal('Database operation failed');
    }
  }

  if (error instanceof PrismaClientValidationError) {
    console.error('Prisma validation error:', error.message);
    throw ErrorHandler.badRequest('Invalid data format');
  }

  if (error instanceof PrismaClientInitializationError) {
    console.error('Prisma initialization error:', error);
    throw ErrorHandler.internal('Database connection failed');
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    console.error('Prisma unknown error:', error);
    throw ErrorHandler.internal('Unexpected database error');
  }

  // If it's not a Prisma error, re-throw it
  throw error;
};