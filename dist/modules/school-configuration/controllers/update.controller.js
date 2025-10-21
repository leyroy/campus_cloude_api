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
const schoolServices_1 = __importDefault(require("../services/schoolServices"));
const errorHandler_1 = require("../../../middlewares/errorHandler");
const updateSchool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.params;
    const userId = req.user.userId;
    if (!userId) {
        throw errorHandler_1.ErrorHandler.unauthorized('User ID is required for updating school information');
    }
    if (!schoolId) {
        throw errorHandler_1.ErrorHandler.badRequest('School ID is required for updating school information');
    }
    const result = yield schoolServices_1.default.updateSchoolInfo(schoolId, req.body);
    res.status(200).json({ success: result.success, message: result.message });
});
exports.default = updateSchool;
