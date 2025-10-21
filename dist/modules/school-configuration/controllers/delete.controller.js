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
const errorHandler_1 = require("../../../middlewares/errorHandler");
const schoolServices_1 = __importDefault(require("../services/schoolServices"));
const http_status_1 = require("../../../constants/http-status");
const deleteSchool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 🎯 Handle deleteSchool logic here neger 😎
    const userid = req === null || req === void 0 ? void 0 : req.user.userId;
    const { schoolId } = req.params;
    if (!userid) {
        //TODO: invoke alert and notification here
        throw errorHandler_1.ErrorHandler.unauthorized('Unauthorize action');
    }
    if (!schoolId) {
        throw errorHandler_1.ErrorHandler.notFound();
    }
    const result = yield schoolServices_1.default.deleteSchool(schoolId);
    res.status(http_status_1.HTTPSTATUS.OK).json(result);
});
exports.default = deleteSchool;
