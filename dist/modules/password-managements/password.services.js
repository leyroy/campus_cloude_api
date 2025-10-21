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
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordServices = void 0;
const client_1 = require("@prisma/client");
const errorHandler_1 = require("../../middlewares/errorHandler");
const commonDbServices_1 = require("../../utils/db/commonDbServices");
const helpers_1 = require("../auth/helpers");
const passwordHelper_1 = require("./passwordHelper");
const date_time_1 = require("../../utils/date-time");
const passwordMnager_1 = require("../../services/passwordMnager");
const http_status_1 = require("../../constants/http-status");
const commonDbServices = new commonDbServices_1.CommonDbServices();
const authHelpers = new helpers_1.AuthHelpers();
class PasswordServices {
    constructor(passwordHelper) {
        this.passwordHelper = passwordHelper;
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield commonDbServices.getUserByEmail(email);
            if (!user) {
                throw errorHandler_1.ErrorHandler.notFound(`No account was found with the provided email: ${email}`);
            }
            //check mail rate limit is 2 emails per 3 or 10 min
            const timeAgo = (0, date_time_1.threeMinutesAgo)();
            const maxAttempts = 2;
            const recentAttempts = yield this.passwordHelper.getRecentPasswordResetAttempts(user.id, timeAgo);
            if (recentAttempts.length >= maxAttempts) {
                throw errorHandler_1.ErrorHandler.badRequest(`You have exceeded the maximum number of password reset emails. Please try again later.`);
            }
            const forgotPasswordToken = authHelpers.createVerificationCode({
                type: client_1.VerificationType.PASSWORD_RESET,
                userId: user.id,
                expires: (0, date_time_1.calculateExpirationDate)(),
            });
            return forgotPasswordToken;
        });
    }
    resetPassword(token, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationCode = yield commonDbServices.getVerificationCode(token, "PASSWORD_RESET" /* VerificationEnum.PASSWORD_RESET */);
            if (!verificationCode) {
                throw errorHandler_1.ErrorHandler.notFound('Invalid password reset token');
            }
            if (verificationCode.expires < new Date()) {
                throw errorHandler_1.ErrorHandler.badRequest('Password reset token has expired');
            }
            const user = yield commonDbServices.getUserById(verificationCode.identifier);
            if (!user) {
                throw errorHandler_1.ErrorHandler.notFound('User not found for the provided token');
            }
            const hashedPassword = yield passwordMnager_1.passwordManager.hashPassword(newPassword);
            const isSamePassword = passwordMnager_1.passwordManager.verifyPassword(newPassword, user.password);
            if (isSamePassword) {
                throw errorHandler_1.ErrorHandler.badRequest('New password cannot be the same as the old password');
            }
            const updatedUser = yield this.passwordHelper.updateUserPassword(user.id, hashedPassword);
            if (!updatedUser) {
                throw errorHandler_1.ErrorHandler.internal('Failed to update user password');
            }
            yield commonDbServices.deleteVerificationCode(verificationCode.id);
            return { message: 'Password has been successfully reset' };
        });
    }
    changePassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, oldPassword, newPassword }) {
            const user = yield commonDbServices.getUserById(userId);
            if (!user) {
                throw errorHandler_1.ErrorHandler.notFound('User not found');
            }
            const isOldPasswordValid = passwordMnager_1.passwordManager.verifyPassword(oldPassword, user.password);
            const isSamePassword = passwordMnager_1.passwordManager.verifyPassword(newPassword, user.password);
            if (!isOldPasswordValid) {
                throw new errorHandler_1.AppError({
                    message: 'Invalid old password',
                    statusCode: http_status_1.HTTPSTATUS.UNAUTHORIZED,
                    errorCode: "INVALID_PASSWORD" /* ErrorCode.INVALID_PASSWORD */,
                });
            }
            const hashedNewPassword = yield passwordMnager_1.passwordManager.hashPassword(newPassword);
            if (isSamePassword) {
                throw errorHandler_1.ErrorHandler.badRequest('New password cannot be the same as the old password');
            }
            const updatedUser = yield this.passwordHelper.updateUserPassword(user.id, hashedNewPassword);
            if (!updatedUser) {
                throw errorHandler_1.ErrorHandler.internal('Failed to update user password');
            }
            return { message: 'Password has been successfully changed' };
        });
    }
}
exports.passwordServices = new PasswordServices(new passwordHelper_1.PasswordHelper());
