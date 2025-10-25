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
const http_status_1 = require("../../../constants/http-status");
const department_services_1 = require("../services/department.services");
const getDepartmentBySchoolId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolId } = req.user;
    if (!schoolId) {
        throw errorHandler_1.ErrorHandler.unauthorized();
    }
    console.log(schoolId, 'this is the school id');
    const result = yield department_services_1.departmentServices.getDepartmentsBySchoolId(schoolId);
    res.status(http_status_1.HTTPSTATUS.OK).json({ success: result.success, department: result.data });
});
exports.default = getDepartmentBySchoolId;
