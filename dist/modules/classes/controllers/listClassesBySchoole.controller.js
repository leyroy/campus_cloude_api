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
const errorHandler_1 = require("../../../middlewares/errorHandler");
const class_services_1 = require("../services/class.services");
const http_status_1 = require("../../../constants/http-status");
const getClassesBySchooleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolId = req.params.schoolId;
        if (!schoolId) {
            throw errorHandler_1.ErrorHandler.badRequest('School ID is required');
        }
        const result = yield class_services_1.classService.listClassesBySchoolId(schoolId);
        // 🎯 Handle getClassesBySchoole logic here neger 😎
        res.status(http_status_1.HTTPSTATUS.OK).json({ classes: result.data, success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.default = getClassesBySchooleController;
