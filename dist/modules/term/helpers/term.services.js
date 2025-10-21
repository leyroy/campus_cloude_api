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
exports.termService = exports.TermService = void 0;
const errorHandler_1 = require("../../../middlewares/errorHandler");
const term_helpers_1 = require("./term.helpers");
class TermService {
    constructor(termHelpers) {
        this.termHelpers = termHelpers;
    }
    createTerm(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTerm = yield this.termHelpers.createTerm(term);
            if (!newTerm) {
                return errorHandler_1.ErrorHandler.badRequest();
            }
            return {
                message: 'term created sucessfully',
                success: true,
            };
        });
    }
    updateTerm(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            const updatedTerm = yield this.termHelpers.updateTerm({ id, data });
            return {
                success: true,
                message: 'Updated successfully',
                data: updatedTerm,
            };
        });
    }
    //delete term
    deleteTerm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.termHelpers.deleteTerm(id);
            return {
                success: true,
                message: 'Deleted successfully',
            };
        });
    }
    //get term by school id
    getTermBySchoolId(id, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const term = yield this.termHelpers.getTermBySchoolId(id, schoolId);
            if (!term) {
                return errorHandler_1.ErrorHandler.notFound();
            }
            return {
                success: true,
                message: 'term',
                data: term,
            };
        });
    }
    //get all terms for a school
    getAllTermsBySchoolId(id, schoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            const terms = yield this.termHelpers.getAllTermsBySchoolId(id, schoolId);
            return {
                success: true,
                message: 'terms',
                data: terms,
            };
        });
    }
}
exports.TermService = TermService;
exports.termService = new TermService(new term_helpers_1.TermHelpers());
