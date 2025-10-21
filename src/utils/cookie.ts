import { CookieOptions, Response } from 'express';
import { ENV_CONSTANTS } from '../constants/env_constants';
import { calculateExpirationDate } from './date-time';

type CookiePayloadType = {
  res: Response;
  accessToken: string;
  refreshToken: string;
};

export const REFRESH_PATH = `${ENV_CONSTANTS.BASE_PATH}/auth/refresh`;

const defaults: CookieOptions = {
  httpOnly: true,
  secure: ENV_CONSTANTS.NODE_ENV === 'production' ? true : false,
  sameSite: ENV_CONSTANTS.NODE_ENV === 'production' ? 'strict' : 'lax',
};

export const getRefreshTokenCookieOptions = (): CookieOptions => {
  const expiresIn = ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN;
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults,
    expires,
    path: REFRESH_PATH,
  };
};

export const getAccessTokenCookieOptions = (): CookieOptions => {
  const expiresIn = ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN;
  const expires = calculateExpirationDate(expiresIn);
  return {
    ...defaults,
    expires,
    path: '/',
  };
};

export const setAuthenticationCookies = ({
  res,
  accessToken,
  refreshToken,
}: CookiePayloadType): Response =>
  res
    .cookie('campus_cloud_accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('campus_cloud_refreshToken', refreshToken, getRefreshTokenCookieOptions());

export const clearAuthenticationCookies = (res: Response): Response =>
  res.clearCookie('campus_cloud_accessToken').clearCookie('campus_cloud_refreshToken', {
    path: REFRESH_PATH,
  });
