"use strict";
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
exports.verifyJwtToken = void 0;
exports.generateTokens = generateTokens;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_constants_1 = require("../constants/env_constants");
const errorHandler_1 = require("../middlewares/errorHandler");
function generateTokens({ userId, sessionId, schoolId }) {
    const payload = {
        userId,
        sessionId,
        schoolId,
    };
    if (!env_constants_1.ENV_CONSTANTS.JWT_ENV.JWT_SECRET || !env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET) {
        throw errorHandler_1.ErrorHandler.badRequest('JWT secrets are not defined in environment variables');
    }
    const options = {
        expiresIn: env_constants_1.ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN || '1h',
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, env_constants_1.ENV_CONSTANTS.JWT_ENV.JWT_SECRET, options);
    const refreshToken = jsonwebtoken_1.default.sign(payload, env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN || '7d',
    });
    return { accessToken, refreshToken };
}
const verifyJwtToken = (token, options) => {
    try {
        const _a = options || {}, { secret = env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_SECRET } = _a, opts = __rest(_a, ["secret"]);
        const payload = jsonwebtoken_1.default.verify(token, secret, Object.assign({}, opts));
        return { payload };
    }
    catch (err) {
        return {
            error: err.message,
        };
    }
};
exports.verifyJwtToken = verifyJwtToken;
