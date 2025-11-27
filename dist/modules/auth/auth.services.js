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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const env_constants_1 = require("../../constants/env_constants");
const http_status_1 = require("../../constants/http-status");
const node_mailer_1 = __importDefault(require("../../mailers/node-mailer"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const passwordMnager_1 = require("../../services/passwordMnager");
const date_time_1 = require("../../utils/date-time");
const commonDbServices_1 = require("../../utils/db/commonDbServices");
const jwt_1 = require("../../utils/jwt");
const uuid_1 = require("../../utils/uuid");
const helpers_1 = require("./helpers");
const authHelpers = new helpers_1.AuthHelpers();
class AuthService {
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { confirmPassword } = data, user = __rest(data, ["confirmPassword"]);
            const hashedPassword = yield passwordMnager_1.passwordManager.hashPassword(user.password);
            const newUser = yield commonDbServices_1.commonDbService.createUser(Object.assign(Object.assign({}, user), { confirmPassword: confirmPassword, password: hashedPassword }));
            const { confirmPassword: confirmPassword2, password } = newUser, res = __rest(newUser, ["confirmPassword", "password"]);
            const verificationCode = yield authHelpers.createVerificationCode({
                userId: newUser.id,
                type: "EMAIL_VERIFICATION" /* VerificationEnum.EMAIL_VERIFICATION */,
                expires: (0, date_time_1.fortyFiveMinutesFromNow)(),
            });
            (0, node_mailer_1.default)({
                value: verificationCode.code,
                template: 'otp.mjml',
                subject: 'Verify your email',
                to: newUser.email,
            });
            return {
                success: true,
                token: verificationCode.token,
                message: 'User registered successfully and verification code was sent to your email, pleas kindly verify your account',
                data: Object.assign({}, res),
            };
        });
    }
    loginUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, phone, userAgent, ipAddress }) {
            const isUserExit = yield commonDbServices_1.commonDbService.getUserByPhoneOrEmail({
                email,
                phone,
            });
            if (!isUserExit) {
                throw errorHandler_1.ErrorHandler.notFound('Invalid credentials');
            }
            const isValidPassword = yield passwordMnager_1.passwordManager.verifyPassword(password, isUserExit.password);
            if (!isValidPassword) {
                throw errorHandler_1.ErrorHandler.unauthorized('Invalid credentials');
            }
            if (!isUserExit.isActive &&
                isUserExit.isEmailVerified &&
                isUserExit.isPhoneVerified) {
                throw errorHandler_1.ErrorHandler.badRequest(`Account: ${isUserExit.email} is not activated, please kindly wait until we activate your account`);
            }
            if (!isUserExit.isEmailVerified) {
                const verificationCode = yield authHelpers.createVerificationCode({
                    userId: isUserExit.id,
                    type: "EMAIL_VERIFICATION" /* VerificationEnum.EMAIL_VERIFICATION */,
                    expires: (0, date_time_1.fortyFiveMinutesFromNow)(),
                });
                const verifyUrl = `${env_constants_1.ENV_CONSTANTS.BASE_PATH}/verify-email?token=${verificationCode.token}`;
                return {
                    refreshToken: '',
                    accessToken: '',
                    url: verifyUrl,
                    code: verificationCode.code,
                    token: verificationCode.token,
                    isEmailVerified: false,
                };
            }
            const sessionPayload = {
                expires: (0, date_time_1.calculateExpirationDate)('7d'),
                userAgent: userAgent,
                ipAddress: ipAddress,
                sessionToken: (0, uuid_1.generateUniqueCode)(),
                userId: isUserExit.id,
            };
            const session = yield authHelpers.createSession(sessionPayload);
            const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
                userId: isUserExit.id,
                sessionId: session.id,
                schoolId: isUserExit.schoolId,
            });
            return {
                accessToken,
                isEmailVerified: true,
                refreshToken,
            };
        });
    }
    verifyEmail(token, code, userAgent, ipAddress, isFromLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const verificationToken = yield authHelpers.getVerificationCode(token, "EMAIL_VERIFICATION" /* VerificationEnum.EMAIL_VERIFICATION */);
            if (!verificationToken) {
                throw errorHandler_1.ErrorHandler.notFound('Verification has expired, Please try logging in');
            }
            if (((_a = verificationToken.code) === null || _a === void 0 ? void 0 : _a.split('-').join('')) !== code) {
                throw errorHandler_1.ErrorHandler.notFound('Incorrect OTP. Please try agin');
            }
            const verifiedUser = yield authHelpers.verifyUser(verificationToken.identifier);
            if (!verifiedUser)
                throw errorHandler_1.ErrorHandler.badRequest('We were not able to verify your account, please try again later');
            if (isFromLogin) {
                const sessionPayload = {
                    expires: (0, date_time_1.calculateExpirationDate)('7d'),
                    userAgent: userAgent,
                    ipAddress: ipAddress,
                    sessionToken: (0, uuid_1.generateUniqueCode)(),
                    userId: verifiedUser.id,
                };
                const session = yield authHelpers.createSession(sessionPayload);
                const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
                    userId: verifiedUser.id,
                    sessionId: session.id,
                    schoolId: verifiedUser.schoolId,
                });
                yield commonDbServices_1.commonDbService.deleteVerificationCode(verificationToken.id);
                return { success: true, accessToken, refreshToken };
            }
            yield commonDbServices_1.commonDbService.deleteVerificationCode(verificationToken.id);
            return { success: true, accessToken: '', refreshToken: '' };
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, payload } = (0, jwt_1.verifyJwtToken)(token);
            if (error || !payload) {
                throw new errorHandler_1.AppError({
                    message: error || 'Invalid refresh token',
                    statusCode: http_status_1.HTTPSTATUS.BAD_REQUEST,
                    errorCode: "AUTH_REFRESH_TOKEN_NOT_FOUND" /* ErrorCode.AUTH_REFRESH_TOKEN_NOT_FOUND */,
                });
            }
            const sessionWithUser = yield authHelpers.getSessionById(payload.sessionId);
            if (!sessionWithUser) {
                throw errorHandler_1.ErrorHandler.notFound('Session not found');
            }
            const { user } = sessionWithUser, session = __rest(sessionWithUser, ["user"]);
            if (!session.isActive) {
                throw errorHandler_1.ErrorHandler.badRequest('Session is not active');
            }
            const now = Date.now();
            const sessionNeedsToBeUpdated = session.expires.getTime() - now < date_time_1.ONE_DAY_IN_MS;
            if (sessionNeedsToBeUpdated) {
                yield authHelpers.updateSessionExpirationData(session.id, (0, date_time_1.calculateExpirationDate)(env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN));
            }
            const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
                userId: user.id,
                sessionId: session.id,
            });
            return {
                accessToken,
                refreshToken: sessionNeedsToBeUpdated ? refreshToken : undefined,
            };
        });
    }
}
exports.AuthService = AuthService;
