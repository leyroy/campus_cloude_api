import jwt from 'jsonwebtoken';
import { ENV_CONSTANTS } from '../constants/env_constants';
import { ErrorHandler } from '../middlewares/errorHandler';
import { TokenTypes } from '../types/types';

export function generateTokens({ userId, sessionId, schoolId }: TokenTypes) {
  const payload = {
    userId,
    sessionId,
    schoolId,
  };
  if (!ENV_CONSTANTS.JWT_ENV.JWT_SECRET || !ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET) {
    throw ErrorHandler.badRequest('JWT secrets are not defined in environment variables');
  }

  const options = {
    expiresIn: (ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN as any) || '1h',
  };
  const accessToken = jwt.sign(payload, ENV_CONSTANTS.JWT_ENV.JWT_SECRET, options);

  const refreshToken = jwt.sign(
    payload,
    ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: (ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN as any) || '7d',
    }
  );

  return { accessToken, refreshToken };
}

export const verifyJwtToken = (
  token: string,
  options?: jwt.VerifyOptions & { secret: string }
) => {
  try {
    const { secret = ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET, ...opts } =
      options || {};
    const payload = jwt.verify(token, secret!, {
      ...opts,
    }) as TokenTypes;
    return { payload };
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
