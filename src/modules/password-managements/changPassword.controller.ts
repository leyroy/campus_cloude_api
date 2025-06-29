import { Request, Response, NextFunction } from 'express';
import { passwordServices } from './password.services';
import { CustomRequest } from '../../types/types';
import { HTTPSTATUS } from '../../constants/http-status';

const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body;
  const userId = (req as CustomRequest).user.userId;
  const { message } = await passwordServices.changePassword({
    oldPassword,
    newPassword,
    userId,
  });
  res.status(HTTPSTATUS.OK).json({ success: true, message });
};

export default changePasswordController;
