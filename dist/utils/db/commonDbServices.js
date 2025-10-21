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
exports.commonDbService = exports.CommonDbServices = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const types_1 = require("../../types/types");
class CommonDbServices {
    constructor(userWithRole = false) {
        this.userWithRole = userWithRole;
    }
    assignAllPermissionsToSuperAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_config_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const permissions = yield tx.permission.findMany();
                const permissionsIds = permissions.map((permission) => permission.id);
                const users = yield tx.user.findMany();
                const superAdminUser = users.find((user) => user.email === 'leyroycontact@gmail.com');
                const superAdminRole = yield tx.role.create({
                    data: {
                        name: 'Super Admin',
                        description: 'Has full control over the entire system, manages users, roles, permissions, and all school settings. Oversees every operation and ensures smooth system administration.',
                        createdById: (superAdminUser === null || superAdminUser === void 0 ? void 0 : superAdminUser.id) || '',
                    },
                });
                const saved = yield tx.rolePermission.createMany({
                    data: permissionsIds.map((permissionId) => ({
                        roleId: superAdminRole.id,
                        permissionId,
                    })),
                    skipDuplicates: true,
                });
                yield tx.userRole.create({
                    data: {
                        userId: (superAdminUser === null || superAdminUser === void 0 ? void 0 : superAdminUser.id) || '',
                        assignedById: (superAdminUser === null || superAdminUser === void 0 ? void 0 : superAdminUser.id) || '',
                        roleId: superAdminRole.id,
                    },
                });
                return saved;
            }));
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.findMany({});
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.findUnique({
                where: { id: userId },
            });
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.create({ data });
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.update({
                where: { id: userId },
                data,
            });
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.delete({ where: { id: userId } });
        });
    }
    getUserPermissions(userId, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.userRole.findFirst({
                where: {
                    userId,
                    roleId,
                },
                include: {
                    role: {
                        include: {
                            rolePermissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.findUnique({
                where: { email },
            });
        });
    }
    getUserByPhoneOrEmail(_a) {
        return __awaiter(this, arguments, void 0, function* ({ phone, email, }) {
            return yield prisma_config_1.default.user.findFirst({
                where: { phone, email: email },
            });
        });
    }
    deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.user.deleteMany({});
        });
    }
    //role and permissions services
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.role.findMany({
                include: {
                    rolePermissions: {
                        include: {
                            permission: true,
                        },
                    },
                },
            });
        });
    }
    getRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.role.findUnique({
                where: { id: roleId },
            });
        });
    }
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_config_1.default.permission.findMany({
                include: {
                    rolePermissions: {
                        select: {
                            id: true,
                        },
                        include: {
                            role: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    getVerificationCode(code, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.verificationToken.findUnique({
                where: {
                    token: code,
                    type,
                },
            });
        });
    }
    deleteVerificationCode(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.verificationToken.delete({
                where: { id: id },
            });
        });
    }
    deleteSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.session.delete({
                where: { id },
            });
        });
    }
    createAddress(data, id, modelType) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = modelType === types_1.TABELS_NAMES_ENUM.SCHOOL_PROFILE ? 'schoolId' : 'userId';
            return yield prisma_config_1.default.address.create({ data: Object.assign(Object.assign({}, data), { [type]: id }) });
        });
    }
}
exports.CommonDbServices = CommonDbServices;
exports.commonDbService = new CommonDbServices();
