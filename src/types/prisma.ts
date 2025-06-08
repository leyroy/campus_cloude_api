import { Permission, Role, RolePermission, User, UserRole } from '@prisma/client';

export type UserWithRoles = User & {
  userRoles: (UserRole & {
    role: Role & {
      rolePermissions: (RolePermission & {
        permission: Permission;
      })[];
    };
  })[];
};
export interface IJwtPayload {
  sessionId: string;
  userId: string;
  email: string;
  roles: Array<{
    id: string;
    name: string;
    permissions: Array<{
      id: string;
      resource: string;
      action: string;
    }>;
  }>;
  iat?: number;
  exp?: number;
}

export interface IRefreshTokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: Omit<UserWithRoles, 'password'>;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Extended Request interface for authenticated routes
export interface IAuthenticatedRequest extends Request {
  user?: IJwtPayload;
  userDoc?: User;
}
