"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
exports.generateOtp = generateOtp;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_constants_1 = require("../constants/env_constants");
function verifyToken(token) {
    const decodedToken = (0, jsonwebtoken_1.verify)(token, env_constants_1.ENV_CONSTANTS.JWT_ENV.JWT_SECRET);
    return decodedToken;
}
//function to generate 6 digit otp
function generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const firstThreeDigits = otp.substring(0, 3);
    const lastThreeDigits = otp.substring(3);
    const otpStringWithDash = `${firstThreeDigits}-${lastThreeDigits}`;
    return otpStringWithDash;
}
