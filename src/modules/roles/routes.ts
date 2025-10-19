import express from 'express';
import { ErrorHandler } from '../../middlewares/errorHandler';
import { createRoleController } from './controllers/createRole';
import { validatePayload } from '../../middlewares/validate-payload';
import { addRolePermissions } from './rolePermissions/addRolePermissions';
import { assignRoleToUserController } from './rolePermissions/assignRoleToUser';
import { authenticateToken } from '../../middlewares/authenticateToken';
import permissionHandler from '../../middlewares/permissionsManager';
import { Action, Resource, TABELS_NAMES_ENUM } from '../../types/types';
import getRolesController from './controllers/getRoles.controller';
import getRoleByRoleIdController from './controllers/getRoleByRoleId.controller';
import getPermissionsController from './controllers/getPermissions.controller';

const roleRouter = express.Router();
const errorHandler = new ErrorHandler();
roleRouter.use(errorHandler.catchAsync(authenticateToken));

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

roleRouter.post(
  '/create',
  // permissionHandler({ action: Action.CREATE, resource: Resource.ROLE }),
  validatePayload(TABELS_NAMES_ENUM.ROLE),
  errorHandler.catchAsync(createRoleController)
);

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
roleRouter.put(
  '/add-permissions',
  //TODO:  eneble this middleware after testing
  // permissionHandler({ action: Action.ASSIGN_TO_ROLE, resource: Resource.PERMISSION }),
  errorHandler.catchAsync(addRolePermissions)
);

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
roleRouter.put(
  '/assign-role-to-user',
  permissionHandler({ action: Action.ASSIGN_ROLE, resource: Resource.USER }),
  validatePayload(TABELS_NAMES_ENUM.USER_ROLE),
  errorHandler.catchAsync(assignRoleToUserController)
);

roleRouter.get('/get-roles', errorHandler.catchAsync(getRolesController));
roleRouter.get('/get-role/:roleId', errorHandler.catchAsync(getRoleByRoleIdController));
roleRouter.get('/get-permissions', errorHandler.catchAsync(getPermissionsController));

export default roleRouter;
