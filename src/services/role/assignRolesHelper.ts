import prisma from "../../config/prisma.config";
import { AppError, ErrorHandler } from "../../middlewares/errorHandler";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

export const assignRolesHelper = async (userId: string,assignedById:string, roleId: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw ErrorHandler.notFound("User not found");
    }
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw ErrorHandler.notFound("Role not found");
    }

    //create user Role permission
    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
        assignedById: assignedById,
      },
    });

    return {
      success: true,
      message: "Role assigned successfully",
    };
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error; // Re-throw known errors
    }
    handlePrismaError(error);
    throw ErrorHandler.internal("Failed to assign role");
  }
};
