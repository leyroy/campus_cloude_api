//function to add role permissions
import { Request, Response } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { addRolePermissionsHelper } from '../helpers/addRolePermissionsHelper';

export const addRolePermissions = async (req: Request, res: Response) => {
  const { roleId, permissions } = req.body as {
    roleId: string;
    permissions: string[];
  };

  const results = await addRolePermissionsHelper(roleId, permissions);
  if (!results.success) {
    throw ErrorHandler.internal('Failed to add role permissions');
  }
  res.status(200).json({
    success: results.success,
    message: results.message || 'Role permissions added successfully',
  });
};
