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
exports.departmentServices = void 0;
const errorHandler_1 = require("../../../middlewares/errorHandler");
const department_helpers_1 = require("./department.helpers");
class DepartmentServices {
    constructor(departmentHelpers) {
        this.departmentHelpers = departmentHelpers;
    }
    createDepartment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: logs for department creation
            const createdDepartment = yield this.departmentHelpers.createDepartment(data);
            if (!createdDepartment) {
                throw new Error('Failed to create department');
            }
            return {
                success: true,
                message: 'Department created successfully',
                data: createdDepartment,
            };
        });
    }
    getDepartmentById(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentHelpers.getDepartmentById(departmentId);
            if (!department) {
                throw errorHandler_1.ErrorHandler.notFound('Department not found');
            }
            return {
                success: true,
                message: 'Department retrieved successfully',
            };
        });
    }
    getDepartmentsBySchoolId(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentHelpers.getDepartmentsBySchoolId(schoolId);
            if (!departments || departments.length === 0) {
                throw errorHandler_1.ErrorHandler.notFound('No departments found for this school');
            }
            return {
                success: true,
                message: 'Departments retrieved successfully',
                data: departments,
            };
        });
    }
    updateDepartment(departmentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentHelpers.getDepartmentById(departmentId);
            if (!department) {
                throw errorHandler_1.ErrorHandler.notFound('Department not found');
            }
            const updatedDepartment = yield this.departmentHelpers.updateDepartment(departmentId, data);
            return {
                success: true,
                message: 'Department updated successfully',
                data: updatedDepartment,
            };
        });
    }
    deleteDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentHelpers.getDepartmentById(departmentId);
            if (!department) {
                throw errorHandler_1.ErrorHandler.notFound('Department not found');
            }
            yield this.departmentHelpers.deleteDepartment(departmentId);
            return {
                success: true,
                message: 'Department deleted successfully',
            };
        });
    }
}
exports.departmentServices = new DepartmentServices(department_helpers_1.departmentHelpers);
