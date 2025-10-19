import { Request, Response, NextFunction } from 'express';
import { getPermissions } from '../helpers/getPermissions';

const getPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permissions = await getPermissions();
    res.status(200).json({ success: true, permissions });
  } catch (err) {
    next(err);
  }
};

export default getPermissionsController;
