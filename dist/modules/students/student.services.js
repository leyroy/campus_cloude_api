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
exports.studentServices = void 0;
const prisma_config_1 = __importDefault(require("../../config/prisma.config"));
const errorHandler_1 = require("../../middlewares/errorHandler");
class StudentService {
    createStudent(data, schoolId, indexNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentInformation, guardianInformation } = data;
                const newStudent = yield prisma_config_1.default.student.create({
                    data: Object.assign(Object.assign({}, studentInformation), { classId: studentInformation.classId, schoolId,
                        indexNumber }),
                });
                if (!newStudent || !(newStudent === null || newStudent === void 0 ? void 0 : newStudent.id)) {
                    throw errorHandler_1.ErrorHandler.internal();
                }
                yield prisma_config_1.default.guardian.createMany({
                    data: guardianInformation.map((guardian) => (Object.assign(Object.assign({}, guardian), { studentId: newStudent === null || newStudent === void 0 ? void 0 : newStudent.id }))),
                });
                return { success: true, message: 'Student created successfully', newStudent };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStudentsBySchoolId(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.student.findMany({
                where: { schoolId, AND: { isDeleted: false } },
            });
        });
    }
    updateStudent(studentId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield prisma_config_1.default.student.update({
                    where: { id: studentId, AND: { isDeleted: true } },
                    data,
                });
                return {
                    success: true,
                    message: 'Student updated successfully',
                    modelId: student.id,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_config_1.default.student.update({ where: { id: studentId }, data: { isDeleted: true } });
            const document = yield prisma_config_1.default.document.findFirst({ where: { modelId: studentId } });
            if (document) {
                yield prisma_config_1.default.document.delete({ where: { id: document.id } });
            }
        });
    }
    updateGaurdian(gaurdianId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.guardian.update({
                where: { id: gaurdianId },
                data: Object.assign({}, data),
            });
        });
    }
}
exports.studentServices = new StudentService();
