import { verify } from 'jsonwebtoken';
import { ENV_CONSTANTS } from '../constants/env_constants';
import { IJwtPayload } from '../types/prisma';

export function verifyToken(token: string): IJwtPayload {
  const decodedToken = verify(
    token,
    ENV_CONSTANTS.JWT_ENV.JWT_SECRET as string
  ) as IJwtPayload;
  return decodedToken;
}

//function to generate 6 digit otp
export function generateOtp(): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const firstThreeDigits = otp.substring(0, 3);
  const lastThreeDigits = otp.substring(3);
  const otpStringWithDash = `${firstThreeDigits}-${lastThreeDigits}`;

  return otpStringWithDash;
}
