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
const password_services_1 = require("./password.services");
const http_status_1 = require("../../constants/http-status");
const changePasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.userId;
    const { message } = yield password_services_1.passwordServices.changePassword({
        oldPassword,
        newPassword,
        userId,
    });
    res.status(http_status_1.HTTPSTATUS.OK).json({ success: true, message });
});
exports.default = changePasswordController;
