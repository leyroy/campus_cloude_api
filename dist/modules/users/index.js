"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = __importDefault(require("./controllers/create"));
const validate_payload_1 = require("../../middlewares/validate-payload");
const getUsers_controller_1 = require("./controllers/getUsers.controller");
const errorHandler_1 = require("../../middlewares/errorHandler");
const types_1 = require("../../types/types");
const usersRouter = express_1.default.Router();
const errorHandler = new errorHandler_1.ErrorHandler();
/**
 * @swagger
 * /campcloud/api/v1/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
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
usersRouter.get('/', errorHandler.catchAsync(getUsers_controller_1.getUsersController));
/**
 * @swagger
 * /campcloud/api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               password:
 *                 type: string
 *                 example: securepassword
 *               confirmPassword:
 *                 type: string
 *                 example: securepassword
 *     responses:
 *       200:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Users not found.
 */
usersRouter.post('/', (0, validate_payload_1.validatePayload)(types_1.TABELS_NAMES_ENUM.USERS), errorHandler.catchAsync(create_1.default));
exports.default = usersRouter;
