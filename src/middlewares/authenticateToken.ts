import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.config';
import { AppError, ErrorHandler } from './errorHandler';
import { NextFunction, Request, Response } from 'express';
import { HTTPSTATUS } from '../constants/http-status';
import { ErrorCode } from '../enums/error-code.enum';
import { CustomRequest, TokenTypes } from '../types/types';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { campus_cloud_accessToken: token } = req.cookies;
    const islogOutPaht = req.path === '/logout';
    // No token provided
    if (!token && islogOutPaht) {
      return next();
    }
    if (!token) {
      throw new AppError({
        message: 'No token provided',
        statusCode: HTTPSTATUS.UNAUTHORIZED,
        errorCode: ErrorCode.AUTH_TOKEN_NOT_FOUND,
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenTypes;
    // Check if user still exists and is active
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user && islogOutPaht) {
      return next();
    }

    if (!user) {
      throw new AppError({
        message: 'User not found or inactive',
        statusCode: HTTPSTATUS.UNAUTHORIZED,
        errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
      });
    }
    if (!user.isEmailVerified && !islogOutPaht) {
      throw ErrorHandler.badRequest('Please kindly verify your account');
    }
    // Add user info to request
    (req as CustomRequest).user = decoded;
    next();
  } catch (error: unknown) {
    console.error('Auth middleware error:', error);
    next(error);
  }
};
