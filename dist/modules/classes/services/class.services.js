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
}
exports.classService = new ClassService(new class_helpers_1.ClassHelpers());
