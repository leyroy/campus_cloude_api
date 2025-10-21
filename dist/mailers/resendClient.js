"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
const env_constants_1 = require("../constants/env_constants");
exports.resend = new resend_1.Resend(env_constants_1.ENV_CONSTANTS.RESEND_API_KEY);
