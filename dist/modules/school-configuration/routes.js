"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../../middlewares/errorHandler");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const types_1 = require("./types");
const create_controller_1 = __importDefault(require("./controllers/create.controller"));
const delete_controller_1 = __importDefault(require("./controllers/delete.controller"));
const update_controller_1 = __importDefault(require("./controllers/update.controller"));
const validate_payload_1 = require("../../middlewares/validate-payload");
const types_2 = require("../../types/types");
const permissionsManager_1 = __importDefault(require("../../middlewares/permissionsManager"));
const getSchoolByUserId_controller_1 = __importDefault(require("./controllers/getSchoolByUserId.controller"));
const schoolRouter = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
//middlewares configuration
schoolRouter.use(catchAsync(authenticateToken_1.authenticateToken));
schoolRouter.post('/configure', (0, zodValidator_1.default)(types_1.SchoolConfigurationSchema), 
// catchAsync(permissionHandler({ action: Action.CREATE, resource: Resource.SCHOOL })),
catchAsync(create_controller_1.default));
schoolRouter.put('/:schoolId', (0, validate_payload_1.validatePayload)(types_2.TABELS_NAMES_ENUM.SCHOOL), catchAsync((0, permissionsManager_1.default)({ action: types_2.Action.UPDATE, resource: types_2.Resource.SCHOOL })), catchAsync(update_controller_1.default));
schoolRouter.get('/current', 
// catchAsync(permissionHandler({ action: Action.VIEW, resource: Resource.SCHOOL })),
catchAsync(getSchoolByUserId_controller_1.default));
schoolRouter.delete('/:schoolId', catchAsync((0, permissionsManager_1.default)({ action: types_2.Action.DELETE, resource: types_2.Resource.SCHOOL })), catchAsync(delete_controller_1.default));
exports.default = schoolRouter;
