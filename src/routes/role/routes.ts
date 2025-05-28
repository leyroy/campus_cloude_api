import express from "express";
import { ErrorHandler } from "../../middlewares/errorHandler";
import { createRoleController } from "../../modules/roles/controllers/createRole";
import { validatePayload } from "../../middlewares/validate-payload";
import { TABELS_NAMES_ENUM } from "../../types/shared/types";
import { addRolePermissions } from "../../modules/roles/rolePermissions/addRolePermissions";

const roleRouter = express.Router();
const errorHandler = new ErrorHandler();

/**
 * @swagger
 * /campcloud/api/v1/roles:
 *   post:
 *     tags: [Roles]
 *     summary: Create a new role
 *     description: Create a new role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */

roleRouter.post(
  "/",
  validatePayload(TABELS_NAMES_ENUM.ROLE),
  errorHandler.catchAsync(createRoleController)
);

/**
 * @swagger
 * /campcloud/api/v1/roles/add-permissions:
 *   put:
 *     tags: [Roles]
 *     summary: Add permissions to a role
 *     description: Add permissions to an existing role in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RoleRequest'
 *     responses:
 *       201:
 *         description: Role created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
roleRouter.put("/add-permissions", errorHandler.catchAsync(addRolePermissions));

export default roleRouter;
