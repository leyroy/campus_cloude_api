import {  verify, } from 'jsonwebtoken'
import { ENV_CONSTANTS } from '../constants/env_constants'
import { IJwtPayload } from '../types/prisma'


export function verifyToken(token: string): IJwtPayload {
  const decodedToken = verify(token, ENV_CONSTANTS.JWT_ENV.JWT_SECRET as string) as IJwtPayload
  return decodedToken
}