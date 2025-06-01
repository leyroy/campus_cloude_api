// // prisma/schema.prisma
// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model User {
//   id          String   @id @default(cuid())
//   firstName   String
//   lastName    String
//   email       String   @unique
//   password    String
//   isActive    Boolean  @default(true)
//   lastLoginAt DateTime?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

//   // Many-to-many relationship with roles
//   userRoles UserRole[]

//   @@map("users")
// }

// model Role {
//   id          String   @id @default(cuid())
//   name        String   @unique
//   description String?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

//   // Many-to-many relationships
//   userRoles       UserRole[]
//   rolePermissions RolePermission[]

//   @@map("roles")
// }

// model Permission {
//   id          String   @id @default(cuid())
//   name        String   @unique
//   resource    String   // e.g., 'students', 'teachers', 'grades'
//   action      String   // e.g., 'read', 'create', 'update', 'delete'
//   description String?
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt

//   // Many-to-many relationship with roles
//   rolePermissions RolePermission[]

//   @@unique([resource, action])
//   @@map("permissions")
// }

// // Junction table for User-Role many-to-many
// model UserRole {
//   id     String @id @default(cuid())
//   userId String
//   roleId String

//   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//   role Role @relation(fields: [roleId], references: [id], onDelete: Cascade)

//   @@unique([userId, roleId])
//   @@map("user_roles")
// }

// // Junction table for Role-Permission many-to-many
// model RolePermission {
//   id           String @id @default(cuid())
//   roleId       String
//   permissionId String

//   role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
//   permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

//   @@unique([roleId, permissionId])
//   @@map("role_permissions")
// }

// // Optional: Token blacklist for enhanced security
// model TokenBlacklist {
//   id        String   @id @default(cuid())
//   token     String   @unique
//   expiresAt DateTime
//   createdAt DateTime @default(now())

//   @@map("token_blacklist")
// }

// // ================================================================
// // types/auth.types.ts
// import { User, Role, Permission, UserRole, RolePermission } from '@prisma/client';

// export interface IPermission extends Permission {}

// export interface IRole extends Role {
//   permissions?: IPermission[];
// }

// export interface IUser extends User {
//   roles?: IRole[];
// }

// // Complete user with roles and permissions
// export type UserWithRoles = User & {
//   userRoles: (UserRole & {
//     role: Role & {
//       rolePermissions: (RolePermission & {
//         permission: Permission;
//       })[];
//     };
//   })[];
// };

// // JWT Payload structure
// export interface IJwtPayload {
//   userId: string;
//   email: string;
//   roles: Array<{
//     id: string;
//     name: string;
//     permissions: Array<{
//       id: string;
//       resource: string;
//       action: string;
//     }>;
//   }>;
//   iat?: number;
//   exp?: number;
// }

// export interface IRefreshTokenPayload {
//   userId: string;
//   iat?: number;
//   exp?: number;
// }

// export interface ILoginRequest {
//   email: string;
//   password: string;
// }

// export interface ILoginResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     user: Omit<UserWithRoles, 'password'>;
//     accessToken: string;
//     refreshToken: string;
//   };
// }

// export interface IChangePasswordRequest {
//   currentPassword: string;
//   newPassword: string;
// }

// // Extended Request interface for authenticated routes
// export interface IAuthenticatedRequest extends Request {
//   user?: IJwtPayload;
//   userDoc?: User;
// }

// // ================================================================
// // lib/prisma.ts
// import { PrismaClient } from '@prisma/client';

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = prisma;
// }

// // ================================================================
// // controllers/authController.ts
// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { prisma } from '../lib/prisma';
// import { 
//   ILoginRequest, 
//   ILoginResponse, 
//   IChangePasswordRequest, 
//   IJwtPayload, 
//   IRefreshTokenPayload,
//   IAuthenticatedRequest,
//   UserWithRoles
// } from '../types/auth.types';

// export class AuthController {
//   // Login user
//   static async login(req: Request<{}, ILoginResponse, ILoginRequest>, res: Response<ILoginResponse>) {
//     try {
//       const { email, password } = req.body;

//       // Validate input
//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: 'Email and password are required'
//         });
//       }

