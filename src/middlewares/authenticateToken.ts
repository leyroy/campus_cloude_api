import jwt from "jsonwebtoken"
import prisma from "../config/prisma.config";
import { ErrorHandler } from "./errorHandler";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { NextFunction, Request, Response } from "express";
import { IJwtPayload} from "../types/prisma";
import { CustomRequest } from "../types/shared/types";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken: token } = req.cookies;

    if (!token) {
      throw ErrorHandler.unauthorized("No token provided");
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;
    console.log(decoded)
    // Check if user still exists and is active
    const user = await prisma.user.findUnique({where:{id:decoded.userId}});
    
    if (!user || !user.isActive) {
    throw ErrorHandler.badRequest("User not found or inactive");
    }
    // Add user info to request
    (req as CustomRequest).user = decoded;
    next();

  } catch (error:unknown) {
    if ((error as any).name === 'TokenExpiredError') {
      throw ErrorHandler.badRequest("Token expired")
    }
    if ((error as any).name === 'JsonWebTokenError') {
      throw ErrorHandler.badRequest("Invalid token")
    }
    console.error('Auth middleware error:', error);
    handlePrismaError(error)
    throw ErrorHandler.internal()
  }
};