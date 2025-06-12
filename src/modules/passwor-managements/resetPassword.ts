import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { passwordServices } from './password.services';
import { HTTPSTATUS } from '../../constants/http-status';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { token } = req.params;
    if (!token) {
      throw ErrorHandler.badRequest('Token not found');
    }
    const { message } = await passwordServices.resetPassword(token, currentPassword, newPassword);
    res.status(HTTPSTATUS.CREATED).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export default resetPassword;
