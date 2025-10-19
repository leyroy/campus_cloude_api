import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../../middlewares/errorHandler';
import { getRoleByRoleId } from '../helpers/getRoleByRoleId';

const getRoleByRoleIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { roleId } = req.params;
  try {
    if (!roleId) {
      throw ErrorHandler.badRequest('Role ID is required.');
    }
    const result = await getRoleByRoleId(roleId);
    res.status(200).json({ success: true, role: result });
  } catch (err) {
    next(err);
  }
};

export default getRoleByRoleIdController;
