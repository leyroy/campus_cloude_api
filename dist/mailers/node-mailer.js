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
// utils/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const mjml_1 = __importDefault(require("mjml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_constants_1 = require("../constants/env_constants");
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'leyroycontact@gmail.com',
        pass: 'oayhiobkbnlwcoja',
    },
});
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ value, to, subject, text, template, }) {
    // Resolve to absolute path
    const isDevelopment = env_constants_1.ENV_CONSTANTS.NODE_ENV !== 'production';
    const basePath = isDevelopment ? 'src' : 'dist';
    const templatePath = path_1.default.join(process.cwd(), basePath, 'mailers/templates', template);
    const { html: otpHtml } = (0, mjml_1.default)(fs_1.default
        .readFileSync(templatePath, 'utf8')
        .replace(/{{otp}}/g, value)
        .replace(/{{resetUrl}}/g, value));
    try {
        const info = yield transporter.sendMail({
            from: `no-reply <${process.env.MAIL_USER}>`,
            to: Array.isArray(to) ? to : [to],
            subject,
            text,
            html: otpHtml,
        });
        console.log('Email sent:', info.messageId);
        return true;
    }
    catch (err) {
        console.error('Nodemailer error:', {
            name: err.name,
            message: err.message,
            stack: err.stack,
        });
        return false;
    }
});
exports.default = sendEmail;
