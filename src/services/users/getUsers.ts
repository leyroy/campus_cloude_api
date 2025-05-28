import prisma from "../../config/prisma.config";
import { AppError, ErrorHandler } from "../../middlewares/errorHandler";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

export const getAllUsers = async () => {
  try {
    //TODO: check user permissions
    const users = await prisma.user.findMany()
    return users;
  } catch (error:unknown) {
    if(error as AppError) {
      throw error;
    }
    handlePrismaError(error)
    ErrorHandler.badRequest("Failed to fetch users");
  }
};
