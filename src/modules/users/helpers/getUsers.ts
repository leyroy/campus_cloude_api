import prisma from '../../../config/prisma.config';
import { ErrorHandler } from '../../../middlewares/errorHandler';

export const getAllUsers = async () => {
  try {
    //TODO: check user permissions
    const users = await prisma.user.findMany();
    if (!users) {
      throw ErrorHandler.notFound('No user found');
    }
    return users;
  } catch (error: unknown) {
    throw error;
  }
};
