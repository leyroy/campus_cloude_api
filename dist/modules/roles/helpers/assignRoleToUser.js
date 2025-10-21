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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRoleToUser = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const errorHandler_1 = require("../../../middlewares/errorHandler");
const commonDbServices_1 = require("../../../utils/db/commonDbServices");
const assignRoleToUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ roleId, userId, assignedById }) {
    if (!roleId || !userId || !assignedById) {
        throw errorHandler_1.ErrorHandler.badRequest('Cannot perform this action');
    }
    try {
        const user = yield commonDbServices_1.commonDbService.getUserById(userId);
        if (!user) {
            throw errorHandler_1.ErrorHandler.notFound('User not found');
        }
        const role = yield commonDbServices_1.commonDbService.getRoleById(roleId);
        if (!role) {
            throw errorHandler_1.ErrorHandler.notFound('Role not found');
        }
        // Create user role association
        yield prisma_config_1.default.userRole.create({
            data: {
                userId,
                roleId,
                assignedById: assignedById,
            },
        });
        yield commonDbServices_1.commonDbService.getRoles();
        return {
            message: 'Role assigned successfully',
            success: true,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.assignRoleToUser = assignRoleToUser;
