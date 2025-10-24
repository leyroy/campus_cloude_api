"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const errorHandler_1 = require("./errorHandler");
const http_status_1 = require("../constants/http-status");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campus_cloud_accessToken: token } = req.cookies;
        if (!token) {
            throw new errorHandler_1.AppError({
                message: 'No token provided',
                statusCode: http_status_1.HTTPSTATUS.UNAUTHORIZED,
                errorCode: "AUTH_TOKEN_NOT_FOUND" /* ErrorCode.AUTH_TOKEN_NOT_FOUND */,
            });
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Check if user still exists and is active
        const user = yield prisma_config_1.default.user.findUnique({ where: { id: decoded.userId } });
        const islogOutPaht = req.path === '/logou';
        console.log(req.path);
        if (!user) {
            throw new errorHandler_1.AppError({
                message: 'User not found or inactive',
                statusCode: http_status_1.HTTPSTATUS.UNAUTHORIZED,
                errorCode: "AUTH_USER_NOT_FOUND" /* ErrorCode.AUTH_USER_NOT_FOUND */,
            });
        }
        if (!user.isEmailVerified && !islogOutPaht) {
            throw errorHandler_1.ErrorHandler.badRequest('Please kindly verify your account');
        }
        // Add user info to request
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        next(error);
    }
});
exports.authenticateToken = authenticateToken;
