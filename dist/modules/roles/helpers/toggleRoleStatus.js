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
exports.toggleRoleStatus = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const errorHandler_1 = require("../../../middlewares/errorHandler");
const toggleRoleStatus = (roleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield prisma_config_1.default.role.findUnique({ where: { id: roleId } });
        if (!role) {
            throw errorHandler_1.ErrorHandler.badRequest('Role not found');
        }
        yield prisma_config_1.default.role.update({
            where: { id: roleId },
            data: { isActive: !role.isActive },
        });
        return {
            message: `Role has been ${role.isActive ? 'deactivated' : 'activated'} successfully`,
            success: true,
        };
    }
    catch (error) {
        throw error;
    }
});
exports.toggleRoleStatus = toggleRoleStatus;
