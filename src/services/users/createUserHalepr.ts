import prisma from "../../config/prisma.config";
import { AppError, ErrorHandler } from "../../middlewares/errorHandler";
import { CreateReturns } from "../../types/shared/types";
import { UserDto } from "../../types/zodschemers/user";
import { PasswordService } from "../../utils/passwordMnager";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

const passwordManage = new PasswordService()

export const createUserHelper = async (userData: UserDto):Promise<CreateReturns> => {
  try {
    // TODO: Implement user creation logic
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      throw ErrorHandler.conflict(`User with email ${userData.email} already exists`);
    }
    
    const hashedPassword = await passwordManage.hashPassword(userData.password)

    await prisma.user.create({
      data: { ...userData,password:hashedPassword}
    });
    return {
      success: true,
      message: "User created successfully"
    };
  } catch (error: unknown) {
  if (error instanceof AppError) {
      throw error; // Re-throw known errors
    }
    handlePrismaError(error)
    if (error instanceof Error) {
      console.error("Error creating user:", error);
      throw ErrorHandler.internal("Internal server error");
    }
    console.error("Error creating user:", error);
    throw ErrorHandler.internal();
  }
};
