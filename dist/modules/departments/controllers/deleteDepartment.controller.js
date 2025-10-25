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
const http_status_1 = require("../../../constants/http-status");
const errorHandler_1 = require("../../../middlewares/errorHandler");
const deleteDepartmentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    if (!departmentId) {
        throw errorHandler_1.ErrorHandler.badRequest('This action connot be completed');
    }
    const result = yield department_services_1.departmentServices.deleteDepartment(departmentId);
    res.status(http_status_1.HTTPSTATUS.OK).json(Object.assign({}, result));
});
exports.default = deleteDepartmentController;
