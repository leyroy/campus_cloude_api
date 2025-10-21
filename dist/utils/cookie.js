"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthenticationCookies = exports.setAuthenticationCookies = exports.getAccessTokenCookieOptions = exports.getRefreshTokenCookieOptions = exports.REFRESH_PATH = void 0;
const env_constants_1 = require("../constants/env_constants");
const date_time_1 = require("./date-time");
exports.REFRESH_PATH = `${env_constants_1.ENV_CONSTANTS.BASE_PATH}/auth/refresh`;
const defaults = {
    httpOnly: true,
    secure: false, // backend on HTTP
    sameSite: 'lax', // okay for localhost same-origin
    path: '/',
};
const getRefreshTokenCookieOptions = () => {
    const expiresIn = env_constants_1.ENV_CONSTANTS.JWT_ENV.REFRESH_TOKEN_EXPIRES_IN;
    const expires = (0, date_time_1.calculateExpirationDate)(expiresIn);
    return Object.assign(Object.assign({}, defaults), { expires, path: exports.REFRESH_PATH });
};
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const getAccessTokenCookieOptions = () => {
    const expiresIn = env_constants_1.ENV_CONSTANTS.JWT_ENV.JWT_EXPIRES_IN;
    const expires = (0, date_time_1.calculateExpirationDate)(expiresIn);
    return Object.assign(Object.assign({}, defaults), { expires, path: '/' });
};
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
const setAuthenticationCookies = ({ res, accessToken, refreshToken, }) => res
    .cookie('campus_cloud_accessToken', accessToken, (0, exports.getAccessTokenCookieOptions)())
    .cookie('campus_cloud_refreshToken', refreshToken, (0, exports.getRefreshTokenCookieOptions)());
exports.setAuthenticationCookies = setAuthenticationCookies;
const clearAuthenticationCookies = (res) => res.clearCookie('campus_cloud_accessToken').clearCookie('campus_cloud_refreshToken', {
    path: exports.REFRESH_PATH,
});
exports.clearAuthenticationCookies = clearAuthenticationCookies;
