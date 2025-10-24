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
exports.sendEmail = void 0;
const mjml_1 = __importDefault(require("mjml"));
const env_constants_1 = require("../constants/env_constants");
const resendClient_1 = require("./resendClient");
const fs_1 = __importDefault(require("fs"));
const mailer_sender = env_constants_1.ENV_CONSTANTS.NODE_ENV === 'development'
    ? `no-reply <onboarding@resend.dev>`
    : `no-reply <${env_constants_1.ENV_CONSTANTS.MAILER_SENDER}>`;
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ value, to, from = mailer_sender, subject, template, }) {
    const { html: generateEmail } = (0, mjml_1.default)(fs_1.default
        .readFileSync(template, 'utf8')
        .replace(/{{otp}}/g, value)
        .replace(/{{resetUrl}}/g, value));
    try {
        const info = yield resendClient_1.resend.emails.send({
            from,
            to: Array.isArray(to) ? to : [to],
            subject,
            html: generateEmail,
        });
        console.log('Email sent:', info);
    }
    catch (error) {
        throw Error;
    }
});
exports.sendEmail = sendEmail;
