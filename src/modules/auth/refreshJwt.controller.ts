import { Request, Response } from 'express';
import { AppError } from '../../middlewares/errorHandler';
import { HTTPSTATUS } from '../../constants/http-status';
import { ErrorCode } from '../../enums/error-code.enum';
import { AuthService } from './auth.services';
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from '../../utils/cookie';

const authService = new AuthService();
const refreshJwtController = async (req: Request, res: Response) => {
  const { campus_cloud_refreshToken } = req.cookies;
  if (!campus_cloud_refreshToken) {
    throw new AppError({
      message: 'Refresh Token was not found',
      statusCode: HTTPSTATUS.NO_CONTENT,
      errorCode: ErrorCode.AUTH_REFRESH_TOKEN_NOT_FOUND,
    });
  }
  const { accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(
    campus_cloud_refreshToken
  );

  if (newRefreshToken) {
    res.cookie(
      'campus_cloud_refreshToken',
      newRefreshToken,
      getRefreshTokenCookieOptions()
    );
  }

  return res
    .status(HTTPSTATUS.OK)
    .cookie('campus_cloud_accessToken', accessToken, getAccessTokenCookieOptions())
    .json({
      message: 'Refresh access token successfully',
    });
};

export default refreshJwtController;
