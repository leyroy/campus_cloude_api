import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { toggleRoleStatus } from '../helpers/toggleRoleStatus';

const toggleRoleController = async (req: Request, res: Response, next: NextFunction) => {
  const { roleId } = req.params as { roleId: string };
  if (!roleId) {
    throw ErrorHandler.badRequest('Role ID is required');
  }
  const result = await toggleRoleStatus(roleId);
  res.status(200).json({ ...result });
};

export default toggleRoleController;
