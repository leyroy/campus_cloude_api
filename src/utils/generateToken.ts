import jwt from 'jsonwebtoken';
import { ENV_CONSTANTS } from '../constants/env_constants';
import { ErrorHandler } from '../middlewares/errorHandler';

type TokenTypes = {
  userId: string;
  sessionId: string;
};

export function generateTokens({ userId, sessionId }: TokenTypes) {
  const payload = {
    userId,
    sessionId
  };
  if (!ENV_CONSTANTS.JWT_ENV.JWT_SECRET || !ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET) {
    throw ErrorHandler.badRequest('JWT secrets are not defined in environment variables');
  }

  const options = {
    expiresIn: (ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN as any) || '1h'
  };
  const accessToken = jwt.sign(payload, ENV_CONSTANTS.JWT_ENV.JWT_SECRET, options);

  const refreshToken = jwt.sign(payload, ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET as string, {
    expiresIn: (ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN as any) || '7d'
  });

  return { accessToken, refreshToken };
}
