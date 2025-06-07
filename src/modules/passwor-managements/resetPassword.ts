import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { passwordServices } from './password.services';
import { HTTPSTATUS } from '../../constants/http-status';

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      throw ErrorHandler.badRequest('Token and new password are required');
    }
    //TODO: send email to user with reset password confirmation
    const { message } = await passwordServices.resetPassword(token, newPassword);

    res.status(HTTPSTATUS.CREATED).json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

export default resetPassword;
