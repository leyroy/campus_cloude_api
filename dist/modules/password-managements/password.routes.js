"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resetPassword_controller_1 = __importDefault(require("./resetPassword.controller"));
const forgotPassword_controller_1 = __importDefault(require("./forgotPassword.controller"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const changPassword_controller_1 = __importDefault(require("./changPassword.controller"));
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const passwordRoutes = (0, express_1.Router)();
const errorHandler = new errorHandler_1.ErrorHandler();
passwordRoutes.post('/forgot-password', errorHandler.catchAsync(forgotPassword_controller_1.default));
passwordRoutes.put('/reset-password/:token', errorHandler.catchAsync(resetPassword_controller_1.default));
passwordRoutes.use(errorHandler.catchAsync(authenticateToken_1.authenticateToken));
passwordRoutes.put('/change-password', errorHandler.catchAsync(changPassword_controller_1.default));
exports.default = passwordRoutes;
