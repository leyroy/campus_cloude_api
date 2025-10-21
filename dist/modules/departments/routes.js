"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const errorHandler_1 = require("../../middlewares/errorHandler");
const validate_payload_1 = require("../../middlewares/validate-payload");
const types_1 = require("../../types/types");
const permissionsManager_1 = __importDefault(require("../../middlewares/permissionsManager"));
const createDepartment_controller_1 = __importDefault(require("./controllers/createDepartment.controller"));
const updateDepartment_controller_1 = __importDefault(require("./controllers/updateDepartment.controller"));
const zodValidator_1 = __importDefault(require("../../middlewares/zodValidator"));
const types_2 = require("./types");
const getDepartmentId_controller_1 = __importDefault(require("./controllers/getDepartmentId.controller"));
const getDepartmentsBySchoolId_controller_1 = __importDefault(require("./controllers/getDepartmentsBySchoolId.controller"));
const deleteDepartment_controller_1 = __importDefault(require("./controllers/deleteDepartment.controller"));
const departmentRouter = (0, express_1.Router)();
const { catchAsync } = new errorHandler_1.ErrorHandler();
departmentRouter.use(authenticateToken_1.authenticateToken);
departmentRouter.post('/', (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.DEPARTMENT), (0, zodValidator_1.default)(types_2.CreateDepartmentSchema), catchAsync((0, permissionsManager_1.default)({
    resource: types_1.Resource.DEPARTMENT,
    action: types_1.Action.CREATE,
})), catchAsync(createDepartment_controller_1.default));
departmentRouter.put('/:departmentId', (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.DEPARTMENT), (0, zodValidator_1.default)(types_2.CreateDepartmentSchema), catchAsync((0, permissionsManager_1.default)({
    resource: types_1.Resource.DEPARTMENT,
    action: types_1.Action.UPDATE,
})), catchAsync(updateDepartment_controller_1.default));
departmentRouter.get('/:departmentId', catchAsync((0, permissionsManager_1.default)({
    resource: types_1.Resource.DEPARTMENT,
    action: types_1.Action.VIEW,
})), catchAsync(getDepartmentId_controller_1.default));
departmentRouter.get('/school', catchAsync((0, permissionsManager_1.default)({
    action: types_1.Action.VIEW,
    resource: types_1.Resource.DEPARTMENT,
})), catchAsync(getDepartmentsBySchoolId_controller_1.default));
departmentRouter.delete('/:deparmentId', catchAsync((0, permissionsManager_1.default)({
    action: types_1.Action.VIEW,
    resource: types_1.Resource.DEPARTMENT,
})), catchAsync(deleteDepartment_controller_1.default));
exports.default = departmentRouter;
