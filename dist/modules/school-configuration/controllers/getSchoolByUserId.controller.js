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
const getSchoolByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
        if (!userId) {
            throw errorHandler_1.ErrorHandler.forbidden('User id is required');
        }
        const result = yield schoolServices_1.default.getSchoolByUserID(userId);
        // 🎯 Handle getSchooleById logic here neger 😎
        res.status(200).json({ success: result.success, school: result.data });
    }
    catch (err) {
        next(err);
    }
});
exports.default = getSchoolByUserId;
