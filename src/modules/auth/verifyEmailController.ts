import { Request, Response } from 'express';
import { HTTPSTATUS } from '../../constants/http-status';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';
const authService = new AuthService();
export const verifyEmailcontroller = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { code, token } = req.body as { code: string; token: string };
  // await this.authService.verifyEmail(code);
  if (!code) {
    throw ErrorHandler.notFound('Token was not found');
  }
  await authService.verifyEmail(token, code);
  return res.status(HTTPSTATUS.OK).json({
    message: 'Email verified successfully',
  });
};
