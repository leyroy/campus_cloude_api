import express from "express";
import createUserController from "../../modules/users/controllers/create";
import { validatePayload } from "../../middlewares/validate-payload";
import { TABELS_NAMES_ENUM } from "../../types/shared/types";
import { getUsersController } from "../../modules/users/controllers/getUser.controller";
import { ErrorHandler } from "../../middlewares/errorHandler";

const usersRouter = express.Router();
const errorHandler = new ErrorHandler()

/**
 * @swagger
 * /campcloud/api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Users not found.
 */

usersRouter.get("/", errorHandler.catchAsync(getUsersController));

/**
 * @swagger
 * /campcloud/api/v1/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   message:
 *                     type: string
 *                     example: User created successfully
 *                   success:
 *                     type: boolean
 *                     example: true
 *       404:
 *         description: Users not found.
 */
usersRouter.post("/", validatePayload(TABELS_NAMES_ENUM.USERS), errorHandler.catchAsync(createUserController)); 


export default usersRouter;
