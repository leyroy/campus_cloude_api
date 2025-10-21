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
const toggleRoleStatus_1 = require("../helpers/toggleRoleStatus");
const toggleRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roleId } = req.params;
    if (!roleId) {
        throw errorHandler_1.ErrorHandler.badRequest('Role ID is required');
    }
    const result = yield (0, toggleRoleStatus_1.toggleRoleStatus)(roleId);
    res.status(200).json(Object.assign({}, result));
});
exports.default = toggleRoleController;
