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
const department_services_1 = require("../services/department.services");
const errorHandler_1 = require("../../../middlewares/errorHandler");
const http_status_1 = require("../../../constants/http-status");
const createDepartmentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { userId, schoolId } = req.user;
    if (!schoolId || !userId) {
        throw new errorHandler_1.AppError({
            message: 'Unauthorized action',
            statusCode: http_status_1.HTTPSTATUS.UNAUTHORIZED,
            errorCode: "AUTH_TOKEN_NOT_FOUND" /* ErrorCode.AUTH_TOKEN_NOT_FOUND */,
        });
    }
    const result = yield department_services_1.departmentServices.createDepartment({
        name,
        description,
        schoolId,
        updatedById: userId,
    });
    res.status(http_status_1.HTTPSTATUS.OK).json(result);
});
exports.default = createDepartmentController;
