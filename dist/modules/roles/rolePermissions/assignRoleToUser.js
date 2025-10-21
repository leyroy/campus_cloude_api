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
exports.assignRoleToUserController = void 0;
const errorHandler_1 = require("../../../middlewares/errorHandler");
const assignRoleToUser_1 = require("../helpers/assignRoleToUser");
const assignRoleToUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, assignedById, roleId } = req.body;
    const results = (yield (0, assignRoleToUser_1.assignRoleToUser)({ userId, assignedById, roleId }));
    if (!(results === null || results === void 0 ? void 0 : results.success) || !results) {
        next(errorHandler_1.ErrorHandler.badRequest("Failed to assign role"));
    }
    res.status(200).json(Object.assign({}, results));
});
exports.assignRoleToUserController = assignRoleToUserController;
