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
exports.createUserController = void 0;
const user_1 = require("../../../types/zodschemers/user");
const errorHandler_1 = require("../../../middlewares/errorHandler");
const createUserHalepr_1 = require("../services/createUserHalepr");
const errorHnadler = new errorHandler_1.ErrorHandler();
exports.createUserController = errorHnadler.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = user_1.UserSchema.safeParse(data);
    if (!user.success) {
        console.log(user.error, user.success, user.data);
        throw errorHandler_1.ErrorHandler.badRequest('Invalid user data');
    }
    const response = yield (0, createUserHalepr_1.createUserHelper)(data);
    return res.status(201).json({
        success: true,
        message: response.message,
    });
}));
exports.default = exports.createUserController;
