import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';
import { HTTPSTATUS } from '../../constants/http-status';

const authService = new AuthService();
const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, code } = req.body as { token?: string; code?: string };
    if (!token) {
      throw ErrorHandler.badRequest('Verification Token is required');
    }
    const results = await authService.verifyEmail(token, code as string);
    if (!results)
      throw ErrorHandler.badRequest('Invalid verification token or it has expired');
    res.status(HTTPSTATUS.OK).json({
      success: results,
      message: 'Your email is successfully verified, please log in to your account',
    });
  } catch (err) {
    next(err);
  }
};

export default verifyEmailController;
