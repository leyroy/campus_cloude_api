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
const authService = new auth_services_1.AuthService();
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const results = yield authService.registerUser(data);
    if (!results.success) {
        throw errorHandler_1.ErrorHandler.badRequest(results.message);
    }
    res.status(200).json({
        success: true,
        token: results.token,
        message: 'User registered successfully',
    });
});
exports.default = signUpController;
