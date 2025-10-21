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
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
const http_status_1 = require("../constants/http-status");
const zodValidator = (Schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const result = Schema.safeParse(req.body);
        if (!result.success) {
            throw new errorHandler_1.AppError({
                message: result.error.errors
                    .map((err) => `${err.path.join('.')} - ${err.message}`)
                    .join(', '),
                statusCode: http_status_1.HTTPSTATUS.BAD_REQUEST,
                errorCode: "VALIDATION_ERROR" /* ErrorCode.VALIDATION_ERROR */,
            });
        }
        req.body = result.data;
        next();
    });
};
exports.default = zodValidator;
