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
exports.TermHelpers = void 0;
const prisma_config_1 = __importDefault(require("../../../config/prisma.config"));
class TermHelpers {
    createTerm(term) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.term.create({ data: term });
        });
    }
    updateTerm(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, data }) {
            return yield prisma_config_1.default.term.update({
                where: { id },
                data: Object.assign({}, data),
            });
        });
    }
    deleteTerm(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.term.delete({ where: { id } });
        });
    }
    getTermBySchoolId(id, shcoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.term.findFirst({ where: { id, schoolId: shcoolId } });
        });
    }
    getAllTermsBySchoolId(id, shcoolId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_config_1.default.term.findMany({ where: { id, schoolId: shcoolId } });
        });
    }
}
exports.TermHelpers = TermHelpers;
