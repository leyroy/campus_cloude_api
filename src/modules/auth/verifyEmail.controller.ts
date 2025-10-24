import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { AuthService } from './auth.services';
import { HTTPSTATUS } from '../../constants/http-status';
import { setAuthenticationCookies } from '../../utils/cookie';

const authService = new AuthService();
const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'] || '';
  const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
  try {
    const { token, code, isFromLogin } = req.body as {
      token?: string;
      code?: string;
      isFromLogin?: boolean;
    };
    console.log('Verify Email Request Body:', req.body);
    if (!token) {
      throw ErrorHandler.badRequest('Verification Token is required');
    }
    const { success, accessToken, refreshToken } = await authService.verifyEmail(
      token,
      code as string,
      userAgent,
      ipAddress,
      isFromLogin
    );
    if (!success)
      throw ErrorHandler.badRequest('Invalid verification token or it has expired');

    if (isFromLogin) {
      return setAuthenticationCookies({
        res,
        accessToken,
        refreshToken,
      })
        .status(HTTPSTATUS.OK)
        .json({
          success,
          message: 'Your email is successfully verified, you can proceed to dashboard',
        });
    }
    res.status(HTTPSTATUS.OK).json({
      success,
      message: 'Your email is successfully verified, please log in to your account',
    });
  } catch (err) {
    next(err);
  }
};

export default verifyEmailController;
