"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const errorHandler_1 = require("../../middlewares/errorHandler");
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const types_1 = require("./types");
const types_2 = require("../../types/types");
const validate_payload_1 = require("../../middlewares/validate-payload");
const term_services_cotroller_1 = require("./term.services.cotroller");
const permissionsManager_1 = __importDefault(require("../../middlewares/permissionsManager"));
const termRoutes = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
termRoutes.use(catchAsync(authenticateToken_1.authenticateToken));
termRoutes.post('/', catchAsync((0, permissionsManager_1.default)({
    resource: types_2.Resource.TERM,
    action: types_2.Action.CREATE,
})), (0, validate_payload_1.validatePayload)(types_2.TABELS_NAMES_ENUM.TERM), (0, zodValidator_1.default)(types_1.CreateTermSchema), catchAsync(term_services_cotroller_1.termControllers.create));
termRoutes.put(`/update/:id`, (0, permissionsManager_1.default)({
    resource: types_2.Resource.TERM,
    action: types_2.Action.UPDATE,
}), (0, validate_payload_1.validatePayload)(types_2.TABELS_NAMES_ENUM.TERM), (0, zodValidator_1.default)(types_1.CreateTermSchema), catchAsync(term_services_cotroller_1.termControllers.update));
termRoutes.delete(`/delete/:id`, catchAsync(term_services_cotroller_1.termControllers.delete));
termRoutes.get(`/term/:id`, catchAsync(term_services_cotroller_1.termControllers.getTermByTermId));
//
termRoutes.get(`/get_terms_by_school_id/:id`, (0, permissionsManager_1.default)({
    resource: types_2.Resource.TERM,
    action: types_2.Action.VIEW,
}), catchAsync(term_services_cotroller_1.termControllers.getAllTermsBySchoolId));
exports.default = termRoutes;