//       // Find user with roles and permissions using Prisma
//       const user = await prisma.user.findUnique({
//         where: { email },
//         include: {
//           userRoles: {
//             include: {
//               role: {
//                 include: {
//                   rolePermissions: {
//                     include: {
//                       permission: true
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       });

//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials'
//         });
//       }

//       // Check if user is active
//       if (!user.isActive) {
//         return res.status(401).json({
//           success: false,
//           message: 'Account is deactivated'
//         });
//       }

//       // Verify password
//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (!isValidPassword) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid credentials'
//         });
//       }

//       // Generate tokens with dynamic payload
//       const { accessToken, refreshToken } = await AuthController.generateTokens(user);

//       // Update last login
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { lastLoginAt: new Date() }
//       });

//       // Prepare user data (without password)
//       const { password: _, ...userData } = user;

//       res.status(200).json({
//         success: true,
//         message: 'Login successful',
//         data: {
//           user: userData,
//           accessToken,
//           refreshToken
//         }
//       });

//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   }

//   // Refresh access token
//   static async refreshToken(req: Request, res: Response) {
//     try {
//       const { refreshToken } = req.body;

//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: 'Refresh token is required'
//         });
//       }

//       // Verify refresh token
//       const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as IRefreshTokenPayload;
      
//       // Find user with roles and permissions
//       const user = await prisma.user.findUnique({
//         where: { id: decoded.userId },
//         include: {
//           userRoles: {
//             include: {
//               role: {
//                 include: {
//                   rolePermissions: {
//                     include: {
//                       permission: true
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       });

//       if (!user || !user.isActive) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid refresh token'
//         });
//       }

//       // Generate new access token with current user data
//       const { accessToken } = await AuthController.generateTokens(user);

//       res.status(200).json({
//         success: true,
//         message: 'Token refreshed successfully',
//         data: { accessToken }
//       });

//     } catch (error) {
//       console.error('Refresh token error:', error);
//       res.status(401).json({
//         success: false,
//         message: 'Invalid refresh token'
//       });
//     }
//   }

//   // Logout user (with optional token blacklisting)
//   static async logout(req: IAuthenticatedRequest, res: Response) {
//     try {
//       const authHeader = req.headers['authorization'];
//       const token = authHeader && authHeader.split(' ')[1];

//       // Optional: Add token to blacklist for enhanced security
//       if (token && process.env.ENABLE_TOKEN_BLACKLIST === 'true') {
//         const decoded = jwt.decode(token) as any;
//         if (decoded && decoded.exp) {
//           await prisma.tokenBlacklist.create({
//             data: {
//               token,
//               expiresAt: new Date(decoded.exp * 1000)
//             }
//           });
//         }
//       }

//       res.status(200).json({
//         success: true,
//         message: 'Logout successful'
//       });
//     } catch (error) {
//       console.error('Logout error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   }

//   // Get current user profile
//   static async getProfile(req: IAuthenticatedRequest, res: Response) {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { id: req.user?.userId },
//         include: {
//           userRoles: {
//             include: {
//               role: {
//                 include: {
//                   rolePermissions: {
//                     include: {
//                       permission: true
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       });

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: 'User not found'
//         });
//       }

//       // Remove password from response
//       const { password, ...userWithoutPassword } = user;

//       res.status(200).json({
//         success: true,
//         data: { user: userWithoutPassword }
//       });

//     } catch (error) {
//       console.error('Get profile error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   }

//   // Change password
//   static async changePassword(req: Request<{}, {}, IChangePasswordRequest>, res: Response) {
//     try {
//       const { currentPassword, newPassword } = req.body;
//       const userId = (req as IAuthenticatedRequest).user?.userId;

//       if (!userId) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       // Validate input
//       if (!currentPassword || !newPassword) {
//         return res.status(400).json({
//           success: false,
//           message: 'Current password and new password are required'
//         });
//       }

//       if (newPassword.length < 6) {
//         return res.status(400).json({
//           success: false,
//           message: 'New password must be at least 6 characters long'
//         });
//       }

//       // Find user
//       const user = await prisma.user.findUnique({
//         where: { id: userId }
//       });

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: 'User not found'
//         });
//       }

