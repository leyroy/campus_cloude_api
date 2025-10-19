import { Request, Response } from 'express';
import { createRole } from '../helpers/createRole';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { Role } from '@prisma/client';
import { CustomRequest } from '../../../types/types';

export async function createRoleController(req: Request, res: Response) {
  const data = req.body as Role;
  const dataWithCreator = {
    ...data,
    createdById: (req as CustomRequest)?.user.userId,
  };
  const createdResult = await createRole(dataWithCreator);
  if (!createdResult.success || !createdResult) {
    throw ErrorHandler.internal('Failed to create role');
  }
  res.status(201).json({
    success: true,
    message: 'Role created successfully',
  });
}
