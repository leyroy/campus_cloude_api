"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentHelpers = exports.DepartmentHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
class DepartmentHelpers {
    createDepartment(data) {
        return prisma_config_1.default.department.create({ data });
    }
    getDepartmentById(departmentId) {
        return prisma_config_1.default.department.findUnique({ where: { id: departmentId } });
    }
    getDepartmentsBySchoolId(schoolId) {
        return prisma_config_1.default.department.findMany({ where: { schoolId: schoolId } });
    }
    updateDepartment(departmentId, data) {
        return prisma_config_1.default.department.update({
            where: { id: departmentId },
            data,
        });
    }
    deleteDepartment(departmentId) {
        return prisma_config_1.default.department.delete({ where: { id: departmentId } });
    }
}
exports.DepartmentHelpers = DepartmentHelpers;
exports.departmentHelpers = new DepartmentHelpers();
