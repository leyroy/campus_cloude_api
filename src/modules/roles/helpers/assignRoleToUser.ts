import prisma from '../../../config/prisma.config';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { commonDbService } from '../../../utils/db/commonDbServices';

type HelperTypes = {
  roleId: string;
  userId: string;
  assignedById: string;
};

export const assignRoleToUser = async ({ roleId, userId, assignedById }: HelperTypes) => {
  if (!roleId || !userId || !assignedById) {
    throw ErrorHandler.badRequest('Cannot perform this action');
  }
  try {
    const user = await commonDbService.getUserById(userId);
    if (!user) {
      throw ErrorHandler.notFound('User not found');
    }
    const role = await commonDbService.getRoleById(roleId);
    if (!role) {
      throw ErrorHandler.notFound('Role not found');
    }
    // Create user role association
    await prisma.userRole.create({
      data: {
        userId,
        roleId,
        assignedById: assignedById,
      },
    });

    await commonDbService.getRoles();
    return {
      message: 'Role assigned successfully',
      success: true,
    };
  } catch (error: unknown) {
    throw error;
  }
};
