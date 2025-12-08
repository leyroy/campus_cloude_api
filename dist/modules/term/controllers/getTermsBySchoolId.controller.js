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
const getTermsBySchoolIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schooleId } = req.params;
    const user = req === null || req === void 0 ? void 0 : req.user;
    try {
        // 🎯 Handle getTermsBySchooleIdController logic here neger 😎
        if (!schooleId) {
            throw errorHandler_1.ErrorHandler.badRequest('School ID is required');
        }
        if (!user || (user === null || user === void 0 ? void 0 : user.schoolId) !== schooleId) {
            throw errorHandler_1.ErrorHandler.unauthorized();
        }
        const terms = yield term_services_1.termService.getAllTermsBySchoolId(schooleId);
        res.status(200).json({ success: true, terms: terms || [] });
    }
    catch (err) {
        next(err);
    }
});
exports.default = getTermsBySchoolIdController;
