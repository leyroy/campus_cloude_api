import prisma from "../../../config/prisma.config"
import { ErrorHandler } from "../../../middlewares/errorHandler"
import { CommonDbServices } from "../../../utils/db/commonDbServices"
import { handlePrismaError } from "../../../utils/prismaErrorHandler"

type HelperTypes = {
  roleId:string,
  userId:string,
  assignedById:string
}

const commonDbServices = new CommonDbServices()
export const assignRoleToUser = async ({roleId, userId, assignedById}:HelperTypes)=>{
  if(!roleId ||!userId || !assignedById){
    throw ErrorHandler.badRequest("Cannot perform this action")
  }
  try {
    const user = await commonDbServices.getUserById(userId)
    if (!user) {
      throw ErrorHandler.notFound("User not found");
    }
    const role = await commonDbServices.getRoleById(roleId)
    if (!role) {
      throw ErrorHandler.notFound("Role not found");
    }

    // Create user role association
    await prisma.userRole.create({
      data: {
        userId,
        roleId,
        assignedById: assignedById
      }
    });

    const allRoles = await commonDbServices.getRoles()
    return{
      message:"Role assigned successfully",
      success:true,
    }
  } catch (error:unknown) {
    if (error instanceof ErrorHandler) {
      throw error; // Re-throw known errors
    }
    // Handle Prisma errors
    if (error instanceof Error) console.error(error);
    handlePrismaError(error);
    // Throw a generic internal error
    throw ErrorHandler.internal("Failed to assign role to user");
  }
}