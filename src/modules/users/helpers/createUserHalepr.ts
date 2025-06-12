import prisma from '../../../config/prisma.config';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { UserDto } from '../../../types/zodschemers/user';
import { passwordManager } from '../../../services/passwordMnager';
import { CreateReturns } from '../../../types/types';

export const createUserHelper = async (userData: UserDto): Promise<CreateReturns> => {
  try {
    // TODO: Implement user creation logic
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw ErrorHandler.conflict(`User with email ${userData.email} already exists`);
    }
    const hashedPassword = await passwordManager.hashPassword(userData.password);
    await prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (error: unknown) {
    throw error; // Re-throw known errors
  }
};
