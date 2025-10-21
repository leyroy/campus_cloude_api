"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
const student_helpers_1 = require("./student.helpers");
class StudentService {
    constructor({ studentHelper }) {
        this.studentHelper = studentHelper;
    }
}
exports.StudentServices = new StudentService({ studentHelper: student_helpers_1.studentHelper });
