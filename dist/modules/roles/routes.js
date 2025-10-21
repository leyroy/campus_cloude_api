"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const createRole_1 = require("./controllers/createRole");
const validate_payload_1 = require("../../middlewares/validate-payload");
const addRolePermissions_1 = require("./rolePermissions/addRolePermissions");
const assignRoleToUser_1 = require("./rolePermissions/assignRoleToUser");
const authenticateToken_1 = require("../../middlewares/authenticateToken");
const permissionsManager_1 = __importDefault(require("../../middlewares/permissionsManager"));
const types_1 = require("../../types/types");
const getRoles_controller_1 = __importDefault(require("./controllers/getRoles.controller"));
const getRoleByRoleId_controller_1 = __importDefault(require("./controllers/getRoleByRoleId.controller"));
const getPermissions_controller_1 = __importDefault(require("./controllers/getPermissions.controller"));
const toggleRole_controller_1 = __importDefault(require("./controllers/toggleRole.controller"));
const roleRouter = express_1.default.Router();
const errorHandler = new errorHandler_1.ErrorHandler();
roleRouter.use(errorHandler.catchAsync(authenticateToken_1.authenticateToken));
/**
 * @swagger
 * /campcloud/api/v1/roles:
 *   post:
 *     tags:
 *       - Role and permission
 *     summary: Create a new role
 *     description: Create a new role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role created successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 */
roleRouter.post('/create', (0, permissionsManager_1.default)({ action: types_1.Action.CREATE, resource: types_1.Resource.ROLE }), (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.ROLE), errorHandler.catchAsync(createRole_1.createRoleController));
/**
 * @swagger
 * /campcloud/api/v1/roles/add-permissions:
 *   put:
 *     tags: [Role and permission]
 *     summary: Add permissions to a role
 *     description: Add permissions to an existing role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RolePermission'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     example: Permissions added successfully
 *                   success:
 *                     type: boolean
 *                     example: true
 */
roleRouter.put('/add-permissions', 
//TODO:  eneble this middleware after testing
(0, permissionsManager_1.default)({ action: types_1.Action.ASSIGN_TO_ROLE, resource: types_1.Resource.PERMISSION }), errorHandler.catchAsync(addRolePermissions_1.addRolePermissions));
/**
 * @swagger
 * paths:
 *   /roles/assign:
 *     put:
 *       tags:
 *         - Role and permission
 *       summary: Assign a role to a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRole'
 *       responses:
 *         200:
 *           description: Role assigned successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Role assigned successfully
 *                   success:
 *                     type: boolean
 *                     example: true
 *         404:
 *           description: User or role not found.
 *         400:
 *           description: Bad request, invalid input data.
 *         500:
 *           description: Internal server error, failed to assign role.
 */
roleRouter.put('/assign-role-to-user', (0, permissionsManager_1.default)({ action: types_1.Action.ASSIGN_ROLE, resource: types_1.Resource.USER }), (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.USER_ROLE), errorHandler.catchAsync(assignRoleToUser_1.assignRoleToUserController));
roleRouter.patch('/toggle-status/:roleId', (0, permissionsManager_1.default)({ action: types_1.Action.UPDATE, resource: types_1.Resource.ROLE }), errorHandler.catchAsync(toggleRole_controller_1.default));
roleRouter.get('/get-roles', errorHandler.catchAsync(getRoles_controller_1.default));
roleRouter.get('/get-role/:roleId', errorHandler.catchAsync(getRoleByRoleId_controller_1.default));
roleRouter.get('/get-permissions', errorHandler.catchAsync(getPermissions_controller_1.default));
exports.default = roleRouter;