//       // Verify current password
//       const isValidPassword = await bcrypt.compare(currentPassword, user.password);
//       if (!isValidPassword) {
//         return res.status(400).json({
//           success: false,
//           message: 'Current password is incorrect'
//         });
//       }

//       // Hash new password
//       const saltRounds = 12;
//       const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//       // Update password
//       await prisma.user.update({
//         where: { id: userId },
//         data: { password: hashedPassword }
//       });

//       res.status(200).json({
//         success: true,
//         message: 'Password changed successfully'
//       });

//     } catch (error) {
//       console.error('Change password error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   }

//   // Helper method to generate tokens with dynamic payload
//   static async generateTokens(user: UserWithRoles): Promise<{ accessToken: string; refreshToken: string }> {
//     // Create comprehensive JWT payload with all user permissions
//     const payload: IJwtPayload = {
//       userId: user.id,
//       email: user.email,
//       roles: user.userRoles.map(userRole => ({
//         id: userRole.role.id,
//         name: userRole.role.name,
//         permissions: userRole.role.rolePermissions.map(rolePermission => ({
//           id: rolePermission.permission.id,
//           resource: rolePermission.permission.resource,
//           action: rolePermission.permission.action
//         }))
//       }))
//     };

//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET!,
//       { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
//     );

//     const refreshTokenPayload: IRefreshTokenPayload = {
//       userId: user.id
//     };

//     const refreshToken = jwt.sign(
//       refreshTokenPayload,
//       process.env.REFRESH_TOKEN_SECRET!,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
//     );

//     return { accessToken, refreshToken };
//   }
// }

// // ================================================================
// // middleware/authMiddleware.ts
// import { Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { prisma } from '../lib/prisma';
// import { IJwtPayload, IAuthenticatedRequest } from '../types/auth.types';

// // Check if token is blacklisted (optional security feature)
// const isTokenBlacklisted = async (token: string): Promise<boolean> => {
//   if (process.env.ENABLE_TOKEN_BLACKLIST !== 'true') {
//     return false;
//   }

//   try {
//     const blacklistedToken = await prisma.tokenBlacklist.findUnique({
//       where: { token }
//     });
//     return !!blacklistedToken;
//   } catch (error) {
//     console.error('Token blacklist check error:', error);
//     return false;
//   }
// };

// // Verify JWT token
// export const authenticateToken = async (
//   req: IAuthenticatedRequest, 
//   res: Response, 
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access token is required'
//       });
//     }

//     // Check if token is blacklisted
//     if (await isTokenBlacklisted(token)) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token has been revoked'
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
    
//     // Check if user still exists and is active
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId }
//     });

//     if (!user || !user.isActive) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token - user not found or inactive'
//       });
//     }

//     // Add user info to request
//     req.user = decoded;
//     req.userDoc = user;
//     next();

//   } catch (error: any) {
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Token has expired'
//       });
//     }
    
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token'
//       });
//     }

//     console.error('Auth middleware error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Check if user has specific role by role name (dynamic)
// export const hasRole = (roleName: string) => {
//   return async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       const hasRequiredRole = req.user.roles.some(role => role.name === roleName);

//       if (!hasRequiredRole) {
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. '${roleName}' role required.`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Role check error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   };
// };

// // Check if user has any of the specified roles (dynamic)
// export const hasAnyRole = (roleNames: string[]) => {
//   return async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       const hasRequiredRole = req.user.roles.some(role => 
//         roleNames.includes(role.name)
//       );
      
//       if (!hasRequiredRole) {
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. One of these roles required: ${roleNames.join(', ')}`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Role check error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   };
// };

// // Check if user has specific permission (dynamic)
// export const hasPermission = (resource: string, action: string) => {
//   return async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       // Check permissions from JWT payload (faster than DB query)
//       let hasRequiredPermission = false;
      
//       for (const role of req.user.roles) {
//         for (const permission of role.permissions) {
//           if (permission.resource === resource && permission.action === action) {
//             hasRequiredPermission = true;
//             break;
//           }
//         }
//         if (hasRequiredPermission) break;
//       }

