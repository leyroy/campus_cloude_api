"use strict";
// import { NextFunction, Request, Response } from "express";
// class AuthController {
//   // Login user
//   static async login(req, res) {
//     try {
//       const { email, password } = req.body;
//       // Validate input
//       if (!email || !password) {
//         return res.status(400).json({
//           success: false,
//           message: 'Email and password are required'
//         });
//       }
//       // Find user with roles and permissions
//       const user = await User.findOne({ email })
//         .populate({
//           path: 'roles',
//           populate: {
//             path: 'permissions',
//             select: 'name resource action'
//           }
//         })
//         .select('+password');
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
//       // Generate tokens
//       const { accessToken, refreshToken } = await AuthController.generateTokens(user);
//       // Update last login
//       user.lastLoginAt = new Date();
//       await user.save();
//       // Prepare user data (without password)
//       const userData = {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         roles: user.roles.map(role => ({
//           id: role._id,
//           name: role.name,
//           permissions: role.permissions
//         })),
//         lastLoginAt: user.lastLoginAt
//       };
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
//   static async refreshToken(req, res) {
//     try {
//       const { refreshToken } = req.body;
//       if (!refreshToken) {
//         return res.status(401).json({
//           success: false,
//           message: 'Refresh token is required'
//         });
//       }
//       // Verify refresh token
//       const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//       // Find user
//       const user = await User.findById(decoded.userId)
//         .populate({
//           path: 'roles',
//           populate: {
//             path: 'permissions',
//             select: 'name resource action'
//           }
//         });
//       if (!user || !user.isActive) {
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid refresh token'
//         });
//       }
//       // Generate new access token
//       const accessToken = jwt.sign(
//         { 
//           userId: user._id,
//           email: user.email,
//           roles: user.roles.map(role => role.name)
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
//       );
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
//   // Logout user
//   static async logout(req, res) {
//     try {
//       // In a more advanced system, you might want to blacklist the token
//       // For now, we'll just send a success response
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
//   static async getProfile(req, res) {
//     try {
//       const user = await User.findById(req.user.userId)
//         .populate({
//           path: 'roles',
//           populate: {
//             path: 'permissions',
//             select: 'name resource action'
//           }
//         })
//         .select('-password');
//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: 'User not found'
//         });
//       }
//       res.status(200).json({
//         success: true,
//         data: { user }
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
//   static async changePassword(req, res) {
//     try {
//       const { currentPassword, newPassword } = req.body;
//       const userId = req.user.userId;
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
//       const user = await User.findById(userId).select('+password');
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
//       user.password = hashedPassword;
//       await user.save();
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
//   // Helper method to generate tokens
//   static async generateTokens(user) {
//     const payload = {
//       userId: user._id,
//       email: user.email,
//       roles: user.roles.map(role => role.name)
//     };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
//     );
//     const refreshToken = jwt.sign(
//       { userId: user._id },
//       process.env.REFRESH_TOKEN_SECRET,
//       { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
//     );
//     return { accessToken, refreshToken };
//   }
// }
// export default AuthController;
// // ================================================================
// // middleware/authMiddleware.js
// // Verify JWT token
// const authenticateToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access token is required'
//       });
//     }
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Check if user still exists and is active
//     const user = await User.findById(decoded.userId).select('-password');
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
//   } catch (error) {
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
// // Check if user has specific role
// const hasRole = (roleName: string) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }
//       if (!req.user.roles.includes(roleName)) {
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. ${roleName} role required.`
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
// // Check if user has any of the specified roles
// const hasAnyRole = (roles) => {
//   return async (req, res, next) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }
//       const hasRequiredRole = roles.some(role => req.user.roles.includes(role));
//       if (!hasRequiredRole) {
//         return res.status(403).json({
//           success: false,
//           message: `Access denied. One of these roles required: ${roles.join(', ')}`
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
// // Check if user has specific permission
// const hasPermission = (resource, action) => {
//   return async (req, res, next) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication required'
//         });
//       }
//       // Get user with populated roles and permissions
//       const user = await User.findById(req.user.userId)
//         .populate({
//           path: 'roles',
//           populate: {
//             path: 'permissions',
//             select: 'name resource action'
//           }
//         });
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'User not found'
//         });
//       }
//       // Check if user has the required permission
//       let hasRequiredPermission = false;
//       for (const role of user.roles) {
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
// // Optional authentication - doesn't fail if no token
// const optionalAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.userId).select('-password');
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
// module.exports = {
//   authenticateToken,
//   hasRole,
//   hasAnyRole,
//   hasPermission,
//   optionalAuth
// };
// // ================================================================
// // routes/authRoutes.js
// const express = require('express');
// const AuthController = require('../auth/authController');
// const { authenticateToken } = require('../middleware/authMiddleware');
// const { body, validationResult } = require('express-validator');
// const router = express.Router();
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
// ];
// const handleValidationErrors = (req, res, next) => {
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
// module.exports = router;
// // ================================================================
// // Example usage in app.js
// /*
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const { authenticateToken, hasRole, hasPermission } = require('./middleware/authMiddleware');
// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Routes
// app.use('/api/auth', authRoutes);
// // Example protected routes
// app.get('/api/admin/users', 
//   authenticateToken, 
//   hasRole('admin'), 
//   (req, res) => {
//     res.json({ message: 'Admin users list' });
//   }
// );
// app.get('/api/students', 
//   authenticateToken, 
//   hasPermission('students', 'read'), 
//   (req, res) => {
//     res.json({ message: 'Students list' });
//   }
// );
// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!'
//   });
// });
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// */
// // ================================================================
// // models/TokenBlacklist.js (Optional - for more secure logout)
// const mongoose = require('mongoose');
// const tokenBlacklistSchema = new mongoose.Schema({
//   token: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   expiresAt: {
//     type: Date,
//     required: true,
//     index: { expireAfterSeconds: 0 } // Auto-delete expired tokens
//   }
// }, {
//   timestamps: true
// });
// module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
// // ================================================================
// // utils/rateLimiter.js
// const rateLimit = require('express-rate-limit');
// // Rate limiter for login attempts
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // Limit each IP to 5 requests per windowMs
//   message: {
//     success: false,
//     message: 'Too many login attempts, please try again later.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
//   // Skip successful requests
//   skipSuccessfulRequests: true
// });
// // General API rate limiter
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: {
//     success: false,
//     message: 'Too many requests, please try again later.'
//   }
// });
// module.exports = {
//   loginLimiter,
//   apiLimiter
// };
// // ================================================================
// // utils/validation.js
// const { body } = require('express-validator');
// const authValidation = {
//   login: [
//     body('email')
//       .isEmail()
//       .normalizeEmail()
//       .withMessage('Please provide a valid email'),
//     body('password')
//       .notEmpty()
//       .withMessage('Password is required')
//       .isLength({ min: 1 })
//       .withMessage('Password cannot be empty')
//   ],
//   changePassword: [
//     body('currentPassword')
//       .notEmpty()
//       .withMessage('Current password is required'),
//     body('newPassword')
//       .isLength({ min: 6 })
//       .withMessage('New password must be at least 6 characters long')
//       .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
//       .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
//   ],
//   refreshToken: [
//     body('refreshToken')
//       .notEmpty()
//       .withMessage('Refresh token is required')
//   ]
// };
// module.exports = { authValidation };
// // ================================================================
// // Example API endpoints usage
// /*
// // Student routes example
// const express = require('express');
// const router = express.Router();
// const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');
// // Get all students (requires read permission)
// router.get('/', 
//   authenticateToken, 
//   hasPermission('students', 'read'), 
//   async (req, res) => {
//     // Your logic here
//   }
// );
// // Create student (requires create permission)
// router.post('/', 
//   authenticateToken, 
//   hasPermission('students', 'create'), 
//   async (req, res) => {
//     // Your logic here
//   }
// );
// // Update student (requires update permission)
// router.put('/:id', 
//   authenticateToken, 
//   hasPermission('students', 'update'), 
//   async (req, res) => {
//     // Your logic here
//   }
// );
// // Delete student (requires delete permission)
// router.delete('/:id', 
//   authenticateToken, 
//   hasPermission('students', 'delete'), 
//   async (req, res) => {
//     // Your logic here
//   }
// );
// module.exports = router;
// */
// // ================================================================
// // Frontend usage examples
// /*
// // Login function (Frontend JavaScript)
// async function login(email, password) {
//   try {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await response.json();
//     if (data.success) {
//       // Store tokens
//       localStorage.setItem('accessToken', data.data.accessToken);
//       localStorage.setItem('refreshToken', data.data.refreshToken);
//       localStorage.setItem('user', JSON.stringify(data.data.user));
//       return data.data;
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// }
// // API request with token
// async function makeAuthenticatedRequest(url, options = {}) {
//   const token = localStorage.getItem('accessToken');
//   const config = {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//       ...options.headers
//     }
//   };
//   let response = await fetch(url, config);
//   // If token expired, try to refresh
//   if (response.status === 401) {
//     const refreshed = await refreshAccessToken();
//     if (refreshed) {
//       config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
//       response = await fetch(url, config);
//     }
//   }
//   return response;
// }
// // Refresh token function
// async function refreshAccessToken() {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) return false;
//     const response = await fetch('/api/auth/refresh-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ refreshToken })
//     });
//     const data = await response.json();
//     if (data.success) {
//       localStorage.setItem('accessToken', data.data.accessToken);
//       return true;
//     } else {
//       // Refresh failed, redirect to login
//       logout();
//       return false;
//     }
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     logout();
//     return false;
//   }
// }
// // Logout function
// async function logout() {
//   try {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       await fetch('/api/auth/logout', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//     }
//   } catch (error) {
//     console.error('Logout error:', error);
//   } finally {
//     // Clear local storage
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     // Redirect to login page
//     window.location.href = '/login';
//   }
// }
// */
// // ================================================================
// // .env file example
// /*
// # JWT Configuration
// JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex-at-least-32-characters
// REFRESH_TOKEN_SECRET=your-refresh-token-secret-different-from-jwt-also-32-chars-minimum
// JWT_EXPIRES_IN=15m
// REFRESH_TOKEN_EXPIRES_IN=7d
// # Database
// MONGODB_URI=mongodb://localhost:27017/school_management
// # Server
// PORT=3000
// NODE_ENV=development
// # Security
// BCRYPT_SALT_ROUNDS=12
// RATE_LIMIT_WINDOW_MS=900000
// RATE_LIMIT_MAX_REQUESTS=100
// LOGIN_RATE_LIMIT_MAX=5
// */
