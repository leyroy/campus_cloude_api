import prisma from "../../config/prisma.config";
import { Role } from "../../generated/prisma";
import { AppError, ErrorHandler } from "../../middlewares/errorHandler";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

export const createRole = async (data:Role) => {
  try {
    await prisma.role.create({
      data,
    });
    return {
      success: true,
      message: "Role created successfully",
    };
  } catch (error) {
    if(error instanceof AppError) {
      throw error; 
    }
    handlePrismaError(error);
    throw ErrorHandler.forbidden("Failed to create role");
  }
}