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
const updateDepartmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { departmentId } = req.params;
    const { userId } = req === null || req === void 0 ? void 0 : req.user;
    const updatedData = req.body;
    yield department_services_1.departmentServices.updateDepartment(departmentId, Object.assign(Object.assign({}, updatedData), { updatedBy: userId }));
    res.status(http_status_1.HTTPSTATUS.OK).json(updatedData);
});
exports.default = updateDepartmentController;
