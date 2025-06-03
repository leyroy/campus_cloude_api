import express from "express";
import { ErrorHandler } from "../../middlewares/errorHandler";
import { createRoleController } from "../../modules/roles/controllers/createRole";
import { validatePayload } from "../../middlewares/validate-payload";
import { Action, Resource, TABELS_NAMES_ENUM } from "../../types/shared/types";
import { addRolePermissions } from "../../modules/roles/rolePermissions/addRolePermissions";
import { assignRoleToUserController } from "../../modules/roles/rolePermissions/assignRoleToUser";
import { authenticateToken } from "../../middlewares/authenticateToken";
import permissionHandler from "../../middlewares/permissionsManager";

const roleRouter = express.Router();
const errorHandler = new ErrorHandler();
roleRouter.use(authenticateToken)

/**
 * @swagger
 * /campcloud/api/v1/roles:
 *   post:
 *     tags: [Role and permission]
 *     summary: Create a new role
 *     description: Create a new role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    message:
 *                      type: string
 *                      example: Role created successfully
 *                    success:
 *                      type: boolean
 *                      example: true
 */
roleRouter.post(
  "/",
  permissionHandler({action:Action.CREATE, resource:Resource.ROLE}),
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
 *              $ref: '#/components/schemas/AddRoleToPermissionsRequest'
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
roleRouter.put("/add-permissions",validatePayload(TABELS_NAMES_ENUM.ROLE_PERMISSION), errorHandler.catchAsync(addRolePermissions));

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
 *               $ref: '#/components/schemas/AssignRoleRequest'
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
roleRouter.put("/assign-role-to-user",validatePayload(TABELS_NAMES_ENUM.USER_ROLE), errorHandler.catchAsync(assignRoleToUserController));

export default roleRouter;
