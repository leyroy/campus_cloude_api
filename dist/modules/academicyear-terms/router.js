"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const errorHandler_1 = require("../../middlewares/errorHandler");
const createAcademicYear_controller_1 = __importDefault(require("./controllers/createAcademicYear.controller"));
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const type_1 = require("./type");
const getSchoolAcademicYears_Controller_1 = __importDefault(require("./controllers/getSchoolAcademicYears.Controller"));
const accademicYearRoutes = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
accademicYearRoutes.use(catchAsync(authenticateToken_1.authenticateToken));
accademicYearRoutes.post('/create', (0, zodValidator_1.default)(type_1.academicYearSchema), catchAsync(createAcademicYear_controller_1.default));
accademicYearRoutes.get('/list-school-academic-years/:schoolId', (0, zodValidator_1.default)(type_1.academicYearSchema), catchAsync(getSchoolAcademicYears_Controller_1.default));
exports.default = accademicYearRoutes;
