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
exports.addRolePermissionsHelper = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const errorHandler_1 = require("../../../middlewares/errorHandler");
const addRolePermissionsHelper = (roleId, permissionIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Optional: Validate that the IDs actually exist in DB (skip for speed if trusted)
        const validPermissions = yield prisma_config_1.default.permission.findMany({
            where: { id: { in: permissionIds } },
            select: { id: true },
        });
        if (validPermissions.length !== permissionIds.length) {
            const foundIds = validPermissions.map((p) => p.id);
            const missing = permissionIds.filter((id) => !foundIds.includes(id));
            throw errorHandler_1.ErrorHandler.notFound(`Some permissions not found: ${missing.join(', ')}`);
        }
        const data = permissionIds.map((permissionId) => ({
            roleId,
            permissionId,
        }));
        //remove exiting pemission if already added in the
        yield prisma_config_1.default.$transaction((ct) => __awaiter(void 0, void 0, void 0, function* () {
            yield ct.rolePermission.deleteMany({ where: { roleId } });
            yield ct.rolePermission.createMany({
                data,
                skipDuplicates: true,
            });
        }));
        return { success: true, message: 'Permissions added successfully' };
    }
    catch (error) {
        throw error; // Re-throw known errors
    }
});
exports.addRolePermissionsHelper = addRolePermissionsHelper;
