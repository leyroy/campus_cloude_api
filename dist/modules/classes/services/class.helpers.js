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
exports.ClassHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
class ClassHelpers {
    createClass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.create({ data: Object.assign({}, data) });
        });
    }
    updateClass(data, classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.update({
                where: { id: classId },
                data: Object.assign({}, data),
            });
        });
    }
    deleteClass(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.delete({
                where: { id: classId },
            });
        });
    }
    getClassById(classId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.findUnique({
                where: { id: classId },
                include: {
                    department: true,
                    students: {
                        select: {
                            id: true,
                            indexNumber: true,
                            firstName: true,
                            lastName: true,
                            studentGuardians: {
                                select: {
                                    fullName: true,
                                    id: true,
                                    relationship: true,
                                    phone: true,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    getClassesBySchoolId(schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.findMany({
                where: { schoolId },
                include: {
                    department: true,
                    createdBy: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                },
            });
        });
    }
    listAllClasses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.class.findMany();
        });
    }
}
exports.ClassHelpers = ClassHelpers;
