import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { handlePrismaError } from "../../utils/prismaErrorHandler";
import { ErrorHandler } from "../../middlewares/errorHandler";
import { CustomRequest } from "../../types/shared/types";

export async function logoutController(req: Request, res: Response, next: NextFunction) {

  const user = (req as CustomRequest).user;
  console.log("User logging out:", user);
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge:0,
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge:0,
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
      user
    });
  } catch (error: unknown) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        success: false,
        code: "TOKEN_EXPIRED",
        message: "Token expired, please login again",
      });
    }
    handlePrismaError(error);
    throw ErrorHandler.internal("An error occurred during logout");
  }
}