//       if (!hasRequiredPermission) {
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. Permission required: ${action} on ${resource}`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Permission check error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   };
// };

// // Check if user has any of the specified permissions
// export const hasAnyPermission = (permissions: Array<{ resource: string; action: string }>) => {
//   return async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       let hasRequiredPermission = false;
      
//       for (const role of req.user.roles) {
//         for (const userPermission of role.permissions) {
//           for (const requiredPermission of permissions) {
//             if (userPermission.resource === requiredPermission.resource && 
//                 userPermission.action === requiredPermission.action) {
//               hasRequiredPermission = true;
//               break;
//             }
//           }
//           if (hasRequiredPermission) break;
//         }
//         if (hasRequiredPermission) break;
//       }

//       if (!hasRequiredPermission) {
//         const permissionStrings = permissions.map(p => `${p.action} on ${p.resource}`);
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. One of these permissions required: ${permissionStrings.join(', ')}`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Permission check error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   };
// };

// // Check if user has ALL specified permissions
// export const hasAllPermissions = (permissions: Array<{ resource: string; action: string }>) => {
//   return async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }

//       // Get all user permissions
//       const userPermissions: Array<{ resource: string; action: string }> = [];
//       req.user.roles.forEach(role => {
//         role.permissions.forEach(permission => {
//           userPermissions.push({
//             resource: permission.resource,
//             action: permission.action
//           });
//         });
//       });

//       // Check if user has all required permissions
//       const hasAllRequired = permissions.every(requiredPerm => 
//         userPermissions.some(userPerm => 
//           userPerm.resource === requiredPerm.resource && 
//           userPerm.action === requiredPerm.action
//         )
//       );

