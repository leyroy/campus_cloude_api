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
const password_services_1 = require("./password.services");
const errorHandler_1 = require("../../middlewares/errorHandler");
const node_mailer_1 = __importDefault(require("../../mailers/node-mailer"));
const http_status_1 = require("../../constants/http-status");
const env_constants_1 = require("../../constants/env_constants");
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            throw errorHandler_1.ErrorHandler.badRequest('Email is required for password operations');
        }
        const forgotPasswordToken = yield password_services_1.passwordServices.forgotPassword(email);
        if (!forgotPasswordToken) {
            throw errorHandler_1.ErrorHandler.notFound('No account was found with the provided email');
        }
        //TODO: Update the reset link to point to the frontend application and design a reset password email template
        const resetLink = `${env_constants_1.ENV_CONSTANTS.FRONTEND_BASE_PATH}/reset-password?token=${forgotPasswordToken.token}`;
        yield (0, node_mailer_1.default)({
            to: email,
            subject: 'Password Reset Request',
            template: './src/mailers/templates/password-reset.mjml',
            value: resetLink,
        });
        res
            .status(http_status_1.HTTPSTATUS.OK)
            .json({ success: true, message: 'Password reset email sent successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = forgotPassword;
