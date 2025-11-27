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
exports.logoutController = logoutController;
const commonDbServices_1 = require("../../utils/db/commonDbServices");
const cookie_1 = require("../../utils/cookie");
const http_status_1 = require("../../constants/http-status");
function logoutController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        console.log('User logging out:', user);
        if (user && user.sessionId) {
            yield commonDbServices_1.commonDbService.deleteSession(user.sessionId);
        }
        (0, cookie_1.clearAuthenticationCookies)(res).status(http_status_1.HTTPSTATUS.OK).json({
            success: true,
            message: 'Logout successful',
        });
    });
}
