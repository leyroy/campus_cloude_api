"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../../middlewares/errorHandler");
const createDocument_controller_1 = __importDefault(require("./createDocument.controller"));
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const documentRouter = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
documentRouter.use(catchAsync(authenticateToken_1.authenticateToken));
documentRouter.post('/upload-photo', createDocument_controller_1.default);
exports.default = documentRouter;
