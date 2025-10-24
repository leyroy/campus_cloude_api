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
const errorHandler_1 = require("../../middlewares/errorHandler");
const student_services_1 = require("./student.services");
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        if (!studentId) {
            throw errorHandler_1.ErrorHandler.forbidden("This action cannot be completed.");
        }
        const results = student_services_1.studentServices.deleteStudent(studentId);
        res.status(200).json({ message: 'deleteStudent controller is live 🧨' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = deleteStudent;
