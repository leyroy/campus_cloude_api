import prisma from '../../../config/prisma.config';
import { ErrorHandler } from '../../../middlewares/errorHandler';

export const toggleRoleStatus = async (roleId: string) => {
  try {
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) {
      throw ErrorHandler.badRequest('Role not found');
    }
    await prisma.role.update({
      where: { id: roleId },
      data: { isActive: !role.isActive },
    });
    return {
      message: `Role has been ${
        role.isActive ? 'deactivated' : 'activated'
      } successfully`,
      success: true,
    };
  } catch (error) {
    throw error;
  }
};
