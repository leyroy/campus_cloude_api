import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../middlewares/errorHandler";
import { CommonDbServices } from "../../utils/db/commonDbServices";
import { PasswordService } from "../../services/passwordMnager";
import { generateTokens } from "../../utils/generateToken";
import { handlePrismaError } from "../../utils/prismaErrorHandler"; 

const commonDbServices = new CommonDbServices();
const passwordService = new PasswordService();

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, phone } = req.body;
  if ((!email && !phone) || !password) {
    throw ErrorHandler.badRequest("Invalid credendtials");
  }
  try {
    const user = await commonDbServices.getUserByPhoneOrEmail({ email, phone });
    if (!user) {
      throw ErrorHandler.notFound("User not foune");
    }
    if (!user.isActive) {
      throw ErrorHandler.badRequest(
        `Account ${user.email} is not not activated, please kindly activate your account`
      );
    }
    //validate password
    const isValidPassword = await passwordService.verifyPassword(
      password,
      user.password
    );

    // 🎯 Handle loginController logic here neger 😎
    if (!isValidPassword) {
      throw ErrorHandler.badRequest("Invalid credentials");
    }
    const { accessToken, refreshToken } = generateTokens(user);

    //formate user data
    const userData = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      address: user.address,
      roles: user.userRoles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
        permissions: userRole.role.rolePermissions.map((rolePermission) => ({
          id: rolePermission.permission.id,
          resource: rolePermission.permission.resource,
          action: rolePermission.permission.action,
        })),
      })),
    };
    //set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite:"strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      data: { user: userData },
    });
  } catch (error: unknown) {
    if (error instanceof ErrorHandler) {
      return next(error);
    }
    // Handle unexpected errors
    handlePrismaError(error);
    throw ErrorHandler.internal("An error occurred during login");
    
  }
};

export default loginController;
