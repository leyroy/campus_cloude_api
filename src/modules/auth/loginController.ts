import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { handlePrismaError } from '../../utils/prismaErrorHandler';
import { loginSchema } from './auth.validator';
import { AuthService } from './auth.services';
import { sendEmail } from '../../mailers/mailer';
import { HTTPSTATUS } from '../../constants/http-status';
import { setAuthenticationCookies } from '../../utils/cookie';
import { verifyEmailTemplate } from '../../mailers/templates/template';

const authService = new AuthService();

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  const isValidData = loginSchema.safeParse(data);
  const userAgent = req.headers['user-agent'] || '';
  const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';

  if (!isValidData.success || !isValidData.data.email) {
    console.error('Validation failed:', isValidData.error);
    throw ErrorHandler.badRequest(`Invalid data: ${isValidData?.error?.message}`);
  }
  try {
    const { refreshToken, accessToken, isEmailVerified, url } = await authService.loginUser({
      ...isValidData.data,
      userAgent,
      ipAddress,
    });

    if (!isEmailVerified) {
      sendEmail({
        ...verifyEmailTemplate(url!),
        to: isValidData.data.email,
      });
      return res.status(HTTPSTATUS.OK).json({
        isEmailVerified,
        refreshToken,
        accessToken,
        message: 'An email has been sent to your account, Please verify your email to continue',
      });
    }
    return setAuthenticationCookies({
      res,
      accessToken,
      refreshToken,
    })
      .status(HTTPSTATUS.OK)
      .json({
        message: 'User login successfully',
        refreshToken,
        accessToken,
        isEmailVerified,
      });
  } catch (error: unknown) {
    if (error instanceof ErrorHandler) {
      return next(error);
    }
    // Handle unexpected errors
    handlePrismaError(error);
    throw ErrorHandler.internal('An error occurred during login');
  }
};

export default loginController;
