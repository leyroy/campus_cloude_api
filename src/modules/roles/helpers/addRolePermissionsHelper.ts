import prisma from "../../../config/prisma.config";
import { AppError, ErrorHandler } from "../../../middlewares/errorHandler";
import { handlePrismaError } from "../../../utils/prismaErrorHandler";

export const addRolePermissionsHelper = async (
  roleId: string,
  permissionIds: string[]
) => {
  try {
    // Optional: Validate that the IDs actually exist in DB (skip for speed if trusted)
    const validPermissions = await prisma.permission.findMany({
      where: { id: { in: permissionIds } },
      select: { id: true },
    });

    if (validPermissions.length !== permissionIds.length) {
      const foundIds = validPermissions.map((p) => p.id);
      const missing = permissionIds.filter((id) => !foundIds.includes(id));

      throw ErrorHandler.notFound(
        `Some permissions not found: ${missing.join(", ")}`
      );
    }
    const data = permissionIds.map((permissionId) => ({
      roleId,
      permissionId,
    }));
  console.log("Data to be inserted:", data);
    await prisma.rolePermission.createMany({
      data,
      skipDuplicates: true,
    });

    return { success: true, message: "Permissions added successfully" };
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error; // Re-throw known errors
    }
    handlePrismaError(error);
    throw ErrorHandler.internal("Failed to add role permissions");
  }
};
