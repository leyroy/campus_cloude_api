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
exports.createUserHelper = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
const errorHandler_1 = require("../../../middlewares/errorHandler");
const passwordMnager_1 = require("../../../services/passwordMnager");
const createUserHelper = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO: Implement user creation logic
        const existingUser = yield prisma_config_1.default.user.findUnique({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw errorHandler_1.ErrorHandler.conflict(`User with email ${userData.email} already exists`);
        }
        const hashedPassword = yield passwordMnager_1.passwordManager.hashPassword(userData.password);
        yield prisma_config_1.default.user.create({
            data: Object.assign(Object.assign({}, userData), { password: hashedPassword }),
        });
        return {
            success: true,
            message: 'User created successfully',
        };
    }
    catch (error) {
        throw error; // Re-throw known errors
    }
});
exports.createUserHelper = createUserHelper;
