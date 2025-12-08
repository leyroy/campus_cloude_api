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
const errorHandler_1 = require("../../../middlewares/errorHandler");
const term_services_1 = require("../helpers/term.services");
const listSchoolAcademicYearsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const schoolId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.schoolId;
    try {
        if (!schoolId) {
            throw errorHandler_1.ErrorHandler.badRequest('School ID is required');
        }
        const results = yield term_services_1.termService.getSchoolAcademicYears(schoolId);
        res
            .status(200)
            .json({ message: 'listSchoolAcademicYearsController controller is live 🧨' });
    }
    catch (err) {
        next(err);
    }
});
exports.default = listSchoolAcademicYearsController;
