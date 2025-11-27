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
const errorHandler_1 = require("../../middlewares/errorHandler");
const prismaErrorHandler_1 = require("../../utils/prismaErrorHandler");
const auth_validator_1 = require("./auth.validator");
const auth_services_1 = require("./auth.services");
const http_status_1 = require("../../constants/http-status");
const cookie_1 = require("../../utils/cookie");
const node_mailer_1 = __importDefault(require("../../mailers/node-mailer"));
const authService = new auth_services_1.AuthService();
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const isValidData = auth_validator_1.loginSchema.safeParse(data);
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    if (!isValidData.success || !isValidData.data.email) {
        console.error('Validation failed:', isValidData.error);
        throw errorHandler_1.ErrorHandler.badRequest(`Invalid data: ${(_a = isValidData === null || isValidData === void 0 ? void 0 : isValidData.error) === null || _a === void 0 ? void 0 : _a.message}`);
    }
    try {
        const { refreshToken, accessToken, isEmailVerified, code, token } = yield authService.loginUser(Object.assign(Object.assign({}, isValidData.data), { userAgent,
            ipAddress }));
        if (!isEmailVerified) {
            (0, node_mailer_1.default)({
                value: code || '',
                template: 'otp.mjml',
                subject: 'Verify your email',
                to: isValidData.data.email,
            });
            return res.status(http_status_1.HTTPSTATUS.OK).json({
                isEmailVerified,
                refreshToken,
                accessToken,
                token: token,
                message: 'Email has been sent to your account, Please verify your email to continue',
            });
        }
        return (0, cookie_1.setAuthenticationCookies)({
            res,
            accessToken,
            refreshToken,
        })
            .status(http_status_1.HTTPSTATUS.OK)
            .json({
            message: 'User login successfully',
            refreshToken,
            accessToken,
            isEmailVerified,
        });
    }
    catch (error) {
        if (error instanceof errorHandler_1.ErrorHandler) {
            return next(error);
        }
        (0, prismaErrorHandler_1.handlePrismaError)(error);
        throw errorHandler_1.ErrorHandler.internal('An error occurred during login');
    }
});
exports.default = loginController;
