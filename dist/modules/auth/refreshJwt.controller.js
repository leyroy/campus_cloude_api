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
const http_status_1 = require("../../constants/http-status");
const auth_services_1 = require("./auth.services");
const cookie_1 = require("../../utils/cookie");
const authService = new auth_services_1.AuthService();
const refreshJwtController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { campus_cloud_refreshToken } = req.cookies;
    if (!campus_cloud_refreshToken) {
        throw new errorHandler_1.AppError({
            message: 'Refresh Token was not found',
            statusCode: http_status_1.HTTPSTATUS.NO_CONTENT,
            errorCode: "AUTH_REFRESH_TOKEN_NOT_FOUND" /* ErrorCode.AUTH_REFRESH_TOKEN_NOT_FOUND */,
        });
    }
    const { accessToken, refreshToken: newRefreshToken } = yield authService.refreshToken(campus_cloud_refreshToken);
    if (newRefreshToken) {
        res.cookie('campus_cloud_refreshToken', newRefreshToken, (0, cookie_1.getRefreshTokenCookieOptions)());
    }
    return res
        .status(http_status_1.HTTPSTATUS.OK)
        .cookie('campus_cloud_accessToken', accessToken, (0, cookie_1.getAccessTokenCookieOptions)())
        .json({
        message: 'Refresh access token successfully',
    });
});
exports.default = refreshJwtController;
