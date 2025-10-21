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
const errorHandler_1 = require("./errorHandler");
const commonDbServices_1 = require("../utils/db/commonDbServices");
const hasPermissions_1 = require("../utils/hasPermissions");
const permissionHandler = ({ resource, action }) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req === null || req === void 0 ? void 0 : req.user;
        if (!user || !user.userId) {
            throw errorHandler_1.ErrorHandler.unauthorized('Please log in to access this resource');
        }
        try {
            // 🎯 Handle controllerName logic here neger 😎
            const isUserExit = yield commonDbServices_1.commonDbService.getUserById(user.userId);
            if (!isUserExit) {
                throw errorHandler_1.ErrorHandler.unauthorized('Please log in and try agian');
            }
            const hasPemissionPayload = {
                userId: user.userId,
                resource: resource,
                action,
            };
            if (!(yield (0, hasPermissions_1.hasPermission)(hasPemissionPayload))) {
                throw errorHandler_1.ErrorHandler.forbidden(`You're not allowed to ${action} ${resource}`);
            }
            next();
        }
        catch (error) {
            console.log('error from pemissionManager', error);
            next(error);
        }
    });
};
exports.default = permissionHandler;
