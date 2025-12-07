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
exports.classService = void 0;
const errorHandler_1 = require("../../../middlewares/errorHandler");
const class_helpers_1 = require("./class.helpers");
class ClassService {
    constructor(classHelper) {
        this.classHelper = classHelper;
    }
    createClass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClass = yield this.classHelper.createClass(data);
            if (!newClass) {
                throw errorHandler_1.ErrorHandler.internal('Failed to create class');
            }
            return {
                message: 'Class created successfully',
                data: newClass,
            };
        });
    }
    updateClass(data, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedClass = yield this.classHelper.updateClass(data, classId);
            if (!updatedClass) {
                throw errorHandler_1.ErrorHandler.internal('Failed to update class');
            }
            return {
                message: 'Class updated successfully',
                data: updatedClass,
            };
        });
    }
    deleteClassByClassId(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement delete logic here
            yield this.classHelper.deleteClass(classId);
            return {
                message: 'Class deleted successfully',
            };
        });
    }
    getClassById(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement get logic here
            const classData = yield this.classHelper.getClassById(classId);
            if (!classData) {
                throw errorHandler_1.ErrorHandler.notFound('Class not found');
            }
            return {
                message: 'Class retrieved successfully',
                data: classData,
            };
        });
    }
    //list all student by schooleid
    listClassesBySchoolId(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield this.classHelper.getClassesBySchoolId(schoolId);
            if (!classes) {
                throw errorHandler_1.ErrorHandler.notFound('No classes found for the given school ID');
            }
            return {
                message: 'Classes retrieved successfully',
                data: classes,
            };
        });
    }
    listClassesByAdming() {
        return __awaiter(this, void 0, void 0, function* () {
            const classes = yield this.classHelper.listAllClasses();
            if (!classes) {
                throw errorHandler_1.ErrorHandler.notFound('No classes found for the given school ID');
            }
            return {
                message: 'Classes retrieved successfully',
                data: classes,
            };
        });
    }
}
exports.classService = new ClassService(new class_helpers_1.ClassHelpers());
