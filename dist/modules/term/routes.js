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
const termRoutes = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
termRoutes.use(catchAsync(authenticateToken_1.authenticateToken));
termRoutes.post('/', (0, validate_payload_1.validatePayload)(types_2.TABELS_NAMES_ENUM.TERM), (0, zodValidator_1.default)(types_1.CreateTermSchema), catchAsync(term_services_cotroller_1.termControllers.create));
termRoutes.put(`/updaate/:id`, (0, validate_payload_1.validatePayload)(types_2.TABELS_NAMES_ENUM.TERM), (0, zodValidator_1.default)(types_1.CreateTermSchema), catchAsync(term_services_cotroller_1.termControllers.update));
termRoutes.delete(`/:id`, catchAsync(term_services_cotroller_1.termControllers.delete));
termRoutes.get(`/get_term_by_school_id/:id`, catchAsync(term_services_cotroller_1.termControllers.getTermBySchoolId));
//
termRoutes.get(`/get_all_term_by_school_id/:id`, catchAsync(term_services_cotroller_1.termControllers.getAllTermsBySchoolId));
exports.default = termRoutes;
