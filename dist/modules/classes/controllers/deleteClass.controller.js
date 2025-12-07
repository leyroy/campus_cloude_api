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
const deleteClassController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classId } = req.params;
        if (!classId) {
            throw errorHandler_1.ErrorHandler.forbidden('Class ID is required');
        }
        yield class_services_1.classService.deleteClassByClassId(classId);
        res
            .status(http_status_1.HTTPSTATUS.ACCEPTED)
            .json({ success: true, message: 'Class deleted successfully' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = deleteClassController;
