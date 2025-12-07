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
const class_services_1 = require("../services/class.services");
const errorHandler_1 = require("../../../middlewares/errorHandler");
const http_status_1 = require("../../../constants/http-status");
const createClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // 🎯 Handle createClass logic here neger 😎
    const data = req.body;
    const schoolId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
    const userId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
    if (!schoolId) {
        throw errorHandler_1.ErrorHandler.badRequest('School ID is required');
    }
    yield class_services_1.classService.createClass(Object.assign(Object.assign({}, data), { schoolId, createdById: userId }));
    res
        .status(http_status_1.HTTPSTATUS.CREATED)
        .json({ success: true, message: 'Class created successfully' });
});
exports.default = createClassController;