//       if (!hasAllRequired) {
//         const permissionStrings = permissions.map(p => `${p.action} on ${p.resource}`);
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. All these permissions required: ${permissionStrings.join(', ')}`
//         });
//       }

//       next();
//     } catch (error) {
//       console.error('Permission check error:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   };
// };

// // Optional authentication - doesn't fail if no token
// export const optionalAuth = async (
//   req: IAuthenticatedRequest, 
//   res: Response, 
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token && !(await isTokenBlacklisted(token))) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
//       const user = await prisma.user.findUnique({
//         where: { id: decoded.userId }
//       });
      
//       if (user && user.isActive) {
//         req.user = decoded;
//         req.userDoc = user;
//       }
//     }

//     next();
//   } catch (error) {
//     // Continue without authentication
//     next();
//   }
// };

// // ================================================================
// // routes/authRoutes.ts
// import { Router } from 'express';
// import { body, validationResult } from 'express-validator';
// import { AuthController } from '../controllers/authController';
// import { authenticateToken } from '../middleware/authMiddleware';
// import { IAuthenticatedRequest } from '../types/auth.types';

// const router = Router();

// // Validation middleware
// const validateLogin = [
//   body('email')
//     .isEmail()
//     .normalizeEmail()
//     .withMessage('Please provide a valid email'),
//   body('password')
//     .notEmpty()
//     .withMessage('Password is required')
// ];

// const validatePasswordChange = [
//   body('currentPassword')
//     .notEmpty()
//     .withMessage('Current password is required'),
//   body('newPassword')
//     .isLength({ min: 6 })
//     .withMessage('New password must be at least 6 characters long')
//     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//     .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
// ];

// const handleValidationErrors = (req: IAuthenticatedRequest, res: any, next: any) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       success: false,
//       message: 'Validation errors',
//       errors: errors.array()
//     });
//   }
//   next();
// };

// // Public routes
// router.post('/login', validateLogin, handleValidationErrors, AuthController.login);
// router.post('/refresh-token', AuthController.refreshToken);

// // Protected routes
// router.post('/logout', authenticateToken, AuthController.logout);
// router.get('/profile', authenticateToken, AuthController.getProfile);
// router.post('/change-password', 
//   authenticateToken, 
//   validatePasswordChange, 
//   handleValidationErrors, 
//   AuthController.changePassword
// );

// export default router;

// // ================================================================
// // utils/permissionChecker.ts
// import { IJwtPayload } from '../types/auth.types';

// export class PermissionChecker {
//   /**
//    * Check if user has specific permission
//    */
//   static hasPermission(
//     user: IJwtPayload, 
//     resource: string, 
//     action: string
//   ): boolean {
//     return user.roles.some(role =>
//       role.permissions.some(permission =>
//         permission.resource === resource && permission.action === action
//       )
//     );
//   }

//   /**
//    * Check if user has specific role
//    */
//   static hasRole(user: IJwtPayload, roleName: string): boolean {
//     return user.roles.some(role => role.name === roleName);
//   }

//   /**
//    * Check if user has any of the specified roles
//    */
//   static hasAnyRole(user: IJwtPayload, roleNames: string[]): boolean {
//     return user.roles.some(role => roleNames.includes(role.name));
//   }

//   /**
//    * Get all user permissions
//    */
//   static getUserPermissions(user: IJwtPayload): Array<{ resource: string; action: string }> {
//     const permissions: Array<{ resource: string; action: string }> = [];
//     user.roles.forEach(role => {
//       role.permissions.forEach(permission => {
//         permissions.push({
//           resource: permission.resource,
//           action: permission.action
//         });
//       });
//     });
//     return permissions;
//   }

//   /**
//    * Get all user roles
//    */
//   static getUserRoles(user: IJwtPayload): string[] {
//     return user.roles.map(role => role.name);
//   }
// }

// // ================================================================
// // Example: services/userService.ts (CRUD operations with Prisma)
// import { prisma } from '../lib/prisma';
// import bcrypt from 'bcrypt';

// export class UserService {
//   // Create user with roles
//   static async createUser(data: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     roleIds: string[];
//   }) {
//     const hashedPassword = await bcrypt.hash(data.password, 12);

//     return await prisma.user.create({
//       data: {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         password: hashedPassword,
//         userRoles: {
//           create: data.roleIds.map(roleId => ({
//             roleId
//           }))
//         }
//       },
//       include: {
//         userRoles: {
//           include: {
//             role: true
//           }
//         }
//       }
//     });
//   }

//   // Assign role to user
//   static async assignRoleToUser(userId: string, roleId: string) {
//     return await prisma.userRole.create({
//       data: {
//         userId,
//         roleId
//       }
//     });
//   }

//   // Remove role from user
//   static async removeRoleFromUser(userId: string, roleId: string) {
//     return await prisma.userRole.delete({
//       where: {
//         userId_roleId: {
//           userId,
//           roleId
//         }
//       }
//     });
//   }

//   // Get user with roles and permissions
//   static async getUserWithRoles(userId: string) {
//     return await prisma.user.findUnique({
//       where: { id: userId },
//       include: {
//         userRoles: {
//           include: {
//             role: {
//               include: {
//                 rolePermissions: {
//                   include: {
//                     permission: true
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     });
//   }
// }

// // ================================================================
// // Migration command example
// /*
// npx prisma migrate dev --name init
// npx prisma generate
// */

// // ================================================================
// // .env file
// /*
// # Database
// DATABASE_URL="postgresql://username:password@localhost:5432/school_management?schema=public"

// # JWT Configuration
// JWT_SECRET=your-super-secret-jwt-key-32-characters-minimum-length
// REFRESH_TOKEN_SECRET=different-refresh-token-secret-32-chars-min
// JWT_EXPIRES_IN=15m
// REFRESH_TOKEN_EXPIRES_IN=7d

// # Optional: Enable token blacklisting for enhanced security
// ENABLE_TOKEN_BLACKLIST=false

// # Server
// PORT=3000
// NODE_ENV=development

// # Security
// BCRYPT_SALT_ROUNDS=12
// */

// // ================================================================
// // Package.json dependencies
// /*
// {
//   "dependencies": {
//     "@prisma/client": "^5.7.0",
//     "express": "^4.18.2",
//     "bcrypt": "^5.1.1",
//     "jsonwebtoken": "^9.0.2",
//     "express-validator": "^7.0.1",
//     "express-rate-limit": "^7.1.5",
//     "cors": "^2.8.5",
//     "dotenv": "^16.3.1"
//   },
//   "devDependencies": {
//     "@types/node": "^20.10.0",
//     "@types/express": "^4.17.21",
//     "@types/bcrypt": "^5.