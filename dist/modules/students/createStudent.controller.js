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
const student_services_1 = require("./student.services");
const errorHandler_1 = require("../../middlewares/errorHandler");
const createStudentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { schoolId, userId } = req === null || req === void 0 ? void 0 : req.user;
    const indexNumber = '1234567890';
    try {
        if (!schoolId) {
            throw errorHandler_1.ErrorHandler.forbidden('This action connot be completed');
        }
        const result = yield student_services_1.studentServices.createStudent(data, schoolId, indexNumber);
        res
            .status(200)
            .json({ success: true, message: result.message, modelId: result.newStudent.id });
    }
    catch (err) {
        next(err);
    }
});
exports.default = createStudentController;
