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
const errorHandler_1 = require("../../middlewares/errorHandler");
const auth_services_1 = require("./auth.services");
const http_status_1 = require("../../constants/http-status");
const authService = new auth_services_1.AuthService();
const verifyEmailController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, code } = req.body;
        if (!token) {
            throw errorHandler_1.ErrorHandler.badRequest('Verification Token is required');
        }
        const results = yield authService.verifyEmail(token, code);
        if (!results)
            throw errorHandler_1.ErrorHandler.badRequest('Invalid verification token or it has expired');
        res.status(http_status_1.HTTPSTATUS.OK).json({
            success: results,
            message: 'Your email is successfully verified, please log in to your account',
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = verifyEmailController;
