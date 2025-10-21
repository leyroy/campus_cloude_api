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
exports.getRoles = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield prisma_config_1.default.role.findMany({
        include: {
            rolePermissions: {
                include: {
                    permission: true,
                },
            },
            userRoles: {
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                            id: true,
                            isActive: true,
                            schoolId: true,
                        },
                    },
                },
            },
        },
    });
    //format to the structure {roleId, roleName, permissions: [permission1, permission2, ...]}
    return roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        isActive: role.isActive,
        permissions: role.rolePermissions.map((rp) => rp.permission),
        users: role.userRoles.map((ur) => ur.user),
    }));
});
exports.getRoles = getRoles;
