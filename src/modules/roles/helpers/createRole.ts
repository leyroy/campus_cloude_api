import { Role } from '@prisma/client';
import prisma from '../../../config/prisma.config';

export const createRole = async (data: Role) => {
  try {
    await prisma.role.create({
      data,
    });
    return {
      success: true,
      message: 'Role created successfully',
    };
  } catch (error) {
    throw error;
  }
};
