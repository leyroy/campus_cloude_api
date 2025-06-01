import { NextFunction, Response } from "express";
import { CustomRequest } from "../../types/shared/types";
import { TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "../../utils/verifiyToken";
import { handlePrismaError } from "../../utils/prismaErrorHandler";
import { ErrorHandler } from "../../middlewares/errorHandler";

export async function logoutController(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    // const token = req.cookies.accessToken;
    console.log("logoutController req.cookies", req.cookies);

    // TODO: remove refresh token if any
    // const verifiedToken = verifyToken(token);
    // console.log("logoutController token", token);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
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
