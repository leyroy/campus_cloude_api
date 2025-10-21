"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
class UserHelpers {
    getUserProfile(userId) {
        return prisma_config_1.default.user.findUnique({
            where: { id: userId },
            include: {
                school: {
                    // where: { isDeleted: false, isActive: true, status: 'ACTIVE' },
                    include: {
                        owner: true,
                    },
                },
            },
        });
    }
}
exports.UserHelpers = UserHelpers;
