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
exports.AuthHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const uuid_1 = require("../../utils/uuid");
const verifiyToken_1 = require("../../utils/verifiyToken");
class AuthHelpers {
    createVerificationCode(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, type, expires, }) {
            const verificationToken = yield prisma_config_1.default.verificationToken.create({
                data: {
                    token: (0, uuid_1.generateUniqueCode)(),
                    expires: expires,
                    code: (0, verifiyToken_1.generateOtp)(),
                    identifier: userId,
                    type: type,
                },
            });
            return verificationToken;
        });
    }
    createOwner(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId }) {
            return yield prisma_config_1.default.owner.create({
                data: {
                    educationBackground: '',
                    currentPosition: '',
                    professionalExperience: '',
                    previousPositions: '',
                    yearsInEducation: 4,
                },
            });
        });
    }
    createSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.session.create({
                data: {
                    expires: session.expires,
                    ipAddress: session.ipAddress,
                    sessionToken: session.sessionToken,
                    userAgent: session.userAgent,
                    userId: session.userId,
                    isActive: true,
                },
            });
        });
    }
    getVerificationCode(code, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.verificationToken.findUnique({
                where: {
                    token: code,
                    type: type,
                    expires: {
                        gte: new Date(Date.now()),
                    },
                },
            });
        });
    }
    verifyUser(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedUser = yield prisma_config_1.default.user.update({
                where: { id: identifier },
                data: { isEmailVerified: true },
            });
            return verifiedUser;
        });
    }
    getSessionById(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.session.findUnique({
                where: { id: sessionId },
                include: {
                    user: true,
                },
            });
        });
    }
    updateSessionExpirationData(sessionId, newExpirationDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.session.update({
                where: { id: sessionId },
                data: { expires: newExpirationDate },
            });
        });
    }
}
exports.AuthHelpers = AuthHelpers;
