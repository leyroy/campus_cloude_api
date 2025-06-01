import { User } from "../generated/prisma";
import jwt, { SignOptions } from "jsonwebtoken";
import { ENV_CONSTANTS } from "../constants/env_constants";
import { ErrorHandler } from "../middlewares/errorHandler";
import { UserWithRoles } from "../types/prisma";

export function generateTokens(user: UserWithRoles) {
  const payload = {
    userId: user.id,
    email: user.email,
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
  if (
    !ENV_CONSTANTS.JWT_ENV.JWT_SECRET ||
    !ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET
  ) {
    throw ErrorHandler.badRequest(
      "JWT secrets are not defined in environment variables"
    );
  }

  const options = {
     expiresIn: ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN as any || "1h",
  };
  const accessToken = jwt.sign(payload, ENV_CONSTANTS.JWT_ENV.JWT_SECRET, options);



  const refreshToken = jwt.sign(
    { userId: user.id },
    ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET as string,
    { expiresIn: ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN as any || "7d" }
  );

  return { accessToken, refreshToken };
}
