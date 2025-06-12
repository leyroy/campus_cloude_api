import { Request, Response, NextFunction } from 'express';
import { passwordServices } from './password.services';
import { CustomRequest } from '../../types/types';

const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const userId = (req as CustomRequest).user.userId;
  const { message } = await passwordServices.changePassword({
    oldPassword,
    newPassword,
    userId,
  });
  res.status(200).json({ success: true, message });
};

export default changePasswordController;
